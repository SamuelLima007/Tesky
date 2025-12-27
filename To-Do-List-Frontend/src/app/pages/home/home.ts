import { Component, signal, ChangeDetectorRef } from '@angular/core';
import {RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, TextAlignJustifyIcon, Trash, CircleCheck } from 'lucide-angular';

import { ButtonModule } from 'primeng/button';
import { Icon } from '../../Components/icon/icon';


@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, LucideAngularModule, ButtonModule, Icon, RouterModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {


}
