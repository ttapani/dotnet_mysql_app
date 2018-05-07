using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector.Performance.Models;

namespace MySqlConnector.Performance.Controllers
{
    [Route("api/v1/[controller]")]
    public class TodosController : Controller
    {
        public readonly AppDb db;
        public TodosController(AppDb db)
        {
            this.db = db;
        }
        // GET api/v1/todos
        [HttpGet]
        public async Task<IActionResult> GetLatest()
        {
            using (db)
            {
                await db.Connection.OpenAsync();
                var query = new TodoQuery(db);
                var result = await query.LatestTodosAsync();
                return new OkObjectResult(result);
            }
        }

        // GET api/v1/todos/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            using (db)
            {
                await db.Connection.OpenAsync();
                var query = new TodoQuery(db);
                var result = await query.FindOneAsync(id);
                if (result == null)
                return new NotFoundResult();
                return new OkObjectResult(result);
            }
        }

        // POST api/v1/todos
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Todo body)
        {
            using (db)
            {
                await db.Connection.OpenAsync();
                body.db = db;
                await body.InsertAsync();
                return new OkObjectResult(body);
            }
        }

        // PUT api/v1/todos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOne(int id, [FromBody]Todo body)
        {
            using (db)
            {
                await db.Connection.OpenAsync();
                var query = new TodoQuery(db);
                var result = await query.FindOneAsync(id);
                if (result == null)
                    return new NotFoundResult();
                result.text = body.text;
                result.done = body.done;
                await result.UpdateAsync();
                return new OkObjectResult(result);
            }
        }

        // DELETE api/async/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOne(int id)
        {
            using (db)
            {
                await db.Connection.OpenAsync();
                var query = new TodoQuery(db);
                var result = await query.FindOneAsync(id);
                if (result == null)
                    return new NotFoundResult();
                await result.DeleteAsync();
                return new OkResult();
            }
        }
    }
}
