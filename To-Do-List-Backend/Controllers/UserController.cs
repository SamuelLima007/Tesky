using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using To_Do_List_Backend.Data;

namespace To_Do_List_Backend.Controllers
{
    [Route("[controller]")]
    public class UserController : Controller
    {
      private readonly TaskDataContext _context;

      public UserController(TaskDataContext context)
        {
            _context = context;
        }


        
    }
}