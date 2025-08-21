using System.ComponentModel.DataAnnotations;

namespace ECig.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}