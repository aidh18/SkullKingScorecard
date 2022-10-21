var display = document.getElementById("display");
var playerCount;
var players;
var roundNum = 1;


// Asks the user for each players bid
function askForBid ()
{
  for (var i = 0; i < playerCount; i++)
  {
    var player = players[`player${i + 1}`];
    var div = document.createElement("div");
    
    var label = document.createElement("label");
    label.setAttribute("for", `player${i + 1}Bid`);
    label.innerHTML = `${player.name}'s bid `;

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", `player${i + 1}Bid`);
    input.id = `player${i + 1}Bid`;

    div.appendChild(label);
    div.appendChild(input);
    display.appendChild(div);
  }
  
  // Direct the submit button to getBid
  if (roundNum != 1)
  {
    document.getElementById("submitPlayerScores").removeEventListener("click", getScore)
    document.getElementById("submitPlayerScores").id = "submitPlayerBids";
    document.getElementById("submitPlayerBids").addEventListener("click", getBid);
  }
  else
  {
    document.getElementById("submitPlayerNames").removeEventListener("click", getPlayerNames)
    document.getElementById("submitPlayerNames").id = "submitPlayerBids";
    document.getElementById("submitPlayerBids").addEventListener("click", getBid);
  }
}


// Gets the players names
function askForPlayerNames ()
{
  resetDisplay();

  for (var i = 0; i < playerCount; i++) 
  {
    var div = document.createElement("div");
    
    var label = document.createElement("label");
    label.setAttribute("for", `player${i + 1}Name`);
    label.innerHTML = `Player ${i + 1}'s name `;

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", `player${i + 1}Name`);
    input.id = `player${i + 1}Name`;

    div.appendChild(label);
    div.appendChild(input);
    display.appendChild(div);
  }

  // Directs the submit button to getPlayerNames
  document.getElementById("submitPlayerCount").removeEventListener("click", getPlayerCount)
  document.getElementById("submitPlayerCount").id = "submitPlayerNames";
  document.getElementById("submitPlayerNames").addEventListener("click", getPlayerNames);
}


// Asks the user for each players score
function askForScore ()
{
  for (var i = 0; i < playerCount; i++)
  {
    var player = players[`player${i + 1}`];
    var div = document.createElement("div");
    
    var label = document.createElement("label");
    label.setAttribute("for", `player${i + 1}Score`);
    label.innerHTML = `${player.name}'s score `;

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", `player${i + 1}Score`);
    input.id = `player${i + 1}Score`;

    div.appendChild(label);
    div.appendChild(input);
    display.appendChild(div);
  }

  // Directs the button to getScore
  document.getElementById("submitPlayerBids").removeEventListener("click", getBid)
  document.getElementById("submitPlayerBids").id = "submitPlayerScores";
  document.getElementById("submitPlayerScores").addEventListener("click", getScore);
}


// Updates the player display with the bid
function displayBid ()
{
  var gotBid = true;
  resetDisplay();
  displayPlayers(gotBid);
  askForScore()
}


// Creates the player display
function displayPlayers (gotBid)
{
  var div = document.createElement("div");

  var heading2 = document.createElement("h2");
  heading2.textContent = `Round ${roundNum}`;
  div.appendChild(heading2);

  for (var i = 0; i < playerCount; i++)
  {
    var player = players[`player${i + 1}`];

    var heading3 = document.createElement("h3");
    heading3.textContent = player.name;
    div.appendChild(heading3);

    if (gotBid)
    {
      var para1 = document.createElement("p");
      para1.textContent = `Current Bid: ${player.bid}`
      div.appendChild(para1);
    }

    var para2 = document.createElement("p");
    para2.textContent = `Total Score: ${player.score}`
    div.appendChild(para2);
  }
  display.appendChild(div);
}


// Chooses and displays the winner
function displayWinner ()
{
  var button = document.getElementById("button");
  button.innerHTML = "";

  var highestScore = -1000;
  var highestPlayer;
  for (var i = 0; i < playerCount; i++)
  {
    var playerScore = players[`player${i + 1}`].score;
    var playerName = players[`player${i + 1}`].name;
    if (playerScore > highestScore)
    {
      highestScore = playerScore;
      highestPlayer = playerName;
    }
  }

  var div = document.createElement("div");
  var heading2 = document.createElement("h2");
  heading2.textContent = `${highestPlayer} wins with a score of ${highestScore}!`;
  div.appendChild(heading2);
  display.appendChild(div);
}


// Gets and stores each players bid
function getBid ()
{
  for (var i = 0; i < playerCount; i++)
  {
    var playerBid = document.getElementById(`player${i + 1}Bid`).value;
    players[`player${i + 1}`].bid = playerBid;
  }
  displayBid();
}


// Gets, stores, and adds each players score to their total score
function getScore ()
{
  for (var i = 0; i < playerCount; i++)
  {
    var playerScore = parseInt(document.getElementById(`player${i + 1}Score`).value);
    players[`player${i + 1}`].score += playerScore;
  }

  roundNum += 1;
  newRound();
}


// Gets the number of players
function getPlayerCount ()
{
  playerCount = parseInt(document.getElementById("playerCount").value);
  if (playerCount < 7 && playerCount > 1)
  {
    askForPlayerNames()
  }
}


// Gets and stores the players names
function getPlayerNames ()
{
  players = {};
  var i = 0;
  for (var i = 0; i < playerCount; i++)
  {
    var playerName = document.getElementById(`player${i + 1}Name`).value;
    players[`player${i + 1}`] = {name : playerName, score : 0, bid : 0};
  }

  newRound();
}


// Starts a new round
function newRound ()
{
  resetDisplay();
  var gotBid = false;

  if (roundNum <= 10)
  {
    displayPlayers(gotBid);
    askForBid()
  }
  else
  {
    displayWinner();
  }
}


// Clears the screen
function resetDisplay ()
{
  display.innerHTML = "";
}



// Initial event listener; Directs the submit button to getPlayerCount
document.getElementById("submitPlayerCount").addEventListener("click", getPlayerCount);