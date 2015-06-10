var meatHam:GameObject;
var meatBacon:GameObject;
var meatChop:GameObject;
var meatRib:GameObject;
var meatSausage:GameObject;
var meatSteak1:GameObject;
var meatSteak2:GameObject;
var meatTruck:GameObject;
static var truckClone:GameObject;
//Pants Meats
var i:int;
var iHams:int;
var iBacons:int;
var iChops:int;
var iRibs:int;
var iSausages:int;
var iSteaks1:int;
var iSteaks2:int;
//Scale Meats
var iHams2:int;
var iBacons2:int;
var iChops2:int;
var iRibs2:int;
var iSausages2:int;
var iSteaks12:int;
var iSteaks22:int;
var sent:boolean;
var spawned:boolean;

//Ending GUI with Scale
static var endGUI:boolean;
var scale:GameObject;
var scaleClone2:Transform;
var scaleSpawned:boolean;
var scaleMeatHam:GameObject;
var scaleMeatBacon:GameObject;
var scaleMeatChop:GameObject;
var scaleMeatRib:GameObject;
var scaleMeatSausage:GameObject;
var scaleMeatSteak1:GameObject;
var scaleMeatSteak2:GameObject;
var endBG:GameObject;
var ended:boolean;
private var time:float;
var timeString:String;
var endBGText:Texture2D;
var col:BoxCollider2D;
var buttonStyleA:GUIStyle;
var nextButton:Texture2D;
var buttonStyle:GUIStyle;
var accept:boolean;

var style = new GUIStyle();
var randnum:int;

var exitPopup:GameObject;
private var closeEnough:boolean;

function Start()
{
	ended=false;
	endGUI=false;
	accept=false;
	spawned=false;
	sent=false;
	scaleSpawned=false;
}

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player"&&!ended)
	{
		ended=true;
		Exit();
	}
}

function Exit()
{
	GameController.anim.SetFloat("hSpeed",0);
	GameController.anim.SetTrigger("EndGame0");
	while(!CharController.onGround)
 	{
    	yield;
 	}
	GameController.playerController.freezePlayer=true;
	GameController.playerController.endGame=true;
	GameController.player.transform.localScale.x=1;
	//i=GameController.gameControllerScript.levelScript.meatScore;
//pants meats
	iHams=GameController.gameControllerScript.levelScript.hams;
	iBacons=GameController.gameControllerScript.levelScript.bacons;
	iChops=GameController.gameControllerScript.levelScript.chops;
	iRibs=GameController.gameControllerScript.levelScript.ribs;
	iSausages=GameController.gameControllerScript.levelScript.sausages;
	iSteaks1=GameController.gameControllerScript.levelScript.steaks1;
	iSteaks2=GameController.gameControllerScript.levelScript.steaks2;
//scale meats
	iHams2=iHams;
	iBacons2=iBacons;
	iChops2=iChops;
	iRibs2=iRibs;
	iSausages2=iSausages;
	iSteaks12=iSteaks1;
	iSteaks22=iSteaks2;
	if(!spawned)
	{
		var meatTruckClone=Instantiate(meatTruck,Vector3(transform.position.x+13,transform.position.y+1.5,0),Quaternion.identity);
		truckClone=meatTruckClone;
		spawned=true;
	}
	yield WaitForSeconds(4);
	Debug.Log("pantsoff");
	GameController.anim.SetTrigger("EndGame1");
	yield WaitForSeconds(.5);
	EjectMeatFromPants();
	if(GameController.gameControllerScript.levelScript.meatScore>ItemsToSave.itemsToSave.meatsFound[GameController.gameControllerScript.levelScript.level-1])
		ItemsToSave.itemsToSave.meatsFound[GameController.gameControllerScript.levelScript.level-1]=GameController.gameControllerScript.levelScript.meatScore;
	
	ItemsToSave.itemsToSave.zone1LevelsComplete[GameController.gameControllerScript.levelScript.level-1]=true;
	
	ItemsToSave.itemsToSave.SaveToFile();
}

