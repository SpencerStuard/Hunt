var timesPunched:int;
var rocksThrown:int;
var spearsThrown:int;
var spearsStabbed:int;
var arrowsShot:int;
var slingshotShot:int;
var swordSwung:int;

var raptorsKilled:int;
var dilosKilled:int;
var compysKilled:int;
var pachysKilled:int;
var dartguysKilled:int;
var brawlerKilled:int;
var standardKilled:int;
var batsKilled:int;

var dinobitesEaten:int;
var tricksTricked:int;
var spraytanUsed:int;
var raptorsuitUsed:int;

var underwaterTime:float;
var hangglideTime:float;
var inairTime:float;

var spellsCast:int;

var timesDied:int;
var levelsBeaten:int;

var karateMasterWins:int;

function Start()
{
	if(Application.loadedLevel==3) //Trophies
	{
		if(raptorsKilled>0)
			ItemsToSave.itemsToSave.trophiesUnlocked[0]=true;
		else
			ItemsToSave.itemsToSave.trophiesUnlocked[0]=false;
		
		if(karateMasterWins>0)
			ItemsToSave.itemsToSave.trophiesUnlocked[1]=true;
		else
			ItemsToSave.itemsToSave.trophiesUnlocked[1]=false;
			
	}
	
/*	if(Application.loadedLevel==1) //Magic
	{
		if(karateMasterWins>0)
			ItemsToSave.itemsToSave.magicUnlocked[11]=true;
		else
			ItemsToSave.itemsToSave.magicUnlocked[11]=false;
	}*/
}