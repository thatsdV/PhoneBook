using AutoMapper;
using PhoneBookAPI.Core.Entities;
using PhoneBookAPI.Infrastructure.Repositories.DAO;

namespace PhoneBookAPI.Infrastructure.Mappers
{
    public class GetContactByIdProfile : Profile
    {
        public GetContactByIdProfile()
        {
            CreateMap<ContactDAO, Contact>();
        }
    }
}
