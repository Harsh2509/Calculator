let expression = "";

const buttons = document.querySelectorAll("button");
const input = document.querySelector("input");

Array.from(buttons).forEach((button) => {
  button.addEventListener("click", calc);
  button.addEventListener("touchstart", calc);
});

function calc(e) {
  e.preventDefault();
  let innerElement = e.target.innerHTML;
  console.log(innerElement);
  if (innerElement === "X") innerElement = "*";

  if (innerElement == "=") {
    expression = String(eval(expression));
    input.value = expression;
  }
  //
  else if (innerElement == "AC") {
    input.value = "";
    expression = "";
  }
  //
  else if (innerElement == "+/-") {
    let expr_array = expression.split(`  `);
    let last_string = expr_array.at(-1);
    if (last_string == "") {
      last_string = expr_array.at(-2);
    }

    const xp1 = "1234567890 .)".includes(last_string.at(-1));
    
    if (expr_array.length == 1 || !xp1) return;

    expression = "";
    if (expr_array.at(-1) == "") expr_array.pop();
    for (let i = 0; i < expr_array.length - 1; ++i) {
      expression += expr_array[i] + "  ";
    }

    if (last_string.at(-1) == ")") {
      last_string = last_string.slice(2, -1);
    }
    //
    else {
      last_string = "(-" + last_string + ")";
    }
    expression += last_string + "  ";
    input.value = expression;
    return;
  }
  //
  else {
    const xp1 = "1234567890. ".includes(expression.at(-1));
    const xp2 = "1234567890. ".includes(innerElement);

    if (xp1 ^ xp2) {
      expression += "  ";
    } else if (expression.length == 0 && xp2 == false) {
      return;
    } else if (xp2 == false) {
      expression = expression.slice(0, -1);
    }

    expression += innerElement;
    input.value = expression;
  }
}
