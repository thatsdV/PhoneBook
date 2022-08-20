using FluentValidation;
using PhoneBookAPI.Application.DTOs;
using System.Net;

namespace PhoneBookAPI.Application.Commands.GetContacts
{
    public class GetContactsCommandValidator : AbstractValidator<GetContactsRequest>
    {
        public GetContactsCommandValidator()
        {
            RuleFor(request => request)
                .NotEmpty()
                .NotNull()
                .WithErrorCode(HttpStatusCode.BadRequest.ToString());
        }
    }
}
