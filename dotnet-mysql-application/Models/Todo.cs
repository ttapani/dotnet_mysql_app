using System.Data;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

namespace MySqlConnector.Performance.Models
{
    public class Todo
    {
        public int id { get; set; }
        public string text { get; set; }
        public bool done { get; set; }

        [JsonIgnore]
        public AppDb db { get; set; }

        public Todo(AppDb db=null)
        {
            this.db = db;
        }

        public async Task InsertAsync()
        {
            var cmd = db.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"INSERT INTO `todos` (`text`) VALUES (@text);";
            BindParams(cmd);
            await cmd.ExecuteNonQueryAsync();
            id = (int) cmd.LastInsertedId;
        }

        public async Task UpdateAsync()
        {
            var cmd = db.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"UPDATE `todos` SET `text` = @text, `done` = @done WHERE `id` = @id;";
            BindParams(cmd);
            BindId(cmd);
            await cmd.ExecuteNonQueryAsync();
        }

        public async Task DeleteAsync()
        {
            var cmd = db.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"DELETE FROM `todos` WHERE `id` = @id;";
            BindId(cmd);
            await cmd.ExecuteNonQueryAsync();
        }

        private void BindId(MySqlCommand cmd)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = id,
            });
        }

        private void BindParams(MySqlCommand cmd)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@text",
                DbType = DbType.String,
                Value = text,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@done",
                DbType = DbType.Boolean,
                Value = done,
            });
        }

    }
}
