import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute }            from '@angular/router';

import { Hero }        from 'public/app/hero';
import { HeroService } from 'public/app/hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private router: Router,
	private router2: ActivatedRoute,
    private heroService: HeroService) {
  }

  ngOnInit(): void {
	this.heroes = this.router2.snapshot.data['heroData'].slice(1, 5)
    //this.heroService.getHeroes()
      //.then(heroes => this.heroes = heroes.slice(1, 5));
	  //console.log(this.router2.snapshot.data['heroData'])
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero._id];
    this.router.navigate(link);
  }
}