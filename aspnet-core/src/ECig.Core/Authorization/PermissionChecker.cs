using Abp.Authorization;
using ECig.Authorization.Roles;
using ECig.Authorization.Users;

namespace ECig.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
