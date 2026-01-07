using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace To_Do_List_Backend.Dtos
{
    public class RegisterRequestDto
    {
              public string name {get; set; }
         public string email {get; set;  }

        public string password {get; set; }
    }
}