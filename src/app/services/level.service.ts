import { Injectable } from '@angular/core';
import { GameLevel } from '../classes/game-level';
import { DISABLE_LEVEL_CACHE, DISABLE_LEVEL_LOCK, GAME_LEVELS } from '../constants/game-levels.constants';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private currentLevelIndex: number = 0;
  private localStorageKey = 'levelData';
  enableLevelLockHack = false;

  constructor() { }

  getCurrentLevelIndex(): number {
    return this.currentLevelIndex;
  }

  setCurrentLevelIndex(level: number): void {
    this.currentLevelIndex = level;
  }

  getEnableLevelLockHack(): boolean {
    return this.enableLevelLockHack;
  }

  setEnableLevelLockHack(level: boolean): void {
    this.enableLevelLockHack = level;
  }

  saveLevelData(levelData: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(levelData));
  }

  getLevelData(): GameLevel[] {
    if(DISABLE_LEVEL_LOCK || this.enableLevelLockHack) {
      GAME_LEVELS.forEach(level => {
        level.locked = false;
      });
      return GAME_LEVELS;
    }

    if(!DISABLE_LEVEL_CACHE) {
      const levelDataString = localStorage.getItem(this.localStorageKey);

      if (levelDataString) {
        return JSON.parse(levelDataString);
      } else {
        return GAME_LEVELS;
      }
    } else {
      return GAME_LEVELS;
    }
    
  }
}
