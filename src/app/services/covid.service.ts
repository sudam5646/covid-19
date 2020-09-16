import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  private state_district_wiseUrl = 'https://api.covid19india.org/state_district_wise.json';
  private state_wiseUrl = 'https://api.covid19india.org/data.json';


  constructor(private _http : HttpClient) { }
  getStateDistrictWise(){
    return this._http.get(this.state_district_wiseUrl)
  }
  getStateWise(){
    return this._http.get(this.state_wiseUrl)
  }


}
