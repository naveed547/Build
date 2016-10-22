import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'http://localhost:3000/api/v1/todos';  // URL to web api1
  private heroesUrl2 = 'http://localhost:3000/api/v1/todo';  // URL to web api2

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero> { 
	  //console.log(this.http.get(this.heroesUrl).toPromise());
    return this.http.get(this.heroesUrl)
               .toPromise()
			   .then(response => response.json() as Hero[])
               .catch(this.handleError);
	
  }

   getHero(id: string): Promise<Hero> {
	return this.http.get(`${this.heroesUrl2}/${id}`)
               .toPromise()
			   .then(response => response.json())
               .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.heroesUrl2}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl2, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl2}/${hero._id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  } 

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}



/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/