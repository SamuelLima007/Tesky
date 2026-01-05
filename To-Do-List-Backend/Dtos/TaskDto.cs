using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace To_Do_List_Backend.Dtos
{
    public class TaskDto
    {
         public int Id {get; set;}
        public string? Description {get; set;}

        public bool Completed {get; set;} 

    }
}