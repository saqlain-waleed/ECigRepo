using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ECig.Authorization;

namespace ECig
{
    [DependsOn(
        typeof(ECigCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class ECigApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<ECigAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(ECigApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
