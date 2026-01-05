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
    
    public class TaskController : ControllerBase
    {
       private readonly TaskDataContext _context;
   

       public TaskController(TaskDataContext context)
       {
        _context = context;
        
       }


    [Authorize]
    [HttpGet("tasks")]
    public  IActionResult GetTasks()
    {
      var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
      var userid = int.Parse(id);
      
 
      var tasklist = _context.Tasks.Where((x) => x.UserId == userid);
      return Ok(tasklist);
    
    }

      [Authorize]
      [HttpPost("createtasks")]
        public async Task<IActionResult> CreateTask([FromBody] TaskModel task)
        {
          var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
          var userid = int.Parse(id);
          if(task == null)
      {
        Console.WriteLine("task null");
      }

          var newtask = new TaskModel
          {
           
            Description = task.Description,
            Completed = task.Completed,
            UserId = userid,
          };
       
           
            await _context.Tasks.AddAsync(newtask);

            await _context.SaveChangesAsync();

            var newlist = GetTasks();

           
            return Ok(newlist);
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


        public async Task<IActionResult> UpdateTask (int id, string description, bool completed)
       {

        var task = _context.Tasks.Find(id);
        task.Description = description;
        task.Completed = completed;
        return Ok();
      
       } 
    }
}