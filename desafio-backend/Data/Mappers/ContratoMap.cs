using Dapper.FluentMap.Dommel.Mapping;
using DesafioBackend.Domain.Entities;

namespace DesafioBackend.Data.Mappers
{
    public class ContratoMap : DommelEntityMap<Contrato>
    {
        public ContratoMap()
        {
            ToTable("CONTRATO");

            Map(x => x.Id).ToColumn("ID_CONTRATO").IsKey().IsIdentity();
            Map(x => x.IdEmpresa).ToColumn("ID_EMPRESA");
            Map(x => x.IdFornecedor).ToColumn("ID_FORNECEDOR");
        }
    }
}
