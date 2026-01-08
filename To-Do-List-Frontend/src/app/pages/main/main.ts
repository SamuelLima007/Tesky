import { Component, HostListener, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TaskInterface } from '../../interfaces/taskinterface';
import { CheckboxModule } from 'primeng/checkbox';
import {
  PencilIcon,
  Trash2,
  LucideAngularModule,
  MoonStar,
  Sun,
  X,
  Check,
  LogOutIcon,
} from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { PaginatorModule, Paginator, PaginatorState } from 'primeng/paginator';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Taskservice } from '../../services/task/taskservice';
import { MessageService } from 'primeng/api';
import { Authservice } from '../../services/Auth/authservice';
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
  readonly Sun = Sun;
  readonly LogOutIcon = LogOutIcon;
  readonly MoonStar = MoonStar;
  readonly X = X;
  readonly Check = Check;

  totalrecords: number = 4;
  taskView: TaskInterface[] = [];
  NewTask: string = '';
  taskEdit: string = '';
  activeFilter: 'Total' | 'Actives' | 'Completed' = 'Total';
  editMode: boolean = false;
  taskToEdit: number = -1;
  page: number = 0;
  rowsPerPage: number = 4;
  ligthMode: boolean = false;
  totalTasks: number = 0;
  activeTasks: number = 0;
  completedTasks: number = 0;

  constructor(
    private _taskService: Taskservice,
    private _Messageservice: Showmessage,
    private _authservice: Authservice,
    private cdr: ChangeDetectorRef
  ) {}

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
    this.loadTasks();
  }

  // Função para configurar troca de tema
  switchTeme() {
    this.ligthMode = !this.ligthMode;

    if (this.ligthMode === true) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  }
  // Função Drag and drop
  drop(event: CdkDragDrop<TaskInterface[]>) {
    moveItemInArray(this.taskView, event.previousIndex, event.currentIndex);
  }
  // Funcoes crud de task abertura

  AddTask() {
    this._taskService.AddTask(this.NewTask)?.subscribe({
      next: () => {
        this.NewTask = '';
        this.loadTasks();
        this.onPageChange();
      },
    });
  }

  EditTask(task?: TaskInterface) {
    this.editMode = !this.editMode;
    let edit = this.taskEdit;

    if (task != null) {
      if (this.editMode == true) {
        this.taskEdit = task.description;
        this.taskToEdit = task.id;
      } else if (task.id == this.taskToEdit) {
        this._taskService.EditTask(task, edit);
        edit = '';
      }
    }
  }

  RemoveTask(task: TaskInterface) {
    this._taskService.RemoveTask(task).subscribe({
      next: (res) => {
        this.taskView = this.taskView.filter((x) => x.id != task.id);
        this.loadTasks();
        this.onPageChange();
      },
    });
  }

  onCompleteTask(task: TaskInterface) {
    this._taskService.CompleteTask(task).subscribe(() => {
      this.loadTasks();
      this.MessageServiceCompleteTaskOrReativeTask(task);
    });
  }

  Filter(activeFilter: 'Total' | 'Actives' | 'Completed', task?: TaskInterface): TaskInterface[] {
    this.activeFilter = activeFilter;
    this.taskView = this._taskService.Filter(activeFilter, task);

    this.paginator.changePage(0);
    this.onPageChange();
    return this.taskView;
  }

  recalculateCounters() {
    const tasks = this._taskService.taskList;

    this.totalTasks = tasks.length;
    this.activeTasks = tasks.filter((x) => !x.completed).length;
    this.completedTasks = tasks.filter((x) => x.completed).length;
  }

  loadTasks() {
    this._taskService.GetTaskList().subscribe((res) => {
      this.recalculateCounters();
      this.onPageChange();
    });
  }

  MessageServiceCompleteTaskOrReativeTask(task: TaskInterface) {
    this._Messageservice.MessageServiceCompleteTaskOrReativeTask(task);
  }

  // Funcao paginacao
  onPageChange(event?: PaginatorState) {
    if (event?.page != undefined) {
      this.page = event.page;
    }

    const totalTasks = this._taskService.Filter(this.activeFilter);
    const Inicio = this.page * this.rowsPerPage;
    const fim = Inicio + this.rowsPerPage;
    this.totalrecords = totalTasks.length;
    this.taskView = totalTasks.slice(Inicio, fim);

    this.cdr.detectChanges();
  }

  Loggout() {
    this._authservice.loggout();
  }
}
