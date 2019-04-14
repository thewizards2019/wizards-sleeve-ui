import { Component, OnInit } from '@angular/core';
// import { FeedService } from 'src/app/feed/feed.service'
// import { Post } from 'src/app/models/Post.model'
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  results = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // lets do some mad processing in here, to filter out the values!
    this.apiService.getAllData().subscribe((items: any) => this.filterResults(items));
  }

  filterResults(items) {
    const userSettings = this.apiService.getUserSettings();
    items.forEach(x => {
      console.log(userSettings.profanityValue, userSettings.sentimentValue);
      //  get this setting from the backend
      if (x.PROFANITY === userSettings.profanityValue && userSettings.sentimentValue > parseFloat(x.SENTIMENT)) {
        this.results.push(x);
      }
    });
  }
}
