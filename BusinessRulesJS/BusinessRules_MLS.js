$(document).ready(function () {
    window.location.hash = '/#MLS/?';
    loadMLSWebsite();
    $('.tabs').tabs();
});

function dataRequired(val) {
    $.ajax({
        type: 'POST',
        url: 'BusinessRules_MLS.aspx/getDataRequired',
        data: '{categoryName: "' + val + '", website: "' + website + '"}',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            var d = $.parseJSON(data.d);

            if (d.Success) {
                var records = d.data.record;

                var isChecked = [];
                if (records[0].Indicator == 'TRUE') {
                    var splitVal = records[0].Fields.split(',');

                    for (var i = 0; i < splitVal.length; i++) {
                        isChecked.push(parseInt(splitVal[i]));
                    }
                } else {

                }

                $('#tblDetails tbody').empty();
                //$('#tblDetails thead').append(
                //    '<tr>' +

                // 		'<td><input type="checkbox" name="select_all" id="for_select_all" />' +
                // 		'<label for="for_select_all" style="color: black">Select All</label></td>' +
                // 	'</tr>'
                //    );
                $.each(records, function (idx, val) {
                    if ($.inArray(val.field_id, isChecked) > -1) {
                        $('#tblDetails tbody').append(
                            '<tr>' +
                                '<td><input type="checkbox" id="' + val.field_id + '" value="' + val.field_id + '" checked>' +
                                '<label for="' + val.field_id + '" style="color: black">' + val.field_name + '</label></td>' +
                            '</tr>'
                         );
                    } else {
                        $('#tblDetails tbody').append(
                             '<tr>' +
                                 '<td><input type="checkbox" id="' + val.field_id + '" value="' + val.field_id + '">' +
                                     '<label for="' + val.field_id + '" style="color: black">' + val.field_name + '</label></td>' +
                             '</tr>'
                         );
                    }
                });
            }
        }
    });
}

var category = "";
$('#btnStandard').click(function () {
    window.location.hash = '/#MLS/?' + $('#tblMLS tbody tr.activeRow td').text() + '/Data Required/Standard';

    dataRequired('Standard');
    category = 'Standard';
    $(this).addClass('active');
    $('#btnListing').removeClass('active');
    $('#btnPropertyDetails').removeClass('active');
    $('#btnSchool').removeClass('active');
    $('#btnFeatures').removeClass('active');
    $('#btnPropertyFees').removeClass('active');
});

$('#btnListing').click(function () {
    window.location.hash = '/#MLS/?' + $('#tblMLS tbody tr.activeRow td').text() + '?/Data Required/Listing Terms';

    dataRequired('Listing Terms');
    category = 'Listing Terms';
    $(this).addClass('active');
    $('#btnStandard').removeClass('active');
    $('#btnPropertyDetails').removeClass('active');
    $('#btnSchool').removeClass('active');
    $('#btnFeatures').removeClass('active');
    $('#btnPropertyFees').removeClass('active');
});

$('#btnPropertyDetails').click(function () {
    window.location.hash = '/#MLS/?' + $('#tblMLS tbody tr.activeRow td').text() + '?/Data Required/Property Details';

    dataRequired('Property Details');
    category = 'Property Details';
    $(this).addClass('active');
    $('#btnStandard').removeClass('active');
    $('#btnListing').removeClass('active');
    $('#btnSchool').removeClass('active');
    $('#btnFeatures').removeClass('active');
    $('#btnPropertyFees').removeClass('active');
});

$('#btnSchool').click(function () {
    window.location.hash = '/#MLS/?' + $('#tblMLS tbody tr.activeRow td').text() + '?/Data Required/Shool Information';

    dataRequired('School Information');
    category = 'School Information';
    $(this).addClass('active');
    $('#btnStandard').removeClass('active');
    $('#btnListing').removeClass('active');
    $('#btnPropertyDetails').removeClass('active');
    $('#btnFeatures').removeClass('active');
    $('#btnPropertyFees').removeClass('active');
});

$('#btnPropertyFees').click(function () {
    window.location.hash = '/#MLS/?' + $('#tblMLS tbody tr.activeRow td').text() + '?/Data Required/Property Fees';

    dataRequired('Property Fees');
    category = 'Property Fees';
    $(this).addClass('active');
    $('#btnStandard').removeClass('active');
    $('#btnListing').removeClass('active');
    $('#btnPropertyDetails').removeClass('active');
    $('#btnFeatures').removeClass('active');
    $('#btnSchool').removeClass('active');
});

