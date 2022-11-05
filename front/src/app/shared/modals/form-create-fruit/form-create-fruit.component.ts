// Angular modules
import { Component }      from '@angular/core';
import { EventEmitter }   from '@angular/core';
import { Input }          from '@angular/core';
import { OnInit }         from '@angular/core';
import { Output }         from '@angular/core';
import { FormControl }    from '@angular/forms';
import { FormGroup }      from '@angular/forms';
import { Validators }     from '@angular/forms';

// External modules
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// Services
import { HttpService }    from '../../service/http.service';
import { Fruit } from '../../types/fruit.type'

// Components
import { FormComponent }  from '../modal-wrapper/modal-wrapper.component';

export interface FormCreateFruitComponentInput
{

}

export interface FormCreateFruitComponentOutput
{
  fruit: Fruit
}

@Component({
  selector: 'app-form-create-fruit',
  templateUrl: './form-create-fruit.component.html',
  styleUrls: ['./form-create-fruit.component.scss']
})
export class FormCreateFruitComponent implements OnInit, FormComponent<FormCreateFruitComponentInput, FormCreateFruitComponentOutput> {

  @Input () data!       : FormCreateFruitComponentInput
  @Output() submitData  = new EventEmitter<FormCreateFruitComponentOutput>()
  @Output() submitClose = new EventEmitter<never>()


  public formGroup!: FormGroup

  constructor(
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void
  {
    this.formGroup = new FormGroup({
      name: new FormControl("", [Validators.minLength(1)])
    });
  }

  public async onSubmit()
  {
    this.submitData.emit({
      fruit: {
        name: this.formGroup.controls['name'].value
      }
    })
  }
}
