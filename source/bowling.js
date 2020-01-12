class Model {
  constructor() {
    this.scores = JSON.parse(localStorage.getItem("scores")) || [];
  }

  bindUpdateScoresDisplay(callback) {
    this.updateScoresDisplay = callback;
  }

  __commit(scores) {
    localStorage.setItem("scores", JSON.stringify(scores));
    console.log("Set Saved", this.scores);
  }

  getTotals() {
    let totals = {};
    let totalTotal = 0;
    let averageTotal = 0;
    let count = 0;
    for (let i = 0; i < this.scores.length; i++) {
      if (this.scores[i].deleted === false) {
        count++;
        averageTotal = averageTotal + this.scores[i].average;
        totalTotal = totalTotal + this.scores[i].total;
      }
    }
    totals.totals = totalTotal / count;
    totals.average = averageTotal / count;
    return totals;
  }

  addScore(scoreSet) {
    this.scores.push(scoreSet);
    this.__commit(this.scores);
    this.updateScoresDisplay(this.scores, this.getTotals());
  }

  deleteScores(score) {
    this.scores[score].deleted = true;
    this.__commit(this.scores);
    this.updateScoresDisplay(this.scores, this.getTotals());
  }
}

class Line {
  constructor() {
    this.input1 = this.createInput();
    this.input2 = this.createInput();
    this.input3 = this.createInput();
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
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    return input;
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
  }

  displayScores = ( scores, totals ) => {
    const totalsDiv = this.createEl("div");
    totalsDiv.classList.add("totals");
    const averageTotal = this.createEl("div");
    const averageAverage = this.createEl("div");
    averageTotal.setAttribute("id", "totals-average");
    averageAverage.setAttribute("id", "average-average");
    totalsDiv.appendChild(averageTotal);
    totalsDiv.appendChild(averageAverage);
    averageTotal.textContent = `Average Total: ${totals.totals}`;
    averageAverage.textContent = `Average Average: ${totals.average}`;
    const table = this.createEl("table");
    table.setAttribute("id", "table");
    const tbody = this.createEl("tbody");
    table.appendChild(tbody);
    const header = table.createTHead();
    const titleRow = header.insertRow();
    const titleSelect = titleRow.insertCell();
    titleSelect.textContent = "Delete";
    const titleScoreOne = titleRow.insertCell();
    titleScoreOne.textContent = "1st String";
    const titleScoreTwo = titleRow.insertCell();
    titleScoreTwo.textContent = "2nd String";
    const titleScoreThree = titleRow.insertCell();
    titleScoreThree.textContent = "3rd String";
    const titleScoreTotal = titleRow.insertCell();
    titleScoreTotal.textContent = "Total";
    const titleAverage = titleRow.insertCell();
    titleAverage.textContent = "Average";
    // const footer = table.createTFoot();
    // footer.textContent = this.getDate();
    scores.map(score => {
      if (score.deleted === true) {
        return;
      } else {
        const row = tbody.insertRow();
        const select = row.insertCell();
        const cellScore1 = row.insertCell();
        const cellScore2 = row.insertCell();
        const cellScore3 = row.insertCell();
        const cellTotal = row.insertCell();
        const cellAverage = row.insertCell();
        select.innerHTML = `<input class="select" type="checkbox"> <button class="delete hide">Delete?</button>`;
        select.setAttribute("id", scores.indexOf(score));
        select.addEventListener("click", e => this.highlightSelectedRow(e));
        cellScore1.innerHTML = score.one;
        cellScore2.innerHTML = score.two;
        cellScore3.innerHTML = score.three;
        cellTotal.innerHTML = score.total;
        cellAverage.innerHTML = score.average;
      }
    });
    if (this.getEl("table")) {
      const oldTable = this.getEl("table");
      oldTable.parentNode.replaceChild(table, oldTable);
    } else {
      this.app.appendChild(table);
    }
    this.app.appendChild(totalsDiv);
  };

  highlightSelectedRow = e => {
    const button = e.srcElement.parentNode.children[1];
    if (e.srcElement.checked === true) {
      e.srcElement.parentNode.classList.add("selected-row");
      button.classList.remove("hide");
      // button.addEventListener("click", e => this.deleteScore(e));
    } else {
      e.srcElement.parentNode.classList.remove("selected-row");
      button.classList.add("hide");
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

  deleteScore = e => {
    alert("Delete?");
  };

  bindDeleteScore(handler) {
    const buttons = document.querySelectorAll(".delete");
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const id = button.parentNode.id;
        handler(id);
      });
    });
  }

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
            deleted: false,
            one: score1,
            two: score2,
            three: score3,
            total: parseInt(score1) + parseInt(score2) + parseInt(score3),
            average: Math.round(
              (parseInt(score1) + parseInt(score2) + parseInt(score3)) / 3
            )
          };
          console.log(scoreSet);
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
    this.view.displayScores(this.model.scores, this.model.getTotals());
    this.view.bindDeleteScore(this.handleDeleteScore);
  }

  handleDisplayScores = ( scores, totals ) => {
    this.view.displayScores(scores, totals);
    this.view.bindDeleteScore(this.handleDeleteScore);
  };

  handleAddScore = scoreSet => {
    this.model.addScore(scoreSet);
  };

  handleDeleteScore = score => {
    this.model.deleteScores(score);
  };
}

const app = new Controller(new View(new Line()), new Model());
