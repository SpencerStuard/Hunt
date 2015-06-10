import System.IO;
import System.Collections.Generic;
private var time=Date();
private var month = System.DateTime.Now.get_Month();
private var day = System.DateTime.Now.get_Day();
private var year = System.DateTime.Now.get_Year();

static var itemsToSave:ItemsToSave;

var path : String;
var data:String;

var saving:boolean;
var saveCursor:Texture2D;	//texture to show saving progress
var saveTextures:Texture2D[];
var startedSave:float;

//weapons unlocked
//var weaponsAvailable = new List.<GameObject>();

//magic unlocked
var magicUnlocked:boolean[];

//zones unlocked
var zonesComplete:boolean[];

//levels unlocked
//zone 1
var zone1LevelsComplete:boolean[];

//zone 2
var zone2LevelsComplete:boolean[];

//zone 3
var zone3LevelsComplete:boolean[];

//zone 4
var zone4LevelsComplete:boolean[];

//Weapons Unlocked
var weaponsUnlocked:boolean[];

//Ammo Unlocked
var ammoUnlocked:boolean[];

//trophies
var trophiesUnlocked:boolean[];
var trophySprites:Sprite[];
var trophiesFound = new List.<GameObject>();

//collectibles
var collectiblesFound = new List.<GameObject>();

//consumables in house
var consumablesInHouse = new List.<GameObject>();

//consumables on Player
var consumablesOnPlayer = new List.<GameObject>();

//Meats Collected
var meatsFound:int[];
var meatsNeeded:int[];
var zoneMeatsFound:int[];
var zoneMeatsMax:int[];
var zoneMeatsHauled:int[];

var achievements:boolean[];

//old map position
var oldLoc:int;
var oldX:float;
var oldY:float;
var oldZ:float;

//What save file to use
//var saveNum:int;
//var numm2:float;

function Awake()
{
	itemsToSave=GetComponent(ItemsToSave);
	//saveNum=1;
	//DEMO LOADOUT
	weaponsUnlocked[0]=true;
	weaponsUnlocked[1]=true;
	weaponsUnlocked[2]=true;
	weaponsUnlocked[3]=true;
	weaponsUnlocked[4]=false; //sword
//items
	weaponsUnlocked[5]=true; //dino bites
	weaponsUnlocked[6]=true; //quiver
	weaponsUnlocked[7]=false; //skateboard
	weaponsUnlocked[8]=true; //ez bronze
	weaponsUnlocked[9]=false; //torch
	weaponsUnlocked[10]=false; //flippers
	weaponsUnlocked[11]=false; //snorkel
	weaponsUnlocked[12]=true; //parachute pants
	weaponsUnlocked[13]=false; //raptor suit
	/*weaponsUnlocked[14]=true;
	weaponsUnlocked[15]=true;
	weaponsUnlocked[16]=true;
	weaponsUnlocked[17]=true;
	weaponsUnlocked[18]=true;
	weaponsUnlocked[19]=true;*/
	
	magicUnlocked[0]=true;
	magicUnlocked[1]=true;
	magicUnlocked[2]=false;
	magicUnlocked[3]=true;
	magicUnlocked[4]=true;
	magicUnlocked[5]=true;
	magicUnlocked[6]=false;
	magicUnlocked[7]=true;
	magicUnlocked[8]=true;
	magicUnlocked[9]=true;
	magicUnlocked[10]=true;
	magicUnlocked[11]=false;
	magicUnlocked[12]=false;
	magicUnlocked[13]=false;
	//magicUnlocked[14]=true;
	//magicUnlocked[15]=true;
	
	ammoUnlocked[0]=true;
	ammoUnlocked[1]=true;
	ammoUnlocked[2]=true;
	ammoUnlocked[3]=true;
	ammoUnlocked[4]=true;
	ammoUnlocked[5]=true;
	
	path+= Application.dataPath;
	path+= "/Saves/";

	LoadData();
	BoolCheck();
}

function Start()
{
	LoadDataLate();
}

function Update()
{
	//if(Application.loadedLevel==2)
		//Trophies();
	if(Application.loadedLevel==1)
		OldPositions();
		
	/*if (oldX == 0)
	{
		GameController.player.transform.position.x = -6.760966;
		GameController.player.transform.position.x = -3.079301;
		GameController.player.transform.position.x = 0;
	}*/
}

function OldPositions()
{
	oldLoc = gameObject.Find("PathForPlayer").GetComponent(MoveToZones).currentNodeID;//.currentPathPercent;
	oldX=GameController.player.transform.position.x;
	oldY=GameController.player.transform.position.y;
	oldZ=GameController.player.transform.position.z;
}

function BoolCheck()
{
	for(var i:int=0; i<zone1LevelsComplete.length;i++)
	{
		if(zone1LevelsComplete[i]==false)
		{
			zonesComplete[0]=false;
			break;
		}
		else
		{
			zonesComplete[0]=true;
		}
	}
	
	
	for(var j:int=0; j<zone2LevelsComplete.length;j++)
	{
		if(zone2LevelsComplete[j]==false)
		{
			zonesComplete[1]=false;
			break;
		}
		else
		{
			zonesComplete[1]=true;
		}
	}
	
	for(var k:int=0; k<zone3LevelsComplete.length;k++)
	{
		if(zone3LevelsComplete[k]==false)
		{
			zonesComplete[2]=false;
			break;
		}
		else
		{
			zonesComplete[2]=true;
		}
	}
}

/*function Trophies()
{
	for (var z:int;z<trophiesUnlocked.length;z++)
	{
		if(trophiesUnlocked[z])
			trophiesFound[z].GetComponent(Renderer).sprite=trophySprites[z+1];
		else
			trophiesFound[z].GetComponent(Renderer).sprite=trophySprites[0];
		return;
	}
}*/

