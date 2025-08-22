using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using E_Cig.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace ECig.Brands.Dtos
{
    [AutoMapTo(typeof(Brand))]
    public  class CreateBrandDto 
    {
        [Required]
        [StringLength(50)]
        public string BrandName { get; set; }

        public string Description { get; set; }

        [StringLength(255)]
        public string LogoUrl { get; set; }

        [StringLength(100)]
        public string Website { get; set; }

        public bool IsActive { get; set; } = true;

    }
}
