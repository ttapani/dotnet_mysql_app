using dotnet_mysql_application.Models;
using Bogus;
using System;

namespace dotnet_mysql_application.Helpers
{

    public class SeedDB
    {
        private readonly LoanSystemContext db;
        public SeedDB(LoanSystemContext context)
        {
            db = context;
        }
        public void FakeItems(int count)
        {
            var itemFaker = new Faker<Item>()
                .RuleFor(i => i.Name, f => f.Commerce.ProductName());
            
            for (var i = 0; i < count; i++) {
                var item = itemFaker.Generate();
                db.Item.Add(item);
            }
            db.SaveChanges();
        }
    }
}