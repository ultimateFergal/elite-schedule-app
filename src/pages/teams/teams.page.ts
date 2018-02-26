import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import * as _ from 'lodash';
import { TeamHomePage } from '../pages';
import { EliteApi } from '../../shared/shared';

/**
 * Generated class for the TeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.page.html',
})
export class TeamsPage {

  private allTeams: any;
  private allTeamsDivisions: any;
  teams = [];
/*   teams = [
    { id: 1, name: 'HC Elite' },
    { id: 2, name: 'Team Takeover' },
    { id: 3, name: 'DC Thunder' }
  ]; */

  constructor(private nav: NavController, 
              private navParams: NavParams, 
              private eliteApi: EliteApi, 
              private loadingController: LoadingController) {
  }

//Pasando parametros en la navegacion
  itemTapped($event, team){
    this.nav.push(TeamHomePage, team);
  } 
/*   itemTapped(){
    this.nav.push(TeamDetailPage);
  } */

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');
    let selectedTourney = this.navParams.data;

    let loader = this.loadingController.create({
      content: 'Getting tournaments...',
    })

    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id)
        .subscribe(data => {
          this.allTeams =   data.teams;
          this.allTeamsDivisions =
              _.chain(data.teams)
              .groupBy('division')
              .toPairs()
              .map(item => _.zipObject(['divisionName','divisionTeams'], item))
              .value();
          this.teams = this.allTeamsDivisions
          //this.teams = data.teams;
          console.log('division teams', this.teams);
      loader.dismiss();
      })
    })
  }

}
