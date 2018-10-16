using Microsoft.VisualBasic;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Configuration;
using System.Diagnostics;
using System.Data.SqlClient;
using Insurance_Maker.App_Code;

public class clsConnection
{
    //Dim ConString As String = "Server=DAV8DBHSND01;Initial Catalog=MIS_MLA_UAT;Persist Security Info=True;User ID=mis414;Password=juchUt4a"
    public clsFunctions FUNC = new clsFunctions();

    string connStr = ConfigurationManager.ConnectionStrings["MISConnectionString"].ConnectionString.ToString();
    SqlConnection con;
    SqlCommand cmd;
    SqlDataAdapter da;
    //Dim clsmail As New clsEmail


    private SqlCommand _command = new SqlCommand();
    public DataTable GetData(string Query)
    {

        DataTable dt = new DataTable();
        try
        {
            con = new SqlConnection(connStr);
            con.Open();
            da = new SqlDataAdapter(Query, con);
            da.Fill(dt);
            con.Close();
            return dt;
        }
        catch (Exception ex)
        {
            return dt;
        }
    }

    public DataSet GetDataSet(string strQuery)
    {
        con = new SqlConnection(connStr);

        try
        {
            SqlCommand mycmd = new SqlCommand(strQuery, con);

            mycmd.CommandTimeout = 3000;

            mycmd.CommandType = CommandType.Text;
            SqlDataAdapter myDataAdapter = new SqlDataAdapter(mycmd);

            DataSet myDataSet = new DataSet();

            myDataAdapter.Fill(myDataSet);

            myDataAdapter.Dispose();

            return myDataSet;
        }
        catch (SqlException ex)
        {
            //Interaction.MsgBox(ex.Message + Constants.vbCr + "Contact administrator.", MsgBoxStyle.Critical, "Error!");
            return null;
        }
        finally
        {
            con.Close();
        }
    }

    public int ExecuteReader(string query)
    {
        int i = 0;

        try
        {
            con = new SqlConnection(connStr);
            con.Open();
            _command.Connection = con;
            _command.CommandType = CommandType.Text;
            _command.CommandText = query;

            SqlDataReader rdr = _command.ExecuteReader();
            while (rdr.Read())
            {
                i = Convert.ToInt32(rdr[0]);
            }
        }
        catch (Exception ex)
        {
            i = 0;
        }
        con.Close();
        return i;
    }

    public int ExecuteQuery(string query)
    {

        int i = 0;

        try
        {
            con = new SqlConnection(connStr);
            con.Open();
            _command.Connection = con;
            _command.CommandType = CommandType.Text;
            _command.CommandText = query;
            //_command.CommandTimeout = 180

            i = _command.ExecuteNonQuery();
            _command.Dispose();
        }
        catch (Exception ex)
        {
            i = 0;
            //clsmail.CreateSendEmail("An error occurred while exceing the query..." & vbCrLf & vbCrLf & query & vbCrLf & vbCrLf & ex.ToString)
        }
        con.Close();
        return i;
    }

    public int ExecuteQueryParam(string query, SqlCommand _command)
    {

        int i = 0;

        try
        {
            con = new SqlConnection(connStr);
            con.Open();
            _command.Connection = con;
            _command.CommandText = query;
            _command.CommandType = CommandType.Text;
            //_command.CommandText = query;
            //_command.CommandTimeout = 180

            i = _command.ExecuteNonQuery();
            _command.Dispose();
        }
        catch (Exception ex)
        {
            i = 0;
            //clsmail.CreateSendEmail("An error occurred while exceing the query..." & vbCrLf & vbCrLf & query & vbCrLf & vbCrLf & ex.ToString)
        }
        con.Close();
        return i;
    }

    public int ExecuteStoredParam(string query, SqlCommand _command)
    {

        int i = 0;

        try
        {
            con = new SqlConnection(connStr);
            con.Open();
            _command.Connection = con;
            _command.CommandType = CommandType.StoredProcedure;
            _command.CommandText = query;
            //_command.CommandType = CommandType.Text;
            //_command.CommandText = query;
            //_command.CommandTimeout = 180

            i = _command.ExecuteNonQuery();
            _command.Dispose();
        }
        catch (Exception ex)
        {
            i = 0;
            //clsmail.CreateSendEmail("An error occurred while exceing the query..." & vbCrLf & vbCrLf & query & vbCrLf & vbCrLf & ex.ToString)
        }
        con.Close();
        return i;
    }

