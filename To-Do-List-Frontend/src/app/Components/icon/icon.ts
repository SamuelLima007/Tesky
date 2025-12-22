import { Component } from '@angular/core';
import { LucideAngularModule, CircleCheck } from 'lucide-angular';


@Component({
  selector: 'circle-icon',
  imports: [LucideAngularModule],
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class Icon {

  readonly Circlecheck = CircleCheck;

}
