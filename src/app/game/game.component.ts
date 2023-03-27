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
  currentLevel = this.levels[0];
  colorsShown: String[] = [];
  colorsSolution: String[] = [];
  colorSetUsed: String[] = [];
  gameStarted = false;
  currentColorChoice: String = '';

  ngOnInit(): void {
    this.colorsSolution = this.generateRandomColors(this.currentLevel);
    this.colorsShown = Object.assign({}, this.colorsSolution);
  }

  generateRandomColors(gameLevel: GameLevel): string[] {
    const colors: string[] = [];
  
     // Create a copy of the color set and shuffle it
    let shuffledColorSet = [...this.colorSet].sort(() => Math.random() - 0.5);

    // Slice the shuffled color set to get the required number of unique colors
    shuffledColorSet = shuffledColorSet.slice(0, gameLevel.numberOfColors);
    this.colorSetUsed = shuffledColorSet;
  
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

  start() {
    this.colorsShown = Array(this.colorsSolution.length).fill('white');
    this.currentColorChoice = this.colorSetUsed[0];
    this.gameStarted = true;
  }

  selectedColorChoice(color: String) {
    this.currentColorChoice = color;
  }

  selectedCell(index: number) {
    if(this.gameStarted) {
      this.colorsShown[index] = this.currentColorChoice;
    }
  }

  submit() {
    console.log('this.colorSetUsed: ', this.colorSetUsed);
    console.log('this.colorsShown: ', this.colorsShown);
    if(this.colorSetUsed.toString() === this.colorsShown.toString()) {
      alert('You win!');
    } else {
      alert('Incorrect, try again.');
    }
  }
  
  

}
