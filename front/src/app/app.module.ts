import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './shared/service/http.service';
import { ModalWrapperComponent } from './shared/modals/modal-wrapper/modal-wrapper.component';
import { FormSelectFruitComponent } from './shared/modals/form-select-fruit/form-select-fruit.component'
import { ModalWrapperDirective } from './shared/directives/modal-wrapper.directive';
import { FormCreateFruitComponent } from './shared/modals/form-create-fruit/form-create-fruit.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalWrapperComponent,
    FormSelectFruitComponent,
    ModalWrapperDirective,
    FormCreateFruitComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
