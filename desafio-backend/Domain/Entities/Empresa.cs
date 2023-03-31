using DesafioBackend.Data;
using System;
using System.Collections.Generic;

namespace DesafioBackend.Domain.Entities
{
    public class Empresa : BaseEntity
    {
        public int Id { get; set; }
        public string NomeFantasia { get; set; }
        public string CNPJ { get; set; }
        public string CEP { get; set; }
        public ICollection<Fornecedor> Fornecedores { get; set; }
    }
}
