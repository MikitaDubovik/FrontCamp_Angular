import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service'
import { Source } from '../models/source';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  sources: Source[];
  title: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.title = 'Please, choose source';
    this.apiService.getSources().subscribe(
      resp => {
        console.log(resp);
        this.sources = resp.sources;
        console.log(this.sources);
      }
    );
  }

  onChangeObj(selectedSource) {
    let id = selectedSource.target.value
    this.apiService.getArticles(id).subscribe(resp => { console.log(resp) });
    this.title = this.sources.find(s => s.id === id).name;
  }

}
