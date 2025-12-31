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

  constructor(private _taskService: Taskservice, private _Messageservice: MessageService) {}

  ngOnInit(): void {
    this.Filter('Total');
    this.updateRowsPerPage();
  }

  @HostListener('window:resize', ['$event'])
  updateRowsPerPage(event?: Event) {
    const screenHeight = window.innerHeight;

    switch (true) {
      case screenHeight < 700:
        this.rowsPerPage = 4;
        break;

      case screenHeight > 740 && screenHeight < 900:
        this.rowsPerPage = 6;
        break;

      case screenHeight > 843:
        this.rowsPerPage = 7;
        break;

      case screenHeight > 1000 && screenHeight < 1100:
        this.rowsPerPage = 2;
        break;
    }

    this.onPageChange();
  }

  switchTeme() {
    this.ligthMode = !this.ligthMode;
  }

  drop(event: CdkDragDrop<TaskInterface[]>) {
    moveItemInArray(this.taskView, event.previousIndex, event.currentIndex);
  }

  AddTask() {
    this._taskService.AddTask(this.NewTask);
    this.NewTask = '';
    this.onPageChange();
  }

  EditTask(task: TaskInterface) {
    this.editMode = !this.editMode;
    this.taskToEdit = task.id;
    this._taskService.EditTask(task, this.taskEdit);
  }

  RemoveTask(task: TaskInterface) {
    this._taskService.RemoveTask(task);
    this.taskView = this.taskView.filter((x) => x.id != task.id);
    this.onPageChange();
  }

  Filter(activeFilter: 'Total' | 'Actives' | 'Completed'): TaskInterface[] {
    this.activeFilter = activeFilter;
    this.taskView = this._taskService.Filter(activeFilter);
    this.page = 0;
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

  onPageChange(event?: PaginatorState) {
    if (event?.page != undefined) {
      this.page = event.page;
    }

    const totalTasks = this._taskService.Filter(this.activeFilter);
    const Inicio = this.page * this.rowsPerPage;
    const fim = Inicio + this.rowsPerPage;
    this.taskList = totalTasks;
    this.taskView = totalTasks.slice(Inicio, fim);
  }
}
