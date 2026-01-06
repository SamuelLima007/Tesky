import { Injectable } from '@angular/core';
import { Showmessage } from '../Showmessage/showmessage';
import { TaskInterface } from '../../interfaces/taskinterface';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Taskservice {
  private ApiUrl: string = 'http://localhost:5195';

  taskList: TaskInterface[] = [];

  constructor(private ShowMessageService: Showmessage, private http: HttpClient) {}

  AddTask(newTask: string) {
    if (newTask != '') {
      let task: TaskInterface = {
        id: Date.now(),
        description: newTask,
        completed: false,
      };

      return this.http.post<TaskInterface>(`${this.ApiUrl}/createtasks`, task).pipe(
        tap((res) => {
          this.taskList.push(res);
          this.ShowMessageService.showMessageAddTask();
        })
      );
    } else {
      this.ShowMessageService.showMessageTaskNull();
      return null;
    }
  }

  GetTaskList() {
    return this.http
      .get<TaskInterface[]>(`${this.ApiUrl}/getTask`)
      .pipe(tap((res) => (this.taskList = res)));
  }

  EditTask(task: TaskInterface, taskEdit: string) {
    if (taskEdit != '') {
      task.description = taskEdit;
      this.http.put(`${this.ApiUrl}/editTask`, task).subscribe({
        next: (res) => {
          this.ShowMessageService.showMessagEditTask();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  RemoveTask(task: TaskInterface) {
    return this.http.delete(`${this.ApiUrl}/removetask/${task.id}`).pipe(
      tap((res) => {
        this.taskList = this.taskList.filter((x) => x.id != task.id);
        this.ShowMessageService.showMessagRemovedTask();
      })
    );
  }

  CompleteTask(task: TaskInterface) {
    this.http.put(`${this.ApiUrl}/editTask`, task).subscribe({
      next: (res) => {},
      error: (err) => {
        console.log(err);
      },
    });
  }

  Filter(activeFilter: 'Total' | 'Actives' | 'Completed', task?: TaskInterface) {
    if (task != null) {
      this.CompleteTask(task);
    }

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
