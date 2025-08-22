using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using E_Cig.Models;
using ECig.Brands;
using ECig.Brands.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECig.Brands
{
    public class BrandAppService : AsyncCrudAppService<Brand, GetBrandDto, Guid, PagedBrandResultRequestDto, CreateBrandDto, UpdateBrandDto>, IBrandAppService
    {

        private readonly IRepository<Brand, Guid> _brandRepository;
        public BrandAppService(IRepository<Brand, Guid> repository) : base(repository)
        {
            _brandRepository = repository;
        }

        public override async Task<GetBrandDto> CreateAsync(CreateBrandDto input)
        {
            // Check for duplicate brand name
            if (await _brandRepository.GetAll().AnyAsync(b => b.BrandName.ToLower() == input.BrandName.ToLower()))
            {
                throw new UserFriendlyException("A brand with this name already exists.");
            }

            return await base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<Guid> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<GetBrandDto>> GetAllAsync(PagedBrandResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<GetBrandDto> GetAsync(EntityDto<Guid> input)
        {
            return base.GetAsync(input);
        }

        public override async Task<GetBrandDto> UpdateAsync(UpdateBrandDto input)
        {
            // Check for duplicate brand name (excluding current brand)
            if (await _brandRepository.GetAll().AnyAsync(b =>
                b.Id != input.Id && b.BrandName.ToLower() == input.BrandName.ToLower()))
            {
                throw new UserFriendlyException("A brand with this name already exists.");
            }


            return await base.UpdateAsync(input);
        }

        protected override Task<Brand> GetEntityByIdAsync(Guid id)
        {
            return base.GetEntityByIdAsync(id);
        }
    }
}
