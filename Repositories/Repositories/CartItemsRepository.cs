
using Ecom.DataAccess;
using Ecom.DataAccess.Models;
using Repositories.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repositories.Repositories
{
    public class CartItemsRepository : RepositoryBase<CartItems>, ICartItemsRepository
    {
        private readonly AppDbContext _dbContext;
        public CartItemsRepository(AppDbContext _dbContext)
            : base(_dbContext)
        {
            this._dbContext = _dbContext;
        }
    }

}
