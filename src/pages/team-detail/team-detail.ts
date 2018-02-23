import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TeamDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 import * as _ from 'lodash';

 import { GamePage } from '../pages';
 import { EliteApi } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})

export class TeamDetailPage {
  games: any[];
  team: any;
  private tourneyData: any;

  constructor(private nav: NavController, 
              private navParams: NavParams,
              private eliteApi: EliteApi) {
    //this.team = this.navParams.data;
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
    this.team = this.navParams.data;
    this.tourneyData = this.eliteApi.getCurrentTourney();

    this.games = _.chain(this.tourneyData.games)
                  .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                  .map(g => {
                    let isTeam1 = (g.team1Id === this.team.id);
                    let opponentname = isTeam1 ? g.team2 : g.team1;
                    let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                    return {
                      gameId: g.id,
                      opponent: opponentname,
                      time: Date.parse(g.time),
                      location: g.location,
                      locationUrl: g.locationUrl,
                      scoreDisplay: scoreDisplay,
                      homeAway: (isTeam1 ? "vs." : "at")
                    };
                  })
                  .value();
  }

  getScoreDisplay(isTeam1, team1Score, team2Score){
    if (team1Score && team2Score){
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    } else {
      return "";
    }

  }

  gameClicked($event, game){
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId)
    this.nav.parent.parent.push(GamePage, sourceGame);
  }

}
