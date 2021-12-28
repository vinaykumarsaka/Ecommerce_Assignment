using Contracts.IServices;
using Ecom.DataAccess.Models;
using Repositories.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Contracts.Services
{
    public class ProductService: IProductService
    {
        private readonly IRepositoryWrapper _repoWrapper;

        public ProductService(IRepositoryWrapper _repoWrapper)
        {
            this._repoWrapper = _repoWrapper;
        }

        public void AddProduct(AddProductParams model)
        {
            Product product = new Product
            {
                ModelNum = model.ModelNum,
                Price = model.Price,
                Description = model.Description,
                Quantity = model.Quantity,
                DeliveryTime = model.DeliveryTime
            };

            this._repoWrapper.Products.Create(product);
            this._repoWrapper.Save();
        }

        public async Task<List<Product>> GetAllProducts()
        {
            return await _repoWrapper.Products.FindAll().ToListAsync();
        }

        public async Task<Product> GetProductById(int productId)
        {
            return await _repoWrapper.Products.FindByCondition(x => x.Id == productId).FirstOrDefaultAsync();
        }
    }
}
