using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using To_Do_List_Backend.Models;

namespace To_Do_List_Backend.Data
{
    public class TaskDataContext : DbContext
    {
        
         public TaskDataContext(DbContextOptions<TaskDataContext> options)
            : base(options)
        {
        }
        
                  public DbSet<TaskModel> Tasks {get; set;}
                  public DbSet<UserModel> Users {get; set;}
   
    
  

    
}
}