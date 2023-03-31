using DesafioBackend.Domain.Entities;
using DesafioBackend.Properties;
using FluentValidation;
using System;
using System.Linq;

namespace DesafioBackend.Domain.Validators
{
    public class FornecedorValidator : AbstractValidator<Fornecedor>
    {
        public FornecedorValidator(bool validateId = false, bool validateEmpresas = false)
        {
            if (validateId)
            {
                RuleFor(x => x.Id)
                    .NotEmpty().WithMessage("'Id' é obrigatório.")
                    .GreaterThan(0).WithMessage("'Id' inválido.");
            }

            RuleFor(x => x.Nome).NotEmpty().WithMessage("'Nome' é obrigatório.");
            RuleFor(x => x.CEP).Matches($"{RegexPatterns.CepPattern}").WithMessage("'CEP' não está no formato correto.");
            RuleFor(x => x.Email).EmailAddress().WithMessage("Email inválido.");
            RuleFor(x => x.TipoFornecedor)
                .Must(v => new[] { TipoFornecedorConstants.PessoaFisica,TipoFornecedorConstants.PessoaJuridica}.Contains(v)).WithMessage("'TipoFornecedor' inválido.");

            When(x => x.TipoFornecedor.Equals(TipoFornecedorConstants.PessoaFisica), () =>
            {
                RuleFor(x => x.CNPJ).Null().WithMessage("'CNPJ' não necessário para fornecedores PF.");

                RuleFor(x => x.CPF).NotEmpty().Matches($"{RegexPatterns.CpfPattern}").WithMessage("'CPF' não está no formato correto.");
                RuleFor(x => x.RG).NotEmpty().WithMessage("'RG' é obrigatório para fornecedores PF.");
                RuleFor(x => x.DataNascimento).NotEmpty().GreaterThan(DateTime.MinValue).WithMessage("'DataNascimento' é obrigatório para fornecedores PF.");
            }).Otherwise(() =>
            {
                RuleFor(x => x.CNPJ).Matches($"{RegexPatterns.CnpjPattern}").WithMessage("'CNPJ' não está no formato correto.");

                RuleFor(x => x.CPF).Null().WithMessage("'CPF' não necessário para fornecedores PJ.");
                RuleFor(x => x.RG).Null().WithMessage("'RG' não necessário para fornecedores PJ.");
                RuleFor(x => x.DataNascimento).Null().WithMessage("'DataNascimento' não necessário para fornecedores PJ.");
            });

            if (validateEmpresas)
            {
                When(x => x.Empresas != null && x.Empresas.Any(), () => RuleForEach(x => x.Empresas).SetValidator(new EmpresaValidator()));
            }
        }
    }
}
