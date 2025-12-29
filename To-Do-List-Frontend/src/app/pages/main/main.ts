import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TaskInterface } from '../../interfaces/taskinterface';
import { CheckboxModule } from 'primeng/checkbox';
import { PencilIcon, Trash2, LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { PaginatorModule, Paginator, PaginatorState } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Taskservice } from '../../services/task/taskservice';
import { MessageService } from 'primeng/api';

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
  
  taskList: TaskInterface[] = [];
  NewTask: string = '';
  taskEdit: string = '';
  activeFilter: 'Total' | 'Actives' | 'Completed' = 'Total';
  editMode: boolean = false;
  taskToEdit : number = -1;

  constructor(private _taskService : Taskservice, private _Messageservice : MessageService){}
  
  ngOnInit(): void {
    this.RenderList('Total');
  }

  drop(event: CdkDragDrop<TaskInterface[]>) {
    moveItemInArray(this.taskList, event.previousIndex, event.currentIndex);
  }

  AddTask() {
  
   this.taskList = this._taskService.AddTask(this.NewTask, this.activeFilter)
   this.NewTask = ''

  }

  EditTask(task: TaskInterface) {
  this.editMode = !this.editMode
  this.taskToEdit = task.id;
   task = this._taskService.EditTask(task, this.taskEdit)
  }

  RemoveTask(task: TaskInterface) {
   this.taskList = this._taskService.RemoveTask(task)
  }

  RenderList(activeFilter : 'Total' | 'Actives' | 'Completed' ) {
    this.activeFilter = activeFilter
    this.taskList = this._taskService.RenderList(activeFilter)
  }

  ActiveTasks() {
    return this._taskService.ActiveTasks().length
  }

  CompletedTasks() {
    return this._taskService.CompletedTasks().length
  }

  showMessageCompleteTask(task : TaskInterface)
  {
      if (task.completed === false)
      {        
         this._Messageservice.clear();
         this._Messageservice.add({
         key:'tr',
         severity:'success', 
         summary:'Task Advice', 
         detail:'Task Completa!'});
      }
      else
        {
         this._Messageservice.clear();
         this._Messageservice.add({
         key:'tr',
         severity:'info', 
         summary:'Task Advice', 
         detail:'A Task foi reativada!'});
        }
  }

   onPageChange(event : PaginatorState)
    {
      this.taskList = this._taskService.onPageChange(event)
    }
}
