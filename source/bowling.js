class Model {
  constructor() {
    this.scores = JSON.parse(localStorage.getItem("scores")) || [];
    this.bowler = JSON.parse(localStorage.getItem("bowler")) || {};
    console.log(this.scores);
  }

  bindUpdateScoresDisplay(callback) {
      this.updateScoresDisplay = callback;
  }

  __commit(scores) {
    localStorage.setItem("scores", JSON.stringify(scores));
    console.log(this.scores);
  }

  addScore(scoreSet) {
    this.scores.push(scoreSet);
    this.__commit(this.scores);
    this.updateScoresDisplay(this.scores);
  }
}

class Line {
  constructor() {
    this.input1 = this.createInput();
    this.input2 = this.createInput();
    this.input3 = this.createInput();
    this.input1.placeholder = "Score #1";
    this.input2.placeholder = "Score #2";
    this.input3.placeholder = "Score #3";
    this.button = document.createElement("button");
    this.button.setAttribute("id", "submit");
    this.button.textContent = "Submit Score Set";
  }

  createInput() {
    return document.createElement("input");
  }
}

class View {
  constructor(line) {
    this.line = line;
    this.app = this.getEl("app");
    this.button = this.getEl("addScore");
    this.form = this.createEl("div");
    this.formShow = false;
    this.form.classList.add("hidden");
    this.form.appendChild(this.line.input1);
    this.form.appendChild(this.line.input2);
    this.form.appendChild(this.line.input3);
    this.form.appendChild(this.line.button);
    this.app.appendChild(this.form);
    console.log(this.tbody);
  }

  displayScores = scores => {
      const table = this.createEl("table");
      const header = table.createTHead();
      header.classList.add("table__heading");
      header.textContent = "Latest Bowling Scores";
      const footer = table.createTFoot();
      footer.textContent = this.getDate();
      scores.map(score => {
          const row = table.insertRow();
          const cellScore1 = row.insertCell();
          const cellScore2 = row.insertCell();
          const cellScore3 = row.insertCell();
          cellScore1.innerHTML = score.one;
          cellScore2.innerHTML = score.two;
          cellScore3.innerHTML = score.three;
      })
      this.app.appendChild(table);
  };

  bindAddScore(handler) {
    this.button.addEventListener("click", e => {
      if (this.formShow === false) {
        this.form.classList.remove("hidden");
        this.formShow = true;
        const button = this.getEl("submit");
        button.addEventListener("click", e => {
          const score1 = this.line.input1.value;
          const score2 = this.line.input2.value;
          const score3 = this.line.input3.value;

          const scoreSet = {
            one: score1,
            two: score2,
            three: score3
          };

          handler(scoreSet);
          this.line.input1.value = "";
          this.line.input2.value = "";
          this.line.input3.value = "";
        });
      } else {
          this.form.classList.add("hidden");
          this.formShow = false;
      }
    });
  }

  getDate() {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const newDate = "Last Updated: " + month + "/" + day + "/" + year;
    return newDate;
  }

  getEl(el) {
    return document.getElementById(el);
  }

  createEl(el) {
    return document.createElement(el);
  }
}

class LineController {}

class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.view.bindAddScore(this.handleAddScore);
    this.model.bindUpdateScoresDisplay(this.handleDisplayScores);
    this.view.displayScores(this.model.scores);
  }
  
  handleDisplayScores = (scores) => {
    this.view.displayScores(scores)
  }

  handleAddScore = scoreSet => {
    this.model.addScore(scoreSet);
  };
}

const app = new Controller(new View(new Line()), new Model());
