using FluentValidation;
using PhoneBookAPI.Application.DTOs;
using System.Net;

namespace PhoneBookAPI.Application.Commands.UpdateContact
{
    public class UpdateContactCommandValidator : AbstractValidator<UpdateContactRequest>
    {
        public UpdateContactCommandValidator()
        {
            RuleFor(request => request)
                .NotEmpty()
                .NotNull()
                .WithErrorCode(HttpStatusCode.BadRequest.ToString());
        }
    }
}
