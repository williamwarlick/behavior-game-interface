const tableBody = document.getElementById("table-body");
var currentGame;
var currentMove;
var idSelectInactive;
var typeSelectInactive;


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
    getGame()
}

function recordGoalType(goal_type_str){
    const parts = goal_type_str.split("_"); // Split the string by underscores
    const goalType = parts[parts.length - 1]; // Get the last part of the split string

    goalTypeButton = document.getElementById("goal_type_button");
    goalTypeButton.textContent = goalType;
    console.log("recording type: " + goalType)
    getGame()
}

function gameRandom(){
    var id_arr = options["game_ids"]
    const randomIndex = Math.floor(Math.random() * id_arr.length);
    var random_game = id_arr[randomIndex]
    var goal_arr = options['goal_types']
    const randomTypeIndex = Math.floor(Math.random() * goal_arr.length);
    var random_goal = goal_arr[randomTypeIndex]

    goalTypeButton = document.getElementById("goal_type_button");
    goalTypeButton.textContent = random_goal;

    gameIdButton = document.getElementById("game_id_button");
    gameIdButton.textContent = random_game;

    recordGameId(random_game)
    recordGoalType(random_goal)
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
    //set currentmove to 0
    currentMove = 0;
    //call loadgame
    loadgame()
    updateInfoPanel();

}

function loadgame(){
    //load colors into table
    var cellId = 0;
    colors = currentGame.config
    for (var i = 0; i < colors.length; i++) {
        var color = colors[cellId];
        var block = document.getElementById(cellId);
        block.setAttribute('style', 'background-color:' + color + ';')
        cellId++
    }
}

function nextMove(){
    if (currentMove + 1 <= currentGame['total_moves']){
        move = currentMove;
        orig_id = currentGame['move_ids'][move][0];
        if (orig_id != '999'){
            orig_element = document.getElementById(orig_id);
            bg_color = orig_element.style.backgroundColor;
            var orig_color = bg_color.replace("background-color:", "").trim();

            new_id = currentGame['move_ids'][move][1];
            new_element = document.getElementById(new_id);
            console.log("new_id", new_id)
            new_element.style.backgroundColor = orig_color;
            orig_element.style.backgroundColor = "white";
            
        }
        //disable buttons on move
        var button = document.getElementById("game_id_button");
        button.style.display = 'none';
        button = document.getElementById("goal_type_button");
        button.style.display = 'none';
        button = document.getElementById("random-game-button");
        button.style.display = 'none';
        //enable game change button
        var b = document.getElementById('change-game-button');
        b.style.display = '';

        currentMove++;
        updateInfoPanel();
    }
}

function updateInfoPanel(){
    // Current player
    if (currentMove % 2 == 0){
        content = "Current player: Architect";
    } else {
        content = "Current player:   Helper";
    }
    var h4Element = document.createElement("h4");
    h4Element.textContent = content;
    var box = document.getElementById("current-player-box");
    // Append to the div and empty previous 
    box.innerHTML = "";
    box.appendChild(h4Element);


    //Current move
    var h4Element = document.createElement("h4");
    h4Element.textContent = "Current move: " + currentMove;
    var box = document.getElementById("current-move-box");
    // Append to the div and empty previous 
    box.innerHTML = "";
    box.appendChild(h4Element);

    //Current goal
    var h4Element = document.createElement("h4");
    h4Element.textContent = "Current goal: " + currentGame['goal'];
    var box = document.getElementById("current-goal-box");
    // Append to the div and empty previous 
    box.innerHTML = "";
    box.appendChild(h4Element);

}

function previousMove(){
    if (currentMove  > 0 ){
        currentMove--;
        move = currentMove;
        orig_id = currentGame['move_ids'][move][1];
        if (orig_id != '999'){
            orig_element = document.getElementById(orig_id);
            bg_color = orig_element.style.backgroundColor;
            var orig_color = bg_color.replace("background-color:", "").trim();
    
            new_id = currentGame['move_ids'][move][0];
            new_element = document.getElementById(new_id);
            console.log("new_id", new_id)
            new_element.style.backgroundColor = orig_color;
            orig_element.style.backgroundColor = "white";
            
        }
        updateInfoPanel();
    }
}

function gameChange(){
    //enable game option select buttons
   var button = document.getElementById("game_id_button");
   button.style.display = '';
   button = document.getElementById("goal_type_button");
   button.style.display = '';
   button = document.getElementById("random-game-button");
   button.style.display = '';
   //diable game change button
   button = document.getElementById("change-game-button");
   button.style.display = 'none';
   //empty info panels
   var box = document.getElementById("current-player-box");
   box.innerHTML = "";
   var box = document.getElementById("current-move-box");
   box.innerHTML = "";
   var box = document.getElementById("current-goal-box");
   box.innerHTML = "";

    // reset selection buttons
   var box = document.getElementById("goal_type_button");
   box.innerHTML = "Goal Type ⏷";
   var box = document.getElementById("game_id_button");
   box.innerHTML = "Player ID ⏷";


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


    document.getElementById('reset_button').addEventListener('click', getGame);
    document.getElementById('next_move_button').addEventListener('click', nextMove);
    document.getElementById('undo_move_button').addEventListener('click', previousMove);
    document.getElementById('change-game-button').addEventListener('click', gameChange);
    document.getElementById('random-game-button').addEventListener('click', gameRandom);


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


