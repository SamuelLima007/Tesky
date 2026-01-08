import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, TextAlignJustifyIcon, Trash } from 'lucide-angular';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

export interface Task {
  id: number;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, LucideAngularModule, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
