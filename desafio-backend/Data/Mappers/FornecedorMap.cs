using Dapper.FluentMap.Dommel.Mapping;
using DesafioBackend.Domain.Entities;

namespace DesafioBackend.Data.Mappers
{
    public class FornecedorMap : DommelEntityMap<Fornecedor>
    {
        public FornecedorMap()
        {
            ToTable("FORNECEDOR");

            Map(x => x.Id).ToColumn("ID_FORNECEDOR").IsKey().IsIdentity();
            Map(x => x.DataNascimento).ToColumn("DATA_NASCIMENTO", caseSensitive: false);
            Map(x => x.TipoFornecedor).ToColumn("TIPO_FORNECEDOR", caseSensitive: false);
            Map(x => x.Empresas).Ignore();
        }
    }
}
