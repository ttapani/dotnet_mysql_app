using FluentValidation.Attributes;
using dotnet_mysql_application.ViewModels.Validations;

namespace dotnet_mysql_application.ViewModels
{
    [Validator(typeof(CredentialsViewModelValidator))]
    public class CredentialsViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}