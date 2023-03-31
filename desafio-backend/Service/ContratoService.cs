using DesafioBackend.Domain.Entities;
using DesafioBackend.Domain.Interfaces.Reposities;
using DesafioBackend.Domain.Interfaces.Services;
using System.Linq;

namespace DesafioBackend.Service
{
    public class ContratoService : IContratoService
    {
        private readonly IRepositoryEmpresa _empresaRepository;
        private readonly IRepositoryFornecedor _repositoryFornecedor;
        private readonly IRepositoryContrato _repositoryContrato;

        public ContratoService(IRepositoryEmpresa empresaRepository,
            IRepositoryFornecedor repositoryFornecedor,
            IRepositoryContrato repositoryContrato)
        {
            _empresaRepository = empresaRepository;
            _repositoryFornecedor = repositoryFornecedor;
            _repositoryContrato = repositoryContrato;
        }

        public void InsertEmpresaContract(Fornecedor fornecedor)
        {
            var idFornecedor = fornecedor.Id;
            foreach (var empresa in fornecedor.Empresas)
            {
                // Empresa já existe na base
                if (empresa.Id > 0)
                {
                    var contrato = _repositoryContrato.GetList(x => x.IdEmpresa == empresa.Id && x.IdFornecedor == idFornecedor)
                       .FirstOrDefault();

                    if (contrato == null)
                    {
                        var novoContrato = new Contrato
                        {
                            IdEmpresa = empresa.Id,
                            IdFornecedor = idFornecedor,
                        };

                        _repositoryContrato.Insert(ref novoContrato);
                    }
                }
                else
                {
                    var novaEmpresa = empresa;
                    _empresaRepository.Insert(ref novaEmpresa);

                    var novoContrato = new Contrato
                    {
                        IdEmpresa = empresa.Id,
                        IdFornecedor = idFornecedor,
                    };

                    _repositoryContrato.Insert(ref novoContrato);
                }
            }
        }

        public void InsertFornecedorContract(Empresa empresa)
        {
            var idEmpresa = empresa.Id;
            foreach (var fornecedor in empresa.Fornecedores)
            {
                // Fornecedor já existe na base
                if (fornecedor.Id > 0)
                {
                    var contrato = _repositoryContrato.GetList(x => x.IdEmpresa == idEmpresa && x.IdFornecedor == fornecedor.Id)
                       .FirstOrDefault();

                    if (contrato == null)
                    {
                        var novoContrato = new Contrato
                        {
                            IdEmpresa = idEmpresa,
                            IdFornecedor = fornecedor.Id,
                        };

                        _repositoryContrato.Insert(ref novoContrato);
                    }
                }
                else
                {
                    var novoFornecedor = fornecedor;
                    _repositoryFornecedor.Insert(ref novoFornecedor);

                    var novoContrato = new Contrato
                    {
                        IdEmpresa = idEmpresa,
                        IdFornecedor = novoFornecedor.Id,
                    };

                    _repositoryContrato.Insert(ref novoContrato);
                }
            }
        }
    }
}
