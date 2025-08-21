using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace ECig.Controllers
{
    public abstract class ECigControllerBase: AbpController
    {
        protected ECigControllerBase()
        {
            LocalizationSourceName = ECigConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
