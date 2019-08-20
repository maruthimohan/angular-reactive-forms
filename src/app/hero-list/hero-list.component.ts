import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import {Hero} from '../data-model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

    heroes: Observable<Hero[]>;
    isLoading = false;
    selectedHero: Hero;
    selectedStatuses: Array<boolean> = new Array<boolean>();

    constructor(
        private heroService: HeroService
    ) { }

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes() {
        this.isLoading = true;
        this.heroes = this.heroService.getHeroes().pipe(
            // TODO: error handling
            finalize(() => this.isLoading = false)
        );
        this.selectedHero = undefined;
        // Re-initialize the selected statuses
        this.selectedStatuses = new Array<boolean>();
    }

    handleSelections(index: number) {
        // Remove the previously selected value
        if (this.selectedStatuses.indexOf(true) >= 0) {
            const prevIndex = this.selectedStatuses.indexOf(true);
            this.selectedStatuses[prevIndex] = false;
        }
        // Set the current value to true
        this.selectedStatuses[index] = !this.selectedStatuses[index];
    }

    select(hero: Hero, index: number) {
        this.selectedHero = hero;
        // set the selections
        this.handleSelections(index);
    }

}
