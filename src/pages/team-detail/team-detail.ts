import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TeamDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  team: any;

  constructor(public nav: NavController, public navParams: NavParams) {
    this.team = this.navParams.data;
    console.log('**nav params: ', this.navParams)
  }

  goHome(){
    //this.nav.push(MyTeamsPage)
    //this.nav.popToRoot()
    //este es una pestania entonces para volver al home se debe usar lo sigiuente y nolo anterior
    console.log('**parent', this.nav.parent);
    this.nav.parent.parent.popToRoot();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamDetailPage');
  }

}
