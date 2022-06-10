import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DestinationsApiService {
  constructor(private httpClient: HttpClient) {}

  fetchDestinations(search_value = '', type = 'city_or_country') {
    return this.httpClient.get<any>(
      `https://devapi.luckytrip.co.uk/api/2.0/top_five/destinations?search_type=${type}&search_value=${search_value}`
    );
  }

  fetchDestination(id = '') {
    return this.httpClient.get<any>(
      `https://devapi.luckytrip.co.uk/api/2.0/top_five/destination?id=${id}`
    );
  }
}
