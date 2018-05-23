using dotnet_mysql_application.Models;
using AutoMapper;
 
namespace dotnet_mysql_application.ViewModels.Mappings
{
    public class ViewModelToEntityMappingProfile : Profile
    {
        public ViewModelToEntityMappingProfile()
        {
            CreateMap<RegistrationViewModel, LoanSystemUser>().ForMember(au => au.UserName, map => map.MapFrom(vm => vm.Email));
        }
    }
}