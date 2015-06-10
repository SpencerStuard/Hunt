var anim:Animator;
//Animations
var driving:boolean;

//Driver
var kmd:GameObject;
var kmdAnim:Animator;
//Driver Anims
var kmdriving:boolean;
var kmdHand:Transform;

//KMD Throwing Items
var thrownItem:GameObject[];
//var meat:GameObject;

//Truck Talk
var num:int;
var talkTextures:Texture2D[];
var headbang:boolean;
var throwing:boolean;
var pteror:boolean;
var turningOnMusic:boolean;
var enemyAlert:boolean;
var keepOffTruck:boolean;

//Idle too long, do something fun
var garyIdleTimer:float;

//truck HUD
var truckHud:Texture2D[];
var truckStart:float;

//end of level
var finished:boolean;
var getOutOfHere:boolean;
var stop:boolean;

//player can't summon gary because he's busy
var summoned:boolean;

var rb2D:Rigidbody2D;

//Ending BackGround
var endGUI:boolean;
var endBGText:Texture2D;
var style = new GUIStyle();
var accept:boolean;
var buttonStyleA:GUIStyle;
var nextButton:Texture2D;
var buttonStyle:GUIStyle;
var received:Texture2D;
var greyOutBG:GameObject;
var greyedOut:boolean;


function Awake()
{
	kmdAnim=kmd.GetComponent(Animator);
	anim=GetComponent(Animator);
}


function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	truckStart=370;
	yield WaitForSeconds(8);
	TurnUpMusic();
	garyIdleTimer=0;
	greyedOut=false;
}

function Update () 
{
	anim.SetBool("driving",driving);
	if(!stop)
		truckStart+=Time.deltaTime*4;
	
	if(truckStart>1400&&!stop)
	{
		finished=true;
		stop=true;	
	}
	
	if(finished)
	{
		finished=false;
		Finished();
	}
	if(!headbang&&!throwing&&!pteror&&!turningOnMusic&&!enemyAlert&&!keepOffTruck&&!finished&&!endGUI)
		garyIdleTimer+=Time.deltaTime;
	else
		garyIdleTimer=0;
		
	if(garyIdleTimer>=15&&!endGUI) //gary's random chance to keep things interesting
	{	
		garyIdleTimer=0;
		var randomNum:int;
		randomNum=Random.Range(0,4);
		if(randomNum==1)
			HeadBang();
		else if(randomNum==2)
			Throwing();
		else if(randomNum==3)
			KeepOffTruck();
	}
	
	if(endGUI)
	{
		if(Input.GetButtonDown("GUIAccept"))
			accept=true;
		if(Input.GetButtonUp("GUIAccept"))
			accept=false;
		if(!greyedOut)
		{
			greyedOut=true;
			var endBGClone=Instantiate(greyOutBG,Vector3(Camera.main.transform.position.x,Camera.main.transform.position.y,0),Quaternion.identity);
		}
	}
}

function TurnUpMusic()
{
	num = 0;
	turningOnMusic=true;
	yield WaitForSeconds(2);
	turningOnMusic=false;
	yield WaitForSeconds(8);
	HeadBang();
}

function HeadBang()
{
	num=Random.Range(1,3);
	headbang=true;
	kmdAnim.SetTrigger("headbang");
	yield WaitForSeconds(3);
	headbang=false;
	kmdAnim.SetTrigger("drive");
	//yield WaitForSeconds(10);
	//Throwing();
}

function Throwing()
{
	num=Random.Range(3,7);
	throwing=true;
	kmdAnim.SetTrigger("throw");
	yield WaitForSeconds(1.5);
	throwing=false;
	kmdAnim.SetTrigger("drive");
}

function Throw()
{
	if(num==3 || num==4)	//banana peel, soda
	{
		num = Random.Range(3,5);	//3 and 4 correspond to misc thrown talk
		var itemClone=Instantiate(thrownItem[Random.Range(0,thrownItem.length)],kmdHand.position,Quaternion.identity);
		itemClone.GetComponent(Rigidbody2D).velocity.x=-3.5;
		itemClone.GetComponent(Rigidbody2D).velocity.y=8.5;
	}
	else	//magazines
	{
		num = Random.Range(5,7);	//5 and 6 correspond to magazine related talk
		var itemClone2=Instantiate(thrownItem[0],kmdHand.position,Quaternion.identity);
		itemClone2.GetComponent(Rigidbody2D).velocity.x=-3.5;
		itemClone2.GetComponent(Rigidbody2D).velocity.y=8;
	}
		
	
}

