import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { PlaceholderData } from './placeholder-data.model';
import { AuthService } from '../user/auth.service';
import { ConfigurationServicePlaceholders } from 'amazon-cognito-identity-js/node_modules/aws-sdk/lib/config_service_placeholders';
/*
Step 1:  Replace 'Placeholder' with the name of your actual Model
Step 2:  Add your api_gateway endpoint
 */
@Injectable()
export class RestService {
  apiEndpoint = 'API_GATEWAY_ENDPOINT';
  dataEdited = new BehaviorSubject<boolean>(false);
  dataIsLoading = new BehaviorSubject<boolean>(false);
  dataLoaded = new Subject<PlaceholderData[]>();
  dataLoadFailed = new Subject<boolean>();
  userData: PlaceholderData;
  constructor(private http: Http,
              private authService: AuthService) {
  }

  onStoreData(data: PlaceholderData) {
    this.dataLoadFailed.next(false);
    this.dataIsLoading.next(true);
    this.dataEdited.next(false);
    this.userData = data;
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        return;
      }
      this.http.post('#{apiEndpoint}', data, {
        headers: new Headers({'Authorization': session.getIdToken().getJwtToken()})
      })
        .subscribe(
          (result) => {
            this.dataLoadFailed.next(false);
            this.dataIsLoading.next(false);
            this.dataEdited.next(true);
          },
          (error) => {
            this.dataIsLoading.next(false);
            this.dataLoadFailed.next(true);
            this.dataEdited.next(false);
          }
        );
    });
  }
  onRetrieveData(all = true) {
    this.dataLoaded.next(null);
    this.dataLoadFailed.next(false);
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      const queryParam = '?accessToken=' + session.getAccessToken().getJwtToken();
      let urlParam = 'all';
      if (!all) {
        urlParam = 'single';
      }
      this.http.get('#{apiEndpoint}' + urlParam + queryParam, {
        headers: new Headers({'Authorization': session.getIdToken().getJwtToken()})
      })
        .map(
          (response: Response) => response.json()
        )
        .subscribe(
          (data) => {
            if (all) {
              this.dataLoaded.next(data);
            } else {
              console.log(data);
              if (!data) {
                this.dataLoadFailed.next(true);
                return;
              }
              this.userData = data[0];
              this.dataEdited.next(true);
            }
          },
          (error) => {
            console.log(error);
            this.dataLoadFailed.next(true);
            this.dataLoaded.next(null);
          }
        );
    });
  }
  onDeleteData() {
    this.dataLoadFailed.next(false);
    this.authService.getAuthenticatedUser().getSession((err, session) => {
      this.http.delete('#{apiEndpoint}/?accessToken=XXX', {
        headers: new Headers({'Authorization': session.getIdToken().getJwtToken()})
      })
        .subscribe(
          (data) => {
            console.log(data);
          },
          (error) => this.dataLoadFailed.next(true)
        );
    });
  }
}
