import { Component, OnInit } from '@angular/core';
import { StreamingService } from '../services/streaming.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpParams } from '@angular/common/http';

export interface PeriodicElement {
  name: string;
  num: number;
  rating: number;
  genre: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {num: 1, name: 'Hydrogen', rating: 1.0079, genre: 'H'},
  {num: 2, name: 'Helium', rating: 4.0026, genre: 'He'},
  {num: 3, name: 'Lithium', rating: 6.941, genre: 'Li'},
  {num: 4, name: 'Beryllium', rating: 9.0122, genre: 'Be'},
  {num: 5, name: 'Boron', rating: 10.811, genre: 'B'},
  {num: 6, name: 'Carbon', rating: 12.0107, genre: 'C'},
  {num: 7, name: 'Nitrogen', rating: 14.0067, genre: 'N'},
  {num: 8, name: 'Oxygen', rating: 15.9994, genre: 'O'},
  {num: 9, name: 'Fluorine', rating: 18.9984, genre: 'F'},
  {num: 10, name: 'Neon', rating: 20.1797, genre: 'Ne'},
];

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

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
    this.streamingService.getMovies({params: queryParams})
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
    this.streamingService.getMovies({params: queryParams})
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
