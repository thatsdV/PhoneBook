using FluentValidation;
using PhoneBookAPI.Application.DTOs;
using System.Net;

namespace PhoneBookAPI.Application.Commands.DeleteContact
{
    public class DeleteContactCommandValidator : AbstractValidator<DeleteContactRequest>
    {
        public DeleteContactCommandValidator()
        {
            RuleFor(request => request)
                .NotEmpty()
                .NotNull()
                .WithErrorCode(HttpStatusCode.BadRequest.ToString());

            RuleFor(request => request.Id)
                .NotEmpty()
                .NotNull()
                .WithMessage("Id field is mandatory")
                .WithErrorCode(HttpStatusCode.BadRequest.ToString());
        }
    }
}
