import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DestinationsApiService } from 'src/app/core/api/SearchApi.service';
import {
  finalize,
  debounceTime,
  distinctUntilChanged,
  take,
} from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  id: string | undefined;
  destination = {
    thumbnail: { image_url: '' },
    description: { text: '' },
    city: '',
    country_name: '',
    id: '',
  };
  isLoading = false;
  keyWord$ = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private destinationsApiService: DestinationsApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.id = id;
        this.fetchDestination(this.id);
      }
    });
  }

  fetchDestination(id = '') {
    this.isLoading = true;
    this.destinationsApiService
      .fetchDestination(id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((res) => {
        let destination = res.destination;
        if (destination && destination.id) {
          this.destination = destination;
        } else {
          this.destination = { ...this.destination };
        }
      });
  }

  search() {
    if (this.keyWord$ && this.keyWord$ != '') {
      this.router.navigate(['/home'], {
        queryParams: {
          keyWord: this.keyWord$,
        },
      });
    }
  }

  getBackgroundImage(url: string) {
    return `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("${url}")`;
  }

  alert(str: string) {
    alert('contact me at ' + str);
  }
}