function EnemyAlert(landOrAir:int)
{
	if(landOrAir==0) //air
		num=Random.Range(7,10); //from the air
	else if(landOrAir==1) //land
		num=10; //from land
	else if(landOrAir==2) //already being attacked
		num=Random.Range(11,14);
		
	enemyAlert=true;
	yield WaitForSeconds(1.3);
	enemyAlert=false;	
}

function KeepOffTruck()
{
	num=Random.Range(11,14); //from the air
	keepOffTruck=true;
	yield WaitForSeconds(1.5);
	keepOffTruck=false;
}

function OnGUI()
{
	GUI.matrix = Matrix4x4.TRS (Vector3(0f, 0f, 0f), Quaternion.identity, Vector3 (ScreenSize.X, ScreenSize.Y, 1));
	GUI.depth = 11;	
	
	//if(turningOnMusic)
		//GUI.Label(Rect(0, 0, 1920, 1200), GUIContent(talkTextures[num]));
	if(headbang||throwing||pteror||enemyAlert||keepOffTruck||finished||turningOnMusic||summoned||getOutOfHere)
		GUI.Label(Rect(0, 0, 1920, 1200), GUIContent(talkTextures[num]));
	//if(getOutOfHere)
	//	GUI.Label(Rect(0, 0, 1920, 1200), GUIContent(talkTextures[num])); //replace me with get out of here related bubble
	//if(summoned)
	//	GUI.Label(Rect(0, 0, 1920, 1200), GUIContent(talkTextures[num]));
	
	GUI.Label(Rect(270, 1125, 108, 45), GUIContent(truckHud[0]));
	GUI.Label(Rect(0, 0, 1920, 1200), GUIContent(truckHud[1]));
	GUI.Label(Rect(1540, 1125, 75, 45), GUIContent(truckHud[2]));
	GUI.Label(Rect(truckStart, 1105, 176, 78), GUIContent(truckHud[3]));
	
	
	if(endGUI)
	{
		GUI.DrawTexture(Rect(0, 0, 1920, 1200), endBGText);
		GUI.DrawTexture(Rect(580, 419.5, 361, 361), received);
		GUI.Label(new Rect(970, 405,175,41), "" + GameController.gameControllerScript.levelScript.zone + "-" + GameController.gameControllerScript.levelScript.level, style);
		GUI.Label(new Rect(860, 650,175,41), "" + "N/A", style);
		GUI.Label(new Rect(825, 730,175,41), "" + GameController.gameControllerScript.levelScript.meatScore + " / " + GameController.gameControllerScript.levelScript.maxMeatScore , style);
		//Accept
		if (GUI.Button(Rect(911.5, 1054.5,159,38),"",buttonStyleA)||GUI.Button(Rect(780,1024.5,90,90),nextButton,buttonStyle)||accept)
		{
			accept=false;
			//Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
			ItemsToSave.itemsToSave.zoneMeatsHauled[0]=GameController.gameControllerScript.levelScript.meatScore;
			ItemsToSave.itemsToSave.SaveToFile();
			LoadIt();
		}
	}
}

function Finished()
{
	num=talkTextures.Length-1;
	garyIdleTimer=0;
	getOutOfHere=true;
	GameController.playerController.freezePlayer=true;
	GameController.playerController.endGame=true;
	yield WaitForSeconds(3);
	getOutOfHere=false;
	GameController.player.transform.parent=transform;//rigidbody2D.velocity.x=4;
	rb2D.velocity.x=4;
	yield WaitForSeconds(2);
	endGUI=true;
}

function SummonedGary()
{
	num=14;
	summoned=true;
	yield WaitForSeconds(3);
	summoned=false;
}

function LoadIt()
{
	loading=true;
	yield WaitForSeconds(.4);
	Application.LoadLevel("Map - Overworld");
}