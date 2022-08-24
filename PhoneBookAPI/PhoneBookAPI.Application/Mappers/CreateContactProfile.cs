using AutoMapper;
using PhoneBookAPI.Application.DTOs;
using PhoneBookAPI.Core.Entities;
using PhoneBookAPI.Core.Model;

namespace PhoneBookAPI.Application.Mappers
{
    public class CreateContactProfile : Profile
    {
        public CreateContactProfile()
        {
            CreateMap<CreateContactRequest, CreateContactInput>();

            CreateMap<CreateContactInput, Contact>();

            CreateMap<PhoneNumber, ContactNumber>();
        }
    }
}
