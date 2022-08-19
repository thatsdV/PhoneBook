using MediatR;

namespace PhoneBookAPI.Application.DTOs
{
    public class UpdateContactRequest : IRequest<bool>
    {
        public int Id { get; set; }
    }
}
