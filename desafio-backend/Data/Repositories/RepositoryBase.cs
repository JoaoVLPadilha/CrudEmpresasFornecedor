using Dapper.FluentMap;
using Dapper.FluentMap.Dommel;
using DesafioBackend.Data.Mappers;
using DesafioBackend.Domain.Interfaces.Reposities;
using Dommel;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq.Expressions;

namespace DesafioBackend.Data.Repositories
{
    public abstract class RepositoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : BaseEntity
    {
        protected readonly string ConnectionString;

        protected readonly IConfiguration _configuration;

        protected RepositoryBase(IConfiguration configuration)
        {
            if (FluentMapper.EntityMaps.IsEmpty)
            {
                FluentMapper.Initialize(config =>
                {
                    config.AddMap(new EmpresaMap());
                    config.AddMap(new FornecedorMap());
                    config.AddMap(new ContratoMap());

                    config.ForDommel();
                });
            }
            _configuration = configuration;

            ConnectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public virtual IEnumerable<TEntity> GetAll()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.GetAll<TEntity>();
            }
        }

        public virtual TEntity GetById(int id)
        {
            if (id < 1) throw new ArgumentException("Id deve ser preenchido.");

            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Get<TEntity>(id);
            }
        }

        public virtual void Insert(ref TEntity entity)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var id = db.Insert(entity);
                entity = GetById(Convert.ToInt32(id));
            }
        }

        public virtual bool Update(TEntity entity)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Update(entity);
            }
        }
        public virtual bool Delete(int id)
        {
            if (id < 1) throw new ArgumentException("Id deve ser preenchido.");

            using (var db = new SqlConnection(ConnectionString))
            {
                var entity = GetById(id);

                if (entity == null) throw new ArgumentException("Registro não encontrado.");

                return db.Delete(entity);
            }
        }
        public virtual IEnumerable<TEntity> GetList(Expression<Func<TEntity, bool>> predicate)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Select(predicate);
            }
        }
    }
}
