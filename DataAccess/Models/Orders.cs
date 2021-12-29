using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Ecom.DataAccess.Models
{
    public class Orders
    {
        [Key]
        public int Id { get; set; }
        public string AspnetUserId { get; set; }

        [Required]
        public string Address { get; set; }
        [Required]
        public int? TotalAmount { get; set; }
        public int EstimateDelivery { get; set; }
    }
}
