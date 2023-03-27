import { Component, OnInit } from '@angular/core';
import { GameLevel } from '../classes/game-level';
import { COLOR_SET } from '../constants/color-set';
import { GAME_LEVELS } from '../constants/game-levels.constants';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor() { }

  levels = GAME_LEVELS;
  colorSet = COLOR_SET;
  currentLevel = this.levels[1];
  randomColors: String[] = [];

  ngOnInit(): void {
    this.randomColors = this.generateRandomColors(this.currentLevel);
  }

  generateRandomColors(gameLevel: GameLevel): string[] {
    const colors: string[] = [];
  
     // Create a copy of the color set and shuffle it
    let shuffledColorSet = [...this.colorSet].sort(() => Math.random() - 0.5);

    // Slice the shuffled color set to get the required number of unique colors
    shuffledColorSet = shuffledColorSet.slice(0, gameLevel.numberOfColors);
  
    // Fill the output array with colors
    let index = 0;
    for (let i = 0; i < gameLevel.squares; i++) {
      colors.push(shuffledColorSet[index]);
      if(index === gameLevel.numberOfColors - 1) {
        index = 0;
      }
      index++;
    }
  
    return [...colors].sort(() => Math.random() - 0.5);
  }
  
  

}
