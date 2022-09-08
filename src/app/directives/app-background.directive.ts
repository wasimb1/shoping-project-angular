import { Directive, HostListener, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAppBackground]'
})
export class AppBackgroundDirective implements OnInit {
  @Input() defaultColor: string = '#eaf4f4'
  @HostBinding('style.backgroundColor') backGroundColor: string = '';
  constructor() { }
  ngOnInit(): void {
    this.backGroundColor = 'transparent';
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backGroundColor = this.defaultColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backGroundColor = 'transparent';
  }
}
