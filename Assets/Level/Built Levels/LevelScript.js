var allChildren;
var allChildren2;
var allChildren3;
var allChildren4;
var allChildren5;
var allChildren6;

var meatScore:int;
var maxMeatScore:int;
var style = new GUIStyle();
var style1:GUIStyle;
var style2:GUIStyle;
var style3:GUIStyle;
var style4:GUIStyle;
var meatTexture:Texture2D;
var eggTexture:Texture2D;

var zone:int;
var level:int;


//Meats
var hams:int;
var bacons:int;
var chops:int;
var ribs:int;
var sausages:int;
var steaks1:int;
var steaks2:int;

var dontTurnToLand:boolean;

var meatTruckLevel:boolean;
var eggHeistLevel:boolean;

function Awake()
{
	if(Application.loadedLevelName=="Jungle - Truck Defense")
		meatTruckLevel=true;
	else
		meatTruckLevel=false;
		
	if(Application.loadedLevelName=="Jungle - Egg Heist")
	{
		eggHeistLevel=true;
		GameController.eggHeld=0;
		GameController.SkateSpawnerScript.passive=true;
	}
	else
		eggHeistLevel=false;
}

function Start ()
{
	hams=0;
	bacons=0;
	chops=0;
	ribs=0;
	sausages=0;
	steaks1=0;
	steaks2=0;
	meatScore=0;
	if(meatTruckLevel)
	{
		meatScore=ItemsToSave.itemsToSave.zoneMeatsFound[0];
		maxMeatScore=ItemsToSave.itemsToSave.zoneMeatsMax[0];
	}
	else
		maxMeatScore=ItemsToSave.itemsToSave.meatsNeeded[level-1];
//	Scream();
	if(dontTurnToLand)
		TurnToLand();
}

function TurnToLand()
{
	allChildren=GameObject.Find("BG1.0").GetComponentsInChildren(Transform);
	for (var child : Transform in allChildren) 
	{
		child.gameObject.SetActive(false);
		child.gameObject.transform.tag="Land";
		child.gameObject.SetActive(true);
	}
	
	allChildren2=GameObject.Find("BG1.2").GetComponentsInChildren(Transform);
	for (var child2 : Transform in allChildren2) 
	{
		child2.gameObject.SetActive(false);
		child2.gameObject.transform.tag="Land";
		child2.gameObject.SetActive(true);
	}
	
	if(GameObject.Find("Sides.0")!=null)
	{
		allChildren3=GameObject.Find("Sides.0").GetComponentsInChildren(Transform);
		for (var child3 : Transform in allChildren3) 
		{
			child3.gameObject.SetActive(false);
			child3.gameObject.transform.tag="Land";
			child3.gameObject.SetActive(true);
		}
	}
	
	if(GameObject.Find("Sides.1")!=null)
	{
		allChildren4=GameObject.Find("Sides.1").GetComponentsInChildren(Transform);
		for (var child4 : Transform in allChildren4) 
		{
			child4.gameObject.SetActive(false);
			child4.gameObject.transform.tag="Land";
			child4.gameObject.SetActive(true);
		}
	}
	
	if(GameObject.Find("Sides")!=null)
	{
		allChildren5=GameObject.Find("Sides").GetComponentsInChildren(Transform);
		for (var child5 : Transform in allChildren5) 
		{
			child5.gameObject.SetActive(false);
			child5.gameObject.transform.tag="Land";
			child5.gameObject.SetActive(true);
		}
	}
	
	if(GameObject.Find("BGNoFriction")!=null)
	{
		allChildren6=GameObject.Find("BGNoFriction").GetComponentsInChildren(Transform);
		for (var child6 : Transform in allChildren6) 
		{
			child6.gameObject.SetActive(false);
			child6.gameObject.transform.tag="Land";
			child6.gameObject.SetActive(true);
		}
	}
}

function OnGUI()
{
	GUI.matrix = Matrix4x4.TRS (Vector3(0f, 0f, 0f), Quaternion.identity, Vector3 (ScreenSize.X, ScreenSize.Y, 1f));
	if(!ExitLevelScript.endGUI&&!StartMenuScript.inAMenu)
	{
		if(!eggHeistLevel)
		{
		GUI.Label(new Rect(1600, HUDScript.pY,175,41), "" + meatScore + " / " + maxMeatScore, style1);
		GUI.Label(new Rect(1600, HUDScript.pY,175,41), "" + meatScore + " / " + maxMeatScore, style2);
		GUI.Label(new Rect(1600, HUDScript.pY,175,41), "" + meatScore + " / " + maxMeatScore, style3);
		GUI.Label(new Rect(1600, HUDScript.pY,175,41), "" + meatScore + " / " + maxMeatScore, style4);
		GUI.Label(new Rect(1600, HUDScript.pY,175,41), "" + meatScore + " / " + maxMeatScore, style);
		GUI.Label(Rect(1450, HUDScript.pY-30, 114, 114), GUIContent(meatTexture));
		}
		else
		{
		GUI.Label(new Rect(1600, HUDScript.pY,175,41), "" + GameController.eggHeld + " / " + 1, style1);
		GUI.Label(new Rect(1600, HUDScript.pY,175,41), "" + GameController.eggHeld + " / " + 1, style2);
		GUI.Label(new Rect(1600, HUDScript.pY,175,41), "" + GameController.eggHeld + " / " + 1, style3);
		GUI.Label(new Rect(1600, HUDScript.pY,175,41), "" + GameController.eggHeld + " / " + 1, style4);
		GUI.Label(new Rect(1600, HUDScript.pY,175,41), "" + GameController.eggHeld + " / " + 1, style);
		GUI.Label(Rect(1525, HUDScript.pY-12, 200, 200), GUIContent(eggTexture));
		
		}
	}
}