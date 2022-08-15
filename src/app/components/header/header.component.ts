import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() slectedPage = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  changePage(page: string) {
    this.slectedPage.emit(page);
  }
}
