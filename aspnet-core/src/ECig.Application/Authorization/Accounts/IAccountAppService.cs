using System.Threading.Tasks;
using Abp.Application.Services;
using ECig.Authorization.Accounts.Dto;

namespace ECig.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
