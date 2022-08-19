using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PhoneBookAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<string> GetContacts()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("{id}")]
        public string GetContactById(int id)
        {
            return "value";
        }

        [HttpPost]
        public void CreateContact([FromBody] string value)
        {
        }

        [HttpPut("{id}")]
        public void UpdateContact(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void DeleteContact(int id)
        {
        }
    }
}
