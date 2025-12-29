import { Injectable } from '@angular/core';
import { Showmessage } from '../Showmessage/showmessage';
import { TaskInterface } from '../../interfaces/taskinterface';
import { PaginatorState } from 'primeng/paginator';

@Injectable({
  providedIn: 'root',
})
export class Taskservice {

  taskList: TaskInterface[] = [];
  
  constructor(private ShowMessageService : Showmessage){}

  AddTask(newTask: string, activeFilter : any) {
    if (newTask != '') {
      let task: TaskInterface = {
        id: Date.now(),
        description: newTask,
        completed: false,
      };
         if(this.taskList.length == 4)
      {
        this.taskList.push(task)
        return this.onPageChange()
        
      }
      else 
      {
        this.taskList.push(task) 
         this.ShowMessageService.showMessageAddTask()
         return this.RenderList(activeFilter);   
      }
    }
   
     this.ShowMessageService.showMessageTaskNull()
     return this.taskList
   
  }

  EditTask(task: TaskInterface, taskEdit : string) {

    if (taskEdit != '') {
      task.description = taskEdit;
      this.ShowMessageService.showMessagEditTask() 
    }  
   return task
  }

  RemoveTask(task: TaskInterface) {
    this.taskList = this.taskList.filter((x) => x.id != task.id);
    this.ShowMessageService.showMessagRemovedTask();
    return this.taskList
  }

  ActiveTasks() {
    return this.taskList.filter((x) => x.completed == false);
  }

  CompletedTasks() {
    return this.taskList.filter((x) => x.completed == true);
  }

   onPageChange(event? : PaginatorState)
    {
       if
       (event?.page)
       {
        let Inicio : number = event.page * 4;
        let fim : number =  Inicio + 4 ;
        return this.taskList.slice(Inicio, fim)
       }
        return this.taskList.slice(0, 4)
    }

    RenderList(activeFilter : 'Total' | 'Actives' | 'Completed') {

    switch(activeFilter)
    {
        case 'Total':
        return this.taskList
      
        case 'Actives':
        return this.taskList.filter((x) => x.completed == false);
       
        case 'Completed':
         return this.taskList.filter((x) => x.completed == true);

         default:
         return this.taskList; 
    }
  }
}
