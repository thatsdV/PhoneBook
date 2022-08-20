using FluentValidation;
using PhoneBookAPI.Application.DTOs;
using System.Net;

namespace PhoneBookAPI.Application.Commands.GetContactById
{
    public class GetContactByIdCommandValidator : AbstractValidator<GetContactByIdRequest>
    {
        public GetContactByIdCommandValidator()
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