$('#btnFeatures').click(function () {
    window.location.hash = '/#MLS/?' + $('#tblMLS tbody tr.activeRow td').text() + '?/Data Required/Features';

    dataRequired('Features');
    category = 'Features';
    $(this).addClass('active');
    $('#btnStandard').removeClass('active');
    $('#btnListing').removeClass('active');
    $('#btnPropertyDetails').removeClass('active');
    $('#btnPropertyFees').removeClass('active');
    $('#btnSchool').removeClass('active');
});

$('#txtSearchMLS').keyup(function () {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("txtSearchMLS");
    filter = input.value.toUpperCase();
    table = document.getElementById("tblMLS");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        } else {
            tr[i].style.display = "none";
        }
    }
});

$('#btnSave').click(function () {
    var arrData = [];
    $('#tblDetails').find('input[type="checkbox"]:checked').each(function () {
        arrData.push($(this).val());
    });

    if (arrData.length > 0) {
        $.ajax({
            type: 'POST',
            url: 'BusinessRules_MLS.aspx/saveDataRequired',
            data: '{data: ' + JSON.stringify(arrData) + ', user: "' + $('#usr').text() + '", website: "' + website + '", category: "' + category + '"}',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                console.log(data);

                if (data.d == '1') {
                    alertify.alert('Successfully', 'Record saved successfully');
                } else {
                    alertify.alert('Error', 'Error Saving in database!');
                }
            }
        });
    } else {
        alertify.alert('Reminder', 'Please select fields.');
    }
});

function loadMLSWebsite() {
    $.ajax({
        type: 'POST',
        url: 'BusinessRules_MLS.aspx/loadMLSWebsite',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            var d = $.parseJSON(data.d);

            if (d.Success) {
                var records = d.data.record;

                $('#tblMLS tbody').empty();
                $.each(records, function (idx, val) {
                    $('#tblMLS tbody').append(
                        '<tr class="rowHover" onclick="showPanel(this);">' +
                            '<td style="padding-left: 8%;" data-id="' + val.Id + '"><h6>' + val.WebsiteName + '</h6></td>' +
                        '</tr>'
                    );
                });
            }
        }
    });
}

var website;
function showPanel(val) {
    website = $(val).find('td').attr('data-id');
    $.each($('#tblMLS tbody tr'), function () {
        $(this).removeClass('activeRow');
    })
    $(val).addClass('activeRow');

    $('#hideTab').show();
    $('#cloneDiv').hide();

    $('.indicator').css({ "right": "791px", "left": "0px" })
    $('ul.tabs').tabs('select_tab', 'test-swipe-1');

    $('#tblZipCode tr').remove();
    $('#tblCoveredStatesZip tr').remove();

    loadState();
    loadCoveredState();

}

$('#swipe1').click(function () {
    window.location.hash = '/#MLS/?' + $('#tblMLS tbody tr.activeRow td').text() + '/?Coverage';

    $('#tblZipCode tr').remove();
    $('#tblCoveredStatesZip tr').remove();
    loadCoveredState();
})

$('#swipe2').click(function () {
    window.location.hash = '/#MLS/?' + $('#tblMLS tbody tr.activeRow td').text() + '/?Data Required';

    $('#tblDetails tbody').empty();
    dataRequired('Standard');
    category = 'Standard';

    $('#btnSchool').removeClass('active');
    $('#btnStandard').addClass('active');
    $('#btnListing').removeClass('active');
    $('#btnPropertyDetails').removeClass('active');
    $('#btnFeatures').removeClass('active');
    $('#btnPropertyFees').removeClass('active');


})

$('#swipe3').click(function () {
    $('#slctInitialListing').val('');
    $('#slctListingQuality').val('');
    $('#slctPriceChange').val('');
    $('#slctStatusChange').val('');
    $('#slctPreviewListing').val('');
    $('#slctLockBoxCode').val('');
    $('#slctListingCorrections').val('');

    window.location.hash = '/#MLS/?' + $('#tblMLS tbody tr.activeRow td').text() + '/?My Assistant';

    $.ajax({
        type: 'POST',
        url: 'BusinessRules_MLS.aspx/loadMyAssistant',
        data: '{website: "' + website + '"}',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            var d = $.parseJSON(data.d);

            if (d.Success) {
                var records = d.data.record;

                $('#slctInitialListing').val('' + records[0].initial_listing + '');
                $('#slctListingQuality').val('' + records[0].listing_quality + '');
                $('#slctPriceChange').val('' + records[0].price_changed + '');
                $('#slctStatusChange').val('' + records[0].status_change + '');
                $('#slctPreviewListing').val('' + records[0].preview_listing + '');
                $('#slctLockBoxCode').val('' + records[0].lockbox_code_change + '');
                $('#slctListingCorrections').val('' + records[0].listing_corrections + '');
            }
        }
    });
})


