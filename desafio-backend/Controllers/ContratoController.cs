using DesafioBackend.Domain.Entities;
using DesafioBackend.Domain.Interfaces.Reposities;
using DesafioBackend.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace DesafioBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContratoController : ControllerBase
    {
        private readonly IRepositoryContrato _repositoryContrato;

        public ContratoController(IRepositoryContrato repositoryContrato)
        {
            _repositoryContrato = repositoryContrato;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_repositoryContrato.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_repositoryContrato.GetById(id));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return Ok(_repositoryContrato.Delete(id));
        }
    }
}
