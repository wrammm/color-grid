import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GameLevel } from '../classes/game-level';
import { GAME_LEVELS } from '../constants/game-levels.constants';
import { LevelService } from '../services/level.service';

@Component({
  selector: 'app-level-view',
  templateUrl: './level-view.component.html',
  styleUrls: ['./level-view.component.scss']
})
export class LevelViewComponent implements OnInit {
  levels: GameLevel[] = [];
  @Output() levelSelected = new EventEmitter<number>();

  constructor(private router: Router, private levelService: LevelService) { }

  ngOnInit(): void {
    this.levels = this.levelService.getLevelData();
  }

  onLevelClick(level: GameLevel): void {
    if (!level.locked) {
      this.levelService.setCurrentLevelIndex(level.level - 1);
      this.router.navigate(['/game']);
    }
  }
}
