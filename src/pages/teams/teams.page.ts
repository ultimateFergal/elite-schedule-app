import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../pages';

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

  teams = [
    { id: 1, name: 'HC Elite' },
    { id: 2, name: 'Team Takeover' },
    { id: 3, name: 'DC Thunder' }
  ];

  constructor(public nav: NavController, public navParams: NavParams) {
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
  }

}
