using Dapper;
using DesafioBackend.Domain.Entities;
using DesafioBackend.Domain.Interfaces.Reposities;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Linq;

namespace DesafioBackend.Data.Repositories
{
    public class RepositoryFornecedor : RepositoryBase<Fornecedor>, IRepositoryFornecedor
    {
        public RepositoryFornecedor(IConfiguration configuration) : base(configuration)
        {
        }

        public Fornecedor GetByIdWithContracts(int id)
        {
            var fornecedor = GetById(id);

            const string sql = @"SELECT E.*
                FROM EMPRESA E
                INNER JOIN CONTRATO AS C ON C.ID_EMPRESA = E.ID_EMPRESA
                INNER JOIN FORNECEDOR AS F ON F.ID_FORNECEDOR = C.ID_FORNECEDOR
                WHERE F.ID_FORNECEDOR = @id;";

            using (var db = new SqlConnection(ConnectionString))
            {
                var empresas = db.Query<Empresa>(sql, param: new { id });
                fornecedor.Empresas = empresas.ToList();
            }

            return fornecedor;
        }
    }
}
