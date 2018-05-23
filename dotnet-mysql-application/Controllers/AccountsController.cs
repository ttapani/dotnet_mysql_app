using Microsoft.AspNetCore.Mvc;
using dotnet_mysql_application.Helpers;
using dotnet_mysql_application.Models;
using dotnet_mysql_application.ViewModels;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace dotnet_mysql_application.Controllers
{
    [Route("api/[controller]")]
    public class AccountsController : Controller
    {
        private readonly LoanSystemContext _dbContext;
        private readonly UserManager<LoanSystemUser> _userManager;
        private readonly IMapper _mapper;

        public AccountsController(LoanSystemContext dbContext, UserManager<LoanSystemUser> userManager, IMapper mapper)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<IActionResult> Post([FromBody] RegistrationViewModel model)
        {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            var userIdentity = _mapper.Map<LoanSystemUser>(model);

            var result = await _userManager.CreateAsync(userIdentity, model.Password);
            
            if(!result.Succeeded) {
                return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));
            }

            await _dbContext.SaveChangesAsync();

            return new OkObjectResult("Account created");
        }
    }
}