// Angular modules
import { Component }                     from '@angular/core';
import { OnInit }                        from '@angular/core';
import { FormControl }                   from '@angular/forms';

// External modules
import { NgbModal }                      from '@ng-bootstrap/ng-bootstrap';

// Services
import { HttpService }                   from '../../shared/service/http.service';

// Components
import { SelectFruitComponentInput, SelectFruitComponentOutput } from '../../shared/modals/form-select-fruit/form-select-fruit.component';
import { FormSelectFruitComponent }      from '../../shared/modals/form-select-fruit/form-select-fruit.component';
import { ModalComponentInstance }        from '../../shared/modals/modal-wrapper/modal-wrapper.component';
import { ModalWrapperComponent }         from '../../shared/modals/modal-wrapper/modal-wrapper.component';
import { FormCreateFruitComponent, FormCreateFruitComponentInput, FormCreateFruitComponentOutput } from 'src/app/shared/modals/form-create-fruit/form-create-fruit.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public output!: FormControl<string>

  constructor(
    private httpService: HttpService,
    private ngModal: NgbModal
  ) { }

  ngOnInit(): void
  {
    this.output = new FormControl();
  }

  onPingClicked ()
  {
    this.httpService.ping().then((res) => this.output.setValue(JSON.stringify(res, null, 2)))
  }

  onGetFruitsClicked()
  {
    this.httpService.getFruits().then((res) => this.output.setValue(JSON.stringify(res, null, 2)))
      .catch(console.error)
  }

  onGetFruitClicked()
  {
    const modalRef = this.ngModal.open(ModalWrapperComponent, {centered: true, backdrop: 'static'}) as ModalComponentInstance<FormSelectFruitComponent, SelectFruitComponentInput, SelectFruitComponentOutput>;
    modalRef.componentInstance.component = FormSelectFruitComponent
    modalRef.componentInstance.componentData = {}
    modalRef.componentInstance.modalData = { title: 'Get Fruit by ID' }

    modalRef.result.then((data) => {
      this.httpService.getFruit(data.id).then((res) => this.output.setValue(JSON.stringify(res, null, 2)))
        .catch(console.error)
    }).catch(_ => {})
  }

  onDeleteFruitClicked()
  {
    const modalRef = this.ngModal.open(ModalWrapperComponent, {centered: true, backdrop: 'static'}) as ModalComponentInstance<FormSelectFruitComponent, SelectFruitComponentInput, SelectFruitComponentOutput>;
    modalRef.componentInstance.component = FormSelectFruitComponent
    modalRef.componentInstance.componentData = {}
    modalRef.componentInstance.modalData = { title: 'Get Fruit by ID' }

    modalRef.result.then((data) => {
      this.httpService.removeFruit(data.id).then((res) => this.output.setValue(JSON.stringify(res, null, 2)))
        .catch(console.error)
    }).catch(_ => {})
  }

  onCreateFruitClicked()
  {
    const modalRef = this.ngModal.open(ModalWrapperComponent, {centered: true, backdrop: 'static'}) as ModalComponentInstance<FormCreateFruitComponent, FormCreateFruitComponentInput, FormCreateFruitComponentOutput>;
    modalRef.componentInstance.component = FormCreateFruitComponent
    modalRef.componentInstance.componentData = {}
    modalRef.componentInstance.modalData = { title: 'Get Fruit by ID' }

    modalRef.result.then((data) => {

      this.httpService.createFruit(data.fruit).then((res) => this.output.setValue(JSON.stringify(res, null, 2)))
        .catch(console.error)
    }).catch(_ => {})
  }
}
