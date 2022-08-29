using AutoMapper;
using PhoneBookAPI.Core.Entities;
using PhoneBookAPI.Core.Model;
using PhoneBookAPI.Infrastructure.Repositories.DAO;

namespace PhoneBookAPI.Infrastructure.Mappers
{
    public class CreateContactProfile : Profile
    {
        public CreateContactProfile()
        {
            CreateMap<CreateContactInput, ContactDAO>()
                .ForMember(dest => dest.PhoneNumbers, opt => opt.Ignore())
                .ForMember(dest => dest.Photo, opt => opt.Ignore());

            CreateMap<ContactNumber, ContactNumberDAO>();
        }
    }
}
