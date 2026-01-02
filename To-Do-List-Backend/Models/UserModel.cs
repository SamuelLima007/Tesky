using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace To_Do_List_Backend.Models
{
    public class UserModel
    {
        public int id {get; set;}

        public string? name {get; set;}

        public string email {get; set;  }

        public string password {get; set; }

        public List<TaskModel> tasks {get; set; } = [];
    }
}