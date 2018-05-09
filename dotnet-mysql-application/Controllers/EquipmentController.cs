using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnet_mysql_application.Models;

namespace dotnet_mysql_application.Controllers
{
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
        public IActionResult Equipment(string id)
        {
            var equipment = db.Equipments.Single(e => e.Id.ToString() == id);
            if (equipment == null)
                return NotFound();
            return new OkObjectResult(equipment);
        }

        [HttpGet]
        public IActionResult Equipment()
        {
            var equipments = db.Equipments.ToList();
            if (equipments == null)
                return NotFound();
            return new OkObjectResult(equipments);
        }
    }
}