import { Component, EventEmitter, Input, OnInit, Type, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { ModalWrapperDirective } from '../../directives/modal-wrapper.directive'

export type ModalComponentInstance<C, I, O> = Omit<NgbModalRef, 'componentInstance'|'result'>  & {
  componentInstance: {
    component    : Type<C>
    componentData: I
    modalData    : ModalData
  },
  result: Promise<O>
}

export interface FormComponent<DataInput, DataOutput>
{
  data       : DataInput
  submitData : EventEmitter<DataOutput>
  submitClose: EventEmitter<never>
}

export type ModalData = {
  title: string
}

export class ModalForm<T, D>
{
  constructor(public component: Type<T>, public data: D) {}
}


@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss']
})
export class ModalWrapperComponent implements OnInit {

  @Input() public component!    : Type<never>
  @Input() public componentData!: never
  @Input() public modalData!    : ModalData

  @ViewChild(ModalWrapperDirective, {static: true}) modalWrapperHost!: ModalWrapperDirective;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void
  {
    this.loadComponent()
  }

  public loadComponent()
  {
    const modalForm = new ModalForm(this.component, this.componentData);
    const viewContainerRef = this.modalWrapperHost.viewContainerRef;
    viewContainerRef.clear()

    const component = viewContainerRef.createComponent<FormComponent<unknown, unknown>>(modalForm.component)
    component.instance.data = modalForm.data;
    component.instance.submitData.subscribe(this.activeModal.close)
    component.instance.submitClose.subscribe(this.activeModal.close)
  }
}
