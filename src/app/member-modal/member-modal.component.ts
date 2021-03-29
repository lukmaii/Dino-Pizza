import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-member-modal',
    templateUrl: './member-modal.component.html',
    styleUrls: ['./member-modal.component.css']
})
export class MemberModalComponent implements OnInit {

    members = [{ id: "61010888", firstname: "รวิสรา", lastname: "หนูเพ็ง" },
    { id: "61010960", firstname: "วัชรินทร์", lastname: "กัณหา" },
    { id: "61011023", firstname: "ศิริวรรณ", lastname: "กุลละวณิชย์" },
    { id: "61011052", firstname: "ศุภฤกษ์", lastname: "ทองดี" },
    { id: "61011182", firstname: "อนัญญา", lastname: "บุตวงศ์" },
    { id: "61011248", firstname: "อุษณี", lastname: "บางใหญ่" }]

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
    }
}
