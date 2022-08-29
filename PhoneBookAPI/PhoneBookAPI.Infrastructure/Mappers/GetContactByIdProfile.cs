using AutoMapper;
using PhoneBookAPI.Core.Entities;
using PhoneBookAPI.Core.Model;
using PhoneBookAPI.Infrastructure.Repositories.DAO;

namespace PhoneBookAPI.Infrastructure.Mappers
{
    public class GetContactByIdProfile : Profile
    {
        public GetContactByIdProfile()
        {
            CreateMap<ContactDAO, GetContactByIdOutput>();

            CreateMap<ContactNumber, ContactNumberDAO>();

            CreateMap<ContactPhoto, ContactPhotoDAO>();
        }
    }
}
