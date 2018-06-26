using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace dotnet_mysql_application.Models
{
    public partial class LoanSystemContext : IdentityDbContext<LoanSystemUser>
    {
        public LoanSystemContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Item> Item { get; set; }

        //public DbSet<User> Users { get; set; }

        public DbSet<Loan> Loans { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Item>()
                .Property(i => i.IsAvailable)
                .HasDefaultValue(true);
        }

        //public DbSet<Role> Roles { get; set; }
    }
}
