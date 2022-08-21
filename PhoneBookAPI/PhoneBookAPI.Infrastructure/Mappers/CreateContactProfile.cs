using AutoMapper;
using PhoneBookAPI.Core.Entities;
using PhoneBookAPI.Infrastructure.Repositories.DAO;

namespace PhoneBookAPI.Infrastructure.Mappers
{
    public class CreateContactProfile : Profile
    {
        public CreateContactProfile()
        {
            CreateMap<Contact, ContactDAO>();
        }
    }
}
