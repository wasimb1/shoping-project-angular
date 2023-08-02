import { Directive, ElementRef, HostListener } from '@angular/core';
import { CommonService } from '../common/services/common-service.service';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  constructor(
    private elementRef: ElementRef,
    private commonService: CommonService
  ) { console.log("Click Outside Directive")}

  @HostListener('document:click', ['$event.target'])
  public async onClick(targetElement: any, key: string) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    const myComponent = targetElement.closest('.list-container');
     // Add a slight delay before setting the isListOpen value
     setTimeout(() => {
      if (!myComponent) {
        // Close the list
         this.commonService.isListOpen.next(false);
      }
      else
        this.commonService.isListOpen.next(true);
    }, 100);
  }

  @HostListener('document:keyup', ['$event'])
  public onKeyUp(event: any) {
    if (event.key === 'Tab') {
      const myComponent = event.target.closest('.list-container');
      if(!myComponent)
        this.commonService.isListOpen.next(false);
      else
      this.commonService.isListOpen.next(true);
    }
  }
}
