using Ecom.DataAccess;
using Microsoft.EntityFrameworkCore;
using Repositories.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace Repositories.Repositories
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected AppDbContext appDBContext { get; set; }
        private DbSet<T> _dbSet;
        public RepositoryBase(AppDbContext appDBContext)
        {
            this.appDBContext = appDBContext;
            this._dbSet = appDBContext.Set<T>();
        }
        public IQueryable<T> FindAll()
        {
            return this.appDBContext.Set<T>().AsNoTracking();
        }
        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return this.appDBContext.Set<T>().Where(expression).AsNoTracking();
        }
        public bool Check(Expression<Func<T, bool>> expression)
        {
            return this.appDBContext.Set<T>().Any(expression);
        }
        public void Create(T entity)
        {
            this.appDBContext.Set<T>().Add(entity);
        }
        public void Update(T entity)
        {
            this.appDBContext.Set<T>().Update(entity);
        }
        public void Delete(T entity)
        {
            this.appDBContext.Set<T>().Remove(entity);
        }
    }
}
