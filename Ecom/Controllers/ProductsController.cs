using Contracts.IServices;
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

    public class ProductsController : ControllerBase
    {
        private readonly IProductService productService;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController
        (
            IProductService productService,
            ILogger<ProductsController> _logger
        )
        {
            this.productService = productService;
            this._logger = _logger;
        }

        [HttpGet]
        [Route("")]
        [Authorize]
        public async Task<IActionResult> Products()
        {

            _logger.LogInformation("Products Controller -> products");
            var list = await productService.GetAllProducts();
            return new JsonResult(list);


        }

        [HttpPost]
        [Route("add")]
        [Authorize]
        public IActionResult AddProduct(AddProductParams product)
        {
            productService.AddProduct(product);
            return Ok(new { message = "Product Added successfully" });
        }

    }
}

