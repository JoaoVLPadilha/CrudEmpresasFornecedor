using DesafioBackend.Domain;
using DesafioBackend.Domain.Entities;
using System;

namespace DesafioBackend.Utils
{
    public static class EmpresaUtils
    {
        public static bool ValidateFornecedorAddressAndAge(Fornecedor fornecedor, Endereco endereco)
        {
            var dataNascimento = fornecedor.DataNascimento.Value;
            var idade = DateTime.Now.Year - dataNascimento.Year;

            if (dataNascimento > DateTime.Now.AddYears(-idade))
                idade--;

            return endereco.UF.Equals("PR") && idade < 18 is false;
        }
    }
}
