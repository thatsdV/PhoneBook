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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(bool))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetContactGroups([FromQuery] string request)
        {
            var contacts = await _mediator.Send(request);
            return Ok(contacts);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetContactGroupById(string request)
        {
            var contact = await _mediator.Send(request);
            return Ok(contact);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateContactGroup([FromBody] string request)
        {
            var createdUser = await _mediator.Send(request);
            return CreatedAtAction(nameof(GetContactGroupById), createdUser, request);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(bool))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateContactGroup([FromQuery] string request)
        {
            return Ok(await _mediator.Send(request));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(bool))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteContactGroup(string request)
        {
            return Ok(await _mediator.Send(request));
        }

        [HttpPut("{id}/contact")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(bool))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddContactToContactGroup([FromQuery] string request)
        {
            return Ok(await _mediator.Send(request));
        }

        [HttpDelete("{id}/contact")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(bool))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RemoveContactFromContactGroup([FromQuery] string request)
        {
            return Ok(await _mediator.Send(request));
        }
    }
}
