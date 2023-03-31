using DesafioBackend.Domain.Entities;
using DesafioBackend.Domain.Interfaces.Reposities;
using Microsoft.Extensions.Configuration;

namespace DesafioBackend.Data.Repositories
{
    public class RepositoryContrato : RepositoryBase<Contrato>, IRepositoryContrato
    {
        public RepositoryContrato(IConfiguration configuration) : base(configuration)
        {
        }
    }
}
