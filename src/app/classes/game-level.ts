export class GameLevel {
    level: number;
    squares: number;
    numberOfColors: number;
  
    constructor(level: number, squares: number, numberOfColors: number) {
      this.level = level;
      this.squares = squares;
      this.numberOfColors = numberOfColors;
    }
  }
  