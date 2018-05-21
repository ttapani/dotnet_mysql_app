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
                    var env = services.GetService<IHostingEnvironment>();
                    if(env.IsDevelopment()) {
                        Console.WriteLine("We are in dev, init DB here");
                        db.Database.EnsureDeleted();
                        db.Database.EnsureCreated();
                        Console.WriteLine("Initializing roles..");
                        var roles = new Role []
                        {
                            new Role{Description="admin"},
                            new Role{Description="user"}
                        };
                        foreach (Role r in roles) {
                            db.Roles.Add(r);
                        }
                        db.SaveChanges();
                    } else {
                        Console.WriteLine("We are in production, just seed the db");
                    }
                }
                catch (Exception ex)
                {
                    Console.Write("An error has occured while initializing database: " + ex);
                }
            }
        }
    }
}
