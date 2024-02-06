const buttons = document.querySelectorAll(`button`);
const buttonArr = Array.from(buttons);

const input = document.querySelector(`input`);

buttonArr.forEach((button) => {
  button.addEventListener("click", (e) => {
    const innerElement = e.target.innerHTML;

    if (innerElement == "=") {
      let expression = String(eval(input.value));
      input.value = expression;
    } else if (innerElement == `AC`) {
      input.value = "";
    } else {
      const check = "1234567890. */-+%".includes(innerElement);
      if (check) {
        input.value += innerElement;
      }
    }
  });
});

input.addEventListener("keypress", (e) => e.preventDefault());
