import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, TextAlignJustifyIcon, Trash } from 'lucide-angular';
import { Task } from '../../app';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, FormsModule, CommonModule, LucideAngularModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
