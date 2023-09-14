const tableBody = document.getElementById("table-body");
var currentGame;

function table_setup(){
    // Generate table rows and cells
    var cellId = 0;
    for (let row = 1; row <= 6; row++) {
        const newRow = document.createElement("tr");
        for (let col = 1; col <= 18; col++) {
            const newCell = document.createElement("td");
            var color = "white"
            newCell.innerHTML = '<div id='+cellId+' class="color-block" style="background-color:' + color + ';"></div>';
            newRow.appendChild(newCell);
            cellId++
        }
        tableBody.appendChild(newRow);
    }
}

function recordGameId(gameId_str){
    const parts = gameId_str.split("_"); // Split the string by underscores
    const gameId = parts[parts.length - 1]; // Get the last part of the split string

    gameIdButton = document.getElementById("game_id_button");
    gameIdButton.textContent = gameId;
    console.log("recording : " + gameId)
}

function recordGoalType(goal_type_str){
    const parts = goal_type_str.split("_"); // Split the string by underscores
    const goalType = parts[parts.length - 1]; // Get the last part of the split string

    goalTypeButton = document.getElementById("goal_type_button");
    goalTypeButton.textContent = goalType;
    console.log("recording type: " + goalType)
}

function getGame(){
    //load the json for a game after load is pressed
    const id_button = document.getElementById("game_id_button");
    const type_button = document.getElementById("goal_type_button");
    var id = id_button.textContent;
    var type = type_button.textContent;
    id_games = data[id]
    for (const g of id_games) {
        if (g.goal_type === type) {
            currentGame = g;
            break; // Exit the loop once a match is found
        }
    }
    //call loadgame
    loadgame()
}

function loadgame(){
    //load colors into table
    var cellId = 0;
    colors = currentGame.config
    for (var i = 0; i < colors.length; i++) {
        var color = colors[cellId]
        var block = document.getElementById(cellId);
        block.setAttribute('style', 'background-color:' + color + ';')
        cellId++
    }
}

function load_options(){
    var id_dropdown = document.getElementById("game_id_dropdown");
    var goal_dropdown = document.getElementById("game_goal_dropdown");
    var ids = options.game_ids
    var goals = options.goal_types

    for (var i = 0; i < ids.length; i++) {
        var optionText = ids[i];
        // Create a new <a> element
        var anchor = document.createElement("a");
        // Set the id attribute
        anchor.setAttribute("id", "option_id_" + optionText);
        anchor.setAttribute("href", "#");
        anchor.setAttribute("class", "option_id_item");
        // Set the text content
        anchor.textContent = optionText;
        // Append the <a> element to the dropdown
        id_dropdown.appendChild(anchor);
        // anchor.addEventListener("click", function() {
        //     const argument = optionText
        //     recordGameId(argument);
        // });    
    }
    for (var i = 0; i < goals.length; i++) {
        var optionText2 = goals[i];
        // Create a new <a> element
        var anchor2 = document.createElement("a");
        // Set the id attribute
        anchor2.setAttribute("id", "option_goal_" + optionText2);
        anchor2.setAttribute("href", "#");
        anchor2.setAttribute("class", "option_goal_item");
        // Set the text content
        anchor2.textContent = optionText2;
        // Append the <a> element to the dropdown
        goal_dropdown.appendChild(anchor2);
        // anchor2.addEventListener("click", function() {
        //     const argument = optionText2
        //     recordGoalType(argument);
        // });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Your code to run when the document is loaded
    table_setup();
    load_options();

    document.getElementById('loadbutton').addEventListener('click', getGame);

    const optionIdElements = document.querySelectorAll(".option_id_item");

    // Loop through each element and add a click event listener
    optionIdElements.forEach(function(element) {
        element.addEventListener("click", function() {
            recordGameId(element.id)
        });
    });

    const optionGoalElements = document.querySelectorAll(".option_goal_item");

    // Loop through each element and add a click event listener
    optionGoalElements.forEach(function(element) {
        element.addEventListener("click", function() {
            recordGoalType(element.id)
        });
    });
});


