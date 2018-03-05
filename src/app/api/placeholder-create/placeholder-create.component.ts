import { Component, OnInit, ViewChild } from '@angular/core';
import { PlaceholderData } from '../placeholder-data.model';
import { RestService } from '../rest.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-placeholder-create',
  templateUrl: './placeholder-create.component.html',
  styleUrls: ['./placeholder-create.component.scss']
})
export class PlaceholderCreateComponent implements OnInit {
  @ViewChild('createForm') form: NgForm;
  isLoading = false;
  couldNotLoadData = false;

  constructor(private restService: RestService) {
  }

  ngOnInit() {
    this.restService.dataIsLoading.subscribe(
      (isLoading: boolean) => this.isLoading = isLoading
    );
    this.restService.dataLoadFailed.subscribe(
      (didFail: boolean) => {
        this.couldNotLoadData = didFail;
        this.isLoading = false;
      }
    );
  }

  onSubmit() {
    const data: PlaceholderData = {
      sentence: this.form.value.sentence as string,
      five: this.form.value.five as number,
      truefalse: this.form.value.truefalse as boolean
    };
    this.restService.onStoreData(data);
  }

  onFetchStoredData() {
    this.restService.onRetrieveData(false);
  }
}

