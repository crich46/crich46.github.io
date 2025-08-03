//test
console.log("main.js loaded");

const margin = { top: 20, right: 30, bottom: 40, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

const tooltip = d3.select(".tooltip");

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
    //log scale because hp and cr covert a very big range 
    const xScale = d3.scaleLog()
        .domain([d3.min(data, d => d.cr_value) || 1, d3.max(data, d => d.cr_value)])
        .range([0, width]);
    const yScale = d3.scaleLog()
        .domain([d3.min(data, d => d.hp_value) || 1, d3.max(data, d => d.hp_value)])
        .range([height, 0]);
    
        const xAxis = d3.axisBottom(xScale).ticks(10, ".2s");
    const yAxis = d3.axisLeft(yScale).ticks(10, ".2s");

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width/2 + margin.left)
        .attr("y", height + margin.top + 10)
        .text("Challenge Rating (CR)");

    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -height / 2)
        .text("Hit Points (HP)");

    //circles
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", d => xScale(d.cr_value))
            .attr("cy", d => yScale(d.hp_value))
            .attr("r", 4)
            .style("fill", "#800080") // i like purple
            .style("opacity", 0.7)
            .on("mouseover", (event, d) => {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                tooltip.html(`<strong>${d.name}</strong><br/>CR: ${d.cr}<br/>HP: ${d.hp_value}`)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", () => {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    const type = d3.annotationLabel;

    const annotations = [{
        note: {
            label: "As a monster's Challenge Rating (CR) increases, its Hit Points (HP) generally increases as well",
            title: "Baseline Trend",
            align: "middle",
            wrap: 180
        },
        x: width / 2,
        y: 150,
        dy: 0,
        dx: 0
    }];
    const makeAnnotations = d3.annotation().annotations(annotations);
    svg.append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotations);
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
