import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'coda-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() itemsCount = 0;
  @Input() pageSize = 0;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();
  pages: number[];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.itemsCount) {
      this.initPages();
    }
  }

  ngOnInit(): void {}

  initPages(): void {
    const totalPages = Math.ceil(this.itemsCount / this.pageSize);

    this.pages = Array(totalPages)
      .fill(0)
      .map((_, idx) => idx + 1);
  }

  onPageClick(pageNumber: number): void {
    this.pageChange.emit(pageNumber);
  }
}
