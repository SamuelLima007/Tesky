import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})


export class Showmessage {

  constructor(private _Messageservice : MessageService){}

   showMessageAddTask()
  {
    this._Messageservice.clear();
    this._Messageservice.add({
  key:'tr',
  severity:'success', 
  summary:'Task Advice', 
  detail:'Task Adicionada com sucesso!'});
  }

  showMessageTaskNull()
  {
    this._Messageservice.clear();
this._Messageservice.add({
  key:'tr',
  severity:'warn', 
  summary:'Task Advice', 
  detail:'Não foi possivel adicionar a sua task'});
  }

  showMessageCompleteTask()
  {
    this._Messageservice.clear();
    this._Messageservice.add({
  key:'tr',
  severity:'success', 
  summary:'Task Advice', 
  detail:'Task Concluida com sucesso!'});
  }

  showMessagRemovedTask()
  {
    this._Messageservice.clear();
    this._Messageservice.add({
  key:'tr',
  severity:'info', 
  summary:'Task Advice', 
  detail:'Task Removida com sucesso!'});
  }

  showMessagEditTask()
  {
    this._Messageservice.clear();
    this._Messageservice.add({
  key:'tr',
  severity:'info', 
  summary:'Task Advice', 
  detail:'Task Editada com sucesso!'});
  }
  
}
