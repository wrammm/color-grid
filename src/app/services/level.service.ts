import { Injectable } from '@angular/core';
import { GameLevel } from '../classes/game-level';
import { GAME_LEVELS } from '../constants/game-levels.constants';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private currentLevelIndex: number = 0;
  private localStorageKey = 'levelData';

  constructor() { }

  getCurrentLevelIndex(): number {
    return this.currentLevelIndex;
  }

  setCurrentLevelIndex(level: number): void {
    this.currentLevelIndex = level;
  }

  saveLevelData(levelData: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(levelData));
  }

  getLevelData(): GameLevel[] {
    const levelDataString = localStorage.getItem(this.localStorageKey);

    if (levelDataString) {
      return JSON.parse(levelDataString);
    } else {
      return GAME_LEVELS;
    }
  }
}
