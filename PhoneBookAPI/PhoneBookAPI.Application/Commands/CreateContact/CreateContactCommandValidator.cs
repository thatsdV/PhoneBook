using FluentValidation;
using PhoneBookAPI.Application.DTOs;
using System.Net;

namespace PhoneBookAPI.Application.Commands.CreateContact
{
    public class CreateContactCommandValidator : AbstractValidator<CreateContactRequest>
    {
        public CreateContactCommandValidator()
        {
            RuleFor(request => request.FirstName)
                .NotNull()
                .WithMessage("First name field is mandatory")
                .WithErrorCode(HttpStatusCode.BadRequest.ToString());

            RuleFor(request => request.LastName)
                .NotNull()
                .WithMessage("Last name field is mandatory")
                .WithErrorCode(HttpStatusCode.BadRequest.ToString());

            RuleFor(request => request.Email)
                .EmailAddress();
        }
    }
}
