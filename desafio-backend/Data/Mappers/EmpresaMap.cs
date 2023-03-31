using Dapper.FluentMap.Dommel.Mapping;
using DesafioBackend.Domain.Entities;

namespace DesafioBackend.Data.Mappers
{
    public class EmpresaMap : DommelEntityMap<Empresa>
    {
        public EmpresaMap()
        {
            ToTable("EMPRESA");

            Map(x => x.Id).ToColumn("ID_EMPRESA").IsKey().IsIdentity();
            Map(x => x.NomeFantasia).ToColumn("NOME_FANTASIA", caseSensitive: false);
            Map(x => x.Fornecedores).Ignore();
        }
    }
}
