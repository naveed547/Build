import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot} from '@angular/router';
import { HeroService } from './hero.service';

@Injectable()
export class DetailResolve implements Resolve<any> {
  constructor(private heroService: HeroService) {}
  
  resolve(route: ActivatedRouteSnapshot) {
    return this.heroService.getHero(route.params.id);
  }
}