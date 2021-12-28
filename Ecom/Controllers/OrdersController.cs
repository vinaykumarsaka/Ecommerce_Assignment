using Contracts.IServices;
using DataAccess.Models;
using Ecom.DataAccess.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Ecom.Controllers
{
    [ApiController]
    [Route("api/products")]

    public class OrdersController : ControllerBase
    {
        private readonly IOrdersService ordersService;
        private readonly ILogger<OrdersController> _logger;

        public OrdersController
        (
            IOrdersService ordersService,
            ILogger<OrdersController> _logger
        )
        {
            this.ordersService = ordersService;
            this._logger = _logger;
        }

        [HttpGet]
        [Route("")]
        [Authorize]
        public async Task<IActionResult> Orders()
        {

            _logger.LogInformation("Products Controller -> products");
            int userId = Convert.ToInt32(User.Identity.Name.ToString());
            var list = await ordersService.GetAllOrders(userId);
            return new JsonResult(list);


        }

        [HttpPost]
        [Route("add")]
        [Authorize]
        public IActionResult AddProduct([FromBody] CreateOrderParams order)
        {
            int userId = Convert.ToInt32(User.Identity.Name.ToString());
            if (order.CartItems == null)
            {
                return BadRequest(new { message = "cart items cannot be empty" });
            }

            order.UserId = userId;
            ordersService.CreateOrder(order);
            return Ok(new { message = "Product Added successfully" });
        }

    }

}



