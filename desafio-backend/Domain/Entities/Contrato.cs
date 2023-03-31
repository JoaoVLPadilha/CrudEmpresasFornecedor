using DesafioBackend.Data;

namespace DesafioBackend.Domain.Entities
{
    public class Contrato : BaseEntity
    {
        public int Id { get; set; }
        public int IdEmpresa { get; set; }
        public int IdFornecedor { get; set; }
    }
}
