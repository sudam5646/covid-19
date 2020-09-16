import { Component } from '@angular/core';
import { CovidService } from './services/covid.service';
import { GoogleChartInterface } from 'ng2-google-charts';
// import * as CanvasJS from './canvasjs.min';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private CovidService : CovidService){}
  title = 'covid-app';
  StateDistrictdata;
  Statedata
  StateDistrictdataResponse = [];
  arrar;
  finalData = [];
  Object = Object;
  JSON = JSON;
  console = console;
  ngOnInit(){
    this.CovidService.getStateDistrictWise()
    .subscribe((resCovidData: any) => {

      Object.entries(resCovidData).forEach(([key, value]) => this.finalData[key] = value);
      console.log("final data",this.finalData);

    }
      )
      this.CovidService.getStateWise()
      .subscribe((resCovidData: any) => {
        this.Statedata = resCovidData.statewise;
        // this.Statedata.sort((a,b) => a.confirmed.localeCompare(b.confirmed.rendered));
        this.Statedata.sort((a, b) => parseFloat(b.confirmed) - parseFloat(a.confirmed));
      }
        )
  }
  jsonformat(state){
    console.log("state",state)
    return JSON.stringify(state);
  }
  statename = "";
  showdistrictwise = false;
  showDistrictWise(state){
    this.showdistrictwise = true;
    this.statename = state;
    this.firstrowadded = false;
    console.log('state',this.statename);
  }
  firstrowadded = false;
  firstrow(){
    this.firstrowadded = true;
  }
 
  public pieChart: GoogleChartInterface;
drawGraph(state){
  let Confirmed : Number = Number(state.confirmed);
  let Active : Number = Number(state.active);
  let Recovered : Number = Number(state.recovered);
  let Deaths : Number = Number(state.deaths);

  this.pieChart = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Category', 'Confirmed','Active','Recovered','Deaths'],
      ['Covid-19 chart', Confirmed,Active,Recovered,Deaths],
      // ['Active',      200000,10],
      // ['Recovered',  200000,10],
      // ['Deaths',    700000,10]
    ],
    options: {'title': 'India Corona updates',
            'width': 700,
            'height': 600},
    //firstRowIsData: true,
    // options: {'title': 'India Corona updates'},
  };
}

showgraph = false;
public pieChartforDistrict: GoogleChartInterface;
drawGraphforDistrict(confirmed,active,recovered,deaths,dist){
  this.showgraph = true;
  let Confirmed : Number = Number(confirmed);
  let Active : Number = Number(active);
  let Recovered : Number = Number(recovered);
  let Deaths : Number = Number(deaths);
  let Dist = dist + ' Corona updates';
console.log('Dist',Dist)

  this.pieChartforDistrict = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Category', 'Confirmed','Active','Recovered','Deaths'],
      ['Covid-19 chart', Confirmed,Active,Recovered,Deaths],
    ],
    options: {'title': Dist,
            'width': 700,
            'height': 600},
    //firstRowIsData: true,
    // options: {'title': 'India Corona updates'},

  };
}


setshowgraph(){
  this.showgraph = false;
}

}
