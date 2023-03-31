using DesafioBackend.Domain.Entities;

namespace DesafioBackend.Domain.Interfaces.Reposities
{
    public interface IRepositoryFornecedor : IRepositoryBase<Fornecedor>
    {
        public Fornecedor GetByIdWithContracts(int id);
    }
}
