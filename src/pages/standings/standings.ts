import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as _ from 'lodash';
/**
 * Generated class for the StandingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { EliteApi} from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {

  allStandings: any[];
  divisoinFilter = 'division';
  standings: any[];
  team: any;
  constructor(private nav: NavController, 
              private navParams: NavParams,
              private eliteApi: EliteApi) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StandingsPage');

    this.team = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;
/* //Para mostrarlo emparejado y organizado por divisiones
    this.allStandings = 
      _.chain(this.standings)
      .groupBy('division')
      .toPairs()
      .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
      .value(); */

      //console.log('standings:', this.standings);
      //console.log('division Standings', this.allStandings);

      this.allStandings =tourneyData.standings;

      this.filterDivision();
  }

  filterDivision(){
    if(this.divisoinFilter === 'all'){
      this.standings = this.allStandings;      
    } else {
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
    }
  }

  getHeader(record, recordIndex, records){
/*     if(recordIndex % 10 === 0){
      return 'Header!';
    } 
      return null; */
      if(recordIndex === 0 || record.division !== records[recordIndex-1].division){
        return record.division;
      } 
        return null;      
  }

}
