using System.Security.Claims;
using System.Threading.Tasks;

namespace dotnet_mysql_application.Auth
{
    public interface IJwtFactory
    {
        Task<string> GenerateEncodedToken(string username, ClaimsIdentity identity);
        ClaimsIdentity GenerateClaimsIdentity(string username, string id);
    }
}