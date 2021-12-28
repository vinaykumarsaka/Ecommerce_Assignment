using Contracts.IServices;
using Ecom.DataAccess.Models;
using Repositories.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DataAccess.Models;

namespace Contracts.Services
{
    public class OrdersService:IOrdersService
    {
        private readonly IRepositoryWrapper _repoWrapper;

        public OrdersService(IRepositoryWrapper _repoWrapper)
        {
            this._repoWrapper = _repoWrapper;
        }

        public void CreateOrder(CreateOrderParams order)
        {
            Orders newOrder = new Orders
            {
                AspnetUserId = order.UserId,
                Address = order.Address,
                Total = order.Total,
                EstimateDelivery = order.EstDelivery,
                CartItems = order.CartItems
            };

            _repoWrapper.Orders.Create(newOrder);
            _repoWrapper.Save();
        }

        public async Task<List<Orders>> GetAllOrders(int userId)
        {
            return await _repoWrapper.Orders.FindByCondition(x => x.AspnetUserId == userId).ToListAsync();
        }
    }
}
