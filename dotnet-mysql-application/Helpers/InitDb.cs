using System;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using dotnet_mysql_application.Models;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using dotnet_mysql_application.ViewModels;
using Newtonsoft.Json;
using Microsoft.Extensions.Logging;

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
                    var userManager = services.GetService<UserManager<LoanSystemUser>>();
                    var mapper = services.GetService<IMapper>();
                    var logger = services.GetService<ILoggerFactory>().CreateLogger("Init");
                    if(env.IsDevelopment()) {
                        logger.LogInformation("We are in dev, init DB here");
                        db.Database.EnsureDeleted();
                        db.Database.EnsureCreated();
                        // Console.WriteLine("Initializing roles..");
                        // var roles = new Role []
                        // {
                        //     new Role{Description="admin"},
                        //     new Role{Description="user"}
                        // };
                        // foreach (Role r in roles) {
                        //     db.Roles.Add(r);
                        // }
                        //db.SaveChanges();
                        var testuser = new RegistrationViewModel {
                            FirstName = "test",
                            LastName = "user",
                            Email = "test@example.com",
                            Password = "password"
                        };
                        var userIdentity = mapper.Map<LoanSystemUser>(testuser);
                        var result = userManager.CreateAsync(userIdentity, testuser.Password);
                        logger.LogInformation("Initialized test user with attributes: " + JsonConvert.SerializeObject(testuser));
                        var faker = new SeedDB(db);
                        faker.FakeItems(20);
                        logger.LogInformation("Added fake items to db");
                    } else {
                        logger.LogInformation("We are in production, just seed the db");
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
