import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TaskInterface } from '../../interfaces/taskinterface';
import { CheckboxModule } from 'primeng/checkbox';
import { Trash2 } from 'lucide-angular';
import { PencilIcon } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [SelectButtonModule, FormsModule, CheckboxModule, LucideAngularModule, CommonModule],
  templateUrl: './main.html',
  styleUrl: './main.css',
})



export class Main {

  readonly Trash2 = Trash2
  readonly Pencilicon = PencilIcon
  

   Tasklist : TaskInterface[] = []
   checked : boolean = false
   NewTask: string = ""

   AddTask()
   {
    if(this.NewTask != "")
    {
       let task : TaskInterface = 
      {
        id: Date.now(),
        description: this.NewTask,
        completed: false
      }

      this.Tasklist.push(task);
      this.NewTask = ""
    }
      
     
   

   }

   EditTask(task : TaskInterface)
   {
       task.description = "nada";

   }

   RemoveTask(task: TaskInterface)
   {
     
     this.Tasklist = this.Tasklist.filter((x) => x.id != task.id)

   }

  Ativar(evento : Event)
  {

    

    const botao = evento.target as HTMLElement

    var Button1 = document.getElementById("button1")
     var Button2 = document.getElementById("button2")
     var Button3 = document.getElementById("button3")

     Button1?.classList.remove("ativo")
     Button2?.classList.remove("ativo")
     Button3?.classList.remove("ativo")

     botao.classList.add("ativo")
     
    

 
    
    
    
   
    
  }



}
