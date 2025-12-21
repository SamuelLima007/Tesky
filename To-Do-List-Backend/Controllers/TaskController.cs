using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using IdGen;
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
     var Lista =  _context.Tasks.ToList();
      return Ok(Lista);
    
    }
    

      [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskModel task)
        {

                  

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return Ok(task);
         
        }

      
      [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(long id)
        {
            var TaskToDelete = await _context.Tasks.FindAsync(id);

            if (TaskToDelete == null)
            {
                return NotFound();
            }

            _context.Remove(TaskToDelete);
            await _context.SaveChangesAsync();
            return Ok();
        }

     
     
    }
}