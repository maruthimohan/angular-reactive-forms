import { Injectable } from '@angular/core';
import { observable, of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Hero, heroes } from './data-model';

@Injectable({
    providedIn: 'root'
})
export class HeroService {

    delayMs = 500;

    constructor() { }

    getHeroes(): Observable<Hero[]> {
        return of(heroes).pipe(
            delay(this.delayMs)
        );
    }

    updateHero(hero: Hero): Observable<Hero> {
        const oldHero = heroes.find(h => h.id === hero.id);
        const newHero = Object.assign(oldHero, hero); // Mutate the cached hero
        return of(newHero).pipe(
            delay(this.delayMs)
        );  // Simulate the latency with delay
    }
}
