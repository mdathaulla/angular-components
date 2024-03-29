import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmptyStringsToNullDirective } from './directives/empty-string-to-null.directive';

@NgModule({
  declarations: [EmptyStringsToNullDirective],
  imports: [CommonModule, FlexLayoutModule],
  exports: [CommonModule, FlexLayoutModule, EmptyStringsToNullDirective]
})
export class SharedModule {}
