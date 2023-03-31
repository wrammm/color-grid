import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameLevel } from '../classes/game-level';
import { COLOR_SET } from '../constants/color-set';
import { GAME_LEVELS } from '../constants/game-levels.constants';
import { LevelService } from '../services/level.service';
import { MatDialog } from '@angular/material/dialog';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router, private levelService: LevelService) { }

  levels = GAME_LEVELS;
  colorSet = COLOR_SET;
  currentLevelIndex = 0;
  currentLevel = this.levels[this.currentLevelIndex];
  colorsShown: String[] = [];
  colorsSolution: String[] = [];
  colorSetUsed: String[] = [];
  gameStarted = false;
  currentColorChoice: String = '';

  ngOnInit(): void {
    this.startGame();
  }

  startGame() {
    this.gameStarted = false;
    this.levels = this.levelService.getLevelData();
    this.currentLevelIndex = this.levelService.getCurrentLevelIndex();
    this.currentLevel = this.levels[this.currentLevelIndex];
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
      console.log('index: ', index);
      colors.push(shuffledColorSet[index]);
      if (index === gameLevel.numberOfColors - 1) {
        index = 0;
      } else {
        index++;
      }
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
    if (this.gameStarted) {
      this.colorsShown[index] = this.currentColorChoice;
    }
  }

  submit() {
    if (this.colorsSolution.toString() === this.colorsShown.toString()) {
      const dialogRef = this.dialog.open(ResultDialogComponent, {
        data: {status: 'You win!'},
      });
      dialogRef.afterClosed().subscribe(result => {
        this.goToNextLevel();
      });
    } else {
      const dialogRef = this.dialog.open(ResultDialogComponent, {
        data: {status: 'Incorrect, try again.'},
      });
      dialogRef.afterClosed().subscribe(result => {
        this.replaySameLevel();
      });
    }
  }

  goToNextLevel() {
    this.levels[this.currentLevelIndex + 1].locked = false;
    this.levelService.saveLevelData(this.levels);
    this.levelService.setCurrentLevelIndex(++this.currentLevelIndex);
    this.router.navigate(['/levels']);
  }

  replaySameLevel() {
    this.startGame();
  }

}
