import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, TextAlignJustifyIcon, Trash, CircleCheck } from 'lucide-angular';
import { Task } from '../../app';
import { ButtonModule } from 'primeng/button';
import { Icon } from '../../Components/icon/icon';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, FormsModule, CommonModule, LucideAngularModule, ButtonModule, Icon],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {


}
