using MediatR;

namespace PhoneBookAPI.Application.DTOs
{
    public class DeleteContactRequest : IRequest<bool>
    {
        public int Id { get; set; }
    }
}
