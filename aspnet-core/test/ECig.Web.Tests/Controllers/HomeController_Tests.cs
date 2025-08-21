using System.Threading.Tasks;
using ECig.Models.TokenAuth;
using ECig.Web.Controllers;
using Shouldly;
using Xunit;

namespace ECig.Web.Tests.Controllers
{
    public class HomeController_Tests: ECigWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}