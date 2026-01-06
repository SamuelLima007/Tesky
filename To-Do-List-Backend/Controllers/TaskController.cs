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
    [HttpGet("gettask")]
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
          
          var newtask = new TaskModel
          {
           Id = task.Id,
            Description = task.Description,
            Completed = task.Completed,
            UserId = userid,
          };
       
           
            await _context.Tasks.AddAsync(newtask);

            await _context.SaveChangesAsync();

        
           
            return Ok(task);
        }


      [HttpDelete("removetask/{id}")]
        public async Task<IActionResult> DeleteTask(long id)
        {
            var TaskToDelete = await _context.Tasks.FindAsync(id);
          
            _context.Tasks.Remove(TaskToDelete);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("editTask")]
        public async Task<IActionResult> UpdateTask ([FromBody]TaskModel editTask)
       {
        


        var task = await _context.Tasks.FindAsync(editTask.Id);
        task.Description = editTask.Description;
        task.Completed = editTask.Completed;
         _context.Tasks.Update(task);
         await _context.SaveChangesAsync();
        return Ok();
      
       } 
    }
}