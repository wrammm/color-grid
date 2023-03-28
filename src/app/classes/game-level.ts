export class GameLevel {
    level: number;
    squares: number;
    numberOfColors: number;
    locked: boolean;
  
    constructor(level: number, squares: number, numberOfColors: number, locked: boolean) {
      this.level = level;
      this.squares = squares;
      this.numberOfColors = numberOfColors;
      this.locked = locked;
    }
  }
  