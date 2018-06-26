using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnet_mysql_application.Models;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace dotnet_mysql_application.Controllers
{
    [Authorize(Policy = "ApiUser")]
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
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public IActionResult GetLoanById(string id)
        {
            var loan = db.Loans.Single(e => e.Id.ToString() == id);
            if (loan == null)
                return NotFound();
            return new OkObjectResult(loan);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public IActionResult GetAllLoans()
        {
            var loans = db.Loans.ToList();
            if (loans == null)
                return NotFound();
            return new OkObjectResult(loans);
        }

        [HttpPost]
        [ProducesResponseType(201, Type = typeof(Loan))]
        [ProducesResponseType(400)]
        public IActionResult AddLoan([FromBody] NewLoan newLoan)
        {
            Console.WriteLine("received loan POST: " + newLoan.ToString());
            if (true) {
                var targetItem = db.Item.SingleOrDefault(i => i.Id.ToString() == newLoan.id);
                var loan = new Loan();
                loan.Item = targetItem;
                targetItem.IsAvailable = false;
                db.Item.Update(targetItem);
                var identity = User.Identity as ClaimsIdentity;
                loan.UserId = Guid.Parse(identity.Claims.FirstOrDefault(c => c.Type == "id")?.Value);
                // TODO: Save a user object to this
                loan.User = identity.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
                loan.StartDate = DateTime.Now;
                loan.EndDate = loan.StartDate + new TimeSpan(14, 0, 0, 0);
                db.Loans.Add(loan);
                db.SaveChanges();
                return CreatedAtAction(nameof(GetLoanById), new { id = loan.Id },  loan);
            }
            else
                return BadRequest();
        }

        // [HttpPut("{id}")]
        // [ProducesResponseType(200)]
        // [ProducesResponseType(400)]
        // public IActionResult UpdateLoan(string id, [FromBody] Loan loan)
        // {
        //     var targetLoan = db.Loans.SingleOrDefault(e => e.Id.ToString() == id);
        //     if (targetLoan == null)
        //         return NotFound();
        //     else if(ModelState.IsValid) {
        //         targetLoan.ItemId = loan.Id;
        //         targetLoan.Item = loan.Item;
        //         targetLoan.UserId = loan.Id;
        //         targetLoan.User = loan.User;
        //         db.Loans.Update(targetLoan);
        //         db.SaveChanges();
        //         return Ok(loan);
        //     }
        //     else
        //         return BadRequest();
        // }

        // [HttpDelete("{id}")]
        // [ProducesResponseType(204)]
        // [ProducesResponseType(400)]
        // public IActionResult DeleteLoan(string id)
        // {
        //     var loan = db.Loans.SingleOrDefault(e => e.Id.ToString() == id);
        //     if (loan == null)
        //         return NotFound();
        //     db.Remove(loan);
        //     db.SaveChanges();
        //     return new NoContentResult();
        // }
    }
}