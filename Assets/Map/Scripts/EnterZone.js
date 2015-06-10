var player:Transform;

var home:Transform;
var zone1:Transform;
var zone2:Transform;
var zone3:Transform;
var zone4:Transform;

var enterHome:boolean;
var enterZone1:boolean;
var enterZone2:boolean;
var enterZone3:boolean;
var enterZone4:boolean;

var enterLevelBG:Texture2D;
var acceptButton:Texture2D;
var acceptText:Texture2D;
var style:GUIStyle;
var acceptStyle:GUIStyle;
var meatTexture:Texture2D;
var blackOutBGSR:SpriteRenderer;
static var loading:boolean;
var zones:GameObject;

var accept:boolean;

function Start()
{
	loading=false;
}

function Update()
{
	if(Vector2.Distance(player.position,home.position)<0.5)
		enterHome=true;
	else
		enterHome=false;
	
	if(Vector2.Distance(player.position,zone1.position)<0.5)
		enterZone1=true;
	else
		enterZone1=false;
	
	if(Vector2.Distance(player.position,zone2.position)<0.5)//&&ItemsToSave.itemsToSave.zonesComplete[0])
		enterZone2=true;
	else
		enterZone2=false;
	
	if(Vector2.Distance(player.position,zone3.position)<0.5&&ItemsToSave.itemsToSave.zonesComplete[1])
		enterZone3=true;
	else
		enterZone3=false;
	
	if(Vector2.Distance(player.position,zone4.position)<0.5&&ItemsToSave.itemsToSave.zonesComplete[2])
		enterZone4=true;
	else
		enterZone4=false;
		
	if(Input.GetButtonDown("GUIAccept"))
		accept=true;
	if(Input.GetButtonUp("GUIAccept"))
		accept=false;
		
	if(loading)
	{
		zones.SetActive(false);
		player.gameObject.SetActive(false);
		blackOutBGSR.color.a=255;//+=.025; //= Mathf.Lerp(0, 255, Time.deltaTime*.3);
	}
}

function OnGUI()
{
	GUI.matrix = Matrix4x4.TRS (Vector3(0f, 0f, 0f), Quaternion.identity, Vector3 (ScreenSize.X, ScreenSize.Y, 1f));
	GUI.depth=4;
	if(!loading&&!WeaponLoadout.weaponLoadoutMenu&&!MoveToZones.moving&&!StartMenuScript.inAMenu)
	{
		if(enterHome)
		{
			GUI.DrawTexture(Rect(0, 0, 1920, 1200), enterLevelBG);
			GUI.Label (new Rect (885,950,150, 75), "" + "Jungle", style);
			GUI.Label(Rect(775, 1025, 114, 114), GUIContent(meatTexture));
			GUI.Label (new Rect (955,1040,150, 75), "" + ItemsToSave.itemsToSave.zoneMeatsFound[0] + "/" + ItemsToSave.itemsToSave.zoneMeatsMax[0] + " lbs.", style);
			
			if(GUI.Button(new Rect(660, 1125, 262,52), acceptButton, style)||accept&&StartMenuScript.okToClose||GUI.Button(new Rect(834, 1130,258,50), acceptText, acceptStyle))
			{
				LoadIt(1);
			}
		}
		
		if(enterZone1)
{
			GUI.DrawTexture(Rect(0, 0, 1920, 1200), enterLevelBG);
			GUI.Label (new Rect (885,950,150, 75), "" + "Meat Truck Defense", style);
			GUI.Label(Rect(775, 1025, 114, 114), GUIContent(meatTexture));
			GUI.Label (new Rect (955,1040,150, 75), "" + (ItemsToSave.itemsToSave.meatsFound[8]+ItemsToSave.itemsToSave.meatsFound[9]+ItemsToSave.itemsToSave.meatsFound[10]+ItemsToSave.itemsToSave.meatsFound[11]+ItemsToSave.itemsToSave.meatsFound[12]+ItemsToSave.itemsToSave.meatsFound[13]+ItemsToSave.itemsToSave.meatsFound[14]+ItemsToSave.itemsToSave.meatsFound[15]) + "/" + (ItemsToSave.itemsToSave.meatsNeeded[8]+ItemsToSave.itemsToSave.meatsNeeded[9]+ItemsToSave.itemsToSave.meatsNeeded[10]+ItemsToSave.itemsToSave.meatsNeeded[11]+ItemsToSave.itemsToSave.meatsNeeded[12]+ItemsToSave.itemsToSave.meatsNeeded[13]+ItemsToSave.itemsToSave.meatsNeeded[14]+ItemsToSave.itemsToSave.meatsNeeded[15]) + " lbs.", style);
			
			if(GUI.Button(new Rect(660, 1125, 262,52), acceptButton, style)||accept&&StartMenuScript.okToClose||GUI.Button(new Rect(834, 1130,258,50), acceptText, acceptStyle))
			{
				LoadIt(2);
			}
		}
		
			if(enterZone2)
		{
			if (GUI.Button(Rect(Screen.width/2,Screen.height/2+120,200,90),"Meat Truck"))
			{
				ItemsToSave.itemsToSave.SaveToFile();
				Application.LoadLevel("Jungle - Truck Defense");
			}
		}
		
			if(enterZone3)
		{
			if (GUI.Button(Rect(Screen.width/2,Screen.height/2+120,200,90),"Enter Zone 3"))
			{
				ItemsToSave.itemsToSave.SaveToFile();
				Application.LoadLevel("Zone 3");
			}
		}
		
			if(enterZone4)
		{
			if (GUI.Button(Rect(Screen.width/2,Screen.height/2+120,200,90),"Enter Zone 4"))
			{
				ItemsToSave.itemsToSave.SaveToFile();
				Application.LoadLevel("Level 1");
			}
		}
	}
}

function LoadIt(x:int)
{
	ItemsToSave.itemsToSave.SaveToFile();
	loading=true;
	yield WaitForSeconds(.4);
	if(x==0)
		Application.LoadLevel("Village");
	else if(x==1)
		Application.LoadLevel("Map - Jungle");
	else if(x==2)
		Application.LoadLevel("Jungle - Truck Defense");
}