function SetTrue1(imLevelNumber:int)
{
	zone1LevelsComplete[imLevelNumber]=true;
}

function SetTrue2(imLevelNumber:int)
{
	zone2LevelsComplete[imLevelNumber]=true;
}

function SetTrue3(imLevelNumber:int)
{
	zone3LevelsComplete[imLevelNumber]=true;
}

function SetTrue4(imLevelNumber:int)
{
	zone4LevelsComplete[imLevelNumber]=true;
}


function SaveToFile()
{

	if (!Directory.Exists(path))
	{
		Directory.CreateDirectory(path);
	}

	if(!File.Exists(path +"/"+ "savedata" /* + saveNum */ + ".sav"))
	{	
		//save file name
		var create_text = File.CreateText(path +"/"+ "savedata" /* + saveNum */ + ".sav");
		create_text.Close();
	}
	
	var loadedFile = new StreamWriter(path +"/"+ "savedata" /* + saveNum */ + ".sav");
	
	//if(datatosave=="other")
	//{	
		loadedFile.WriteLine(SaveData());
		loadedFile.Close();
	//}
	
	
/*	if(datatosave=="map")
	{
		loadedFile.WriteLine(SaveMapData());
		loadedFile.Close();	
	}
	
	if(datatosave=="loadout")
	{
		loadedFile.WriteLine(SaveLoadoutData());
		loadedFile.Close();
	}	

	if(datatosave=="Options")
	{
		loadedFile.WriteLine(SaveOptionsData());
		loadedFile.Close();
	}	
	
	if(datatosave=="Stats")
	{
		loadedFile.WriteLine(SaveStatsData());
		loadedFile.Close();
	}	*/
	
Debug.Log("Saving To: " + path /* + saveNum */);
}


/*function SaveMapData()
{
		data += "**Map Location Details**\n";
	data += "map_location=" + gameObject.Find("PathForPlayer").GetComponent(MoveToZones).currentPathPercent + "\n";
	return data;
}*/

/*function LoadMapData()
{    
	
	if (File.Exists(path + "/mapsavedata.sav"))
	{
		var loadeddata = File.OpenText(path + "/mapsavedata.sav");
		var readdata = loadeddata.ReadLine();
		while(readdata != null)
		{
            var getdata = readdata.ToString().Split("=" [0]);
			if(gameObject.Find("PathForPlayer")&&getdata[0] == "map_location") gameObject.Find("PathForPlayer").GetComponent(MoveToZones).currentPathPercent = int.Parse(getdata[1]);
			readdata = loadeddata.ReadLine();
		}
	loadeddata.Close();
	}
}*/


