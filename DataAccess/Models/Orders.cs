using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Ecom.DataAccess.Models
{
    public class Orders
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string AspnetUserId { get; set; }

        [Required]
        public string Address { get; set; }
        [Required]
        public int? TotalAmount { get; set; }
        public int EstimateDelivery { get; set; }
    }
}
