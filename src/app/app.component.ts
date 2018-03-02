import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http, HttpModule } from '@angular/http';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { MyTeamsPage, TeamHomePage, TournamentsPage } from '../pages/pages';
import { EliteApi, UserSettings } from '../shared/shared';

@Component({
  templateUrl: 'app.html',
  providers:[
    EliteApi,
    UserSettings,
    HttpModule
    
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  favoriteTeams: any[];
  rootPage: any = MyTeamsPage;

  //pages: Array<{title: string, component: any}>;

  constructor(private events: Events,
              public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private userSettings: UserSettings, 
              private loadingController: LoadingController, 
              private eliteApi: EliteApi) {
    this.initializeApp();

    // used for an example of ngFor and navigation
 /*    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ]; */

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.refreshFavorites();//Refresca favoritos al empezar la app

      this.events.subscribe('favorites:changed', () => this.refreshFavorites() ); //para que cambien los favoritos también cuando cambian en el team detail
    });
  }

  refreshFavorites(){
    this.favoriteTeams = this.userSettings.getAllFavorites();
  }

/*   openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  } */
  goHome(){
    this.nav.push(MyTeamsPage);
  }

  //Para que los favoritos aparezcan en el menú de la izquierda
  goToTeam(favorite){
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId).subscribe(l => this.nav.push(TeamHomePage))
  }

  goToTournaments(){
    this.nav.push(TournamentsPage);
  }
}
