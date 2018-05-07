using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace MySqlConnector.Performance.Models
{
    public class TodoQuery
    {
        public readonly AppDb db;
        public TodoQuery(AppDb db)
        {
            this.db = db;
        }

        public async Task<Todo> FindOneAsync(int id)
        {
            var cmd = db.Connection.CreateCommand() as MySqlCommand;
            cmd.CommandText = @"SELECT `id`, `text`, `done` FROM `todos` WHERE `id` = @id";
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = id,
            });
            var result = await ReadAllAsync(await cmd.ExecuteReaderAsync());
            return result.Count > 0 ? result[0] : null;
        }

        public async Task<List<Todo>> LatestTodosAsync()
        {
            var cmd = db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT `id`, `text`, `done` FROM `todos` ORDER BY `id` DESC LIMIT 10;";
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        private async Task<List<Todo>> ReadAllAsync(DbDataReader reader)
        {
            var todos = new List<Todo>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var todo = new Todo(db)
                    {
                        id = await reader.GetFieldValueAsync<int>(0),
                        text = await reader.GetFieldValueAsync<string>(1),
                        done = await reader.GetFieldValueAsync<bool>(2)
                    };
                    todos.Add(todo);
                }
            }
            return todos;
        }
    }
}
