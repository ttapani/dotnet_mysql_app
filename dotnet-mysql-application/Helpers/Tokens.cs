using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using dotnet_mysql_application.Auth;
using dotnet_mysql_application.Models;
using Newtonsoft.Json;

namespace dotnet_mysql_application.Helpers
{
    public class Tokens
    {
        public static async Task<string> GenerateJwt(ClaimsIdentity identity, IJwtFactory jwtFactory, string userName, JwtIssuerOptions jwtoptions, JsonSerializerSettings jsonSerialiazerSettings)
        {
            var response = new
            {
                id = identity.Claims.Single(c => c.Type == "id").Value,
                auth_token = await jwtFactory.GenerateEncodedToken(userName, identity),
                expires_in = (int)jwtoptions.ValidFor.TotalSeconds
            };

            return JsonConvert.SerializeObject(response, jsonSerialiazerSettings);
        }
    }
}