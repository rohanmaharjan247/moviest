import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchQuery = '';

  searchResult: any;

  constructor(
    private avRouter: ActivatedRoute,
    private _homeService: HomeService,
    private title: Title,
    public _config: ConfigurationService
  ) {
    console.log(this.avRouter.snapshot.queryParams, 'query params');
    this.searchQuery = this.avRouter.snapshot.queryParams.query;
    this.title.setTitle(`${this.searchQuery} - Moviest`);
  }

  ngOnInit(): void {
    this.searchAll();
  }

  searchAll() {
    this._homeService.searchAll(this.searchQuery).subscribe((data: any) => {
      console.log(data, 'search');
      this.searchResult = data;
    });
  }
}
