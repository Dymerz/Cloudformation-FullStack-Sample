import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { HttpService } from '../../service/http.service'
import { Fruit } from '../../types/fruit.type'
import { FormComponent } from '../modal-wrapper/modal-wrapper.component'


export interface SelectFruitComponentInput
{

}

export interface SelectFruitComponentOutput
{
  id: string
}

@Component({
  selector: 'app-form-select-fruit',
  templateUrl: './form-select-fruit.component.html',
  styleUrls: ['./form-select-fruit.component.scss']
})
export class FormSelectFruitComponent implements OnInit, FormComponent<SelectFruitComponentInput, SelectFruitComponentOutput>
{
  @Input () data!       : SelectFruitComponentInput
  @Output() submitData  = new EventEmitter<SelectFruitComponentOutput>()
  @Output() submitClose = new EventEmitter<never>()


  public fruits: Fruit[] = []
  public formGroup!: FormGroup

  constructor(
    public activeModal: NgbActiveModal,
    public httpService: HttpService,
  ) {}

  ngOnInit(): void
  {
    this.formGroup = new FormGroup({
      id: new FormControl("", [Validators.minLength(1)])
    });

    this.loadFruits()
  }

  public async loadFruits()
  {
    this.fruits = await this.httpService.getFruits()
    console.log(this.fruits);

  }

  public async onSubmit()
  {
    console.log(this.formGroup.controls['id'].value);

    this.submitData.emit({
      id: this.formGroup.controls['id'].value
    })
  }
}
