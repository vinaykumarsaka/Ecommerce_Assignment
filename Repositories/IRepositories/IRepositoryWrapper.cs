using System;
using System.Collections.Generic;
using System.Text;

namespace Repositories.IRepositories
{
    public interface IRepositoryWrapper
    {
        IProductsRepository Products { get; }
        IOrdersRepository Orders { get; }
        void Save();
    }
}