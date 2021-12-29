using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Ecom.DataAccess.Models
{
    public partial class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string ModelNum { get; set; }

        [DataType(DataType.Currency)]
        public int Price { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public int DeliveryTime { get; set; }

    }
}
