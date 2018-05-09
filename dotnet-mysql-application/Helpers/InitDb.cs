using System;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using dotnet_mysql_application.Models;

namespace dotnet_mysql_application.Helpers
{
    public static class InitDb
    {
        public static void InitializeDatabase(IWebHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                try
                {
                    var db = services.GetService<LoanSystemContext>();
                    db.Database.EnsureCreatedAsync();
                }
                catch (Exception ex)
                {
                    Console.Write("An error has occured while initializing database: " + ex);
                }
            }
        }
    }
}
