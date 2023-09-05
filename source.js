const tableBody = document.getElementById("table-body");

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

function loadgame(){
    var cellId = 0;
    colors = game.config
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
    var goals = options.goals

    for (var i = 0; i < ids.length; i++) {
        var optionText = ids[i];
        // Create a new <a> element
        var anchor = document.createElement("a");
        // Set the id attribute
        anchor.setAttribute("id", "option_id_" + optionText);
        anchor.setAttribute("class", "option_id_item");
        // Set the text content
        anchor.textContent = optionText;
        // Append the <a> element to the dropdown
        id_dropdown.appendChild(anchor);
    }
    for (var i = 0; i < goals.length; i++) {
        var optionText2 = goals[i];
        // Create a new <a> element
        var anchor2 = document.createElement("a");
        // Set the id attribute
        anchor2.setAttribute("id", "option_goal_" + optionText2);
        anchor2.setAttribute("class", "option_goal_item");
        // Set the text content
        anchor2.textContent = optionText2;
        // Append the <a> element to the dropdown
        goal_dropdown.appendChild(anchor2);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Your code to run when the document is loaded
    table_setup();
    load_options();
});

document.getElementById('loadbutton').addEventListener('click', loadgame);

const optionIdElements = document.querySelectorAll('.option_id_item');

optionIdElements.forEach(optionElement => {
  optionElement.addEventListener('click', event => {
    console.log(optionElement.attributes.id)
  });
});


const optionGoalElements = document.querySelectorAll('.option_goal_item');

optionGoalElements.forEach(optionElement => {
  optionElement.addEventListener('click', event => {
    console.log(optionElement.attributes.id)
  });
});