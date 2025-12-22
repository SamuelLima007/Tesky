import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, TextAlignJustifyIcon, Trash } from 'lucide-angular';



export interface Task {
  id: number;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
 
}
