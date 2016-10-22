import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule }  from '@angular/router';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './hero-dashboard/dashboard.component';
import { HeroesComponent }      from './hero-component/heroes.component';
import { HeroDetailComponent }  from './hero-details/hero-detail.component';
import { HeroService }          from './hero.service';
import { HeroSearchComponent }  from './hero-search/hero-search.component';
import { DashboardResolve } from './dashboard.resolve';
import { DetailResolve } from './detail.resolve';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
		resolve: {
		  heroData: DashboardResolve
		}
      },
      {
        path: 'detail/:id',
        component: HeroDetailComponent,
		resolve: {
		  detailData: DetailResolve
		}
      },
      {
        path: 'heroes',
        component: HeroesComponent,
		resolve: {
		  heroData: DashboardResolve
		}
      }
    ])
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent
  ],
  providers: [
    HeroService,DashboardResolve,DetailResolve
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}