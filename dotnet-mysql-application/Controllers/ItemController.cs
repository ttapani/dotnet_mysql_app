using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnet_mysql_application.Models;

namespace dotnet_mysql_application.Controllers
{
    [Authorize(Policy = "ApiUser")]
    [Route("api/v1/[controller]")]
    [Produces("application/json")]
    public class ItemsController : Controller
    {
        private readonly LoanSystemContext db;

        public ItemsController(LoanSystemContext context)
        {
            db = context;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public IActionResult GetItemById(string id)
        {
            var item = db.Item.Single(i => i.Id.ToString() == id);
            if (item == null)
                return NotFound();
            return new OkObjectResult(item);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public IActionResult GetAllItems()
        {
            var equipments = db.Item.ToList();
            if (equipments == null)
                return NotFound();
            return new OkObjectResult(equipments);
        }

        [HttpPost]
        [ProducesResponseType(201, Type = typeof(Item))]
        [ProducesResponseType(400)]
        public IActionResult AddItem([FromBody] Item item)
        {
            if (ModelState.IsValid) {
                db.Item.Add(item);
                db.SaveChanges();
                return CreatedAtAction(nameof(GetItemById), new { id = item.Id },  item);
            }
            else
                return BadRequest();
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public IActionResult UpdateItem(string id, [FromBody] Item item)
        {
            var targetItem = db.Item.SingleOrDefault(i => i.Id.ToString() == id);
            if (targetItem == null)
                return NotFound();
            else if(ModelState.IsValid) {
                targetItem.Name = item.Name;
                db.Item.Update(targetItem);
                db.SaveChanges();
                return Ok(item);
            }
            else
                return BadRequest();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult DeleteItem(string id)
        {
            var item = db.Item.SingleOrDefault(i => i.Id.ToString() == id);
            if (item == null)
                return NotFound();
            db.Remove(item);
            db.SaveChanges();
            return new NoContentResult();
        }
    }
}