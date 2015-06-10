var useRocks:boolean;
var useSpear:boolean;
var useSword:boolean;
var useBow:boolean;
var useSling:boolean;

var useItem:boolean[];

var weaponSelect:WeaponSelect;

var rocks:int;
var spear:int;
var sword:int;
var bow:int;
var sling:int;

var magic1:int;
var magic2:int;
var magic3:int;
var magic4:int;
var magic5:int;
var magic6:int;
var magic7:int;
var magic8:int;
var magic9:int;
var magic10:int;
var magic11:int;
var magic12:int;
var magic13:int;
var magic14:int;
var magic15:int;
var magic16:int;

var useMagic:boolean[];



var style:GUIStyle;
var xButton:Texture2D;
var xButtonStyle:GUIStyle;
var loadoutText:Texture2D;
var yButton:Texture2D;
var yButtonStyle:GUIStyle;
var villageText:Texture2D;
var overworldText:Texture2D;
var loadout:boolean;
var cancel:boolean;

var enterLevel:MonoBehaviour;


var numberSelected:int;
var magicNumberSelected:int;

var weaponLoadoutGUI:GUITexture;

var a:int;

static var weaponLoadoutMenu:boolean;

//var savedItems:ItemsToSave;

function Start ()
{
	weaponLoadoutMenu=false;
//	weaponSelect=GameObject.Find("GameController").GetComponent(WeaponSelect);
	weaponLoadoutGUI=GameObject.Find("Weapon Loadout").GetComponent(GUITexture);
	
}

function Update ()
{
	/*if((Application.loadedLevel==1||Application.loadedLevel==2)&&Input.GetButtonDown("Magic")&&!weaponLoadoutMenu&&!StartMenuScript.inAMenu)
		weaponLoadoutMenu=true;
	else if((Application.loadedLevel==1||Application.loadedLevel==2)&&Input.GetButtonDown("Magic")&&weaponLoadoutMenu)
	{
		ItemsToSave.itemsToSave.SaveToFile();
		weaponLoadoutMenu=false;
	}*/
		
	/*if(weaponLoadoutMenu)
	{
		Time.timeScale=0;
//		weaponLoadoutGUI.enabled=true;//.SetActive(true);
	}
	else
	{
		Time.timeScale=1;
		//this.enabled=false;
//		weaponLoadoutGUI.enabled=false;//SetActive(false);
	}*/
	UpdateNumber();
	
	if(Input.GetButtonDown("Interact"))
		loadout=true;
	if(Input.GetButtonUp("Interact"))
		loadout=false;
		
	if(Input.GetKeyDown("joystick button 3"))
		cancel=true;
	if(Input.GetKeyUp("joystick button 3"))
		cancel=false;
}

function UpdateNumber()
{
//weapons
	if(useRocks)
		rocks=1;
	else
		rocks=0;
	if(useSpear)
		spear=1;
	else
		spear=0;
	if(useSword)
		sword=1;
	else
		sword=0;
	if(useBow)
		bow=1;
	else
		bow=0;
	if(useSling)
		sling=1;
	else
		sling=0;
	
//magic
	if(useMagic[0])
		magic1=1;
	else
		magic1=0;
		
	if(useMagic[1])
		magic2=1;
	else
		magic2=0;
		
	if(useMagic[2])
		magic3=1;
	else
		magic3=0;
		
	if(useMagic[3])
		magic4=1;
	else
		magic4=0;	
		
	if(useMagic[4])
		magic5=1;
	else
		magic5=0;	
			
	if(useMagic[5])
		magic6=1;
	else
		magic6=0;	
			
	if(useMagic[6])
		magic7=1;
	else
		magic7=0;	
			
	if(useMagic[7])
		magic8=1;
	else
		magic8=0;	
			
	if(useMagic[8])
		magic9=1;
	else
		magic9=0;	
			
	if(useMagic[9])
		magic10=1;
	else
		magic10=0;	
			
	if(useMagic[10])
		magic11=1;
	else
		magic11=0;	
			
	if(useMagic[11])
		magic12=1;
	else
		magic12=0;	
			
	if(useMagic[12])
		magic13=1;
	else
		magic13=0;	
			
	if(useMagic[13])
		magic14=1;
	else
		magic14=0;	
			
	if(useMagic[14])
		magic15=1;
	else
		magic15=0;
			
	if(useMagic[15])
		magic16=1;
	else
		magic16=0;
		
	magicNumberSelected=magic1+magic2+magic3+magic4+magic5+magic6+magic7+magic8+magic9+magic10+magic11+magic12+magic13+magic14+magic15+magic16;
	numberSelected=rocks+spear+sword+bow+sling;
}

function OnGUI()
{
	GUI.depth=2;
	GUI.matrix = Matrix4x4.TRS (Vector3(0f, 0f, 0f), Quaternion.identity, Vector3 (ScreenSize.X, ScreenSize.Y, 1f));
	if(Application.loadedLevelName=="Map - Overworld")
	{
		//DEMO_SWITCH
		if(!WeaponLoadout.weaponLoadoutMenu&&!EnterZoneDemo.loading&&!MoveToZones.moving&&MoveToZones.atLevel&&!StartMenuScript.inAMenu)
		/*
		if(!WeaponLoadout.weaponLoadoutMenu&&!EnterZone.loading&&!MoveToZones.moving&&!StartMenuScript.inAMenu)
		*/
		//DEMO_SWITCH_END
		{
			if(GUI.Button(new Rect(180, 1125,262,52), xButton, style)||loadout||GUI.Button(new Rect(250, 1125,192,46), loadoutText, xButtonStyle))
			{
				if(!weaponLoadoutMenu)
					weaponLoadoutMenu=true;
				else
					weaponLoadoutMenu=false;
			}
			//DEMO_SWITCH
			/*
			if(!weaponLoadoutMenu&&(GUI.Button(new Rect(1400, 1125,262,52), yButton, style)||cancel||GUI.Button(new Rect(1470, 1125,149,55), villageText, yButtonStyle)))
			{
				enterLevel.LoadIt(0);
			}
			*/
			//DEMO_SWITCH_END
		}
	}
	
	else if(Application.loadedLevelName=="Map - Jungle")
	{
	if(!WeaponLoadout.weaponLoadoutMenu&&!EnterLevel.loading&&!MoveToZones.moving&&!StartMenuScript.inAMenu)
		{
			if(GUI.Button(new Rect(180, 1125,262,52), xButton, style)||loadout||GUI.Button(new Rect(250, 1125,192,46), loadoutText, xButtonStyle))
			{
				if(!weaponLoadoutMenu)
					weaponLoadoutMenu=true;
				else
					weaponLoadoutMenu=false;
			}
			if(!weaponLoadoutMenu&&(GUI.Button(new Rect(1400, 1125,262,52), yButton, style)||cancel||GUI.Button(new Rect(1470, 1125,274,57), overworldText, yButtonStyle)))
			{
				enterLevel.LoadIt(0);
				//Application.LoadLevel("Map - Overworld");
			}
		}
	}
}