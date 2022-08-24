using AutoMapper;
using PhoneBookAPI.Core.Contracts;
using PhoneBookAPI.Core.Entities;
using PhoneBookAPI.Core.Model;

namespace PhoneBookAPI.Infrastructure.Services
{
    public class ContactService
    {
        private readonly IMapper _mapper;
        private readonly IContactRepository _contactRepository;
        private readonly IContactNumberRepository _contactNumberRepository;

        public ContactService(IMapper mapper, IContactRepository contactRepository, IContactNumberRepository contactNumberRepository)
        {
            _mapper = mapper;
            _contactRepository = contactRepository;
            _contactNumberRepository = contactNumberRepository;
        }

        public async Task<int?> CreateContact(CreateContactInput input)
        {
            var contact = _mapper.Map<Contact>(input);
            var insertedContact = await _contactRepository.InsertContact(contact);

            if (insertedContact.HasValue)
            {
                foreach(var phoneNumber in input.PhoneNumbers)
                {
                    var number = _mapper.Map<ContactNumber>(phoneNumber);
                    await _contactNumberRepository.InsertContactNumber(number);
                }                
            }

            return insertedContact.Value;
        }
    }
}
