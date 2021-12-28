using Ecom.DataAccess;
using Repositories.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repositories.Repositories
{
   public class RepositoryWrapper: IRepositoryWrapper
    {
        private AppDbContext _repoContext;
        private IProductsRepository _products;
        private IOrdersRepository _orders;



        public IProductsRepository Products
        {
            get
            {
                if (_products == null)
                {
                    _products = new ProductRepository(_repoContext);
                }
                return _products;
            }
        }


        public IOrdersRepository Orders
        {
            get
            {
                if (_orders == null)
                {
                    _orders = new OrdersRepository(_repoContext);
                }
                return _orders;
            }
        }

        public RepositoryWrapper(AppDbContext repositoryContext)
        {
            _repoContext = repositoryContext;
        }
        public void Save()
        {
            _repoContext.SaveChanges();
        }
    }
}
