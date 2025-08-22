using Abp.Zero.EntityFrameworkCore;
using E_Cig.Models;
using ECig.Authorization.Roles;
using ECig.Authorization.Users;
using ECig.MultiTenancy;
using Microsoft.EntityFrameworkCore;

namespace ECig.EntityFrameworkCore
{
    public class ECigDbContext : AbpZeroDbContext<Tenant, Role, User, ECigDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Brand> Brands { get; set; }
        public ECigDbContext(DbContextOptions<ECigDbContext> options)
            : base(options)
        {
        }
    }
}
