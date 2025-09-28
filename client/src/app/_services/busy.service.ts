import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;
  isLoading = false;

  busy() {
    this.busyRequestCount++;
    this.isLoading = true;
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.isLoading = false;
    }
  }
}
