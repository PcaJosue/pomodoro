import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  @ViewChild('who') public who: ElementRef;
  @ViewChild('why') public why: ElementRef;
  @ViewChild('what') public what: ElementRef;
  constructor() { }


  ngOnInit(): void {
  }

  goToWho() {
    this.who.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' })
  }

  goToWhy() {
    this.why.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' })
  }

  goToWhat() {
    this.what.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' })

  }
}
