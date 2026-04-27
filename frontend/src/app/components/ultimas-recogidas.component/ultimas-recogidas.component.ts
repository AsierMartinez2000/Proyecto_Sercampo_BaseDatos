import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Pipe } from '@angular/core';

@Component({
  selector: 'app-ultimas-recogidas.component',
  imports: [DatePipe],
  templateUrl: './ultimas-recogidas.component.html',
  styleUrl: './ultimas-recogidas.component.css',
})
export class UltimasRecogidasComponent {
  fecha:Date = new Date();

}
