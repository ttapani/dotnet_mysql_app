// using System.Linq;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using dotnet_mysql_application.Models;
// using Microsoft.AspNetCore.Authorization;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Authentication;

// namespace dotnet_mysql_application.Controllers
// {
//     [Authorize(Policy = "ApiUser")]
//     [Route("api/v1/[controller]")]
//     [Produces("application/json")]
//     public class UserController : Controller
//     {
//         private readonly LoanSystemContext db;

//         public UserController(LoanSystemContext context)
//         {
//             db = context;
//         }

//         [HttpGet]
//         [ProducesResponseType(200)]
//         [ProducesResponseType(404)]
//         public async Task<IActionResult> GetCurrentUser()
//         {
//             string accessToken = await HttpContext.GetTokenAsync("access_token");
//             var user = await db.Users.FirstOrDefaultAsync(e => e. == id);
//             if (user == null)   
//                 return NotFound();
//             return new OkObjectResult(user);
//         }

        // [HttpGet("{id}")]
        // [ProducesResponseType(200)]
        // [ProducesResponseType(404)]
        // public IActionResult GetUserById(string id)
        // {
        //     var user = db.Users.SingleOrDefault(u => u.Id.ToString() == id);
        //     if (user == null)
        //         return NotFound();
        //     return new OkObjectResult(user);
        // }

        // [HttpGet]
        // [ProducesResponseType(200)]
        // [ProducesResponseType(404)]
        // public IActionResult GetAllUsers()
        // {
        //     var users = db.Users.ToList();
        //     if (users == null)
        //         return NotFound();
        //     return new OkObjectResult(users);
        // }

        // [HttpPost]
        // [ProducesResponseType(201, Type = typeof(User))]
        // [ProducesResponseType(400)]
        // public IActionResult AddUser([FromBody] User user)
        // {
        //     if(ModelState.IsValid) {
        //         db.Users.Add(user);
        //         db.SaveChanges();
        //         return CreatedAtAction(nameof(GetUserById), new { id = user.Id },  user);
        //     }
        //     else
        //     return BadRequest();
        // }

        // [HttpPut("{id}")]
        // [ProducesResponseType(200)]
        // [ProducesResponseType(400)]
        // public IActionResult UpdateUser(string id, [FromBody] User user)
        // {
        //     var targetUser = db.Users.SingleOrDefault(u => u.Id.ToString() == id);
        //     if (targetUser == null)
        //         return NotFound();
        //     else if(ModelState.IsValid) {
        //         targetUser.Name = user.Name;
        //         db.Users.Update(targetUser);
        //         db.SaveChanges();
        //         return Ok(user);
        //     }
        //     else
        //         return BadRequest();
        // }

        // [HttpDelete("{id}")]
        // [ProducesResponseType(204)]
        // [ProducesResponseType(400)]
        // public IActionResult DeleteUser(string id)
        // {
        //     var user = db.Users.SingleOrDefault(u => u.Id.ToString() == id);
        //     if (user == null)
        //         return NotFound();
        //     db.Remove(user);
        //     db.SaveChanges();
        //     return new NoContentResult();
        // }
//     }
// }