function SaveData()
{
	SaveFace();
	var stats:Stats;
	stats=gameObject.Find("GameController").GetComponent(Stats);
	//if(Application.loadedLevel!=1)
	//{
		var options:Options;
		options=gameObject.Find("Options").GetComponent(Options);	
//Options
		data += "**Options!**\n";
		data += "sfxVolume=" + options.sfxVolume + "\n";
		data += "musicVolume=" + options.musicVolume + "\n";
		data += "show_arc=" + options.arcTrajectory + "\n";
		data += "hp_bars=" + options.hpBars + "\n";
		data += "showHUD=" + options.showHUD + "\n";
		data += "usingcontroller=" + options.usingController + "\n";
		data += "resolutionX=" + options.resolutions[options.res].width + "\n";
		data += "resolutionY=" + options.resolutions[options.res].height + "\n";
		data += "windowed=" + options.windowed + "\n";
		//data += "vSync=" + options.vSync + "\n";
	//}
//Unlocks & Progression
		data += "**Save Details**\n";
	data += "time_saved="+month+"/"+day+"/"+year+" @ "+time.Now.Hour+":"+time.Now.Minute+"\n";
	//data += "saveSlot="+saveNum+  "\n";
		data += "**Player Details**\n";
	data += "health_max=" + gameObject.Find("Health").GetComponent(Health).maxHealth + "\n";
		data += "**Zone 1 Levels Complete Details**" +  "\n";
	data += "zone_1_level_1_completed=" + zone1LevelsComplete[0] + "\n";
	data += "zone_1_level_1_meats_collected=" + meatsFound[0] + "\n";
	data += "zone_1_level_1_meats_needed=" + meatsNeeded[0] + "\n";
	data += "zone_1_level_2_completed=" + zone1LevelsComplete[1] + "\n";
	data += "zone_1_level_2_meats_collected=" + meatsFound[1] + "\n";
	data += "zone_1_level_2_meats_needed=" + meatsNeeded[1] + "\n";
	data += "zone_1_level_3_completed=" + zone1LevelsComplete[2] + "\n";
	data += "zone_1_level_3_meats_collected=" + meatsFound[2] + "\n";
	data += "zone_1_level_3_meats_needed=" + meatsNeeded[2] + "\n";
	data += "zone_1_level_4_completed=" + zone1LevelsComplete[3] + "\n";
	data += "zone_1_level_4_meats_collected=" + meatsFound[3] + "\n";
	data += "zone_1_level_4_meats_needed=" + meatsNeeded[3] + "\n";
	data += "zone_1_level_5_completed=" + zone1LevelsComplete[4] + "\n";
	data += "zone_1_level_5_meats_collected=" + meatsFound[4] + "\n";
	data += "zone_1_level_5_meats_needed=" + meatsNeeded[4] + "\n";
	data += "zone_1_level_6_completed=" + zone1LevelsComplete[5] + "\n";
	data += "zone_1_level_6_meats_collected=" + meatsFound[5] + "\n";
	data += "zone_1_level_6_meats_needed=" + meatsNeeded[5] + "\n";
	data += "zone_1_level_7_completed=" + zone1LevelsComplete[6] + "\n";
	data += "zone_1_level_7_meats_collected=" + meatsFound[6] + "\n";
	data += "zone_1_level_7_meats_needed=" + meatsNeeded[6] + "\n";
	data += "zone_1_level_8_completed=" + zone1LevelsComplete[7] + "\n";
	data += "zone_1_level_8_meats_collected=" + meatsFound[7] + "\n";
	data += "zone_1_level_8_meats_needed=" + meatsNeeded[7] + "\n";
	data += "zone_1_meats_found_TOTAL=" + (meatsFound[0] + meatsFound[1] + meatsFound[2]) + "\n";// + meatsFound[3] + meatsFound[4] + meatsFound[5] + meatsFound[6] + meatsFound[7]) + "\n";
	data += "zone_1_meats_MAX=" + (meatsNeeded[0] + meatsNeeded[1] + meatsNeeded[2]) + "\n";// + meatsNeeded[3] + meatsNeeded[4] + meatsNeeded[5] + meatsNeeded[6] + meatsNeeded[7]) + "\n";
	data += "zone_1_meats_hauled=" + (zoneMeatsHauled[0]) + "\n";
		
		data += "**Zone 2 Levels Complete Details**\n";
	data += "zone_2_level_1_completed=" + zone2LevelsComplete[0] + "\n";
	data += "zone_2_level_2_completed=" + zone2LevelsComplete[1] + "\n";
	data += "zone_2_level_3_completed=" + zone2LevelsComplete[2] + "\n";
	data += "zone_2_level_4_completed=" + zone2LevelsComplete[3] + "\n";
	data += "zone_2_level_5_completed=" + zone2LevelsComplete[4] + "\n";
	data += "zone_2_level_6_completed=" + zone2LevelsComplete[5] + "\n";
	data += "zone_2_level_7_completed=" + zone2LevelsComplete[6] + "\n";
	data += "zone_2_level_8_completed=" + zone2LevelsComplete[7] + "\n";
		data += "**Zone 3 Levels Complete Details**\n";
	data += "zone_3_level_1_completed=" + zone3LevelsComplete[0] + "\n";
	data += "zone_3_level_2_completed=" + zone3LevelsComplete[1] + "\n";
	data += "zone_3_level_3_completed=" + zone3LevelsComplete[2] + "\n";
	data += "zone_3_level_4_completed=" + zone3LevelsComplete[3] + "\n";
	data += "zone_3_level_5_completed=" + zone3LevelsComplete[4] + "\n";
	data += "zone_3_level_6_completed=" + zone3LevelsComplete[5] + "\n";
	data += "zone_3_level_7_completed=" + zone3LevelsComplete[6] + "\n";
	data += "zone_3_level_8_completed=" + zone3LevelsComplete[7] + "\n";
		data += "**Weapon Unlocks**\n";
	data += "unlocked_Rocks=" + weaponsUnlocked[0] + "\n";
	data += "unlocked_Spear=" + weaponsUnlocked[1] + "\n";
	data += "unlocked_Sword=" + weaponsUnlocked[2] + "\n";
	data += "unlocked_Bow=" + weaponsUnlocked[3] + "\n";
	data += "unlocked_Sling=" + weaponsUnlocked[4] + "\n";
	data += "unlocked_Dinobites=" + weaponsUnlocked[5] + "\n";
	data += "unlocked_Quiver=" + weaponsUnlocked[6] + "\n";
	data += "unlocked_Skateboard=" + weaponsUnlocked[7] + "\n";
	data += "unlocked_Ezbronze=" + weaponsUnlocked[8] + "\n";
	data += "unlocked_Torch=" + weaponsUnlocked[9] + "\n";
	data += "unlocked_Flippers=" + weaponsUnlocked[10] + "\n";
	data += "unlocked_Snorkel=" + weaponsUnlocked[11] + "\n";
	data += "unlocked_Parachute=" + weaponsUnlocked[12] + "\n";
	data += "unlocked_Raptorsuit=" + weaponsUnlocked[13] + "\n";
		data += "**Magic Unlocks**\n";
	data += "magicUnlocked1=" + magicUnlocked[0] + "\n";
	data += "magicUnlocked2=" + magicUnlocked[1] + "\n";
	data += "magicUnlocked3=" + magicUnlocked[2] + "\n";
	data += "magicUnlocked4=" + magicUnlocked[3] + "\n";
	data += "magicUnlocked5=" + magicUnlocked[4] + "\n";
	data += "magicUnlocked6=" + magicUnlocked[5] + "\n";
	data += "magicUnlocked7=" + magicUnlocked[6] + "\n";
	data += "magicUnlocked8=" + magicUnlocked[7] + "\n";
	data += "magicUnlocked9=" + magicUnlocked[8] + "\n";
	data += "magicUnlocked10=" + magicUnlocked[9] + "\n";
	data += "magicUnlocked11=" + magicUnlocked[10] + "\n";
	data += "magicUnlocked12=" + magicUnlocked[11] + "\n";
	data += "magicUnlocked13=" + magicUnlocked[12] + "\n";
	data += "magicUnlocked14=" + magicUnlocked[13] + "\n";
	data += "magicUnlocked15=" + magicUnlocked[14] + "\n";
	data += "magicUnlocked16=" + magicUnlocked[15] + "\n";
			data += "**Ammo Unlocks**\n";
	data += "unlocked_SharpArrow=" + ammoUnlocked[0] + "\n";
	data += "unlocked_PlungerArrow=" + ammoUnlocked[1] + "\n";
	data += "unlocked_PunchArrow=" + ammoUnlocked[2] + "\n";
	data += "unlocked_SlingPebbles=" + ammoUnlocked[3] + "\n";
	data += "unlocked_SlingWaterBalloons=" + ammoUnlocked[4] + "\n";
	data += "unlocked_SlingUndefinedAmmo=" + ammoUnlocked[5] + "\n";
//Stats
		data += "**Play Stats!**\n";
	data += "timesPunched=" +stats.timesPunched + "\n";
	data += "rocksThrown=" +stats.rocksThrown + "\n";
	data += "spearsThrown=" +stats.spearsThrown + "\n";
	data += "spearsStabbed=" +stats.spearsStabbed + "\n";
	data += "arrowsShot=" +stats.arrowsShot + "\n";
	data += "slingshotShot=" +stats.slingshotShot + "\n";
	data += "swordSwung=" +stats.swordSwung + "\n";
	data += "raptorsKilled=" +stats.raptorsKilled + "\n";
	data += "dilosKilled=" +stats.dilosKilled + "\n";
	data += "compysKilled=" +stats.compysKilled + "\n";
	data += "pachysKilled=" +stats.pachysKilled + "\n";
	data += "brawlerKilled=" +stats.brawlerKilled + "\n";
	data += "dartguysKilled=" +stats.dartguysKilled + "\n";
	data += "batsKilled=" +stats.batsKilled + "\n";
	data += "dinobitesEaten=" +stats.dinobitesEaten + "\n";
	data += "tricksTricked=" +stats.tricksTricked + "\n";
	data += "spraytanUsed=" +stats.spraytanUsed + "\n";
	data += "raptorsuitUsed=" +stats.raptorsuitUsed + "\n";
	data += "underwaterTime=" +stats.underwaterTime + "\n";
	data += "hangglideTime=" +stats.hangglideTime + "\n";
	data += "inairTime=" +stats.inairTime + "\n";
	data += "spellsCast=" +stats.spellsCast + "\n";
	data += "timesDied=" +stats.timesDied + "\n";
	data += "levelsBeaten=" +stats.levelsBeaten + "\n";
	data += "karateMasterWins=" +stats.karateMasterWins + "\n";
	
//loadout data
		data += "**Loadout Details**\n";
	//Weapons & Items
	data += "slot_1=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat1SelectedPrev + "\n";
	data += "slot_2=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat2SelectedPrev + "\n";
	data += "slot_3=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat3SelectedPrev + "\n";
	//Magic
	data += "slot_4=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat4SelectedPrev + "\n";
	data += "slot_5=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat5SelectedPrev + "\n";
	data += "slot_6=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat6SelectedPrev + "\n";
	data += "slot_7=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat7SelectedPrev + "\n";
//Map Data
	/*if(Application.loadedLevel==0)
	{
		data += "**Map Location Details**\n";
		data += "map_location=" + gameObject.Find("PathForPlayer").GetComponent(MoveToZones).currentPathPercent + "\n";
		data += "player_position.x=" + GameController.player.transform.position.x + "\n";
		data += "player_position.y=" + GameController.player.transform.position.y + "\n";
		data += "player_position.z=" + GameController.player.transform.position.z + "\n";
	}
	else*/
	//{
		data += "**Map Location Details**\n";
		data += "mmap_location=" + oldLoc + "\n";
		//data += "player_position.x=" + oldX + "\n";
		//data += "player_position.y=" + oldY + "\n";
		//data += "player_position.z=" + oldZ + "\n";
	//}		
	
	return data;
}

