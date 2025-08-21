using Abp.Application.Services;
using ECig.MultiTenancy.Dto;

namespace ECig.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

