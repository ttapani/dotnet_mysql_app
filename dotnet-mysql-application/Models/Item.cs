using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnet_mysql_application.Models
{
    public class Item
    {
        public Guid Id { get; set; }
        [Required]
        [StringLength(250)]
        public string Name { get; set; }
        public Boolean IsAvailable { get; set; }
    }
}