function LoadData()
{    
	if (File.Exists(path + "/savedata" /* + saveNum */ + ".sav"))
	{
		var loadeddata = File.OpenText(path + "/savedata" /* + saveNum */ + ".sav");
		var readdata = loadeddata.ReadLine();
		while(readdata != null)
		{
			var stats:Stats;
			stats=gameObject.Find("GameController").GetComponent(Stats);
			//if(Application.loadedLevel!=1)
			//{
				var options:Options;
				options=gameObject.Find("Options").GetComponent(Options);
			//}
		
            var getdata = readdata.ToString().Split("=" [0]);
        //options
            if(options&&getdata[0] == "sfxVolume") options.sfxVolume = float.Parse(getdata[1]);
            else if(options&&getdata[0] == "musicVolume"){ options.musicVolume = float.Parse(getdata[1]); options.musicSource.volume=float.Parse(getdata[1]);}
            
			else if(options&&getdata[0] == "show_arc") options.arcTrajectory = boolean.Parse(getdata[1]);
			else if(options&&getdata[0] == "hp_bars") options.hpBars = boolean.Parse(getdata[1]);
			else if(options&&getdata[0] == "showHUD") options.showHUD = boolean.Parse(getdata[1]);
			else if(options&&getdata[0] == "usingcontroller") options.usingController = boolean.Parse(getdata[1]);
			else if(options&&getdata[0] == "showHUD") options.showHUD = boolean.Parse(getdata[1]);
			else if(options&&getdata[0] == "resolutionX") options.resX = float.Parse(getdata[1]);
			else if(options&&getdata[0] == "resolutionY") options.resY = float.Parse(getdata[1]);
			else if(options&&getdata[0] == "windowed") options.windowed = boolean.Parse(getdata[1]);
			//else if(options&&getdata[0] == "vSync") options.vSync = boolean.Parse(getdata[1]);
		//player
		    else if(getdata[0] == "health_max") gameObject.Find("Health").GetComponent(Health).maxHealth = float.Parse(getdata[1]);
		//zone 1	
			//else if(getdata[0] == "saveSlot") saveNum = int.Parse(getdata[1]);
			else if(getdata[0] == "zone_1_level_1_completed") zone1LevelsComplete[0] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_1_level_2_completed") zone1LevelsComplete[1] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_1_level_3_completed") zone1LevelsComplete[2] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_1_level_4_completed") zone1LevelsComplete[3] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_1_level_5_completed") zone1LevelsComplete[4] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_1_level_6_completed") zone1LevelsComplete[5] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_1_level_7_completed") zone1LevelsComplete[6] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_1_level_8_completed") zone1LevelsComplete[7] = boolean.Parse(getdata[1]);
        //zone 2    
			else if(getdata[0] == "zone_2_level_1_completed") zone2LevelsComplete[0] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_2_level_2_completed") zone2LevelsComplete[1] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_2_level_3_completed") zone2LevelsComplete[2] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_2_level_4_completed") zone2LevelsComplete[3] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_2_level_5_completed") zone2LevelsComplete[4] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_2_level_6_completed") zone2LevelsComplete[5] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_2_level_7_completed") zone2LevelsComplete[6] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_2_level_8_completed") zone2LevelsComplete[7] = boolean.Parse(getdata[1]);
		//zone 3	            
			else if(getdata[0] == "zone_3_level_1_completed") zone3LevelsComplete[0] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_3_level_2_completed") zone3LevelsComplete[1] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_3_level_3_completed") zone3LevelsComplete[2] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_3_level_4_completed") zone3LevelsComplete[3] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_3_level_5_completed") zone3LevelsComplete[4] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_3_level_6_completed") zone3LevelsComplete[5] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_3_level_7_completed") zone3LevelsComplete[6] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "zone_3_level_8_completed") zone3LevelsComplete[7] = boolean.Parse(getdata[1]);
        //Weapon Unlocks
        	else if(getdata[0] == "unlocked_Rocks") weaponsUnlocked[0] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "unlocked_Spear") weaponsUnlocked[1] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "unlocked_Sword") weaponsUnlocked[2] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "unlocked_Bow") weaponsUnlocked[3] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "unlocked_Sling") weaponsUnlocked[4] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "unlocked_Dinobites") weaponsUnlocked[5] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "unlocked_Quiver") weaponsUnlocked[6] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "unlocked_Skateboard") weaponsUnlocked[7] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "unlocked_Ezbronze") weaponsUnlocked[8] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "unlocked_Torch") weaponsUnlocked[9] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "unlocked_Flippers") weaponsUnlocked[10] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "unlocked_Snorkel") weaponsUnlocked[11] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "unlocked_Parachute") weaponsUnlocked[12] = boolean.Parse(getdata[1]);
			else if(getdata[0] == "unlocked_Raptorsuit") weaponsUnlocked[13] = boolean.Parse(getdata[1]);
        	
        //Magic Unlocks
        	else if(getdata[0] == "magicUnlocked1") magicUnlocked[0] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "magicUnlocked2") magicUnlocked[1] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "magicUnlocked3") magicUnlocked[2] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "magicUnlocked4") magicUnlocked[3] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "magicUnlocked5") magicUnlocked[4] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "magicUnlocked6") magicUnlocked[5] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "magicUnlocked7") magicUnlocked[6] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "magicUnlocked8") magicUnlocked[7] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "magicUnlocked9") magicUnlocked[8] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "magicUnlocked10") magicUnlocked[9] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "magicUnlocked11") magicUnlocked[10] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "magicUnlocked12") magicUnlocked[11] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "magicUnlocked13") magicUnlocked[12] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "magicUnlocked14") magicUnlocked[13] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "magicUnlocked15") magicUnlocked[14] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "magicUnlocked16") magicUnlocked[15] = boolean.Parse(getdata[1]);
        //Ammo Unlocks
			else if(getdata[0] == "unlocked_SharpArrow") ammoUnlocked[0] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "unlocked_PlungerArrow") ammoUnlocked[1] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "unlocked_PunchArrow") ammoUnlocked[2] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "unlocked_SlingPebbles") ammoUnlocked[3] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "unlocked_SlingWaterBalloons") ammoUnlocked[4] = boolean.Parse(getdata[1]);
        	else if(getdata[0] == "unlocked_SlingUndefinedAmmo") ammoUnlocked[5] = boolean.Parse(getdata[1]);
		//Stats
			else if(stats&&getdata[0] == "timesPunched") stats.timesPunched = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "rocksThrown")stats.rocksThrown = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "spearsThrown")stats.spearsThrown = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "spearsStabbed")stats.spearsStabbed = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "arrowsShot")stats.arrowsShot = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "slingshotShot")stats.slingshotShot = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "swordSwung")stats.swordSwung = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "raptorsKilled")stats.raptorsKilled = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "dilosKilled")stats.dilosKilled = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "compysKilled")stats.compysKilled = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "pachysKilled")stats.pachysKilled = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "brawlerKilled")stats.brawlerKilled = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "dartguysKilled")stats.dartguysKilled = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "batsKilled")stats.batsKilled = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "dinobitesEaten")stats.dinobitesEaten = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "tricksTricked")stats.tricksTricked = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "spraytanUsed")stats.spraytanUsed = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "raptorsuitUsed")stats.raptorsuitUsed = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "underwaterTime")stats.underwaterTime = float.Parse(getdata[1]);
			else if(stats&&getdata[0] == "hangglideTime")stats.hangglideTime = float.Parse(getdata[1]);
			else if(stats&&getdata[0] == "inairTime")stats.inairTime = float.Parse(getdata[1]);
			else if(stats&&getdata[0] == "spellsCast")stats.spellsCast = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "timesDied")stats.timesDied = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "levelsBeaten")stats.levelsBeaten = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "karateMasterWins")stats.karateMasterWins = int.Parse(getdata[1]);
		//Loadout Data
		//Weapons & Items
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "slot_1") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat1SelectedPrev = int.Parse(getdata[1]);
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "slot_2") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat2SelectedPrev = int.Parse(getdata[1]);
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "slot_3") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat3SelectedPrev = int.Parse(getdata[1]);
		//Magic
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "slot_4") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat4SelectedPrev = int.Parse(getdata[1]);
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "slot_5") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat5SelectedPrev = int.Parse(getdata[1]);
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "slot_6") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat6SelectedPrev = int.Parse(getdata[1]);
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "slot_7") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat7SelectedPrev = int.Parse(getdata[1]);
		//Zone 1 Meats Collected
			//else if(gameObject.Find("Level")!=null)
			//{
			//	if(gameObject.Find("Level").GetComponent(MonoBehaviour).zone==1)
				//{
				//	if(gameObject.Find("Level").GetComponent(MonoBehaviour).level==1)
				//	{
			else if(getdata[0] == "zone_1_level_1_meats_collected") 
				meatsFound[0] = int.Parse(getdata[1]); 
			else if(getdata[0] == "zone_1_level_1_meats_needed")
				meatsNeeded[0] = int.Parse(getdata[1]);
			else if(getdata[0] == "zone_1_level_2_meats_collected") 
				meatsFound[1] = int.Parse(getdata[1]); 
			else if(getdata[0] == "zone_1_level_2_meats_needed")
				meatsNeeded[1] = int.Parse(getdata[1]);
			else if(getdata[0] == "zone_1_level_3_meats_collected") 
				meatsFound[2] = int.Parse(getdata[1]); 
			else if(getdata[0] == "zone_1_level_3_meats_needed")
				meatsNeeded[2] = int.Parse(getdata[1]);
			else if(getdata[0] == "zone_1_level_4_meats_collected") 
				meatsFound[3] = int.Parse(getdata[1]); 
			else if(getdata[0] == "zone_1_level_4_meats_needed")
				meatsNeeded[3] = int.Parse(getdata[1]);
			else if(getdata[0] == "zone_1_level_5_meats_collected") 
				meatsFound[4] = int.Parse(getdata[1]); 
			else if(getdata[0] == "zone_1_level_5_meats_needed")
				meatsNeeded[4] = int.Parse(getdata[1]);
			else if(getdata[0] == "zone_1_level_6_meats_collected") 
				meatsFound[5] = int.Parse(getdata[1]); 
			else if(getdata[0] == "zone_1_level_6_meats_needed")
				meatsNeeded[5] = int.Parse(getdata[1]);
			else if(getdata[0] == "zone_1_level_7_meats_collected") 
				meatsFound[6] = int.Parse(getdata[1]); 
			else if(getdata[0] == "zone_1_level_7_meats_needed")
				meatsNeeded[6] = int.Parse(getdata[1]);
			else if(getdata[0] == "zone_1_level_8_meats_collected") 
				meatsFound[7] = int.Parse(getdata[1]); 
			else if(getdata[0] == "zone_1_level_8_meats_needed")
				meatsNeeded[7] = int.Parse(getdata[1]);
				//	}
					
					/*if(gameObject.Find("Level").GetComponent(MonoBehaviour).meatTruckLevel)	//meat truck level - Zone found & Max
					{
						if(getdata[0] == "zone_1_meats_found_TOTAL")
							zoneMeatsFound[0] = int.Parse(getdata[1]);
						if(getdata[0] == "zone_1_meats_MAX")
							zoneMeatsMax[0] = int.Parse(getdata[1]);
					}*/
				//}
			//}
			//else if(gameObject.Find("Level")==null)
			//{
			//	if(getdata[0] == "level_1_meats_collected") 
			//		meatsFound[0] = int.Parse(getdata[1]);
			//}
			
			else if(getdata[0] == "zone_1_meats_found_TOTAL")
				zoneMeatsFound[0] = int.Parse(getdata[1]);
			else if(getdata[0] == "zone_1_meats_MAX")
				zoneMeatsMax[0] = int.Parse(getdata[1]);
			else if(getdata[0] == "zone_1_meats_hauled")
				zoneMeatsHauled[0] = int.Parse(getdata[1]);
				
		
		//Map Position
		if(Application.loadedLevel==1)
		{
			//var mapData:MoveToZones;
			mapData=gameObject.Find("PathForPlayer").GetComponent(MoveToZones);
			//if(gameObject.Find("PathForPlayer")&&getdata[0] == "map_location") mapData.currentPathPercent = int.Parse(getdata[1]);	
			//else if(gameObject.Find("Player")&&getdata[0] == "player_position.x") GameController.player.transform.position.x = float.Parse(getdata[1]);	
			//else if(gameObject.Find("Player")&&getdata[0] == "player_position.y") GameController.player.transform.position.y = float.Parse(getdata[1]);	
			//else if(gameObject.Find("Player")&&getdata[0] == "player_position.z") GameController.player.transform.position.z = float.Parse(getdata[1]);	
			if(getdata[0] == "mmap_location") mapData.currentNodeID = int.Parse(getdata[1]);//currentPathPercent = int.Parse(getdata[1]);
			//else if(getdata[0] == "player_position.x") GameController.player.transform.position.x = float.Parse(getdata[1]);	
			//else if(getdata[0] == "player_position.y") GameController.player.transform.position.y = float.Parse(getdata[1]);	
			//else if(getdata[0] == "player_position.z") GameController.player.transform.position.z = float.Parse(getdata[1]);	
		}
		/*
		else
		{
			if(getdata[0] == "mmap_location") oldLoc = int.Parse(getdata[1]);
			else if(getdata[0] == "player_position.x") oldX = float.Parse(getdata[1]);
			else if(getdata[0] == "player_position.y") oldY = float.Parse(getdata[1]);	
			else if(getdata[0] == "player_position.z") oldZ = float.Parse(getdata[1]);	
		} 
		*/
		
		readdata = loadeddata.ReadLine();
		}
		loadeddata.Close();
	}
	Debug.Log("loaded" /* + saveNum */);
}

