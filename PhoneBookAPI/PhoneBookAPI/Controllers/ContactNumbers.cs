using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace PhoneBookAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactNumbers : ControllerBase
    {
        private readonly IMediator _mediator;

        public ContactNumbers(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetContactNumbers()
        {
            //var contacts = await _mediator.Send(request);
            return Ok("");
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateContactNumbers([FromBody] string request)
        {
            var createdNumbers = await _mediator.Send(request);
            return CreatedAtAction(nameof(GetContactNumbers), createdNumbers, request);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(bool))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateContactNumbers([FromQuery] string request)
        {
            return Ok(await _mediator.Send(request));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(bool))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteContact(string request)
        {
            return Ok(await _mediator.Send(request));
        }
    }
}
