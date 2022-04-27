import { Component, OnInit } from '@angular/core';
import { StreamingService } from '../services/streaming.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {

  constructor(
    private streamingService: StreamingService,
  ) { }

  displayedColumns: string[] = ['num', 'name', 'genre', 'rating'];
  dataSource: any;

  selection :string = "1";

  genres: string[] = [
    "Action",
    "Comedy",
    "Drama",
    "Fantasy",
    "Period",
    "Political Drama",
    "Thriller"
  ];

  selectedGenre = this.genres[0];

  ngOnInit(): void {
    this.getListByRating();
  }

  getListByRating() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("offset",0);
    queryParams = queryParams.append("query_type",1);
    this.streamingService.getTvShows({params: queryParams})
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res.data);
    }, err => {
    });
  }

  getListByGenre(){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("offset",0);
    queryParams = queryParams.append("query_type",3);
    queryParams = queryParams.append("query", this.selectedGenre);
    this.streamingService.getTvShows({params: queryParams})
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res.data);
    }, err => {
    });
  }

  onSelectChange(ob: any) {
    let selected = Number(ob.value);
    switch(selected) {
      case 1: this.getListByRating();
      break;
      case 2: this.getListByGenre();
      break;
    }
  }

  onGenreSelectedChanged(ob: any) {
    this.getListByGenre();
  }

}
