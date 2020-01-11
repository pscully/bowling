class Model {
    constructor() {
        this.scores = JSON.parse(localStorage.getItem("scores")) || [];
        console.log(this.scores);
    }

    __commit(scores) {
        localStorage.setItem("scores", JSON.stringify(scores));
        console.log(this.scores);
    }
}

class Bowler {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}

class Line {}

class View {
  constructor() {
    this.app = this.getEl("app");
    this.table = this.createEl("table");
    this.thead = this.createEl("thead");
    this.tfoot = this.createEl("tfoot");
    this.thead.classList.add("table__heading");
    this.thead.textContent = "Latest Bowling Scores";
    this.tfoot.textContent = this.getDate();
    this.table.appendChild(this.thead);
    this.table.appendChild(this.tfoot);
    this.app.appendChild(this.table);
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

class BowlerController {}

class LineController {}

class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }
}

const app = new Controller(new View(), new Model());
