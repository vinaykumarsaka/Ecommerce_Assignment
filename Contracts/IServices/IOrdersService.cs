using DataAccess.Models;
using Ecom.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.IServices
{
    public interface IOrdersService
    {
        Task CreateOrder(CreateOrderParams order);
        Task<List<Orders>> GetAllOrders(string val);
    }
}
