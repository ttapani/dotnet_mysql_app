using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnet_mysql_application.Models
{
    public class Equipment
    {
        public Int64 Id { get; set; }
        public string Name { get; set; }
        public List<Loan> Loans { get; set; }
    }
}
