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
    public class EquipmentController : Controller
    {
        private readonly LoanSystemContext db;

        public EquipmentController(LoanSystemContext context)
        {
            db = context;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public IActionResult GetEquipmentById(string id)
        {
            var equipment = db.Equipments.Single(e => e.Id.ToString() == id);
            if (equipment == null)
                return NotFound();
            return new OkObjectResult(equipment);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public IActionResult GetAllEquipment()
        {
            var equipments = db.Equipments.ToList();
            if (equipments == null)
                return NotFound();
            return new OkObjectResult(equipments);
        }

        [HttpPost]
        [ProducesResponseType(201, Type = typeof(Equipment))]
        [ProducesResponseType(400)]
        public IActionResult AddEquipment([FromBody] Equipment equipment)
        {
            if (ModelState.IsValid) {
                db.Equipments.Add(equipment);
                db.SaveChanges();
                return CreatedAtAction(nameof(GetEquipmentById), new { id = equipment.Id },  equipment);
            }
            else
                return BadRequest();
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public IActionResult UpdateEquipment(string id, [FromBody] Equipment equipment)
        {
            var targetEquipment = db.Equipments.SingleOrDefault(e => e.Id.ToString() == id);
            if (targetEquipment == null)
                return NotFound();
            else if(ModelState.IsValid) {
                targetEquipment.Name = equipment.Name;
                db.Equipments.Update(targetEquipment);
                db.SaveChanges();
                return Ok(equipment);
            }
            else
                return BadRequest();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult DeleteEquipment(string id)
        {
            var equipment = db.Equipments.SingleOrDefault(e => e.Id.ToString() == id);
            if (equipment == null)
                return NotFound();
            db.Remove(equipment);
            db.SaveChanges();
            return new NoContentResult();
        }
    }
}