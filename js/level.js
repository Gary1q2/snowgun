var levels = [];
var levelNames = [];

levelNames.push("Snow Fields");
levelNames.push("Empty level");
levelNames.push("OG level");
levelNames.push("Mazey Arena");
levelNames.push("Slopey Range");
levelNames.push("Boxland");
levelNames.push("I hate weapons");
/* Legend
	W = Wall
	C = Crate
	1 = Player 1
	F = P1 flag
	G = P1 goal

	2 = Player 2
	R = P2 flag
	T = P2 goal

	0 = Nothing
*/
// Plain level
levels.push([
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 1 ,"G","W","W", 0 ,"C", 0 , 0 , 0 , 0 , 0 , 0 ,"C", 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 ,"W","W","W", 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 ,"W","W","W", 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"W","W","W", 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"W","W","W", 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 ,"C", 0 , 0 , 0 , 0 , 0 , 0 ,"C", 0 ,"W","W","T", 2 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ]
			]);		

// Actual empty level
levels.push([
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 ,"C", 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"C", 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 1 ,"G", 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"T", 2 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 ,"C", 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"C", 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ]
			]);		


// OG Level
levels.push([
			["C", 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"C"],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"W","W","W","W", 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 ,"W", 0 , 0 , 0 , 0 ,"W","W","W","W", 0 , 0 , 0 , 0 ,"W", 0 , 0 , 0 ],
			[ 0 , 0 , 0 ,"W", 0 , 0 , 0 , 0 ,"W","W","W","W", 0 , 0 , 0 , 0 ,"W", 0 , 0 , 0 ],
			[ 0 , 1 , 0 ,"W", 0 ,"G", 0 , 0 ,"W","W","W","W", 0 , 0 ,"T", 0 ,"W", 0 , 2 , 0 ],
			[ 0 , 0 , 0 ,"W", 0 , 0 , 0 , 0 ,"W","W","W","W", 0 , 0 , 0 , 0 ,"W", 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"W","W","W","W", 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			["C", 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"C"]
			]);		

// Mazey arena
levels.push([
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"W","W","W","W","W","W", 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 ,"W","W", 0 , 0 , 0 , 0 ,"W","W","W","W","W","W", 0 , 0 , 0 , 0 ,"W","W", 0 ],
			[ 0 ,"W", 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"W","W", 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"W", 0 ],
			[ 0 ,"W", 0 ,"W","W", 0 , 0 ,"W", 0 , 0 , 0 , 0 ,"W", 0 , 0 ,"W","W", 0 ,"W", 0 ],
			[ 0 , 0 , 0 ,"W","W", 0 , 0 ,"W","W","C","C","W","W", 0 , 0 ,"W","W", 0 , 0 , 0 ],
			["G", 1 , 0 ,"W","W", 0 , 0 ,"W","W","C","C","W","W", 0 , 0 ,"W","W", 0 , 2 ,"T"],
			[ 0 ,"W", 0 ,"W","W", 0 , 0 ,"W", 0 , 0 , 0 , 0 ,"W", 0 , 0 ,"W","W", 0 ,"W", 0 ],
			[ 0 ,"W", 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"W","W", 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"W", 0 ],
			[ 0 ,"W","W", 0 , 0 , 0 , 0 ,"W","W","W","W","W","W", 0 , 0 , 0 , 0 ,"W","W", 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"W","W","W","W","W","W", 0 , 0 , 0 , 0 , 0 , 0 , 0 ]
		]);

// Slopey range
levels.push([
			[ 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			["G", 0 , 0 , 0 , 0 , 0 , 0 ,"W","W", 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 ,"W","W","W","W", 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 ,"W","W","W","W","W","W", 0 , 0 ,"C", 0 , 0 , 0 , 0 , 0 ,"W","W", 0 ],
			[ 0 ,"W","W","W","W","W","W", 0 ,"C", 0 , 0 , 0 , 0 , 0 , 0 ,"W","W","W","W", 0 ],
			[ 0 ,"W","W","W","W", 0 , 0 , 0 , 0 , 0 , 0 ,"C", 0 ,"W","W","W","W","W","W", 0 ],
			[ 0 ,"W","W", 0 , 0 , 0 , 0 , 0 ,"C", 0 , 0 ,"W","W","W","W","W","W", 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"W","W","W","W", 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"W","W", 0 , 0 , 0 , 0 , 0 , 0 ,"T"],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 2 , 0 ]
		]);

// Boxland
levels.push([
			[ 0 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			["G", 0 ,"W","W", 0 ,"W","W","W","W","W","W","W","W","W","W","W","W","W", 0 , 0 ],
			[ 0 , 0 ,"W","C", 0 , 0 , 0 , 0 , 0 , 0 ,"W","C", 0 , 0 , 0 , 0 , 0 ,"W", 0 , 0 ],
			[ 0 , 0 ,"W", 0 ,"W","W","W","W","W", 0 ,"W", 0 , 0 , 0 , 0 ,"W", 0 ,"W","C", 0 ],
			[ 0 , 0 , 0 , 0 ,"W", 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"W","W", 0 ,"W", 0 ,"W", 0 , 0 ],
			[ 0 , 0 ,"W", 0 ,"W", 0 ,"W","W", 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"W", 0 , 0 , 0 , 0 ],
			[ 0 ,"C","W", 0 ,"W", 0 , 0 , 0 , 0 ,"W", 0 ,"W","W","W","W","W", 0 ,"W", 0 , 0 ],
			[ 0 , 0 ,"W", 0 , 0 , 0 , 0 , 0 ,"C","W", 0 , 0 , 0 , 0 , 0 , 0 ,"C","W", 0 , 0 ],
			[ 0 , 0 ,"W","W","W","W","W","W","W","W","W","W","W","W","W", 0 ,"W","W", 0 ,"T"],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 2 , 0 ],
		]);

// I hate weapons
levels.push([
			[ 0 , 1 ,"C", 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"C", 0 , 0 ],
			["G","W","W","W","W","W","W","W","W","C","C","W","W","W","W","W","W","W","W", 0 ],
			[ 0 , 0 ,"C", 0 , 0 , 0 , 0 ,"C", 0 , 0 , 0 , 0 ,"C", 0 , 0 , 0 , 0 ,"C", 0 , 0 ],
			["C","W","W", 0 ,"W","W","W", 0 ,"W","W","W","W","W","W","W","W", 0 ,"W","W","C"],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"C","C", 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			[ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"C","C", 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
			["C","W","W", 0 ,"W","W","W","W","W","W","W","W", 0 ,"W","W","W", 0 ,"W","W","C"],
			[ 0 , 0 ,"C", 0 , 0 , 0 , 0 ,"C", 0 , 0 , 0 , 0 ,"C", 0 , 0 , 0 , 0 ,"C", 0 , 0 ],
			["C","W","W","W","W","W","W","W","W","C","C","W","W","W","W","W","W","W","W","T"],
			[ 0 , 0 ,"C", 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,"C", 2 , 0 ]
		]);