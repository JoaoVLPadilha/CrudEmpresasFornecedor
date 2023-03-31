using System.Threading.Tasks;

namespace DesafioBackend.Domain.Interfaces.Services
{
    public interface ICepLaService
    {
        Task<Endereco> GetEndereco(string cep);
    }
}
