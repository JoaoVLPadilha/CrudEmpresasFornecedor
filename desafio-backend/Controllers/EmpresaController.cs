using DesafioBackend.Domain.Entities;
using DesafioBackend.Domain.Interfaces.Services;
using DesafioBackend.Domain.Interfaces.Reposities;
using DesafioBackend.Domain.Validators;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using DesafioBackend.Properties;
using DesafioBackend.Utils;

namespace DesafioBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpresaController : ControllerBase
    {
        private readonly IRepositoryEmpresa _empresaRepository;
        private readonly IRepositoryFornecedor _repositoryFornecedor;
        private readonly IContratoService _contratoService;
        private readonly ICepLaService _cepLaService;

        public EmpresaController(ICepLaService cepLaService,
            IRepositoryEmpresa empresaRepository,
            IContratoService contratoService,
            IRepositoryFornecedor repositoryFornecedor)
        {
            _cepLaService = cepLaService;
            _empresaRepository = empresaRepository;
            _contratoService = contratoService;
            _repositoryFornecedor = repositoryFornecedor;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var empresas = _empresaRepository.GetAll();
            return Ok(empresas);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var empresa = _empresaRepository.GetByIdWithContracts(id);
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
        public IActionResult Post([FromBody] Empresa empresa)
        {
            empresa.Id = default(int);

            try
            {
                var empresaValidator = new EmpresaValidator(validateFornecedores: true);
                var results = empresaValidator.Validate(empresa);
                if (!results.IsValid)
                {
                    string allMessages = results.ToString();
                    return BadRequest(allMessages);
                }

                var endereco = _cepLaService.GetEndereco(empresa.CEP).Result;
                if (endereco == null)
                    BadRequest("CEP não encontrado.");

                var fornecedores = empresa.Fornecedores;

                var isFornecedoresEmpty = fornecedores?.Any() == true;
                if (isFornecedoresEmpty)
                {
                    foreach (var fornecedor in fornecedores)
                    {
                        if (fornecedor.TipoFornecedor.Equals(TipoFornecedorConstants.PessoaFisica))
                        {
                            var isValid = EmpresaUtils.ValidateFornecedorAddressAndAge(fornecedor, endereco);
                            if (!isValid)
                                BadRequest("Não permitido cadastro de fornecedor pessoa física menor de idade");
                        }
                    }
                }

                _empresaRepository.Insert(ref empresa);

                if (isFornecedoresEmpty)
                {
                    empresa.Fornecedores = fornecedores;
                    _contratoService.InsertFornecedorContract(empresa);
                }

                return CreatedAtAction(nameof(Get), new { id = empresa.Id }, empresa);
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
        public IActionResult Put([FromBody] Empresa empresa)
        {
            try
            {
                var empresaValidator = new EmpresaValidator(validateId: true);
                var results = empresaValidator.Validate(empresa);
                if (!results.IsValid)
                {
                    string allMessages = results.ToString();
                    return BadRequest(allMessages);
                }

                var endereco = _cepLaService.GetEndereco(empresa.CEP).Result;
                if (endereco == null)
                    BadRequest("CEP não encontrado.");

                var fornecedores = empresa.Fornecedores;

                var isFornecedoresEmpty = fornecedores?.Any() == true;
                if (isFornecedoresEmpty)
                {
                    foreach (var fornecedor in fornecedores)
                    {
                        if (fornecedor.TipoFornecedor.Equals(TipoFornecedorConstants.PessoaFisica))
                        {
                            var isValid = EmpresaUtils.ValidateFornecedorAddressAndAge(fornecedor, endereco);
                            if (!isValid)
                                return BadRequest("Não permitido cadastro de fornecedor pessoa física menor de idade");
                        }
                    }
                }

                _empresaRepository.Update(empresa);

                if (isFornecedoresEmpty)
                {
                    empresa.Fornecedores = fornecedores;
                    _contratoService.InsertFornecedorContract(empresa);
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
                var result = _empresaRepository.Delete(id);
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
