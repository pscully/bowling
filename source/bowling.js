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
    console.log("Set Saved", this.scores);
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
    this.input1.setAttribute("type", "text");
    this.input2.setAttribute("type", "text");
    this.input3.setAttribute("type", "text");
    this.input1.placeholder = "String #1";
    this.input2.placeholder = "String #2";
    this.input3.placeholder = "String #3";
    this.button = document.createElement("button");
    this.button.setAttribute("id", "submit");
    this.button.textContent = "Submit Score Set";
    this.cancel = document.createElement("a");
    this.cancel.textContent = "cancel";
    this.cancel.setAttribute("id", "cancel");
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
    this.form.classList.add("hide");
    this.form.appendChild(this.line.input1);
    this.form.appendChild(this.line.input2);
    this.form.appendChild(this.line.input3);
    this.form.appendChild(this.line.button);
    this.form.appendChild(this.line.cancel);
    this.app.appendChild(this.form);
    console.log(this.tbody);
  }

  displayScores = scores => {
    const table = this.createEl("table");
    table.setAttribute("id", "table");
    const header = table.createTHead();
    const titleRow = header.insertRow();
    const titleScoreOne = titleRow.insertCell();
    titleScoreOne.textContent = "First String";
    const titleScoreTwo = titleRow.insertCell();
    titleScoreTwo.textContent = "Second String";
    const titleScoreThree = titleRow.insertCell();
    titleScoreThree.textContent = "Third String";
    const titleScoreTotal = titleRow.insertCell();
    titleScoreTotal.textContent = "Set Total";
    const titleAverage = titleRow.insertCell();
    titleAverage.textContent = "Average";
    const footer = table.createTFoot();
    footer.textContent = this.getDate();
    scores.map(score => {
      const row = table.insertRow();
      const cellScore1 = row.insertCell();
      const cellScore2 = row.insertCell();
      const cellScore3 = row.insertCell();
      const cellTotal = row.insertCell();
      const cellAverage = row.insertCell();
      cellScore1.innerHTML = score.one;
      cellScore2.innerHTML = score.two;
      cellScore3.innerHTML = score.three;
      cellTotal.innerHTML = score.total;
      cellAverage.innerHTML = score.average;
    });
    if (this.getEl("table")) {
      const oldTable = this.getEl("table");
      oldTable.parentNode.replaceChild(table, oldTable);
    } else {
      this.app.appendChild(table);
    }
  };

  resetForm = () => {
    this.line.input1.value = "";
    this.line.input2.value = "";
    this.line.input3.value = "";
    this.form.classList.add("hide");
    this.button.classList.remove("hide");
    this.formShow = false;
  };

  bindAddScore(handler) {
    this.button.addEventListener("click", e => {
      if (this.formShow === false) {
        this.form.classList.remove("hide");
        this.button.classList.add("hide");
        this.formShow = true;
        const button = this.getEl("submit");
        const cancel = this.getEl("cancel");
        cancel.addEventListener("click", this.resetForm);
        button.addEventListener("click", e => {
          const score1 = this.line.input1.value;
          const score2 = this.line.input2.value;
          const score3 = this.line.input3.value;

          const scoreSet = {
            one: score1,
            two: score2,
            three: score3,
            total: parseInt(score1) + parseInt(score2) + parseInt(score3),
            average: Math.round(
              (parseInt(score1) + parseInt(score2) + parseInt(score3)) / 3
            )
          };

          handler(scoreSet);
          this.resetForm();
        });
      } else {
        this.form.classList.add("hide");
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

class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.view.bindAddScore(this.handleAddScore);
    this.model.bindUpdateScoresDisplay(this.handleDisplayScores);
    this.view.displayScores(this.model.scores);
  }

  handleDisplayScores = scores => {
    this.view.displayScores(scores);
  };

  handleAddScore = scoreSet => {
    this.model.addScore(scoreSet);
  };
}

const app = new Controller(new View(new Line()), new Model());
