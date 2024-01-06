import { Component, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { ENABLE_LEVEL_LOCK_HACK } from '../constants/game-levels.constants';
import { LevelService } from '../services/level.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  constructor(private router: Router, private levelService: LevelService) {}
  clicks = 0;

  startGame() {
    this.router.navigate(['/levels']);
  }
  screenClick() {
    if (isDevMode()) {
      this.clicks++;
      if (ENABLE_LEVEL_LOCK_HACK && this.clicks >= 5) {
        this.levelService.setEnableLevelLockHack(true);
      }
    }
  }
  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
}
