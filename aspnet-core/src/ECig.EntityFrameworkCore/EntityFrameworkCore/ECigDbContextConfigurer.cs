using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace ECig.EntityFrameworkCore
{
    public static class ECigDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<ECigDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<ECigDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
