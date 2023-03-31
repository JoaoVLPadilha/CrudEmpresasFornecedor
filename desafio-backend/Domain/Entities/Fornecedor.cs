using DesafioBackend.Data;
using System;
using System.Collections.Generic;

namespace DesafioBackend.Domain.Entities
{
    public class Fornecedor : BaseEntity
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string RG { get; set; }
        public string CPF { get; set; }
        public string CNPJ { get; set; }
        public string CEP { get; set; }
        public string Email { get; set; }
        public DateTime? DataNascimento { get; set; }
        public string TipoFornecedor { get; set; }
        public List<Empresa> Empresas { get; set; }
    }
}
