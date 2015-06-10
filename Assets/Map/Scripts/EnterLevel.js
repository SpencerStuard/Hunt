var player:Transform;

var zone:Transform[];

var enterZone:boolean[];

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
	if(Vector2.Distance(player.position,zone[0].position)<0.5)
		enterZone[0]=true;
	else
		enterZone[0]=false;
	
	if(Vector2.Distance(player.position,zone[1].position)<0.5&&ItemsToSave.itemsToSave.zone1LevelsComplete[0])
		enterZone[1]=true;
	else
		enterZone[1]=false;
		
	if(Vector2.Distance(player.position,zone[2].position)<0.5&&ItemsToSave.itemsToSave.zone1LevelsComplete[1])
		enterZone[2]=true;
	else
		enterZone[2]=false;
		
	if(Vector2.Distance(player.position,zone[3].position)<0.5&&ItemsToSave.itemsToSave.zone1LevelsComplete[2])
		enterZone[3]=true;
	else
		enterZone[3]=false;
		
	if(Vector2.Distance(player.position,zone[4].position)<0.5&&ItemsToSave.itemsToSave.zone1LevelsComplete[3])
		enterZone[4]=true;
	else
		enterZone[4]=false;

		
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
		if(enterZone[0])
		{
			GUI.DrawTexture(Rect(0, 0, 1920, 1200), enterLevelBG);
			GUI.Label (new Rect (885,950,150, 75), "" + "Jungle 1", style);
			GUI.Label(Rect(775, 1025, 114, 114), GUIContent(meatTexture));
			GUI.Label (new Rect (955,1040,150, 75), "" + ItemsToSave.itemsToSave.meatsFound[0] + "/" + ItemsToSave.itemsToSave.meatsNeeded[0] + " lbs.", style);
			
			if(GUI.Button(new Rect(660, 1125, 262,52), acceptButton, style)||accept&&StartMenuScript.okToClose||GUI.Button(new Rect(834, 1130,262,52), acceptText, acceptStyle))
			{
				LoadIt(1);
			}
		}
		
		if(enterZone[1])
				{
			GUI.DrawTexture(Rect(0, 0, 1920, 1200), enterLevelBG);
			GUI.Label (new Rect (885,950,150, 75), "" + "Snow 1", style);
			GUI.Label(Rect(775, 1025, 114, 114), GUIContent(meatTexture));
			GUI.Label (new Rect (955,1040,150, 75), "" + ItemsToSave.itemsToSave.meatsFound[1] + "/" + ItemsToSave.itemsToSave.meatsNeeded[1] + " lbs.", style);
			
			if(GUI.Button(new Rect(660, 1125, 262,52), acceptButton, style)||accept&&StartMenuScript.okToClose||GUI.Button(new Rect(834, 1130,262,52), acceptText, acceptStyle))
			{
				LoadIt(2);
			}
		}
		
			if(enterZone[2])
		{
			if (GUI.Button(Rect(Screen.width/2,Screen.height/2+120,200,90),"Enter Dojo"))
			{
				ItemsToSave.itemsToSave.SaveToFile();
				Application.LoadLevel("Dojo");
			}
		}
		
			if(enterZone[3])
		{
			if (GUI.Button(Rect(Screen.width/2,Screen.height/2+120,200,90),"Enter Zone 3"))
			{
				ItemsToSave.itemsToSave.SaveToFile();
				Application.LoadLevel("Zone 3");
			}
		}
		
			if(enterZone[4])
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
		Application.LoadLevel("Map - Overworld");
	else if(x==1)
		Application.LoadLevel("Jungle - 1");
	else if(x==2)
		Application.LoadLevel("Snow - 2");
}