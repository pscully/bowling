class BowlingGame {
  constructor() {
    this.frame = null;
    this.game = [
      {
        frame: 1,
        ball1: null,
        ball2: null,
        strike: false,
        spare: false,
        state: false
      },
      {
        frame: 2,
        ball1: null,
        ball2: null,
        strike: false,
        spare: false,
        state: false
      },
      {
        frame: 3,
        ball1: null,
        ball2: null,
        strike: false,
        spare: false,
        state: false
      },
      {
        frame: 4,
        ball1: null,
        ball2: null,
        strike: false,
        spare: false,
        state: false
      },
      {
        frame: 5,
        ball1: null,
        ball2: null,
        strike: false,
        spare: false,
        state: false
      },
      {
        frame: 6,
        ball1: null,
        ball2: null,
        strike: false,
        spare: false,
        state: false
      },
      {
        frame: 7,
        ball1: null,
        ball2: null,
        strike: false,
        spare: false,
        state: false
      },
      {
        frame: 8,
        ball1: null,
        ball2: null,
        strike: false,
        spare: false,
        state: false
      },
      {
        frame: 9,
        ball1: null,
        ball2: null,
        strike: false,
        spare: false,
        state: false
      },
      {
        frame: 10,
        ball1: null,
        ball2: null,
        ball3: null,
        strike: false,
        spare: false,
        state: false
      }
    ];
  }

  start = () => {
    console.log("Start the game.");
    this.frame = 1;
  };

  checkpins(pins) {
    if (pins === 10) {
      return true;
    } else {
      return false;
    }
  }

  bowl = pins => {
    if (this.frame > 10) {
      console.log("Sorry, game is over");
    } else {
      const currentFrame = this.game[this.frame - 1];
      if (currentFrame.ball1 === null) {
        if (this.checkpins(pins) === true) {
          currentFrame.ball1 = pins;
          currentFrame.ball2 = "-";
          currentFrame.strike = true;
          currentFrame.state = true;
          console.log(currentFrame);
          this.frame = this.frame + 1;
        } else {
            currentFrame.ball1 = pins;
        }
      } else if (currentFrame.ball2 === null) {
        if (this.checkpins(pins) === true) {
            currentFrame.ball2 = pins;
            currentFrame.spare = true;
            currentFrame.state = true;
            console.log(currentFrame);
            this.frame = this.frame + 1;
          } else {
              currentFrame.ball2 = pins;
          }
      } else {
        currentFrame.state = true;
        console.log(currentFrame);
        this.frame = this.frame + 1;
      }
    }
  };
}

class Lane {
  constructor() {
    this.app = this.getEl("app");
    this.start = this.createEl("button");
    this.start.textContent = "Start Game";
    this.bowl = this.createEl("button");
    this.bowl.textContent = "Bowl";
    this.bowl.classList.add("hide");
    this.app.appendChild(this.start);
    this.app.appendChild(this.bowl);
  }

  bindStart = handler => {
    this.start.addEventListener("click", () => {
      handler();
      this.start.classList.add("hide");
      this.bowl.classList.remove("hide");
    });
  };

  bindBowl = handler => {
    this.bowl.addEventListener("click", () => {
      const pins = Math.round(Math.random() * 10);
      handler(pins);
    });
  };

  getEl(el) {
    return document.getElementById(el);
  }

  createEl(el) {
    return document.createElement(el);
  }
}

class Alley {
  constructor(game, lane) {
    this.game = game;
    this.lane = lane;

    this.lane.bindStart(this.handleStart);
    this.lane.bindBowl(this.handleBowl);
  }

  handleStart = () => {
    this.game.start();
  };

  handleBowl = pins => {
    this.game.bowl(pins);
  };
}

const game = new Alley(new BowlingGame(), new Lane());
