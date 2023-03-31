using Dapper;
using DesafioBackend.Domain.Entities;
using DesafioBackend.Domain.Interfaces.Reposities;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace DesafioBackend.Data.Repositories
{
    public class RepositoryEmpresa : RepositoryBase<Empresa>, IRepositoryEmpresa
    {
        public RepositoryEmpresa(IConfiguration configuration) : base(configuration)
        {
        }

        public Empresa GetByIdWithContracts(int id)
        {
            var empresa = GetById(id);

            const string sql = @"SELECT F.*
                FROM FORNECEDOR F
                INNER JOIN CONTRATO AS C ON C.ID_FORNECEDOR = F.ID_FORNECEDOR
                INNER JOIN EMPRESA AS E ON E.ID_EMPRESA = C.ID_EMPRESA
                WHERE E.ID_EMPRESA = @id;";

            using (var db = new SqlConnection(ConnectionString))
            {
                var fornecedores = db.Query<Fornecedor>(sql, param: new { id });
                empresa.Fornecedores = fornecedores?.ToList();
            }

            return empresa;
        }
    }
}
