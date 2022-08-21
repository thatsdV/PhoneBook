using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace PhoneBookAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactGroupController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ContactGroupController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetContactsResponse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetContactGroups([FromQuery] GetContactsRequest request)
        {
            var contacts = await _mediator.Send(request);
            return Ok(contacts);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetContactByIdResponse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetContactGroupById(GetContactByIdRequest request)
        {
            var contact = await _mediator.Send(request);
            return Ok(contact);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateContactGroup([FromBody] CreateContactRequest request)
        {
            var createdUser = await _mediator.Send(request);
            return CreatedAtAction(nameof(GetContactById), createdUser, request);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(bool))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateContactGroup([FromQuery] UpdateContactRequest request)
        {
            return Ok(await _mediator.Send(request));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(bool))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteContactGroup(DeleteContactRequest request)
        {
            return Ok(await _mediator.Send(request));
        }
    }
}
