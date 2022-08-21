﻿using AutoMapper;
using PhoneBookAPI.Application.DTOs;
using PhoneBookAPI.Core.Entities;

namespace PhoneBookAPI.Application.Mappers
{
    public class CreateContactProfile : Profile
    {
        public CreateContactProfile()
        {
            CreateMap<CreateContactRequest, Contact>();
        }
    }
}
