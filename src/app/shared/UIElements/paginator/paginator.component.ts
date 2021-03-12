import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'coda-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit {
  @Input() itemsCount = 0;
  @Input() pageSize = 0;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();
  pages: number[];

  constructor() {}

  ngOnInit(): void {    
    const totalPages = Math.ceil(this.itemsCount / this.pageSize);

    this.pages = Array(totalPages)
      .fill(0)
      .map((_, idx) => idx + 1);
  }

  onPageClick(pageNumber: number): void {
    this.pageChange.emit(pageNumber);
  }
}
