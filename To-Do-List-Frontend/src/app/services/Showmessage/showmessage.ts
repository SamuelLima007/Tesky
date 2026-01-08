import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TaskInterface } from '../../interfaces/taskinterface';

@Injectable({
  providedIn: 'root',
})
export class Showmessage {
  constructor(private _Messageservice: MessageService) {}

  showMessageAddTask() {
    this._Messageservice.clear();
    this._Messageservice.add({
      key: 'tr',
      severity: 'success',
      summary: 'Task Advice',
      detail: 'Task Adicionada com sucesso!',
      life: 3000,
    });
  }

  showMessageTaskNull() {
    this._Messageservice.clear();
    this._Messageservice.add({
      key: 'tr',
      severity: 'warn',
      summary: 'Task Advice',
      detail: 'Não foi possivel adicionar a sua task',
      life: 3000,
    });
  }

  showMessageCompleteTask() {
    this._Messageservice.clear();
    this._Messageservice.add({
      key: 'tr',
      severity: 'success',
      summary: 'Task Advice',
      detail: 'Task Concluida com sucesso!',
      life: 3000,
    });
  }

  showMessageRemovedTask() {
    this._Messageservice.clear();
    this._Messageservice.add({
      key: 'tr',
      severity: 'info',
      summary: 'Task Advice',
      detail: 'Task Removida com sucesso!',
      life: 3000,
    });
  }

  showMessageEditTask() {
    this._Messageservice.clear();
    this._Messageservice.add({
      key: 'tr',
      severity: 'info',
      summary: 'Task Advice',
      detail: 'Task Editada com sucesso!',
      life: 3000,
    });
  }

  showMessageLogged() {
    this._Messageservice.clear();
    this._Messageservice.add({
      key: 'tr',
      severity: 'success',
      summary: 'Task Advice',
      detail: 'Usuario Logado com sucesso!',
      life: 3000,
    });
  }

  showMessageRegister() {
    this._Messageservice.add({
      key: 'tr',
      severity: 'success',
      summary: 'Task Advice',
      detail: 'Usuario Registrado com sucesso!',
      life: 3000,
    });
  }

  MessageServiceCompleteTaskOrReativeTask(task: TaskInterface) {
    if (task.completed === true) {
      this._Messageservice.clear();
      return this._Messageservice.add({
        key: 'tr',
        severity: 'success',
        summary: 'Task Advice',
        detail: 'Task Completa!',
        life: 3000,
      });
    } else {
      this._Messageservice.clear();
      return this._Messageservice.add({
        key: 'tr',
        severity: 'info',
        summary: 'Task Advice',
        detail: 'A Task foi reativada!',
        life: 3000,
      });
    }
  }
}
