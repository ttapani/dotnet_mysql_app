using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnet_mysql_application.Models;

namespace dotnet_mysql_application.Controllers
{
    [Route("api/v1/[controller]")]
    [Produces("application/json")]
    public class UserController : Controller
    {
        private readonly LoanSystemContext db;

        public UserController(LoanSystemContext context)
        {
            db = context;
        }

        [HttpGet("{id}")]
        new public IActionResult User(string id)
        {
            var user = db.Users.Single(u => u.Id.ToString() == id);
            if (user == null)
                return NotFound();
            return new OkObjectResult(user);
        }

        [HttpGet]
        new public IActionResult User()
        {
            var users = db.Users.ToList();
            if (users == null)
                return NotFound();
            return new OkObjectResult(users);
        }
    }
}