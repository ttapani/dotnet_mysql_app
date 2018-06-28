using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnet_mysql_application.Models
{
    public class Loan
    {
        public Guid Id { get; set; }
        public Guid ItemId { get; set; }
        public Item Item { get; set; }
        public Guid UserId { get; set; }
        public string User { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Boolean Active { get; set; }
        public DateTime ReturnDate { get; set; }
    }
}
