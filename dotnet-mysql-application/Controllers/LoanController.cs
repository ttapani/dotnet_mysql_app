using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnet_mysql_application.Models;

namespace dotnet_mysql_application.Controllers
{
    [Route("api/v1/[controller]")]
    [Produces("application/json")]
    public class LoanController : Controller
    {
        private readonly LoanSystemContext db;

        public LoanController(LoanSystemContext context)
        {
            db = context;
        }

        [HttpGet("{id}")]
        public IActionResult Loan(string id)
        {
            var loan = db.Loans.Single(l => l.Id.ToString() == id);
            if (loan == null)
                return NotFound();
            return new OkObjectResult(loan);
        }

        [HttpGet]
        public IActionResult Loan()
        {
            var loans = db.Loans.ToList();
            if (loans == null)
                return NotFound();
            return new OkObjectResult(loans);
        }
    }
}