    public DataTable GetDataParam(string Query, SqlCommand command)
    {

        DataTable dt = new DataTable();
        try
        {
            con = new SqlConnection(connStr);
            con.Open();
            command.CommandText = Query;
            command.Connection = con;
            da = new SqlDataAdapter(command);
            da.Fill(dt);
            con.Close();
            return dt;
        }
        catch (Exception ex)
        {
            return dt;
        }
    }

    public DataSet GetDataSetStored(string strQuery, SqlCommand command)
    {
        con = new SqlConnection(connStr);

        try
        {
            //SqlCommand mycmd = new SqlCommand(strQuery, con);

            command.CommandTimeout = 3000;

            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = strQuery;
            command.Connection = con;
            SqlDataAdapter myDataAdapter = new SqlDataAdapter(command);

            DataSet myDataSet = new DataSet();

            myDataAdapter.Fill(myDataSet);

            myDataAdapter.Dispose();

            return myDataSet;
        }
        catch (SqlException ex)
        {
            //Interaction.MsgBox(ex.Message + Constants.vbCr + "Contact administrator.", MsgBoxStyle.Critical, "Error!");
            return null;
        }
        finally
        {
            con.Close();
        }
    }

    public DataSet GetDataSetParam(string strQuery, SqlCommand command)
    {
        con = new SqlConnection(connStr);

        try
        {
            //SqlCommand mycmd = new SqlCommand(strQuery, con);

            command.CommandTimeout = 3000;
            command.CommandText = strQuery;
            command.Connection = con;
            SqlDataAdapter myDataAdapter = new SqlDataAdapter(command);

            DataSet myDataSet = new DataSet();

            myDataAdapter.Fill(myDataSet);

            myDataAdapter.Dispose();

            return myDataSet;
        }
        catch (SqlException ex)
        {
            //Interaction.MsgBox(ex.Message + Constants.vbCr + "Contact administrator.", MsgBoxStyle.Critical, "Error!");
            return null;
        }
        finally
        {
            con.Close();
        }
    }   

    public DataTable GetDataStoredParam(string Query, SqlCommand command)
    {

        DataTable dt = new DataTable();
        try
        {
            con = new SqlConnection(connStr);
            con.Open();
            command.Connection = con;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = Query;
            da = new SqlDataAdapter(command);
            da.Fill(dt);
            con.Close();
            return dt;
        }
        catch (Exception ex)
        {
            return dt;
        }
    }

    public int ExecuteQuery2(string query)
    {

        int i = 0;

        try
        {
            con = new SqlConnection(connStr);
            con.Open();
            _command.Connection = con;
            _command.CommandType = CommandType.Text;
            _command.CommandText = query;
            //_command.CommandTimeout = 180

            i = _command.ExecuteNonQuery();
            _command.Dispose();
        }
        catch (Exception ex)
        {
            i = 0;
            //clsmail.CreateSendEmail("An error occurred while exceing the query..." & vbCrLf & vbCrLf & query & vbCrLf & vbCrLf & ex.ToString)
        }

        return i;
    }


    public void SQLBulkCopy(string table, DataTable dtb)
    {
        con = new SqlConnection(connStr);
        con.Open();

        using (SqlBulkCopy copy = new SqlBulkCopy(con))
        {
            copy.DestinationTableName = table;
            //copy.BulkCopyTimeout = 120
            copy.WriteToServer(dtb);
        }
    }

    public int ExecuteScalarQuery(string query)
    {

        int i = 0;

        try
        {
            con = new SqlConnection(connStr);
            con.Open();
            _command.Connection = con;
            _command.CommandType = CommandType.Text;
            _command.CommandText = query;
            //_command.CommandTimeout = 180

            i = Convert.ToInt32(_command.ExecuteScalar());
            _command.Dispose();
            con.Close();
        }
        catch (Exception ex)
        {
            i = 0;
            //clsmail.CreateSendEmail("An error occurred while exceing the query..." & vbCrLf & vbCrLf & query & vbCrLf & vbCrLf & ex.ToString)
        }

        return i;
    }

}

