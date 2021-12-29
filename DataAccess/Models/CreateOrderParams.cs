using Ecom.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Models
{
    public class CreateOrderParams
    {
        public string UserId { get; set; }
        public string Address { get; set; }
        public int Total { get; set; }
        public int EstDelivery { get; set; }
        public string CartItems { get; set; }
    }
}
