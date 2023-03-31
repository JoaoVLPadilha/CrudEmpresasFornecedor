using DesafioBackend.Domain.Entities;

namespace DesafioBackend.Domain.Interfaces.Reposities
{
    public interface IRepositoryEmpresa : IRepositoryBase<Empresa>
    {
        public Empresa GetByIdWithContracts(int id);
    }
}