function EjectMeatFromPants()
{
		while(iHams>0)
		{
			iHams--;
			var meatClone = Instantiate(meatHam,Vector3(GameController.player.transform.position.x+.25,GameController.player.transform.position.y,0),Quaternion.identity);
			yield WaitForSeconds(.25);
		}
		while(iBacons>0)
		{
			iBacons--;
			var meatClone2 = Instantiate(meatBacon,Vector3(GameController.player.transform.position.x+.25,GameController.player.transform.position.y,0),Quaternion.identity);
			yield WaitForSeconds(.25);
			
		}
		while(iChops>0)
		{
			iChops--;
			var meatClone3 = Instantiate(meatChop,Vector3(GameController.player.transform.position.x+.25,GameController.player.transform.position.y,0),Quaternion.identity);
			yield WaitForSeconds(.25);
		}
		while(iRibs>0)
		{
			iRibs--;
			var meatClone4 = Instantiate(meatRib,Vector3(GameController.player.transform.position.x+.25,GameController.player.transform.position.y,0),Quaternion.identity);
			yield WaitForSeconds(.25);
		}
		while(iSausages>0)
		{
			iSausages--;
			var meatClone5 = Instantiate(meatSausage,Vector3(GameController.player.transform.position.x+.25,GameController.player.transform.position.y,0),Quaternion.identity);
			yield WaitForSeconds(.25);
		}
		while(iSteaks1>0)
		{
			iSteaks1--;
			var meatClone6 = Instantiate(meatSteak1,Vector3(GameController.player.transform.position.x+.25,GameController.player.transform.position.y,0),Quaternion.identity);
			yield WaitForSeconds(.25);
		}
		while(iSteaks2>0)
		{
			iSteaks2--;
			var meatClone7 = Instantiate(meatSteak2,Vector3(GameController.player.transform.position.x+.25,GameController.player.transform.position.y,0),Quaternion.identity);
			yield WaitForSeconds(.25);
		}
}

function Update()
{
	i=iHams+iBacons+iChops+iRibs+iSausages+iSteaks1+iSteaks2;

	if(Vector2.Distance(GameController.player.transform.position,transform.position)<1)
		closeEnough=true;
	else
		closeEnough=false;
		
	if(closeEnough)
		exitPopup.SetActive(true);
	else
		exitPopup.SetActive(false);
		
	if(closeEnough&&Input.GetButtonDown("Interact"))
		col.enabled=true;

	if(!ended)
	{
		time+=Time.deltaTime;
		timeString = String.Format("{0:0}:{1:00}", Mathf.Floor(time/60), time % 60);
	}
		
	if(i==0&&!sent&&spawned)
	{
		sent=true;
		Wait();
	}
	if(endGUI&&!scaleSpawned)
	{
		scaleSpawned=true;
		var scaleClone=Instantiate(scale,Vector3(Camera.main.transform.position.x+3.3,Camera.main.transform.position.y-.75,0),Quaternion.identity);
		var endBGClone=Instantiate(endBG,Vector3(Camera.main.transform.position.x,Camera.main.transform.position.y,0),Quaternion.identity);
		scaleClone2=scaleClone.transform;
		ScaleMeat();
	}
	if(endGUI)
	{
		if(Input.GetButtonDown("GUIAccept"))
			accept=true;
		if(Input.GetButtonUp("GUIAccept"))
			accept=false;
	}
}

function Wait()
{
	yield WaitForSeconds(2);
	truckClone.SendMessage("LoadUp",1);
	endGUI=true;
}

