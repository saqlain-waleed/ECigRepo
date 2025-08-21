using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using ECig.Authorization.Roles;
using ECig.Authorization.Users;
using ECig.MultiTenancy;

namespace ECig.EntityFrameworkCore
{
    public class ECigDbContext : AbpZeroDbContext<Tenant, Role, User, ECigDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public ECigDbContext(DbContextOptions<ECigDbContext> options)
            : base(options)
        {
        }
    }
}
