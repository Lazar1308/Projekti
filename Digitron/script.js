class Digitron {
  constructor(prethodniBrojTextElement, trenutniBrojTextElement) {
    this.trenutniBroj = "";
    this.prethodniBroj = "";
    this.operacija = "";
    this.kliknutoDugme = "";
    this.prethodniBrojTextElement = prethodniBrojTextElement;
    this.trenutniBrojTextElement = trenutniBrojTextElement;
  }

  BS() {
    this.trenutniBroj = this.trenutniBroj.toString().slice(0, -1);
    if (!this.trenutniBroj) {
      this.operacija = "";
      this.prethodniBroj = this.prethodniBroj.toString().slice(0, -1);
    }
  }

  C() {
    this.trenutniBroj = "";
    this.prethodniBroj = "";
    this.operacija = "";
    this.azuriranje("");
  }

  dodajBroj(broj) {
    if (broj === "." && this.trenutniBroj.includes(".")) return;
    this.trenutniBroj = this.trenutniBroj.toString() + broj.toString();
  }

  izaberiOperaciju(operacija) {
    const operacije = ["+", "-", "*", "/"];
    this.operacija = operacija;
    for (const o of operacije) {
      if (this.kliknutoDugme === o) {
        this.racunaj();
        this.azuriranje(o);
        return;
      }
    }

    this.racunaj();
    this.prethodniBroj = this.trenutniBroj;
    this.trenutniBroj = "";
  }

  racunaj() {
    let racunanje;

    const pre = parseFloat(this.prethodniBroj);
    const tre = parseFloat(this.trenutniBroj);

    if (isNaN(pre) || isNaN(tre)) return;
    switch (this.operacija) {
      case "+":
        racunanje = pre + tre;
        break;
      case "-":
        racunanje = pre - Math.abs(tre);
        break;
      case "*":
        racunanje = pre * tre;

        break;
      case "/":
        racunanje = pre / tre;
        break;
      default:
        return;
    }
    this.trenutniBroj = racunanje;
    this.prethodniBroj = "";
  }

  azuriranje(dugme) {
    this.kliknutoDugme = dugme;
    this.prethodniBrojTextElement.textContent = this.prethodniBroj;
    if (this.prethodniBroj) {
      this.trenutniBrojTextElement.textContent =
        this.operacija + this.trenutniBroj;
    } else {
      this.trenutniBrojTextElement.textContent = this.trenutniBroj;
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const prethodniBrojTextElement = document.querySelector(
  "[data-prethodna-operacija]"
);
const trenutniBrojTextElement = document.querySelector(
  "[data-trenutna-operacija]"
);

const digitron = new Digitron(
  prethodniBrojTextElement,
  trenutniBrojTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    digitron.dodajBroj(button.textContent);
    digitron.azuriranje(button.textContent);
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    digitron.izaberiOperaciju(button.textContent);
    digitron.azuriranje(button.textContent);
  });
});

equalsButton.addEventListener("click", (button) => {
  digitron.racunaj();
  digitron.azuriranje(button.textContent);
});

allClearButton.addEventListener("click", (button) => {
  digitron.BS();
  digitron.azuriranje(button.textContent);
});

deleteButton.addEventListener("click", (button) => {
  digitron.C();
  digitron.azuriranje(button.textContent);
});
