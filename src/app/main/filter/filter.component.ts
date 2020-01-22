import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Source } from 'src/app/models/source';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() sources: Source[];
  @Output() changeSource = new EventEmitter<string>();
  @Output() clickFilterButton = new EventEmitter<string>();
  @Output() clickCreatedByMeCheckbox = new EventEmitter<boolean>();

  filterInput: string;

  constructor() { }

  ngOnInit() {
  }

  onChangeSource(selectedSource) {
    this.changeSource.emit(selectedSource.value);
  }

  globalFilter() {
    this.clickFilterButton.emit(this.filterInput);
  }

  createdByMeFilter(selectedOption) {
    this.clickCreatedByMeCheckbox.emit(selectedOption);
  }
}
