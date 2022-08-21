using AutoMapper;
using PhoneBookAPI.Application.DTOs;
using PhoneBookAPI.Core.Entities;

namespace PhoneBookAPI.Application.Mappers
{
    public class GetContactsProfile : Profile
    {
        public GetContactsProfile()
        {
            CreateMap<Contact, GetContactsResponse>();
        }
    }
}
