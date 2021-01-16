import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'coda-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
})
export class CheckBoxComponent implements OnInit {
  @Input() check = false;
  @Output() toggleCheck = new EventEmitter<boolean>(false);

  constructor() {}

  ngOnInit(): void {}

  onCheck(): void {
    this.check = !this.check;
    this.toggleCheck.emit(this.check);
  }
}
