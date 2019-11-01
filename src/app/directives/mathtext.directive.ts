import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
declare var MathJax: any;
@Directive({
  selector: '[mathText]'
})
export class MathTextDirective implements OnChanges {
  // Used to bind data: eg: <div [mathText]="raw string">
  @Input('mathText') inputString: string;
  // host element1
  private hostEl: HTMLElement;
  constructor(public elementRef: ElementRef) {
    this.hostEl = elementRef.nativeElement;
  }
  // have MathJax parse the host element and render the math
  render() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.hostEl]);
  }
  // called when the inputString changes.
  ngOnChanges() {
    // make the input string into the innerText of the host element
    this.hostEl.innerHTML = this.inputString;
    this.render();
  }
}
