using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace dotnet_mysql_application.Models
{
    public class LoanSystemContext : IdentityDbContext<LoanSystemUser>
    {
        public LoanSystemContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Equipment> Equipments { get; set; }

        //public DbSet<User> Users { get; set; }

        public DbSet<Loan> Loans { get; set; }

        //public DbSet<Role> Roles { get; set; }
    }
}
