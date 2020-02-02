import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Source } from 'src/app/models/source';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/auth/authentication-service';

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
  currentUser: User;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


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
