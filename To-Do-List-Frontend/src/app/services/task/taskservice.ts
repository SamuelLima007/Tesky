import { Injectable } from '@angular/core';
import { Showmessage } from '../Showmessage/showmessage';
import { TaskInterface } from '../../interfaces/taskinterface';
import { PaginatorState } from 'primeng/paginator';

@Injectable({
  providedIn: 'root',
})
export class Taskservice {
  taskList: TaskInterface[] = [];

  constructor(private ShowMessageService: Showmessage) {}

  AddTask(newTask: string) {
    if (newTask != '') {
      let task: TaskInterface = {
        id: Date.now(),
        description: newTask,
        completed: false,
      };
      this.taskList.push(task);
      this.ShowMessageService.showMessageAddTask();
    } else {
      this.ShowMessageService.showMessageTaskNull();
    }
  }

  GetTaskList() {
    return this.taskList;
  }

  EditTask(task: TaskInterface, taskEdit: string) {
    if (taskEdit != '') {
      task.description = taskEdit;
      this.ShowMessageService.showMessagEditTask();
    }
  }

  RemoveTask(task: TaskInterface) {
    this.taskList = this.taskList.filter((x) => x.id != task.id);
    this.ShowMessageService.showMessagRemovedTask();
  }

  TotalTasks() {
    return this.taskList;
  }

  ActiveTasks() {
    return this.taskList.filter((x) => x.completed == false);
  }

  CompletedTasks() {
    return this.taskList.filter((x) => x.completed == true);
  }

  Filter(activeFilter: 'Total' | 'Actives' | 'Completed') {
    switch (activeFilter) {
      case 'Total':
        return this.taskList;

      case 'Actives':
        return this.taskList.filter((x) => x.completed == false);

      case 'Completed':
        return this.taskList.filter((x) => x.completed == true);

      default:
        return this.taskList;
    }
  }
}
