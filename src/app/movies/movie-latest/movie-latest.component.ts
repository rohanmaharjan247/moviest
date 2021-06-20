import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { MoviesService } from 'src/app/services/movies.service';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-movie-latest',
  templateUrl: './movie-latest.component.html',
  styleUrls: ['./movie-latest.component.scss']
})
export class MovieLatestComponent implements OnInit {

  latestMovieList:any[] = [];

  page = 1;
  pageLength = 0;
  pageSize = 10;
  pages = [10, 20, 50];

  loadingTrending = false;

  constructor(private _movieService: MoviesService, public _configurationService: ConfigurationService, private dialog: MatDialog, private title:Title) {
    this.title.setTitle('Latest Movie - Moviest');
  }

  ngOnInit(): void {
    this.getLatestMovie();
  }

  getLatestMovie(){
    this.loadingTrending = true;
    this._movieService.getLatestMovies(this.page).subscribe((data:any)=>{
      this.latestMovieList = data.results;
      this.loadingTrending = false;
    })
  }

  pageEvent(event: PageEvent){
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getLatestMovie();
  }

  openDialog(id: number) {
    this.dialog.open(DetailsComponent, {
      data: {
        movieId: id
      },
      panelClass: 'custom-dialog-container'
    });
  }

}
