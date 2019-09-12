/** 
 * @author Nitesh Sharma
 */
import { Component, HostListener, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

/**
 * AppFileUploadComponent
 */
@Component({
  selector: 'lib-file-upload',
  templateUrl: './app-file-upload.component.html',
  styleUrls: ['./app-file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AppFileUploadComponent,
      multi: true
    }
  ],
  preserveWhitespaces: true,
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class AppFileUploadComponent implements ControlValueAccessor {
  /**
   * Determines whether change on
   */
  public onChange: Function;
  /**
   * File  of app file upload component
   */
  public file: File | null;

  constructor(private host: ElementRef<HTMLInputElement>) {
    this.file = null;
  }

  /**
   * Hosts listener
   * @param event 
   */
  @HostListener('change', ['$event.target.files']) public emitFiles(event: FileList): void {
    const file: File = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

  /**
   * Writes value
   * @param value 
   */
  public writeValue(value: null): void {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  /**
   * Registers on change
   * @param fn 
   */
  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  /**
   * Registers on touched
   * @param fn 
   */
  public registerOnTouched(fn: Function): void {
  }
}