$('#btnSaveMyAssistant').click(function () {
    saveMyAssistant();
});

function saveMyAssistant() {
    var data = [
        $('#slctInitialListing').val(),
        $('#slctListingQuality').val(),
        $('#slctPriceChange').val(),
        $('#slctStatusChange').val(),
        $('#slctPreviewListing').val(),
        $('#slctLockBoxCode').val(),
        $('#slctListingCorrections').val(),
        $('#usr').text()
    ]

    $.ajax({
        type: 'POST',
        url: 'BusinessRules_MLS.aspx/saveMyAssistant',
        data: '{data: ' + JSON.stringify(data) + ', website: "' + website + '"}',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            console.log(data);

            if (data.d == '1') {
                alertify.alert('Successfully', 'Record saved successfully');
            } else {
                alertify.alert('Error', 'Error Saving in database!');
            }
        }
    });
}

$('#txtSearchState').keyup(function () {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("txtSearchState");
    filter = input.value.toUpperCase();
    table = document.getElementById("tblState");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        } else {
            tr[i].style.display = "none";
        }
    }
});

function loadState() {
    $.ajax({
        type: 'POST',
        url: 'BusinessRules_MLS.aspx/loadState',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            var d = $.parseJSON(data.d);

            if (d.Success) {
                var records = d.data.record;
                $('#tblState tbody').empty();
                $.each(records, function (idx, val) {
                    $('#tblState tbody').append(
                        '<tr class="rowHover" onclick="loadZipCode(this);">' +
                            '<td style="padding-left: 8%;" data-id="' + val.State_Abbr + '">' + val.State + '</td>' +
                        '</tr>'
                    );
                });


            }
        }, error: function (response) {
        }, failure: function (response) {
        }
    });
}

$('#txtSearchZipCode').keyup(function () {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("txtSearchZipCode");
    filter = input.value.toUpperCase();
    table = document.getElementById("tblZipCode");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        } else {
            tr[i].style.display = "none";
        }
    }
});



var stateabbr;
function loadZipCode(val) {
    stateabbr = $(val).find('td').attr('data-id');
    $.each($('#tblState tbody tr'), function () {
        $(this).removeClass('activeRow');
    })
    $(val).addClass('activeRow');

    $.ajax({
        type: 'POST',
        url: 'BusinessRules_MLS.aspx/loadZipCode',
        data: '{state: "' + stateabbr + '", website: "' + website + '"}',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            var d = $.parseJSON(data.d);

            if (d.Success) {
                var records = d.data.record;

                var isChecked = [];
                if (records[0].Indicator == 'TRUE') {
                    var splitVal = records[0].state_zipcode.split(',');

                    for (var i = 0; i < splitVal.length; i++) {
                        isChecked.push(parseInt(splitVal[i]));
                    }
                } else {

                }

                $('#tblZipCode tbody').empty();
                $('#tblZipCode tbody').append(
                    '<tr>' +
                        '<td>' +
                            '<input type="checkbox" id="chkAll" value="Select All" />' +
                            '<label for="chkAll" style="color: black; font-size: 14px;" class="no-margin">Select All</label>' +
                        '</td>' +
                    '</tr>'
                    );
                $.each(records, function (idx, val) {
                    if ($.inArray(val.id, isChecked) > -1) {
                        $('#tblZipCode tbody').append(
                            '<tr class="rowHover">' +
                                '<td><input type="checkbox" id="' + val.id + '" value="' + val.id + '" checked>' +
                                '<label for="' + val.id + '" style="color: black; font-size: 14px;" class="no-margin">' + val.ZipCode + '</label></td>' +
                            '</tr>'
                        );
                    } else {
                        $('#tblZipCode tbody').append(
                            '<tr class="rowHover">' +
                                '<td class"no-padding"><input type="checkbox" id="' + val.id + '" value="' + val.id + '">' +
                                '<label for="' + val.id + '" style="color: black; font-size: 14px;" class="no-margin">' + val.ZipCode + '</label></td>' +
                            '</tr>'
                        );
                    }
                });


                $('#chkAll').change(function () {
                    $(this).closest('table').find('td input:checkbox').prop('checked', this.checked);
                })
            }
        }, error: function (response) {
        }, failure: function (response) {
        }
    });
}

