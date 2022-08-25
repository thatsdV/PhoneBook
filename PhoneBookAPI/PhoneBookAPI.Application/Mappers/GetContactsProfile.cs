using AutoMapper;
using PhoneBookAPI.Application.DTOs;
using PhoneBookAPI.Core.Entities;
using PhoneBookAPI.Core.Model;

namespace PhoneBookAPI.Application.Mappers
{
    public class GetContactsProfile : Profile
    {
        public GetContactsProfile()
        {
            CreateMap<GetContactsRequest, GetContactsInput>();

            CreateMap<Contact, GetContactsResponse>();
        }
    }
}
