import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Configuration } from '../models/configuration.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  public _config: Configuration = {
    change_keys: [],
    images: {
      backdrop_sizes: [],
      base_url: '',
      logo_sizes: [],
      poster_sizes: [],
      profile_sizes: [],
      secure_base_url: '',
      still_sizes: [],
    },
  };

  public imageUrl: string = '';

  constructor(
    @Inject('BASE_API_URL') public baseUrl: string,
    private httpClient: HttpClient
  ) {}

  getConfiguration() {
    this.httpClient
      .get<Configuration>(`${this.baseUrl}/configuration`)
      .subscribe((data) => {
        console.log(data, "config");
        this._config = data;
        this.imageUrl = data.images.base_url + data.images.backdrop_sizes[1];
      });
  }

  getCountries() {
    return this.httpClient.get(`${this.baseUrl}/configuration/countries`);
  }

  getPrimaryTranslation() {
    return this.httpClient.get(
      `${this.baseUrl}/configuration/primary_translations`
    );
  }
}
