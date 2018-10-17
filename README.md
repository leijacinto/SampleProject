# SampleProject


using (BusinessRulesEntities businessRules = new BusinessRulesEntities())
            {
                var query = (from c in businessRules.tbl_MLS_Coverage
                        join b in businessRules.tbl_DB_US_States
                        on c.state_abbr equals b.State_Abbr
                        where c.website_id.ToString() == website && c.isRemoved == false
                        select new
                        {
                            c.coverage_id,
                            c.state_abbr,
                            b.State
                        }).Distinct().OrderBy(x => x.State);

                foreach (var value in query)
                {
                    dt.Rows.Add(value.State, value.coverage_id, value.state_abbr);
                    Debug.WriteLine(value.state_abbr);
                }
            }
            
            return JsonConvert.SerializeObject(new { Success = true, Message = "Success", data = new { record = dt } });
            
            
            get
            $.ajax({
        type: 'POST',
        url: 'BusinessRules_MLS.aspx/loadCoverState',
        data: '{website: "' + website + '"}',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            var d = $.parseJSON(data.d);

            if (d.Success) {
                var records = d.data.record;
                $('#tblCoveredState tbody').empty();
                $.each(records, function (idx, val) {
                    $('#tblCoveredState tbody').append(
                        '<tr class="rowHover no-padding" onclick="loadCoverZip(this);">' +
                            '<td data-id="' + val.coverage_id + '">' + val.State + '</td>' +
                            '<td class="pull-right" data-id="' + val.coverage_id + '"><button type="button" class="btn-small waves-effect waves-gray btn-flat minibtn"><i class="fa fa-trash text-red" onclick="removedState(this);"></i></button></td>' +
                        '</tr>'
                    );
                });
            }
        }, error: function (response) {
        }, failure: function (response) {
        }
    });
            
            
            
            insert
            $.ajax({
            type: 'POST',
            url: 'BusinessRules_MLS.aspx/saveCoveredStates',
            data: '{data: ' + JSON.stringify(arr) + ', website: "' + website + '", state: "' + stateabbr + '", user: "' + $('#usr').text() + '"}',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                console.log(data);

                if (data.d == '1') {
                    alertify.alert('Successfully', 'Record saved successfully');
                    loadCoveredState();
                    loadState();
                    $('#tblZipCode tr').remove();
                } else {
                    alertify.alert('Error', 'Error Saving in database!');
                }
            }
        });
