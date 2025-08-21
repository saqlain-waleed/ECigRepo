using System.Threading.Tasks;
using ECig.Configuration.Dto;

namespace ECig.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