$('#btnAdd').click(function () {
    var arr = [];
    $('#tblZipCode').find('input[type="checkbox"]:checked').each(function () {
        if ($(this).val() == 'Select All') {

        } else {
            arr.push($(this).val());
        }
    });

    if (arr.length > 0) {
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
    }
    else {
        alertify.alert('Reminder', 'Please select zip code.');
    }
});


function loadCoveredState() {
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
}


function loadCoverZip(val) {
    var zip = $(val).find('td').attr('data-id');
    $.each($('#tblCoveredState tbody tr'), function () {
        $(this).removeClass('activeRow');
    })
    $(val).addClass('activeRow');

    $.ajax({
        type: 'POST',
        url: 'BusinessRules_MLS.aspx/loadCoverZip',
        data: '{cover: "' + zip + '", website: "' + website + '"}',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            var d = $.parseJSON(data.d);

            if (d.Success) {
                var records = d.data.record;

                var isChecked = [];
                var splitVal = records[0].state_zipcode.split(',');

                for (var i = 0; i < splitVal.length; i++) {
                    isChecked.push(parseInt(splitVal[i]));
                }

                $('#tblCoveredStatesZip tbody').empty();
                $.each(records, function (idx, val) {
                    if ($.inArray(val.id, isChecked) > -1) {
                        $('#tblCoveredStatesZip tbody').append(
                            '<tr>' +
                                '<td><input type="checkbox" id="' + val.id + '" value="' + val.id + '">' +
                                '<label for="' + val.id + '" style="color: black; font-size: 14px;" class="no-margin"style="color: black">' + val.ZipCode + '</label></td>' +
                            '</tr>'
                         );
                    }
                });
            }
        }
    });
}


function removedState(val) {
    var row = $(val).closest('td').attr('data-id');
    alertify.confirm().set({ 'modal': true, 'pinnable': false, 'movable': false });
    alertify.confirm().set('labels', { ok: 'Yes', cancel: 'No' })
    alertify.confirm("Warning", "Are you sure you want to delete this state?",
        function () {
            $.ajax({
                type: 'POST',
                url: 'BusinessRules_MLS.aspx/removeCoverState',
                data: '{cover: "' + row + '", website: "' + website + '", user: "' + $('#usr').text() + '"}',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    console.log(data);

                    if (data.d == '1') {
                        alertify.alert('Successfully', 'Record removed successfully');
                        $(val).closest('tr').remove();
                        $('#tblCoveredStatesZip tr').remove();
                    } else {
                        alertify.alert('Error', 'Error removing in database!');
                    }
                }
            });
        },
        function () {

        });
}

$('#btnRemove').click(function () {
    var zip = $('#tblCoveredState').find('td').attr('data-id');
    var arr = [];
    var checked = [];
    $('#tblCoveredStatesZip').find('input[type="checkbox"]:not(:checked)').each(function () {
        arr.push($(this).val());
    });

    $('#tblCoveredStatesZip').find('input[type="checkbox"]:checked').each(function () {
        checked.push($(this).val());
    });

    if (checked.length > 0) {
        alertify.confirm().set({ 'modal': true, 'pinnable': false, 'movable': false });
        alertify.confirm().set('labels', { ok: 'Yes', cancel: 'No' })
        alertify.confirm("Warning", "Are you sure you want to delete the selected zip code?",
            function () {
                $.ajax({
                    type: 'POST',
                    url: 'BusinessRules_MLS.aspx/removeCoverZip',
                    data: '{data: ' + JSON.stringify(arr) + ', cover: "' + zip + '", website: "' + website + '", user: "' + $('#usr').text() + '"}',
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        console.log(data);

                        if (data.d == '1') {
                            alertify.alert('Successfully', 'Record saved successfully');
                            $('#tblCoveredStatesZip input[type="checkbox"]:checked').closest('tr').remove()
                        } else {
                            alertify.alert('Error', 'Error Saving in database!');
                        }
                    }
                });
            },
            function () {
            });
    } else {
        alertify.alert('Reminder', 'Please select zip code.');
    }
});
