import { Component, HostListener } from '@angular/core';
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
import { SunMoonIcon } from 'lucide-angular';
import { LogOutIcon } from 'lucide-angular';
import { Authservice } from '../../services/Auth/authservice';
import { ChangeDetectorRef } from '@angular/core';
import { ViewChild } from '@angular/core';

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
  @ViewChild(Paginator) paginator!: Paginator;
  readonly Trash2 = Trash2;
  readonly Pencilicon = PencilIcon;
  readonly Paginator = Paginator;
  readonly SunMoonIcon = SunMoonIcon;
  readonly LogOutIcon = LogOutIcon;

  taskList: TaskInterface[] = [];
  taskView: TaskInterface[] = [];
  NewTask: string = '';
  taskEdit: string = '';
  activeFilter: 'Total' | 'Actives' | 'Completed' = 'Total';
  editMode: boolean = false;
  taskToEdit: number = -1;
  page: number = 0;
  rowsPerPage: number = 7;
  ligthMode: boolean = false;
  firstPage:number = 4;

  constructor(private _taskService: Taskservice, private _Messageservice: MessageService, private _authservice : Authservice, private cdr : ChangeDetectorRef) {}

  ngOnInit(): void {
   
    
    this.updateRowsPerPage();
  }

  //Itens por pagina de acordo com tamanho da tela
  @HostListener('window:resize', ['$event'])
  updateRowsPerPage(event?: Event) {
    const screenHeight = window.innerHeight;

      if (screenHeight < 600) {
    
    this.rowsPerPage = 3;
    
  } else if (screenHeight < 700) {
   
    this.rowsPerPage = 4;
    
  } else if (screenHeight < 850) {
   
    this.rowsPerPage = 4;
    
  } else if (screenHeight < 950) {
    
    this.rowsPerPage = 6;
    
  } else if (screenHeight < 1100) {
    
    this.rowsPerPage = 7;
    
  } else if (screenHeight < 1300) {
  
    this.rowsPerPage = 9;
    
  } else if (screenHeight < 1500) {
    
    this.rowsPerPage = 11;
    
  } else {
    
    this.rowsPerPage = 13;
  }

  this.onPageChange();
}

   
// Função para configurar troca de tema
  switchTeme() {
    this.ligthMode = !this.ligthMode;

    if (this.ligthMode === true) {document.body.classList.remove('dark'); }   
    else{ document.body.classList.add('dark'); }
  }
// Função Drag and drop
  drop(event: CdkDragDrop<TaskInterface[]>) {
    moveItemInArray(this.taskView, event.previousIndex, event.currentIndex);
  }
// Funcoes crud de task abertura
  AddTask() {
    this._taskService.AddTask(this.NewTask);
    this.NewTask = '';
    this.onPageChange();
  }

  EditTask(task: TaskInterface) {
    this.editMode = !this.editMode;
    let edit = this.taskEdit

    if(this.editMode == true)
    {
    this.taskEdit = task.description;
    this.taskToEdit = task.id;
    }

    else if (task.id == this.taskToEdit)
    {
    this._taskService.EditTask(task, edit);
     edit = '';
    }
    
  }

  RemoveTask(task: TaskInterface) {
    this._taskService.RemoveTask(task);
    this.taskView = this.taskView.filter((x) => x.id != task.id);
    this.onPageChange();
  }

  Filter(activeFilter: 'Total' | 'Actives' | 'Completed'): TaskInterface[] {
    this.activeFilter = activeFilter;
    this.taskView = this._taskService.Filter(activeFilter);
   
   this.paginator.changePage(0);
    this.onPageChange();
    return this.taskView;
  }

  TotalTasks() {
    return this._taskService.TotalTasks().length;
  }

  ActiveTasks() {
    return this._taskService.ActiveTasks().length;
  }

  CompletedTasks() {
    return this._taskService.CompletedTasks().length;
  }



  MessageServiceCompleteTaskOrReativeTask(task: TaskInterface) {
    if (task.completed === false) {
      this._Messageservice.clear();
      this._Messageservice.add({
        key: 'tr',
        severity: 'success',
        summary: 'Task Advice',
        detail: 'Task Completa!',
      });
    } else {
      this._Messageservice.clear();
      this._Messageservice.add({
        key: 'tr',
        severity: 'info',
        summary: 'Task Advice',
        detail: 'A Task foi reativada!',
      });
    }
  }

  // Funcao paginacao
  onPageChange(event?: PaginatorState) {
    if (event?.page != undefined) {
      this.page = event.page;
    }
    const totalTasks = this._taskService.Filter(this.activeFilter);
    const Inicio = this.page * this.rowsPerPage;
    const fim = Inicio + this.rowsPerPage;
    this.taskList = totalTasks;
    this.taskView = totalTasks.slice(Inicio, fim);
    this.taskView = [...this.taskView]
    this.cdr.detectChanges()
  }

  Loggout()
  {
    this._authservice.loggout()
  }
}
