using AutoMapper;
using PhoneBookAPI.Application.DTOs;
using PhoneBookAPI.Core.Entities;

namespace PhoneBookAPI.Application.Mappers
{
    public class GetContactByIdProfile : Profile
    {
        public GetContactByIdProfile()
        {
            CreateMap<Contact, GetContactByIdResponse>();

            CreateMap<ContactNumber, PhoneNumber>();
        }
    }
}
