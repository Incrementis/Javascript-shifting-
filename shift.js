/*
	NOTE:
	===============================================================================================
	This Project`s code is compared to the previous projects a bit more complicated.
	(https://github.com/Incrementis/Repository-INDEX-/wiki/Effective-Javascript)

	I recommend reading the code in baby steps and using google chrome`s debugging tools if needed.

	As often mentioned the code could be optimized in many different ways, e.g. improving Error messages,
	implementing a real A.I., code abstraction, winning conditions 
	and many other ideas which possibly could came up.
	This mini project`s code structure serves only demonstration purposes.
	===============================================================================================
*/

var gameBar = 
{
	DivContainer: document.getElementById('bar'),
	Star: "Star.png",
	Circle: "Circle.png",
	Rounds: [] //Will be filled with objects
}


var gameBoard = 
{
	firstROW: document.getElementById('first-row').children,
	secondROW: document.getElementById('second-row').children,
	thirdROW: document.getElementById('third-row').children,
	Rows:[] //Will be filled with bool values
}


//Purpose: Calculates a random integer value to decide where to put the cross mark
function Brain()
{
	//Number between 0 and 8
	return Math.floor((Math.random() * 9));
}


//Purpose: Resets the old game and/or starts a new game
function newGame()
{

	var btnShift = document.getElementById('btn-shift');
	var Star = '<img src="' + gameBar.Star + ' "style="border:none;margin-left:-6px">';
	var Circle = '<img src="' + gameBar.Circle + ' "style="border:none;margin-left:-6px">';
	var AI = Brain();
	

	//The maximum rounds of a new game is always 9, due to 9 fields!
	var rounds = 9;


	//Reseting the game for a new start
	gameBar.DivContainer.innerHTML = "";
	gameBar.Rounds = [];
	gameBoard.Rows = [];

	//Filling the board with empty fields
	for(var field = 0; field < 3; field++)
	{
		
		gameBoard.firstROW[field].src = "Empty.png"
		gameBoard.secondROW[field].src = "Empty.png";
		gameBoard.thirdROW[field].src = "Empty.png";
	}



	//Filling the game bar and preparing game board
	for(var round = 0; round < rounds; round++)
	{
		//Checking if "round" is even - for player & system turns
		if( (round+1) % 2 == 0 )
		{	

			//Filling the browser
			gameBar.DivContainer.innerHTML += Circle;
			
			/*
				ATTENTION:
				Will be Needed to update the player and system turns and for shifting
			*/
			gameBar.Rounds.push
			({
				image: Circle, 
				turn: "Player" 
			});

		}
		else
		{

			//Filling the Browser
			gameBar.DivContainer.innerHTML += Star;
			
			/*
				ATTENTION:
				Will be Needed to update the turns and for shifting
			*/
			gameBar.Rounds.push
			({
				image: Star, 
				turn: "Rival" 
			});
			
		}
		
		//Setting all the game board fields to true, to check later if a field can be filled
		gameBoard.Rows.push(true);

	}
	

	//----INIT first turn of pseudo AI----//
	/*
		ATTENTION:
		Shifting the game bar array.
	*/
	gameBar.Rounds.shift();

	//Clearing game bar
	gameBar.DivContainer.innerHTML = "";

	//Updating game bar (turns/rounds) and showing in browser
	for(var round = 0; round < gameBar.Rounds.length; round++)
	{
		gameBar.DivContainer.innerHTML += gameBar.Rounds[round].image;
	}
	
	//Updating field occupation
	gameBoard.Rows[AI] = false;

	//Visualising field occupation
	if(AI >= 0 && AI <= 2)
	{

		gameBoard.firstROW[AI].src = gameBar.Star; 

	}
	else if(AI >= 3 && AI <= 5)
	{
		//Setting AI to a valid index
		AI -= 3;

		gameBoard.secondROW[AI].src = gameBar.Star;

	}
	else if(AI >= 6 && AI <= 8)
	{

		//Setting AI to a valid index
		AI -= 6;

		gameBoard.thirdROW[AI].src = gameBar.Star;

	}
	

	//Activating "SHIFT" button
	btnShift.style = "visibility:visible; margin-top:30px";

	/*
		RESUME: 
		This function prepares two important variables for the later use.
		1. gameBar.Rounds
		2. gameBoard.Rows
	*/

}



//Purpose: Shifting the player`s turn 
function playerPosition(ID)
{
	//Checking if it is the player`s turn and if the field is empty
	if( gameBar.Rounds[0].turn === "Player" && gameBoard.Rows[ID] === true )
	{
		/*
			ATTENTION:
			Shifting the game bar array "Rounds".
		*/
		gameBar.Rounds.shift();

		//Clearing game bar in browser
		gameBar.DivContainer.innerHTML = "";

		//Updating game bar (turns/rounds) and showing in browser
		for(var round = 0; round < gameBar.Rounds.length; round++)
		{
			gameBar.DivContainer.innerHTML += gameBar.Rounds[round].image;
		}
		
		//Updating field occupation
		gameBoard.Rows[ID] = false;

		//Visualising field occupation
		if(ID >= 0 && ID <= 2)
		{

			gameBoard.firstROW[ID].src = gameBar.Circle; 

		}
		else if(ID >= 3 && ID <= 5)
		{
			//Setting ID to a valid index
			ID -= 3;
			
			gameBoard.secondROW[ID].src = gameBar.Circle;

		}
		else if(ID >= 6 && ID <= 8)
		{
			//Setting ID to a valid index
			ID -= 6;

			gameBoard.thirdROW[ID].src = gameBar.Circle;

		}

	}
	else if(gameBar.Rounds[0].turn === "Player" && gameBoard.Rows[ID] === false)
	{

		alert("Field already taken!");

	}
	else
	{

		alert("Please SHIFT turn!");

	}
}


//Purpose: Shifting the system`s turn
function systemPosition()
{
	var AI = 0;
	var Run = false;
	
	
	//Checking if there is any empty field available
	for(var field = 0; field < 9; field++)
	{
		if(gameBoard.Rows[field] === true)
		{
			Run = true;
		}
	}
	
	//Error-Message if not System`s turn
	if(gameBar.Rounds[0].turn !== "Rival")
	{
		Run = false;
		
		alert("Player`s turn!");
	}
	
	
	//Searching for an empty field
	while(Run)
	{
		AI = Brain();
		
		
		if( gameBoard.Rows[AI] === true)
		{
			//Stop searching for an index
			Run = false;
			
			/*
			ATTENTION:
			Shifting the game bar array.
			*/
			gameBar.Rounds.shift();

			//Clearing game bar
			gameBar.DivContainer.innerHTML = "";

			//Updating game bar (turns/rounds) and showing in browser
			for(var round = 0; round < gameBar.Rounds.length; round++)
			{
				gameBar.DivContainer.innerHTML += gameBar.Rounds[round].image;
			}
			
			//Updating field occupation
			gameBoard.Rows[AI] = false;

			//Visualising field occupation
			if(AI >= 0 && AI <= 2)
			{

				gameBoard.firstROW[AI].src = gameBar.Star; 

			}
			else if(AI >= 3 && AI <= 5)
			{
				//Setting AI to a valid index
				AI -= 3;
				
				gameBoard.secondROW[AI].src = gameBar.Star;

			}
			else if(AI >= 6 && AI <= 8)
			{
				//Setting AI to a valid index
				AI -= 6;

				gameBoard.thirdROW[AI].src = gameBar.Star;

			}
			
		}
		
	}
	
}
