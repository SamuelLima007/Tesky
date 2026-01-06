
namespace To_Do_List_Backend.Models
{
    public class TaskModel
    {
        public long Id {get; set;}
        public string? Description {get; set;}
        public bool Completed {get; set;} 
        public int UserId {get; set;}
        public UserModel? User{get; set;}
    }
}