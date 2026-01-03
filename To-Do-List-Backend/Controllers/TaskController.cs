using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdGen;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using To_Do_List_Backend.Data;
using To_Do_List_Backend.Models;

namespace To_Do_List_Backend.Controllers
{
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
       private readonly TaskDataContext _context;
   

       public TaskController(TaskDataContext context)
       {
        _context = context;
        
       }


    [HttpGet]
    public  IActionResult GetTasks()
    {
      var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
      var userid = int.Parse(id);

      var Lista = _context.Tasks.Where((x) => x.UserId == userid);
      return Ok(Lista);
    
    }

      [Authorize]
      [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskModel task)
        {
          var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
          var userid = int.Parse(id);
       
           task.UserId = userid;

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return Ok(task); 
        }

      [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var TaskToDelete = await _context.Tasks.FindAsync(id);
            if (TaskToDelete == null)
            {
                return NotFound();
            }
            _context.Tasks.Remove(TaskToDelete);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}