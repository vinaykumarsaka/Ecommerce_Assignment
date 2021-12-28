
using Ecom.DataAccess;
using Ecom.DataAccess.Models;
using Repositories.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repositories.Repositories
{
    public class OrdersRepository : RepositoryBase<Orders>, IOrdersRepository
    {
        private readonly AppDbContext _dbContext;
        public OrdersRepository(AppDbContext _dbContext)
            : base(_dbContext)
        {
            this._dbContext = _dbContext;
        }
    }

}
