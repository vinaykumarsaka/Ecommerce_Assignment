
using Ecom.DataAccess;
using Ecom.DataAccess.Models;
using Repositories.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repositories.Repositories
{
    public class ProductRepository : RepositoryBase<Product>, IProductsRepository
    {
        private readonly AppDbContext _dbContext;
        public ProductRepository(AppDbContext _dbContext)
            : base(_dbContext)
        {
            this._dbContext = _dbContext;
        }
    }

}
