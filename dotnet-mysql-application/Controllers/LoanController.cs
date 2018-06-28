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
            // Get current user..
            var identity = User.Identity as ClaimsIdentity;
            var userId = Guid.Parse(identity.Claims.FirstOrDefault(c => c.Type == "id")?.Value);
            // Return loans associated with the current user
            var loans = db.Loans.Include(loan => loan.Item).Where(l => l.UserId == userId).ToList();
            // If user was an admin, we'd have to figure out how to return all records
            if (loans == null) {
                return NotFound();
            } 
            else {
                // loans.ForEach(l => l.Item = db.Item.First(i => i.Id == l.ItemId));
            }
            return new OkObjectResult(loans);
        }

        [HttpPost]
        [ProducesResponseType(201, Type = typeof(Loan))]
        [ProducesResponseType(400)]
        public IActionResult AddLoan([FromBody] NewLoan newLoan)
        {
            Console.WriteLine("received loan POST: " + newLoan.ToString());
            if (ModelState.IsValid) {
                var targetItem = db.Item.SingleOrDefault(i => i.Id.ToString() == newLoan.id);
                var loan = new Loan();
                loan.Item = targetItem;
                targetItem.IsAvailable = false;
                db.Item.Update(targetItem);
                var identity = User.Identity as ClaimsIdentity;
                loan.UserId = Guid.Parse(identity.Claims.FirstOrDefault(c => c.Type == "id")?.Value);
                // TODO: Save a user object to this
                loan.User = identity.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
                loan.StartDate = DateTime.Today;
                loan.EndDate = loan.StartDate + new TimeSpan(14, 0, 0, 0);
                loan.Active = true;
                db.Loans.Add(loan);
                db.SaveChanges();
                return CreatedAtAction(nameof(GetLoanById), new { id = loan.Id },  loan);
            }
            else
                return BadRequest();
        }

        [HttpPut("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public IActionResult ReturnLoan(string id, [FromBody] ReturnedLoan loan)
        {
            var returnedLoan = db.Loans.SingleOrDefault(r => r.Id.ToString() == id);
            if (returnedLoan == null)
                return NotFound();
            else if(ModelState.IsValid) {
                returnedLoan.Active = false;
                returnedLoan.ReturnDate = DateTime.Now;
                db.Loans.Update(returnedLoan);
                var returnedItem = db.Item.FirstOrDefault(i => i.Id.Equals(returnedLoan.ItemId));
                returnedItem.IsAvailable = true;
                db.SaveChanges();
                return Ok(returnedLoan);
            }
            else
                return BadRequest();
        }

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