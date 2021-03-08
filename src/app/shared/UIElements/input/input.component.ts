import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'coda-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() icon;
  @Input() type = 'text';

  @Input() inputTemplate: TemplateRef<any>;
  @Output() filter = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onInput(inputData: string): void {
    this.filter.next(inputData);
  }
}
