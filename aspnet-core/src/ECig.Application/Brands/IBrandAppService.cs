using Abp.Application.Services;
using ECig.Brands.Dtos;
using System;

namespace ECig.Brands
{
    public interface IBrandAppService : IAsyncCrudAppService<GetBrandDto, Guid, PagedBrandResultRequestDto, CreateBrandDto, UpdateBrandDto>
    {
    }
}
