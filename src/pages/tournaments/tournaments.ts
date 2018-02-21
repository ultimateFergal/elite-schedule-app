import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MyTeamsPage, TeamsPage } from '../pages';
/**
 * Generated class for the TournamentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  constructor(private nav: NavController, public navParams: NavParams) {
  }


  itemTapped(){
    this.nav.push(TeamsPage);
  }

  //Para usar con el boton de back manual
  navigate(){
    this.nav.pop();
  }

/*   ionViewDidLoad() {
    console.log('ionViewDidLoad TournamentsPage');
  } */

}
