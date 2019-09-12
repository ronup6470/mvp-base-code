/** 
 * @author Ronak Patel.
 * @description create directive for set class when input property has focus and remove class when blur. 
 */

import { Directive, ElementRef, Renderer2, HostListener, OnInit, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { take } from 'rxjs/operators/take';

/**
 * Directive
 */
@Directive({
  selector: '[floatingLabel]',
  exportAs: 'floatingLabel'
})
export class FloatingLabelDirective implements OnInit {
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    @Optional() private ngControl: NgControl
  ) {
  }

  /**
   * after view init
   */
  public ngOnInit(): void {
    if (this.ngControl && this.ngControl.value) {
      this.toggleFloatingLabel(true);
    } else {
      this.ngControl && this.ngControl.valueChanges.pipe(take(1)).subscribe(() => {
        this.toggleFloatingLabel(true);
      })
    }
  }

  /**
   * Host listener set class when focus set on any input fields .
   */
  @HostListener('focus') public onFocus(): void {
    if (this.ngControl && !this.ngControl.value) {
      this.toggleFloatingLabel(true);
    }
  }

  /**
   * Host listener remove class when input fields lost focus .
   */
  @HostListener('blur') public onblur(): void {
    if (this.ngControl && !this.ngControl.value) {
      this.toggleFloatingLabel(false);
    }
  }

  /**
   * Toggles floating label
   */
  private toggleFloatingLabel(isToggle: boolean): void {
    if (isToggle) {
      this.renderer.addClass(this.element.nativeElement.parentNode, 'float-above')
    } else {
      this.renderer.removeClass(this.element.nativeElement.parentNode, 'float-above');
    }
  }

}
