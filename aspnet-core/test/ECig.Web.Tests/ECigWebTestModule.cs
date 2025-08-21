using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ECig.EntityFrameworkCore;
using ECig.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace ECig.Web.Tests
{
    [DependsOn(
        typeof(ECigWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class ECigWebTestModule : AbpModule
    {
        public ECigWebTestModule(ECigEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ECigWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(ECigWebMvcModule).Assembly);
        }
    }
}