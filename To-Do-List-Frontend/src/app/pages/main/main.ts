import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-main',
  imports: [SelectButtonModule, FormsModule],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

  stateOptions = [
    {
      label: "Total", value: "a"

    },
    {
       label: "Concluidas", value: "b"
    },
    {
       label: "Ativas", value: "c"
    }
  ]

  value : string = "";

}