function LoadDataLate()
{    
	if (File.Exists(path + "/savedata" /* + saveNum */ + ".sav"))
	{
		var loadeddata = File.OpenText(path + "/savedata" /* + saveNum */ + ".sav");
		var readdata = loadeddata.ReadLine();
		while(readdata != null)
		{
			var stats:Stats;
			stats=gameObject.Find("GameController").GetComponent(Stats);
			//if(Application.loadedLevel!=1)
			//{
				var options:Options;
				options=gameObject.Find("Options").GetComponent(Options);
			//}
		
            var getdata = readdata.ToString().Split("=" [0]);
		//Map Position
		
		if(Application.loadedLevel!=1)
		{
			if(getdata[0] == "mmap_location") oldLoc = int.Parse(getdata[1]);
			else if(getdata[0] == "player_position.x") oldX = float.Parse(getdata[1]);
			else if(getdata[0] == "player_position.y") oldY = float.Parse(getdata[1]);	
			else if(getdata[0] == "player_position.z") oldZ = float.Parse(getdata[1]);	
		} 
		
		readdata = loadeddata.ReadLine();
		}
		loadeddata.Close();
	}
	Debug.Log("loaded_late" /* + saveNum */);
}

/*function SaveLoadoutData()
{
		data += "**Loadout Details**\n";
	//Weapons & Items
	data += "slot_1=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat1SelectedPrev + "\n";
	data += "slot_2=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat2SelectedPrev + "\n";
	data += "slot_3=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat3SelectedPrev + "\n";
	//Magic
	data += "slot_4=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat4SelectedPrev + "\n";
	data += "slot_5=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat5SelectedPrev + "\n";
	data += "slot_6=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat6SelectedPrev + "\n";
	data += "slot_7=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat7SelectedPrev + "\n";
//////
	data += "weapon_1=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useRocks + "\n";
	data += "weapon_2=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useSpear + "\n";
	data += "weapon_3=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useSword + "\n";
	data += "weapon_4=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useBow + "\n";
	data += "weapon_5=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useSling + "\n";
	//Magic
	data += "magic_1=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic1 + "\n";
	data += "magic_2=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic2 + "\n";
	data += "magic_3=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic3 + "\n";
	data += "magic_4=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic4 + "\n";
	data += "magic_5=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic5 + "\n";
	data += "magic_6=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic6 + "\n";
	data += "magic_7=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic7 + "\n";
	data += "magic_8=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic8 + "\n";
	data += "magic_9=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic9 + "\n";
	data += "magic_10=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic10 + "\n";
	data += "magic_11=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic11 + "\n";
	data += "magic_12=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic12 + "\n";
	data += "magic_13=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic13 + "\n";
	data += "magic_14=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic14 + "\n";
	data += "magic_15=" + gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic15 + "\n";
	
	return data;
}*/
/*function LoadLoadoutData()
{    
	if (File.Exists(path + "/loadoutsavedata.sav"))
	{
		var loadeddata = File.OpenText(path + "/loadoutsavedata.sav");
		var readdata = loadeddata.ReadLine();
		while(readdata != null)
		{
            var getdata = readdata.ToString().Split("=" [0]);
		//Weapons & Items
			if(gameObject.Find("Weapon Loadout")&&getdata[0] == "slot_1") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat1SelectedPrev = int.Parse(getdata[1]);
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "slot_2") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat2SelectedPrev = int.Parse(getdata[1]);
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "slot_3") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat3SelectedPrev = int.Parse(getdata[1]);
		//Magic
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "slot_4") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat4SelectedPrev = int.Parse(getdata[1]);
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "slot_5") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat5SelectedPrev = int.Parse(getdata[1]);
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "slot_6") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat6SelectedPrev = int.Parse(getdata[1]);
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "slot_7") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI).cat7SelectedPrev = int.Parse(getdata[1]);
		/*	else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "weapon_2") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useSpear = boolean.Parse(getdata[1]);
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "weapon_3") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useSword = boolean.Parse(getdata[1]);
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "weapon_4") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useBow = boolean.Parse(getdata[1]);
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "weapon_5") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useSling = boolean.Parse(getdata[1]);
		//Magic
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "magic_1") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic1 = boolean.Parse(getdata[1]);
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "magic_2") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic2 = boolean.Parse(getdata[1]);	
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "magic_3") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic3 = boolean.Parse(getdata[1]);	
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "magic_4") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic4 = boolean.Parse(getdata[1]);	
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "magic_5") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic5 = boolean.Parse(getdata[1]);	
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "magic_6") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic6 = boolean.Parse(getdata[1]);	
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "magic_7") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic7 = boolean.Parse(getdata[1]);	
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "magic_8") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic8 = boolean.Parse(getdata[1]);	
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "magic_9") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic9 = boolean.Parse(getdata[1]);	
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "magic_10") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic10 = boolean.Parse(getdata[1]);	
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "magic_11") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic11 = boolean.Parse(getdata[1]);	
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "magic_12") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic12 = boolean.Parse(getdata[1]);	
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "magic_13") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic13 = boolean.Parse(getdata[1]);	
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "magic_14") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic14 = boolean.Parse(getdata[1]);
			else if(gameObject.Find("Weapon Loadout")&&getdata[0] == "magic_15") gameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout).useMagic15 = boolean.Parse(getdata[1]);		
		
			readdata = loadeddata.ReadLine();
		}
	loadeddata.Close();
	}
}*/


