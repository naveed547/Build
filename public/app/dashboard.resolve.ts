import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HeroService } from './hero.service';

@Injectable()
export class DashboardResolve implements Resolve<any> {
  constructor(private heroService: HeroService) {}
  
  resolve() {
    return this.heroService.getHeroes();
  }
}