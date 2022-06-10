import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Hero } from 'src/app/model/hero';
// import { HEROES } from 'src/app/model/mock-heroes';
import { MessageService } from './messages/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = "https://628b2f157886bbbb37b20caa.mockapi.io/heroes";


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private messageServ: MessageService, private http: HttpClient) { }

  getHeroes(): Observable<Hero[]>{
    // const heroes = of(HEROES);
    // this.log('Salve! Sono l\'hero service, ho caricato gli eroi!')
    // return heroes;
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap (_ => this.log(`Ho caricato gli eroi usando la tap`)),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getHero(id: string): Observable<Hero>{
    // const hero = HEROES.find(h => h.id === id)!;
    // this.log(`HeroService: fetched hero id=${id}`);
    // return of(hero);
    const heroUrl = this.heroesUrl + '/' + id;
    return this.http.get<Hero>(heroUrl).pipe(
      tap(_ => this.log("Ho caricato l'eroe con id: " + id)),
      catchError(this.handleError<Hero>('getHeroes'))
    );

  }

  log(message: string): void{
  this.messageServ.add(message);
  }

  /** PUT: update the hero on the server */
updateHero(hero: Hero): Observable<Hero> {
  const heroUrl = this.heroesUrl + '/' + hero.id;
  return this.http.put<Hero>(heroUrl, hero, this.httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}

/** POST: add a new hero to the server */
addHero(hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}


deleteHero(id: string): Observable<Hero>{
  const heroUrl = this.heroesUrl + '/' + id;
  return this.http.delete<Hero>(heroUrl, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

searchHeroByName(term: string) :Observable<Hero[]>{
  const searchString = term.trim();
  if (searchString) {
    const searchUrl = this.heroesUrl + '/?name' + searchString;
    return this.http.get<Hero[]>(searchUrl).pipe(
    tap(heroArray => heroArray.length !== 0 ?
       this.log(`found heroes matching "${term}"`) :
       this.log(`no heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  )
  } else{
    return of([]);
  }
}


  // find(id: number){
  //   for (const hero of HEROES) {
  //     if (hero.id === id) {
  //       return hero;
  //     }
  //   }
  //   return undefined;
  // }
}
