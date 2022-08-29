using AutoMapper;
using PhoneBookAPI.Application.DTOs;
using PhoneBookAPI.Core.Entities;
using PhoneBookAPI.Core.Model;

namespace PhoneBookAPI.Application.Mappers
{
    public class GetContactByIdProfile : Profile
    {
        public GetContactByIdProfile()
        {
            CreateMap<GetContactByIdOutput, GetContactByIdResponse>();

            CreateMap<ContactNumber, PhoneNumber>();

            CreateMap<ContactPhoto, Photo>();
        }
    }
}
