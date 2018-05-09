using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnet_mysql_application.Models
{
    public class Loan
    {
        public Int64 Id { get; set; }
        public Int64 EquipmentId { get; set; }
        public Equipment Equipment { get; set; }
        public Int64 UserId { get; set; }
        public User User { get; set; }
    }
}
