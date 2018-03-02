import { Injectable } from "@angular/core";
//import { LocalStorage, Storage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
import { SqlStorage } from '../providers/sql-storage/sql-storage';
import { Events } from 'ionic-angular';

import * as _ from 'lodash';

const win: any = window;

@Injectable()
export class UserSettings {
    //storage = new Storage(SqlStorage);
    public db: SQLite;
    public sql: SqlStorage;

    private sqlMode = false;
    
    constructor(public events: Events, public storage: Storage){
        if (win.sqlitePlugin) {
            this.sql = new SqlStorage(this.db);
        } else {
            console.warn('SQLite plugin not installed. Falling back to regular Ionic Storage.');
        }

        if (win.sqlitePlugin) {
            this.sqlMode = true;
          } else {
            console.warn('SQLite plugin not installed. Falling back to regular Ionic Storage.');
          }
    }

    favoriteTeam(team, tournamentId, tournamentName){
        let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName}

        if (this.sql){
            this.sql.set(team.id.toString(), JSON.stringify(item)).then(data => {
                this.events.publish('favorites:changed');//Es posible pasarle parámetros en la publicación del evento también
            });
        } else {
            return new Promise(resolve => {
                this.storage.set(team.id.toString(), JSON.stringify(item)).then(() => {
                    this.events.publish('favorites:changed');//Es posible pasarle parámetros en la publicación del evento también
                    resolve();
                });
            });
        }   
    }

    unfavoriteTeam(team) {
        if (this.sql){
            this.sql.remove(team.id.toString()).then(data => {
                this.events.publish('favorites:changed');
            });
        } else {
            return new Promise(resolve => {
                this.storage.remove(team.id.toString()).then(() => {
                    this.events.publish('favorites:changed');
                    resolve();
                });
            });
        }
    }

    isFavoriteTeam(teamId) {
        if (this.sql){
            return this.sql.get(teamId.toString()).then(value => value ? true : false);
        } else {
            return new Promise(resolve => resolve(this.storage.get(teamId.toString()).then(value => value ? true : false)));
        }
    }

    //Al momento de hacer esto se había implementado la libreria Web Sql, entonce esto no funciona
    //porque no está guardado en Local Storage del navegador sino en Web SQL
    getAllFavorites(){
        let items = [];
        _.forIn(window.localStorage, (v, k) => {console.log(window.localStorage)
            console.log(v);
            console.log(k);
            if (v > 0){
                console.log(v+"si");
                console.log(k+"si");
                items.push(JSON.parse(v));
            } else {
                console.log(v+"no");
                console.log(k+"no");
            }
        });
        return items.length ? items : null;
    }

    /* getAllFavorites() : Promise<any[]> {
        if (this.sqlMode) {
          return this.sql.getAll();
        } else {
          return new Promise(resolve => {
            let results = [];
            this.storage.forEach(data => {
              console.log('***inside foreach', data);
              results.push(JSON.parse(data));
            });
            return resolve(results);
          });
        }
      }
    
      initStorage(): Promise<any> {
        if (this.sqlMode) {
          return this.sql.initializeDatabase();
        } else {
          return new Promise(resolve => resolve());
        }
      } */
}