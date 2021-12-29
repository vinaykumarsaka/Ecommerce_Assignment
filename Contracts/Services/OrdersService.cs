using Contracts.IServices;
using Ecom.DataAccess.Models;
using Repositories.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DataAccess.Models;
using Newtonsoft.Json;

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
                TotalAmount = order.Total,
                EstimateDelivery = order.EstDelivery
            };

            _repoWrapper.Orders.Create(newOrder);
            _repoWrapper.Save();
            var cartItemsList= JsonConvert.DeserializeObject<List<CartItems>>(order.CartItems);
            foreach(var item in cartItemsList)
            {
                item.OrderID = newOrder.Id;
                _repoWrapper.CartItems.Create(item);
                _repoWrapper.Save();
            }
            //foreach()
        }

        public async Task<List<Orders>> GetAllOrders(string userId)
        {
            return await _repoWrapper.Orders.FindByCondition(x => x.AspnetUserId == userId).ToListAsync();
        }
    }
}
