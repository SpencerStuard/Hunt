var player:Transform;

var zone1:Transform;
var zone2:Transform;
var zone3:Transform;
var zone4:Transform;

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
var eggTexture:Texture2D;
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
	if(Vector2.Distance(player.position,zone1.position)<0.5)
		enterZone1=true;
	else
		enterZone1=false;
	
	if(Vector2.Distance(player.position,zone2.position)<0.5)//&&ItemsToSave.itemsToSave.zonesComplete[0])
		enterZone2=true;
	else
		enterZone2=false;
	
	if(Vector2.Distance(player.position,zone3.position)<0.5)
		enterZone3=true;
	else
		enterZone3=false;
	
	if(Vector2.Distance(player.position,zone4.position)<0.5)
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
	if(!loading&&!WeaponLoadout.weaponLoadoutMenu&&!MoveToZones.moving&&!StartMenuScript.inAMenu)
	{
		GUI.matrix = Matrix4x4.TRS (Vector3(0f, 0f, 0f), Quaternion.identity, Vector3 (ScreenSize.X, ScreenSize.Y, 1f));
		GUI.depth=4;
		if(!loading&&!WeaponLoadout.weaponLoadoutMenu&&!MoveToZones.moving)
		{
			if(enterZone1)
			{
				GUI.DrawTexture(Rect(0, 0, 1920, 1200), enterLevelBG);
				GUI.Label (new Rect (885,950,150, 75), "" + "Jungle", style);
				GUI.Label(Rect(775, 1025, 114, 114), GUIContent(meatTexture));
				GUI.Label (new Rect (955,1040,150, 75), "" + ItemsToSave.itemsToSave.meatsFound[0] + "/" + (ItemsToSave.itemsToSave.meatsNeeded[0]) + " lbs.", style);
				
				if(GUI.Button(new Rect(660, 1125, 262,52), acceptButton, style)||accept&&StartMenuScript.okToClose||GUI.Button(new Rect(834, 1130,258,50), acceptText, acceptStyle))
				{
					LoadIt(0);
				}
			}
			
			if(enterZone2)
			{
				GUI.DrawTexture(Rect(0, 0, 1920, 1200), enterLevelBG);
				GUI.Label (new Rect (885,950,150, 75), "" + "Snow", style);
				GUI.Label(Rect(775, 1025, 114, 114), GUIContent(meatTexture));
				GUI.Label (new Rect (955,1040,150, 75), "" + ItemsToSave.itemsToSave.meatsFound[1] + "/" + (ItemsToSave.itemsToSave.meatsNeeded[1]) + " lbs.", style);
				
				if(GUI.Button(new Rect(660, 1125, 262,52), acceptButton, style)||accept&&StartMenuScript.okToClose||GUI.Button(new Rect(834, 1130,258,50), acceptText, acceptStyle))
				{
					LoadIt(1);
				}
			}
			
			if(enterZone3)
			{
				GUI.DrawTexture(Rect(0, 0, 1920, 1200), enterLevelBG);
				GUI.Label (new Rect (885,950,150, 75), "" + "Egg Heist", style);
				GUI.Label(Rect(865, 1040, 58, 60), GUIContent(eggTexture));
				if(!ItemsToSave.itemsToSave.zone1LevelsComplete[2])
					GUI.Label (new Rect (955,1040,150, 75), "" + "0/1", style);
				else
					GUI.Label (new Rect (955,1040,150, 75), "" + "1/1", style);
				
				if(GUI.Button(new Rect(660, 1125, 262,52), acceptButton, style)||accept&&StartMenuScript.okToClose||GUI.Button(new Rect(834, 1130,258,50), acceptText, acceptStyle))
				{
					LoadIt(2);
				}
			}
			
			if(enterZone4)
			{
				GUI.DrawTexture(Rect(0, 0, 1920, 1200), enterLevelBG);
				GUI.Label (new Rect (885,950,150, 75), "" + "Meat Truck Defense", style);
				GUI.Label(Rect(775, 1025, 114, 114), GUIContent(meatTexture));
				GUI.Label (new Rect (955,1040,150, 75), "" + ItemsToSave.itemsToSave.zoneMeatsHauled[0] + "/" + ItemsToSave.itemsToSave.zoneMeatsMax[0] + " lbs.", style);
				
				if(GUI.Button(new Rect(660, 1125, 262,52), acceptButton, style)||accept&&StartMenuScript.okToClose||GUI.Button(new Rect(834, 1130,258,50), acceptText, acceptStyle))
				{
					LoadIt(3);
				}
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
		Application.LoadLevel("Jungle - 1");
	else if(x==1)
		Application.LoadLevel("Snow - 2");
	else if(x==2)
		Application.LoadLevel("Jungle - Egg Heist");
	else if(x==3)
		Application.LoadLevel("Jungle - Truck Defense");
}