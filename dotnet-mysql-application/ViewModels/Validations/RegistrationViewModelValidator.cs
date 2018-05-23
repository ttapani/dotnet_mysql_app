using FluentValidation;

namespace dotnet_mysql_application.ViewModels.Validations
{
    public class RegistrationViewModelValidator : AbstractValidator<RegistrationViewModel>
    {
        public RegistrationViewModelValidator()
        {
            RuleFor(vm => vm.Email).NotEmpty().WithMessage("Email cannot be empty");
            RuleFor(vm => vm.Password).NotEmpty().WithMessage("Password cannot be empry");
            RuleFor(vm => vm.FirstName).NotEmpty().WithMessage("First name cannot be empty");
            RuleFor(vm => vm.LastName).NotEmpty().WithMessage("Last name cannot be empty");
        }
    }
}