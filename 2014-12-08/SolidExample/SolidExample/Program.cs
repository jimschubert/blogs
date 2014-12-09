using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Odbc;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolidExample
{
    class Program
    {
        private static string cnxTemplate = 
            @"Driver={{Microsoft Text Driver (*.txt; *.csv)}};Dbq={0};Extensions=csv,txt";

        static void Main(string[] args)
        {
            /** The Problem **/
            Console.WriteLine("A standard DataReader:");
            string connectionString = String.Format(cnxTemplate, Environment.CurrentDirectory);
            using (var connection = new OdbcConnection(connectionString))
            {
                connection.Open();
                using (var cmd = connection.CreateCommand())
                {
                    // csv from http://www.wikiwand.com/en/Comma-separated_values#/Example
                    cmd.CommandText = "select * from Cars.csv";

                    using (var reader = cmd.ExecuteReader())
                    while (reader.Read())
                    {
                        OverloadedDumpRow(reader);
                    }
                }
            }
            Console.WriteLine();

            Console.WriteLine("A standard DataSet example.");
            using (var connection = new OdbcConnection(connectionString))
            {
                connection.Open();

                var adapter = new OdbcDataAdapter("SELECT * FROM Cars.csv", connection);

                DataSet ds = new DataSet("Temp");
                adapter.Fill(ds);

                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    OverloadedDumpRow(row);
                }
            }
            Console.WriteLine();

            /** The Solution **/
            Console.WriteLine("A wrapped DataReader (shared mapping function):");
            using (var connection = new OdbcConnection(connectionString))
            {
                connection.Open();
                using (var cmd = connection.CreateCommand())
                {
                    // csv from http://www.wikiwand.com/en/Comma-separated_values#/Example
                    cmd.CommandText = "select * from Cars.csv";

                    using (var reader = cmd.ExecuteReader())
                    while (reader.Read())
                    {
                        DumpRow(new DataRecordStringIndexedWrapper(reader));
                    }
                }
            }
            Console.WriteLine();

            Console.WriteLine("A wrapped DataSet example (shared mapping function).");
            using (var connection = new OdbcConnection(connectionString))
            {
                connection.Open();

                var adapter = new OdbcDataAdapter("SELECT * FROM Cars.csv", connection);

                DataSet ds = new DataSet("Temp");
                adapter.Fill(ds);

                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    DumpRow(new DataRowStringIndexedWrapper(row));
                }
            }

            Console.ReadLine();
        }

        /// <summary>
        /// Example function operatoring on a single instance implementing IDataRecord
        /// </summary>
        /// <param name="row"></param>
        static void OverloadedDumpRow(IDataRecord row)
        {
            Console.WriteLine("A {0} {1} {2}",
                            row["Year"], row["Make"], row["Model"]);
        }

        /// <summary>
        /// A needlessly redundant method to achieve the same as IDataRecord version above
        /// </summary>
        /// <param name="row"></param>
        static void OverloadedDumpRow(DataRow row)
        {
            Console.WriteLine("A {0} {1} {2}",
                            row["Year"], row["Make"], row["Model"]);
        }

        /// <summary>
        /// An adapter is created to implement a known interface.
        /// </summary>
        /// <param name="record"></param>
        static void DumpRow(IStringIndexed record)
        {
            Console.WriteLine("A {0} {1} {2}",
                            record["Year"], record["Make"], record["Model"]);
        }
    }
}
