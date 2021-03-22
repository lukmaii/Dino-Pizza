import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
  }

  selectedPath(value: string) {
    this.eventEmitterService.onModalButtonClick(value);
  }

}
