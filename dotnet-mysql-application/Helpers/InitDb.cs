using System;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using dotnet_mysql_application.Models;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using dotnet_mysql_application.ViewModels;

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
                    if(env.IsDevelopment()) {
                        Console.WriteLine("We are in dev, init DB here");
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
                            FirstName = "matti",
                            LastName = "meikäläinen",
                            Email = "matti@testi.org",
                            Password = "salainen"
                        };
                        var userIdentity = mapper.Map<LoanSystemUser>(testuser);
                        var result = userManager.CreateAsync(userIdentity, testuser.Password);
                        Console.WriteLine("Initialized test user with attributes: matti@testi.org, salainen");
                        var faker = new SeedDB(db);
                        faker.FakeItems(20);
                        Console.WriteLine("Added fake items to db");
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
