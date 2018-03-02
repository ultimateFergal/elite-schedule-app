import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MyTeamsPage } from '../pages/pages';
import { GamePage } from '../pages/pages';
import { TournamentsPage } from '../pages/pages';
import { TeamsPage } from '../pages/pages';
import { TeamHomePage } from '../pages/pages';
import { TeamDetailPage } from '../pages/pages';
import { StandingsPage } from '../pages/pages';
import { SqlStorage } from '../providers/sql-storage/sql-storage';
import { SQLite } from '@ionic-native/sqlite';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { provideStorage } from '@ionic/storage/dist/storage';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MyTeamsPage,
    TournamentsPage,
    GamePage,
    TeamsPage,
    TeamHomePage,
    TeamDetailPage,
    StandingsPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()//Para que sirva el puto Storage que casi que no con esa cambiada de sqllite
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MyTeamsPage,
    TournamentsPage,
    GamePage,
    TeamsPage,
    TeamHomePage,
    TeamDetailPage,
    StandingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    /*SqlStorage,
    SQLite,*/
    //{ provide: Storage, useFactory: provideStorage, deps: [{}] }
  ]
})
export class AppModule {}
