using Abp.Domain.Entities.Auditing;
using ECig.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_Cig.Models
{
    public class Brand : FullAuditedEntity<Guid>
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