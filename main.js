//test
console.log("main.js loaded");

const margin = { top: 20, right: 30, bottom: 40, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

const svg = d3
  .select("#visualization")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

let currentScene = 1;
let data;

function drawScene() {
  console.log("Drawing scene called. Current scene:", currentScene);
  svg.html(""); //to clear it

  if (currentScene === 1) {
    //big picture scene

  } else if (currentScene === 2) {
    // complication scene/nuance
  } else if (currentScene === 3) {
    //aha scene
  }
}

d3.csv("https://crich46.github.io/aidedd_blocks2.csv")
  .then((loadedData) => {
    loadedData.forEach((d) => {
      // Challenge Rating, AC, and HP
      d.cr_value = +d.cr;
      d.hp_value = +d.hp;
      d.ac_value = +d.ac;

      // ability scores
      d.strength = +d.strength;
      d.dexterity = +d.dexterity;
      d.constitution = +d.constitution;
      d.intelligence = +d.intelligence;
      d.wisdom = +d.wisdom;
      d.charisma = +d.charisma;
    });
    data = loadedData;
    //checking data
    console.log(data[0]);
    drawScene(); // Initial draw
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });

  //triggers
  d3.select("#next-button").on("click", () => {
    currentScene++;
    if (currentScene > 3) {
      currentScene = 1; // Loop back to the first scene
    }
    drawScene();
  });

d3.select("#prev-button").on("click", () => {
    currentScene--;
    if (currentScene < 1) {
      currentScene = 3; // Loop back to the last scene
    }
    drawScene();
  });

  