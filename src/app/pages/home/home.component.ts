import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DestinationsApiService } from 'src/app/core/api/SearchApi.service';
DestinationsApiService;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  destinations = [];
  isLoading = true;
  keyWord$ = new Subject<string>();
  constructor(
    private route: ActivatedRoute,
    private destinationsApiService: DestinationsApiService
  ) {}

  ngOnInit(): void {
    this.keyWord$
      .pipe(
        debounceTime(400), // discard emitted values that take less than the specified time between output
        distinctUntilChanged() // only emit when value has changed
      )
      .subscribe((str) => {
        this.fetchDestinations(str);
      });
    this.route.queryParams.subscribe((params) => {
      let keyWord = params['keyWord'];
      if (keyWord) {
        this.fetchDestinations(keyWord);
      } else {
        this.fetchDestinations();
      }
    });
  }

  fetchDestinations(val = '', from = 26, to = 35) {
    this.isLoading = true;
    this.destinationsApiService
      .fetchDestinations(val)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((res) => {
        let destinations = res.destinations;
        if (destinations && destinations.length > 0) {
          if (destinations.length >= to) {
            this.destinations = destinations.slice(from, to);
          } else {
            this.destinations = res.destinations;
          }
        } else {
          this.destinations = [];
        }
      });
  }
}
