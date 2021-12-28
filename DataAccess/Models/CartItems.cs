using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Ecom.DataAccess.Models
{
    public class CartItems
    {
        [Key]
        public int Id { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int Amount { get; set; }
        public Orders Order { get; set; }
    }
}