/*function SaveOptionsData()
{
	var options:Options;
	options=gameObject.Find("Options").GetComponent(Options);
	
	data += "Super Dino Hunter Options!\n";
	data += "sfxVolume=" + options.volume + "\n";
	data += "show_arc=" + options.arcTrajectory + "\n";
	data += "hp_bars=" + options.hpBars + "\n";
	data += "usingcontroller=" + options.usingController + "\n";
	return data;
}*/

/*function LoadOptionsData()
{    
	
	if (File.Exists(path + "/Optionssavedata.sav"))
	{
		var loadeddata = File.OpenText(path + "/Optionssavedata.sav");
		var readdata = loadeddata.ReadLine();
		while(readdata != null)
		{
			var options:Options;
			options=gameObject.Find("Options").GetComponent(Options);
            var getdata = readdata.ToString().Split("=" [0]);
			if(options&&getdata[0] == "volume") options.volume = float.Parse(getdata[1]);
			else if(options&&getdata[0] == "show_arc") options.arcTrajectory = boolean.Parse(getdata[1]);
			else if(options&&getdata[0] == "hp_bars") options.hpBars = boolean.Parse(getdata[1]);
			else if(options&&getdata[0] == "usingcontroller") options.usingController = boolean.Parse(getdata[1]);
			readdata = loadeddata.ReadLine();
		}
	loadeddata.Close();
	}
}*/


