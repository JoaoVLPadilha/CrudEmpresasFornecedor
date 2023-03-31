using DesafioBackend.Domain.Entities;
using DesafioBackend.Properties;
using FluentValidation;
using System.Linq;

namespace DesafioBackend.Domain.Validators
{
    public class EmpresaValidator : AbstractValidator<Empresa>
    {
        public EmpresaValidator(bool validateId = false, bool validateFornecedores = false)
        {
            if (validateId)
            {
                RuleFor(x => x.Id)
                    .NotEmpty().WithMessage("'Id' é obrigatório.")
                    .GreaterThan(0).WithMessage("'Id' inválido.");
            }

            RuleFor(x => x.NomeFantasia).NotEmpty().WithMessage("'Nome Fantasia' é obrigatório.");
            RuleFor(x => x.CNPJ).Matches($"{RegexPatterns.CnpjPattern}").WithMessage("'CNPJ' não está no formato correto.");
            RuleFor(x => x.CEP).Matches($"{RegexPatterns.CepPattern}").WithMessage("'CEP' não está no formato correto.");

            if (validateFornecedores)
            {
                When(x => (x.Fornecedores != null && x.Fornecedores.Any()), () => RuleForEach(x => x.Fornecedores).SetValidator(new FornecedorValidator()));
            }
        }
    }
}
