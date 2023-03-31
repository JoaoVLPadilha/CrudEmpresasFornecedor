using DesafioBackend.Domain.Entities;
using DesafioBackend.Domain.Interfaces.Reposities;
using DesafioBackend.Domain.Interfaces.Services;
using DesafioBackend.Domain.Validators;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace DesafioBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FornecedorController : ControllerBase
    {
        private readonly IRepositoryFornecedor _repositoryFornecedor;
        private readonly IRepositoryEmpresa _empresaRepository;
        private readonly ICepLaService _cepLaService;
        private readonly IContratoService _contratoService;

        public FornecedorController(IRepositoryFornecedor repositoryFornecedor,
            IContratoService contratoService,
            ICepLaService cepLaService,
            IRepositoryEmpresa empresaRepository)
        {
            _repositoryFornecedor = repositoryFornecedor;
            _contratoService = contratoService;
            _cepLaService = cepLaService;
            _empresaRepository = empresaRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var fornecedores = _repositoryFornecedor.GetAll();
            return Ok(fornecedores);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var empresa = _repositoryFornecedor.GetByIdWithContracts(id);
                return Ok(empresa);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro: {ex.Message}");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Fornecedor fornecedor)
        {
            fornecedor.Id = default(int);

            try
            {
                var fornecedorValidator = new FornecedorValidator(validateEmpresas: true);
                var results = fornecedorValidator.Validate(fornecedor);
                if (!results.IsValid)
                {
                    string allMessages = results.ToString();
                    return BadRequest(allMessages);
                }

                var endereco = _cepLaService.GetEndereco(fornecedor.CEP).Result;
                if (endereco == null)
                    return BadRequest("CEP não encontrado.");

                var empresas = fornecedor.Empresas;

                _repositoryFornecedor.Insert(ref fornecedor);

                if (empresas?.Any() == true)
                {
                    fornecedor.Empresas = empresas;
                    _contratoService.InsertEmpresaContract(fornecedor);
                }

                return CreatedAtAction(nameof(Get), new { id = fornecedor.Id }, fornecedor);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro: {ex.Message}");
            }
        }

        [HttpPut]
        public IActionResult Put([FromBody] Fornecedor fornecedor)
        {
            try
            {
                var fornecedorValidator = new FornecedorValidator(validateId: true);
                var results = fornecedorValidator.Validate(fornecedor);
                if (!results.IsValid)
                {
                    string allMessages = results.ToString();
                    return BadRequest(allMessages);
                }

                var endereco = _cepLaService.GetEndereco(fornecedor.CEP).Result;
                if (endereco == null)
                    BadRequest("CEP não encontrado.");

                var empresas = fornecedor.Empresas;

                _repositoryFornecedor.Update(fornecedor);

                if (empresas?.Any() == true)
                {
                    fornecedor.Empresas = empresas;
                    _contratoService.InsertEmpresaContract(fornecedor);
                }

                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var result = _repositoryFornecedor.Delete(id);
                if (result is false)
                    return Conflict("Não foi possível deletar.");

                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Ocorreu um erro: {ex.Message}");
            }
        }
    }
}