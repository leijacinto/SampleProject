using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using System.Web.Services;
using System.Data;
using System.Globalization;

namespace MLS_Manager
{
    public partial class BusinessRules_MLS : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        public static clsConnection cls = new clsConnection();
        [WebMethod]
        public static string getDataRequired(string categoryName, string website)
        {

            DataTable dt = cls.GetData(@"select * from tbl_MLS_DataRequired where website_id = '" + website + @"' and 
                                        category_id = (SELECT category_id from tbl_MLS_Category where Category_Name = '" + categoryName + "')");

            DataTable dtable;
            if (dt.Rows.Count > 0)
            {
                dtable = cls.GetData(@"select Indicator = 'TRUE', a.field_id, a.field_name, b.Category_Name, c.field_id [Fields] from tbl_MLS_Fields a
                                        inner join tbl_MLS_Category b
                                        on a.category_id = b.category_id
                                        inner join tbl_MLS_DataRequired c
                                        on b.category_id = c.category_id
                                        and website_id = '" + website + @"' and 
                                        b.category_id = (SELECT category_id from tbl_MLS_Category where Category_Name = '" + categoryName + "')");
            }
            else
            {
                dtable = cls.GetData(@"Select Indicator = 'FALSE', * from tbl_MLS_Fields a
                                        full outer join tbl_MLS_Category b
                                        on a.category_id = b.category_id
                                        where b.Category_Name = '" + categoryName + "'");
            }

            return JsonConvert.SerializeObject(new { Success = true, Message = "Success", data = new { record = dtable } });
        }

        [WebMethod]
        public static string saveDataRequired(List<string> data, string user, string website, string category)
        {
            string tag = "", query = "", dataParam = ""; ;
            List<string> dataParamList = new List<string>(), dataValue = new List<string>();
            SqlCommand command = new SqlCommand();
            command.Parameters.Clear();

            for (int i = 0; i < data.Count; i++)
            {
                //dataParam += "@data" + i + ",";
                dataParam += data[i] + ",";
                dataValue.Add(data[i]);
                dataParamList.Add("@data" + i);
            }
            dataParam = dataParam.Remove(dataParam.Length - 1);

            DataTable dt = cls.GetData("SELECT * FROM tbl_MLS_DataRequired WHERE website_id = '" + website + "' AND category_id = (SELECT category_id FROM tbl_MLS_Category WHERE Category_Name = '" + category + "')");

            if (dt.Rows.Count > 0)
            {
                query = "UPDATE tbl_MLS_DataRequired SET field_id = '" + dataParam + "', checked_by = '" + user + "', checked_date = GETDATE()  WHERE website_id = '" + website + "' AND category_id = (SELECT category_id FROM tbl_MLS_Category WHERE Category_Name = '" + category + "')";
            }
            else
            {
                query = "INSERT INTO tbl_MLS_DataRequired (field_id, website_id, checked_by, checked_date, category_id) VALUES ('" + dataParam + "', '" + website + "', '" + user + "', GETDATE(), (SELECT category_id FROM tbl_MLS_Category WHERE Category_Name = '" + category + "'))";
            }

            int exec = cls.ExecuteQuery(query);

            tag = exec > 0 ? "1" : "0";

            return tag;
        }

        [WebMethod]
        public static string loadMLSWebsite()
        {
            DataTable dt = cls.GetData("SELECT * FROM tbl_MLS_WebsiteName ORDER BY WebsiteName");

            return JsonConvert.SerializeObject(new { Success = true, Message = "Success", data = new { record = dt } });
        }

        [WebMethod]
        public static string loadMyAssistant(string website)
        {
            DataTable dt = cls.GetData(@"select * from tbl_MLS_Assistant where
                                            website_id = '" + website + "'");

            return JsonConvert.SerializeObject(new { Success = true, Message = "Success", data = new { record = dt } });
        }

        [WebMethod]
        public static string saveMyAssistant(List<string> data, string website)
        {
            string tag = "", query = "";
            DataTable dt = cls.GetData("SELECT * FROM tbl_MLS_Assistant WHERE website_id = '" + website + "'");

            if (dt.Rows.Count > 0)
            {
                query = "UPDATE tbl_MLS_Assistant SET initial_listing = '" + data[0] + "', listing_quality = '" + data[1] + "', price_changed = '" + data[2] + @"',
                        status_change = '" + data[3] + "', preview_listing = '" + data[4] + "', lockbox_code_change = '" + data[5] + "', listing_corrections = '" + data[6] + @"',
                        saved_by = '" + data[7] + "', saved_date = GETDATE() WHERE website_id = '" + website + "'";
            }
            else
            {
                query = @"INSERT INTO tbl_MLS_Assistant (initial_listing, listing_quality, price_changed, status_change, preview_listing, lockbox_code_change, listing_corrections,
                        saved_by, saved_date, website_id) VALUES ('" + data[0] + "', '" + data[1] + "', '" + data[2] + "', '" + data[3] + "', '" + data[4] + "', '" + data[5] + @"', 
                        '" + data[6] + "', '" + data[7] + "', GETDATE(), '" + website + "')";
            }

            int exec = cls.ExecuteQuery(query);

            tag = exec > 0 ? "1" : "0";

            return tag;
        }

        [WebMethod]
        public static string loadState()
        {
            DataTable dt = cls.GetData(@"select Distinct([State]), State_Abbr from tbl_DB_US_States 
                                        order by [State] ASC");

            return JsonConvert.SerializeObject(new { Success = true, Message = "Success", data = new { record = dt } });
        }

        [WebMethod]
        public static string loadZipCode(string state, string website)
        {
            DataTable dtable;
            DataTable dt = cls.GetData(@" select * from tbl_MLS_Coverage where state_abbr = '" + state + "' and website_id = '" + website + "' and isRemoved = 0");

            if (dt.Rows.Count > 0)
            {
                dtable = cls.GetData(@"select Indicator = 'TRUE', a.id, a.ZipCode, b.state_zipcode from tbl_DB_US_States a
                                        inner join tbl_MLS_Coverage b
                                        on a.State_Abbr = b.state_abbr
                                        where b.state_abbr = '" + state + "' and website_id = '" + website + @"'
                                        and isRemoved = 0");
            }
            else
            {
                dtable = cls.GetData(@"select Indicator = 'FALSE', id,ZipCode from tbl_DB_US_States where State_Abbr = '" + state + "'");
            }

            return JsonConvert.SerializeObject(new { Success = true, Message = "Success", data = new { record = dtable } });
        }

        [WebMethod]
        public static string saveCoveredStates(List<string> data, string website, string state, string user)
        {
            string tag = "", query = "", arrData = "";

            DataTable dt = cls.GetData("SELECT * FROM tbl_MLS_Coverage WHERE website_id = '" + website + "' and state_abbr = '" + state + "' and isRemoved = 0");

            for (int i = 0; i < data.Count; i++)
            {
                arrData += data[i] + ",";
            }
            arrData = arrData.Remove(arrData.Length - 1, 1);

            if (dt.Rows.Count > 0)
            {
                query = @"UPDATE tbl_MLS_Coverage SET state_zipcode = '" + arrData + "', added_by = '" + user + @"', added_date = GETDATE() 
                        WHERE website_id = '" + website + "' AND state_abbr = '" + state + "'";
            }
            else
            {
                query = @"INSERT INTO tbl_MLS_Coverage (website_id, state_abbr, state_zipcode, added_by, added_date) VALUES
                        ('" + website + "', '" + state + "', '" + arrData + "', '" + user + "', GETDATE())";
            }

            int exec = cls.ExecuteQuery(query);
            tag = exec > 0 ? "1" : "0";

            return tag;
        }

        [WebMethod]
        public static string loadCoverState(string website)
        {
            DataTable dt = cls.GetData(@"select Distinct([State]), coverage_id, 
                                      a.state_abbr from tbl_MLS_Coverage a
                                      inner join tbl_DB_US_States b
                                      on a.state_abbr = b.State_Abbr
                                      where a.website_id = '" + website + "' and a.isRemoved = 0 ORDER BY [State]");

            return JsonConvert.SerializeObject(new { Success = true, Message = "Success", data = new { record = dt } });
        }

        [WebMethod]
        public static string loadCoverZip(string cover, string website)
        {
            DataTable dt = cls.GetData(@"SELECT coverage_id, website_id, a.state_abbr, b.[State], b.id, 
                                        b.ZipCode, state_zipcode FROM tbl_MLS_Coverage a
                                        INNER JOIN tbl_DB_US_States b
                                        on a.state_abbr = b.State_Abbr
                                        where a.coverage_id = '" + cover + "' and a.website_id = '" + website + @"'
                                        and isRemoved = 0 ORDER BY b.[State]");

            return JsonConvert.SerializeObject(new { Success = true, Message = "Success", data = new { record = dt } });
        }

        [WebMethod]
        public static string removeCoverZip(List<string> data, string cover, string website, string user)
        {
            string tag = "", query = "", arrData = "";

            DataTable dt = cls.GetData("SELECT * FROM tbl_MLS_Coverage WHERE website_id = '" + website + "' and coverage_id = '" + cover + "' and isRemoved = 0");

            if (data.Count > 0)
            {
                for (int i = 0; i < data.Count; i++)
                {
                    arrData += data[i] + ",";
                }
                arrData = arrData.Remove(arrData.Length - 1, 1);
            }
            else
            {
                arrData = "";
            }

            if (dt.Rows.Count > 0)
            {
                query = @"UPDATE tbl_MLS_Coverage SET state_zipcode = '" + arrData + "', modified_by = '" + user + @"', modified_date = GETDATE() 
                        WHERE website_id = '" + website + "' and coverage_id = '" + cover + "'";
            }

            int exec = cls.ExecuteQuery(query);

            tag = exec > 0 ? "1" : "0";

            return tag;
        }

        [WebMethod]
        public static string removeCoverState(string cover, string website, string user)
        {
            string query = "", tag = "";
            DataTable dt = cls.GetData("SELECT * FROM tbl_MLS_Coverage WHERE website_id = '" + website + "' and coverage_id = '" + cover + "' and isRemoved = 0");

            if (dt.Rows.Count > 0)
            {
                query = @"UPDATE tbl_MLS_Coverage SET removed_by = '" + user + @"', isRemoved = 1, removed_date = GETDATE()
                        WHERE website_id = '" + website + "' and coverage_id = '" + cover + "'";
            }

            int exec = cls.ExecuteQuery(query);

            tag = exec > 0 ? "1" : "0";

            return tag;
        }
    }
}