using DesafioBackend.Domain.Entities;

namespace DesafioBackend.Domain.Interfaces.Services
{
    public interface IContratoService
    {
        void InsertFornecedorContract(Empresa empresa);
        void InsertEmpresaContract(Fornecedor fornecedor);
    }
}
