// JS Calc by Lance Taylor 20200926
// Init variables
let number = "";
let i = 0;
let input = [];
let output = "";
let digits = 0;
let prevNumber = true;
let currOperator = "";
let finalCalc = 0;
let spliceIndex;

// Execute when calculator button is pressed
function buttonPressed(key) {
  if (key === "C") {
    clearDisplay();
  } else if (output === "" && typeof key === "string") {
    // no operation allowed until a number is entered
    alert("Please enter a number first.");
  } else if (typeof key === "number") {
    if (prevNumber == true) {
      digits++; // keep track of number of digits
      output = output.toString() + key.toString();
      document.querySelector("#display").innerHTML = output;
    } else {
      // if previous button was an operator
      input[i] = currOperator; // save the operator
      i++; // increment the array counter
      digits = 1; // first digit after an operator
      prevNumber = true;
      //update display
      output = output.toString() + currOperator.toString() + key.toString();
      document.querySelector("#display").innerHTML = output;
    }
  } else if (key === "equals") {
    total();
  } else if (typeof key === "string" && prevNumber == true) {
    // if operator entered after a number
    number = output.slice(-digits); //get number
    input[i] = number; // save number to array
    i++; // increment array counter
    digits = 0; // reset digits

    setOperator(key);
    prevNumber = false; // set previous button to operator
  } else {
    setOperator(key);
    prevNumber = false;
  }
}

function clearDisplay() {
  resetVars();
  document.querySelector("#display").innerHTML = "";
  console.clear();
}

function resetVars() {
  number = "";
  i = 0;
  input = [];
  output = "";
  digits = 0;
  prevNumber = true;
  currOperator = "";
}

function setOperator(key) {
  switch (key) {
    case "add":
      currOperator = "&plus;";
      break;
    case "subtract":
      currOperator = "&minus;";
      break;
    case "multiply":
      currOperator = "&times;";
      break;
    case "divide":
      currOperator = "&divide;";
      break;
    default:
      break;
  }
}
function total() {
  // save the final number in the array
  if (prevNumber == true) {
    number = output.slice(-digits);
    input[i] = number;
  }
  while (input.length > 1) {
    // loop through array
    if (input.includes("&times;")) {
      // multiply first
      console.log(input);
      spliceIndex = input.indexOf("&times;") - 1;
      finalCalc = input[spliceIndex] * input[spliceIndex + 2];
      input.splice(spliceIndex, 3, finalCalc);
    } else if (input.includes("&divide;")) {
      // then divide
      console.log(input);
      spliceIndex = input.indexOf("&divide;") - 1;
      finalCalc = input[spliceIndex] / input[spliceIndex + 2];
      input.splice(spliceIndex, 3, finalCalc);
    } else if (input.includes("&plus;")) {
      // then add
      console.log(input);
      spliceIndex = input.indexOf("&plus;") - 1;
      finalCalc = parseInt(input[spliceIndex]) + parseInt(input[spliceIndex + 2]);
      input.splice(spliceIndex, 3, finalCalc);
    } else {
      // finally subtract
      console.log(input);
      spliceIndex = input.indexOf("&minus;") - 1;
      finalCalc = input[spliceIndex] - input[spliceIndex + 2];
      input.splice(spliceIndex, 3, finalCalc);
    }
  }
  // display the final result
  console.log(input);
  document.querySelector("#display").innerHTML = finalCalc;
  // reset the variables
  resetVars();
}
