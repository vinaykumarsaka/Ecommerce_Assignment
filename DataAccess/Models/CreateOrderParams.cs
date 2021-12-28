using Ecom.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Models
{
    public class CreateOrderParams
    {
        public int UserId { get; set; }
        public string Address { get; set; }
        public int Total { get; set; }
        public int EstDelivery { get; set; }
        public IEnumerable<CartItems> CartItems { get; set; }
    }
}