/*function SaveStatsData()
{
	var stats:Stats;
	stats=gameObject.Find("GameController").GetComponent(Stats);
	data += "Play Stats!\n";
	data += "timesPunched=" +stats.timesPunched + "\n";
	data += "rocksThrown=" +stats.rocksThrown + "\n";
	data += "spearsThrown=" +stats.spearsThrown + "\n";
	data += "spearsStabbed=" +stats.spearsStabbed + "\n";
	data += "arrowsShot=" +stats.arrowsShot + "\n";
	data += "slingshotShot=" +stats.slingshotShot + "\n";
	data += "swordSwung=" +stats.swordSwung + "\n";
	data += "raptorsKilled=" +stats.raptorsKilled + "\n";
	data += "dilosKilled=" +stats.dilosKilled + "\n";
	data += "compysKilled=" +stats.compysKilled + "\n";
	data += "pachysKilled=" +stats.pachysKilled + "\n";
	data += "dartguysKilled=" +stats.dartguysKilled + "\n";
	data += "dinobitesEaten=" +stats.dinobitesEaten + "\n";
	data += "tricksTricked=" +stats.tricksTricked + "\n";
	data += "spraytanUsed=" +stats.spraytanUsed + "\n";
	data += "raptorsuitUsed=" +stats.raptorsuitUsed + "\n";
	data += "underwaterTime=" +stats.underwaterTime + "\n";
	data += "hangglideTime=" +stats.hangglideTime + "\n";
	data += "inairTime=" +stats.inairTime + "\n";
	data += "spellsCast=" +stats.spellsCast + "\n";
	data += "timesDied=" +stats.timesDied + "\n";
	return data;
}*/

