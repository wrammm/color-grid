import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LevelViewComponent } from './level-view/level-view.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'levels',
    component: LevelViewComponent
  },
  {
    path: 'game',
    component: GameComponent
  },
  { path: '**', 
    component: LandingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
