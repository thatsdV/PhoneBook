using AutoMapper;
using PhoneBookAPI.Core.Entities;
using PhoneBookAPI.Infrastructure.Repositories.DAO;

namespace PhoneBookAPI.Infrastructure.Mappers
{
    public class GetContactsProfile : Profile
    {
        public GetContactsProfile()
        {
            CreateMap<ContactDAO, Contact>();
        }
    }
}
