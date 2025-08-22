using Abp.Runtime.Validation;
using ECig.Comman.Dto;

namespace ECig.Brands.Dtos
{
    public class PagedBrandResultRequestDto : PagedAndSortedInputDto, IShouldNormalize
    {
        public string Keyword { get; set; }
        public void Normalize()
        {
            if (string.IsNullOrEmpty(Sorting))
            {
                Sorting = "creationTime desc";
            }

            Keyword = Keyword?.Trim();
        }
    }
}
