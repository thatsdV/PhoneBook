using AutoMapper;
using PhoneBookAPI.Application.DTOs;
using PhoneBookAPI.Core.Model;

namespace PhoneBookAPI.Application.Mappers
{
    public class UpdateContactProfile : Profile
    {
        public UpdateContactProfile()
        {
            CreateMap<UpdateContactRequest, UpdateContactInput>();
        }
    }
}
