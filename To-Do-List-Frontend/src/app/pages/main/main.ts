import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TaskInterface } from '../../interfaces/taskinterface';
import { CheckboxModule } from 'primeng/checkbox';
import { Trash2 } from 'lucide-angular';
import { PencilIcon } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { PaginatorModule, Paginator, PaginatorState } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Showmessage } from '../../services/Showmessage/showmessage';



@Component({
  selector: 'app-main',
  imports: [
    SelectButtonModule,
    FormsModule,
    CheckboxModule,
    LucideAngularModule,
    CommonModule,
    PaginatorModule,
    ToastModule,
    CdkDrag,
    CdkDropList,
  ],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  readonly Trash2 = Trash2;
  readonly Pencilicon = PencilIcon;
  readonly Paginator = Paginator;

  Tasklist: TaskInterface[] = [];
  TasklistFiltered: TaskInterface[] = [];
  TasklistPages: TaskInterface[] = [];
  NewTask: string = '';
  TaskEdit: string = '';
  activeTasks: number = 0;
  completedTasks: number = 0;
  Activefilter: 'Total' | 'Actives' | 'Completed' = 'Total';
  EditMode: boolean = false;
  Tasktoedit : number = -1;

  constructor(private ShowMessageService : Showmessage)
  {

  }

  ngOnInit(): void {
    this.FilterButton('Total');
  }

  drop(event: CdkDragDrop<TaskInterface[]>) {
    moveItemInArray(this.TasklistPages, event.previousIndex, event.currentIndex);
  }

  AddTask() {
    if (this.NewTask != '') {
      let task: TaskInterface = {
        id: Date.now(),
        description: this.NewTask,
        completed: false,
      };

      this.Tasklist.push(task);
      if(this.TasklistPages.length == 4)
      {
        this.onPageChange
      }
      else
      {
        this.TasklistPages.push(task)
      }
      this.FilterButton(this.Activefilter);
      this.NewTask = '';
        this.showMessageAddTask()
    }

    else
    {
     this.showMessageTaskNull()
    }
    
  }

  EditTask(task: TaskInterface) {

    this.Tasktoedit = task.id
    
    this.EditMode = !this.EditMode;
    if (this.TaskEdit != '') {
      task.description = this.TaskEdit;
      this.showMessagEditTask()
    }
    
    return task.id
  }


  RemoveTask(task: TaskInterface) {
    this.Tasklist = this.Tasklist.filter((x) => x.id != task.id);
    this.TasklistFiltered = this.Tasklist.filter((x) => x.id != task.id);
   this.TasklistPages = this.TasklistPages.filter((x) => x.id != task.id);
    this.showMessagRemovedTask();
  
  }

  FilterButton(button?: string) {
    this.Activefilter = button as 'Total' | 'Actives' | 'Completed';
    if (this.Activefilter == 'Total') {
      this.TasklistFiltered = this.Tasklist;
    } else if (this.Activefilter == 'Actives') {
      this.TasklistFiltered = this.Tasklist.filter((x) => x.completed == false);
    } else if (this.Activefilter == 'Completed') {
      this.TasklistFiltered = this.Tasklist.filter((x) => x.completed == true);

     
    }
  }

  ActiveTasks() {
    return this.Tasklist.filter((x) => x.completed == false).length;
  }

  CompletedTasks() {
    return this.Tasklist.filter((x) => x.completed == true).length;
  }

  onPageChange(event : PaginatorState)
    {

     
       if
       (event.page != null)
       {
        let Inicio : number = event.page * 4;
        let fim : number =  Inicio * 2 ;
        if(Inicio == 0)
        {
          fim = 4;
        }

        this.TasklistPages = this.TasklistFiltered.slice(Inicio, fim)
        
       
        
       }


    }


  showMessageAddTask()
  {
   this.ShowMessageService.showMessageAddTask();
  }

  showMessageTaskNull()
  {
    this.ShowMessageService.showMessageTaskNull();
  }

  showMessageCompleteTask()
  {
     this.ShowMessageService.showMessageCompleteTask();
  }

  showMessagRemovedTask()
  {
    this.ShowMessageService.showMessagRemovedTask();
  }

  showMessagEditTask()
  {
   this.ShowMessageService.showMessagEditTask();
  }


}
