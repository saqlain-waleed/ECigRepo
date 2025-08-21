using System.Threading.Tasks;
using Abp.Application.Services;
using ECig.Sessions.Dto;

namespace ECig.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
