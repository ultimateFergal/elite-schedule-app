import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { MyTeamsPage, TeamsPage } from '../pages';
import { EliteApi } from '../../shared/shared';
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

  tournaments: any;

  constructor(private nav: NavController, 
              private eliteApi: EliteApi,
              private loadingController: LoadingController, 
              public navParams: NavParams) {
  }


  itemTapped($event, tourney){
    this.nav.push(TeamsPage, tourney);
  }

  //Para usar con el boton de back manual
  navigate(){
    this.nav.pop();
  }

  ionViewDidLoad() {
    console.log('lifecycle ionViewDidLoad TournamentsPage');

    let loader = this.loadingController.create({
      content: 'Getting tournaments...',
      spinner: 'dots',//Cambia el circulo por defecto a puntos
    })
    loader.present().then(() => {
      this.eliteApi.getTournaments().then(data => this.tournaments = data);//Muestra que se carga mientrs espera la promesa que carga la informaci[on del servicio]
      loader.dismiss();
    })
    //this.eliteApi.getTournaments().then(data => this.tournaments = data);
  }

  ionViewWillEnter() {
    console.log('lifecycle ionViewWillEnter TournamentsPage');
  }

  ionViewWillLeave() {
    console.log('lifecycle ionViewWillLeave TournamentsPage');
  }

  ionViewDidUnload() {
    console.log('lifecycle ionViewDidUnload TournamentsPage');
  }

}
