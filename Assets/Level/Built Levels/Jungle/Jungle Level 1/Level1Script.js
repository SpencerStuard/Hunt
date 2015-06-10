var alert:boolean;
var alertTexture:Texture2D;
var allChildren;
var allChildren2;
var allChildren3;

var meatScore:int;
var maxMeatScore:int;
var style = new GUIStyle();
var style1:GUIStyle;
var style2:GUIStyle;
var style3:GUIStyle;
var style4:GUIStyle;
var meatTexture:Texture2D;

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

function Awake()
{
	zone=1;
	level=1;
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
	maxMeatScore=ItemsToSave.itemsToSave.meatsNeeded[level-1];
//	Scream();
	TurnToLand();
	//Fabric.EventManager.Instance.PostEvent("Music/Switch", Fabric.EventAction.SetSwitch, "Jungle_Music");
}

function TurnToLand()
{
	allChildren=GameObject.Find("bg1.0").GetComponentsInChildren(Transform);
	for (var child : Transform in allChildren) 
	{
		child.gameObject.transform.tag="Land";
	}
	allChildren2=GameObject.Find("Sides 1").GetComponentsInChildren(Transform);
	for (var child2 : Transform in allChildren2) 
	{
		child2.gameObject.SetActive(false);
		child2.gameObject.transform.tag="Land";
		child2.gameObject.SetActive(true);
	}
	allChildren2=GameObject.Find("Sides 2").GetComponentsInChildren(Transform);
	for (var child3 : Transform in allChildren3) 
	{
		child3.enabled(false);
		child3.gameObject.transform.tag="Land";
		child3.enabled(true);
	}
}

function Scream()
{
	yield WaitForSeconds(5);
	GameController.shakeCam.Shake(0,1,0,.2);
	yield WaitForSeconds(5);
	GameController.shakeCam.Shake(0,1,0,.5);
	yield WaitForSeconds(5);
	GameController.shakeCam.Shake(0,1,0,1.5);
	alert=true;
	yield WaitForSeconds(5);
	alert=false;
}

function OnGUI()
{
	GUI.matrix = Matrix4x4.TRS (Vector3(0f, 0f, 0f), Quaternion.identity, Vector3 (ScreenSize.X, ScreenSize.Y, 1f));
	if(alert)
		GUI.DrawTexture(Rect(1672, 400, 248, 183), alertTexture);
	if(!ExitLevelScript.endGUI&&!StartMenuScript.inAMenu)
	{
		GUI.Label(new Rect(1600, HUDScript.pY,175,41), "" + meatScore + " / " + maxMeatScore, style1);
		GUI.Label(new Rect(1600, HUDScript.pY,175,41), "" + meatScore + " / " + maxMeatScore, style2);
		GUI.Label(new Rect(1600, HUDScript.pY,175,41), "" + meatScore + " / " + maxMeatScore, style3);
		GUI.Label(new Rect(1600, HUDScript.pY,175,41), "" + meatScore + " / " + maxMeatScore, style4);
		GUI.Label(new Rect(1600, HUDScript.pY,175,41), "" + meatScore + " / " + maxMeatScore, style);
		GUI.Label(Rect(1450, HUDScript.pY-30, 114, 114), GUIContent(meatTexture));
	}
}