function ScaleMeat()
{
		/*while(ii>0)
		{
			var scaleMeatClone = Instantiate(scaleMeat,Vector3(scaleClone2.position.x+(Random.Range(-1.2,1.2)),scaleClone2.position.y+(Random.Range(3,6)),0),Quaternion.identity);
			yield WaitForSeconds(.25);
			ii--;
		}*/
		while(iHams2>0)
		{
			iHams2--;
			var meatClone2 = Instantiate(scaleMeatHam,Vector3(scaleClone2.position.x+(Random.Range(-1.2,1.2)),scaleClone2.position.y+(Random.Range(3,6)),0),Quaternion.identity);
			yield WaitForSeconds(.25);
		}
		while(iBacons2>0)
		{
			iBacons2--;
			var meatClone22 = Instantiate(scaleMeatBacon,Vector3(scaleClone2.position.x+(Random.Range(-1.2,1.2)),scaleClone2.position.y+(Random.Range(3,6)),0),Quaternion.identity);
			yield WaitForSeconds(.25);
		}
		while(iChops2>0)
		{
			iChops2--;
			var meatClone32 = Instantiate(scaleMeatChop,Vector3(scaleClone2.position.x+(Random.Range(-1.2,1.2)),scaleClone2.position.y+(Random.Range(3,6)),0),Quaternion.identity);
			yield WaitForSeconds(.25);
		}
		while(iRibs2>0)
		{
			iRibs2--;
			var meatClone42 = Instantiate(scaleMeatRib,Vector3(scaleClone2.position.x+(Random.Range(-1.2,1.2)),scaleClone2.position.y+(Random.Range(3,6)),0),Quaternion.identity);
			yield WaitForSeconds(.25);
		}
		while(iSausages2>0)
		{
			iSausages2--;
			var meatClone5 = Instantiate(scaleMeatSausage,Vector3(scaleClone2.position.x+(Random.Range(-1.2,1.2)),scaleClone2.position.y+(Random.Range(3,6)),0),Quaternion.identity);
			yield WaitForSeconds(.25);
		}
		while(iSteaks12>0)
		{
			iSteaks12--;
			var meatClone62 = Instantiate(scaleMeatSteak1,Vector3(scaleClone2.position.x+(Random.Range(-1.2,1.2)),scaleClone2.position.y+(Random.Range(3,6)),0),Quaternion.identity);
			yield WaitForSeconds(.25);
		}
		while(iSteaks22>0)
		{
			iSteaks22--;
			var meatClone72 = Instantiate(scaleMeatSteak2,Vector3(scaleClone2.position.x+(Random.Range(-1.2,1.2)),scaleClone2.position.y+(Random.Range(3,6)),0),Quaternion.identity);
			yield WaitForSeconds(.25);
		}
}

function OnGUI()
{
	GUI.matrix = Matrix4x4.TRS (Vector3(0f, 0f, 0f), Quaternion.identity, Vector3 (ScreenSize.X, ScreenSize.Y, 1f));
	GUI.depth=1;
	if(endGUI)
	{
		GUI.DrawTexture(Rect(0, 0, 1920, 1200), endBGText);
		GUI.Label(new Rect(970, 405,175,41), "" + GameController.gameControllerScript.levelScript.zone + "-" + GameController.gameControllerScript.levelScript.level, style);
		GUI.Label(new Rect(860, 650,175,41), "" + timeString, style);
		GUI.Label(new Rect(825, 730,175,41), "" + GameController.gameControllerScript.levelScript.meatScore + " / " + GameController.gameControllerScript.levelScript.maxMeatScore , style);
		//Accept
		if (GUI.Button(Rect(911.5, 1054.5,159,38),"",buttonStyleA)||GUI.Button(Rect(780,1024.5,90,90),nextButton,buttonStyle)||accept)
		{
			accept=false;
			//Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
			ItemsToSave.itemsToSave.SaveToFile();
			LoadIt();
		}
	}
}

function LoadIt()
{
	loading=true;
	yield WaitForSeconds(.4);
	/*if(Application.loadedLevelName=="Jungle - 1"||Application.loadedLevelName=="Jungle - 2")
		Application.LoadLevel("Map - Jungle");
	else	*/
		Application.LoadLevel("Map - Overworld");
}