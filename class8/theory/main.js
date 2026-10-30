import { increase, decrease } from "./singleton.js";

const buttonincrease = document.getElementById("buttonincrease");
const buttondecrease = document.getElementById("buttondecrease");
buttonincrease.addEventListener("click", increase);
buttondecrease.addEventListener("click", decrease);