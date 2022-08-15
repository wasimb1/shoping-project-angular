import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shoping-project';
  selPage: string =  'recipe-list';
  onSelectedPage(page:string) {
    this.selPage = page;
  }
}
