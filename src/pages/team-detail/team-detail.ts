import { Component, } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the TeamDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 import * as _ from 'lodash';
 import * as moment from 'moment';

 import { GamePage } from '../pages';
 import { EliteApi, UserSettings } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})

export class TeamDetailPage {
  allGames: any[];
  dateFilter: string;
  games: any[];
  team: any;
  //isFollowing:boolean = false;
  isFollowing: any = false;
  teamStanding: any;
  private tourneyData: any;
  useDateFilter = false;

  constructor(private alertController: AlertController, 
              private nav: NavController, 
              private navParams: NavParams,
              private toastController: ToastController,
              private eliteApi: EliteApi,
              private userSettings: UserSettings) {
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
    this.allGames = this.games;
    this.teamStanding = _.find(this.tourneyData.standings, { 'teamId': this.team.id });

    this.userSettings.isFavoriteTeam(this.team.id).then(value => this.isFollowing = value);
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

  getScoreWorL(game){
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  getScoreDisplayBadgeClass(game){
    //console.log(game);
    //return game.scoreDisplay.indexOf('W:') === 0 ? 'badge-primary' : 'badge-danger';
    return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger';
  }

  dateChanged(){
    if (this.useDateFilter){
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.games = this.allGames;
    }
  }

  //Seguir, volver o quitar de favorito
  toggleFollow(){
    if(this.isFollowing){
      let confirm = this.alertController.create({
        title: 'Unfollow?',
        message: 'Are you sure you want to unfollow?',
        buttons: [
          { 
            text: 'Yes', 
            handler: () => {
              this.isFollowing = false;
              
              // TODO: persist data
              this.userSettings.unfavoriteTeam(this.team);

              let toast =  this.toastController.create({
                message: 'You have unfollowed this team.',
                duration: 2000,
                position: 'bottom',
              });
              toast.present();
            }
          },
          { text: 'No'}
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true;

      //TODO: persist data
      this.userSettings.favoriteTeam(
        this.team, 
        this.tourneyData.tournament.id, 
        this.tourneyData.tournament.name);
    }
  }

  refreshAll(refresher){
    this.eliteApi.refreshCurrentTourney().subscribe(() => {
      refresher.complete();
      this.ionViewDidLoad();
    })
  }
}