/*function LoadStatsData()
{    
	
	if (File.Exists(path + "/Statssavedata.sav"))
	{
		var loadeddata = File.OpenText(path + "/Statssavedata.sav");
		var readdata = loadeddata.ReadLine();
		while(readdata != null)
		{
			var stats:Stats;
			stats=gameObject.Find("GameController").GetComponent(Stats);
            var getdata = readdata.ToString().Split("=" [0]);
			if(stats&&getdata[0] == "timesPunched") stats.timesPunched = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "rocksThrown")stats.rocksThrown = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "spearsThrown")stats.spearsThrown = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "spearsStabbed")stats.spearsStabbed = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "arrowsShot")stats.arrowsShot = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "slingshotShot")stats.slingshotShot = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "swordSwung")stats.swordSwung = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "raptorsKilled")stats.raptorsKilled = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "dilosKilled")stats.dilosKilled = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "compysKilled")stats.compysKilled = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "pachysKilled")stats.pachysKilled = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "dartguysKilled")stats.dartguysKilled = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "dinobitesEaten")stats.dinobitesEaten = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "tricksTricked")stats.tricksTricked = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "spraytanUsed")stats.spraytanUsed = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "raptorsuitUsed")stats.raptorsuitUsed = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "underwaterTime")stats.underwaterTime = float.Parse(getdata[1]);
			else if(stats&&getdata[0] == "hangglideTime")stats.hangglideTime = float.Parse(getdata[1]);
			else if(stats&&getdata[0] == "inairTime")stats.inairTime = float.Parse(getdata[1]);
			else if(stats&&getdata[0] == "spellsCast")stats.spellsCast = int.Parse(getdata[1]);
			else if(stats&&getdata[0] == "timesDied")stats.timesDied = int.Parse(getdata[1]);

			readdata = loadeddata.ReadLine();
		}
	loadeddata.Close();
	}
}*/

function OnGUI()
{
	GUI.matrix = Matrix4x4.TRS (Vector3(0f, 0f, 0f), Quaternion.identity, Vector3 (ScreenSize.X, ScreenSize.Y, 1f));
	GUI.depth=-99;
	if(saving)
		GUI.DrawTexture(new Rect(1650, 950, 256,256), saveCursor);
}

function SaveFace()
{
	RotateFace();
	saving=true;
	yield StartCoroutine(RealTimeScript.WaitForRealSeconds(3));
	saving=false;
}

function RotateFace()
{
	var waitTime = 1.0/10.0;
	for (i = 0; i < saveTextures.Length; i++)
	{
		saveCursor = saveTextures[i];
		yield StartCoroutine(RealTimeScript.WaitForRealSeconds(waitTime));
	}
}
