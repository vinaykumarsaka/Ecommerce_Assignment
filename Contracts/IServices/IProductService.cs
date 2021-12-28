using Ecom.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.IServices
{
    public interface IProductService
    {
        void AddProduct(AddProductParams model);
        Task<List<Product>> GetAllProducts();
        Task<Product> GetProductById(int productId);
    }
}
