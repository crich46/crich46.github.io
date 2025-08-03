//test 
console.log("main.js loaded");

d3.csv("crich46.github.io/aidedd_blocks2.csv").then(data => {
    data.forEach(d => {

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

    //checking data type
    console.log("data loaded. First monster CR is now a: " + typeof data[0].cr_value);
    console.log(data[0]);
}).catch(error => {
    console.error("Error loading data:", error);
});


