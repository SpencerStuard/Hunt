//var sounds:AudioClip[];
//var hitSounds:AudioClip[];
var healthPerHeart:int;
static var maxHealth:float;
var currentHealth:float;
	
//HUD
var hudImage:Texture;
var hudGUI:GUITexture;
//Player Face
var faceImages:Texture[];
var faceGUI:GUITexture;

//Hearts
var heartImages:Texture[];
var heartGUI:GUITexture;

static var playerIsDead:boolean;
var dead:boolean;
	
private var hearts:ArrayList = new ArrayList();
private var faces:ArrayList = new ArrayList();
	
var maxHeartsOnRow:float;
private var spacingX:float;
private var spacingY:float;

var shielded:boolean;
var shieldTime:float;

//Death UI
var blackOutBG:Texture2D;
var loading:boolean;
var ghost:GameObject;
var beam:GameObject;
//var deathMenu:Texture2D;
//var greyOut:Texture2D;
//var restartButton:Texture2D;
//var mapButton:Texture2D;
var buttonStyle:GUIStyle;
var mapStyle:GUIStyle;
//var selected:int;
//var accept:boolean;
//var toggleUpDown:boolean;
//var toggleUpDown2:boolean;
var startScript:MonoBehaviour;

//Death Meats
private var iHams2:int;
private var iBacons2:int;
private var iChops2:int;
private var iRibs2:int;
private var iSausages2:int;
private var iSteaks12:int;
private var iSteaks22:int;
var deathMeatHam:GameObject;
var deathMeatBacon:GameObject;
var deathMeatChop:GameObject;
var deathMeatRib:GameObject;
var deathMeatSausage:GameObject;
var deathMeatSteak1:GameObject;
var deathMeatSteak2:GameObject;

function Awake()
{
	if(Application.loadedLevel>0)
		startScript=GameObject.Find("StartMenu").GetComponent(StartMenuScript);
}

function Start ()
{	
	selected=0;
	dead=false;
	playerIsDead=false;
	spacingX = heartGUI.pixelInset.width;
	spacingY = -heartGUI.pixelInset.height;
	if(maxHealth<30)
		maxHealth=30;
	if(maxHealth>100)
		maxHealth=100;
	InitHearts(maxHealth/healthPerHeart);
	Time.timeScale=1;
	shielded=false;
}

function Update()
{
	if(currentHealth>maxHealth)
		currentHealth=maxHealth;
	
	if(Options.showHUD&&!DialogueScript.talking&&!ExitLevelScript.endGUI)
		transform.position.y=.91;
	else
		transform.position.y=-.91;
	/*if(dead)
	{
		SelectNumber();
		ToggleBooleans();
	}*/
	if(shieldTime>0)
	{
		shieldTime-=Time.deltaTime;
		shielded=true;
	}
	else
	{
		shielded=false;
		shieldTime=0;	
	}
}

function InitHearts(n:int)
{
	var hud:Transform = (Instantiate(hudGUI.gameObject,transform.position,Quaternion.identity)).transform; // Creates hud
	hud.parent=transform;
	var ss = hud.gameObject.AddComponent(ScaleScript);
	ss.x=2;
	var newFace:Transform = (Instantiate(faceGUI.gameObject,transform.position,Quaternion.identity)).transform; // Creates face
	newFace.parent=transform;
	var ssss = newFace.gameObject.AddComponent(ScaleScript);
	ssss.x=3;
	hud.position.z=-10;
	//hud.GetComponent(GUITexture).texture = hudImage;
	newFace.GetComponent(GUITexture).texture = faceImages[0];
	faces.Add(newFace);

	for (var i:int = 0; i <n; i ++)
	{ 
		var newHeart:Transform = (Instantiate(heartGUI.gameObject,this.transform.position,Quaternion.identity)).transform; // Creates a new heart
		newHeart.parent = transform;
		var sss = newHeart.gameObject.AddComponent(ScaleScript);
		sss.x=1;
			
		var y:int = (Mathf.FloorToInt(hearts.Count / maxHeartsOnRow));
		var x:int = (hearts.Count - y * maxHeartsOnRow);

		newHeart.GetComponent(GUITexture).pixelInset = new Rect(x * spacingX, y * spacingY * ScreenSize.Y,ScreenSize.X*35,ScreenSize.Y*35);
		sss.startX=x * spacingX + (65*ScreenSize.X);
		sss.startY=y * spacingY - (15*ScreenSize.Y);

		newHeart.GetComponent(GUITexture).texture = heartImages[0];
		hearts.Add(newHeart);
	}
	maxHealth = n * healthPerHeart;
	currentHealth = maxHealth;
	UpdateHearts();
}

function AddHearts()
{
	if(maxHealth<=90)
	{
		var newHeart:Transform = (Instantiate(heartGUI.gameObject,this.transform.position,Quaternion.identity)).transform; // Creates a new heart
		newHeart.parent = transform;
		var ss = newHeart.gameObject.AddComponent(ScaleScript);
		ss.x=1;
			
		var y:int = (Mathf.FloorToInt(hearts.Count / maxHeartsOnRow));
		var x:int = (hearts.Count - y * maxHeartsOnRow);

		newHeart.GetComponent(GUITexture).pixelInset = new Rect(x * spacingX, y * spacingY,ScreenSize.X*35,ScreenSize.Y*35);
		ss.startX=x * spacingX + (45*ScreenSize.X);
		ss.startY=y * spacingY - (15*ScreenSize.Y);
		newHeart.GetComponent(GUITexture).texture = heartImages[0];
		hearts.Add(newHeart);
			
		maxHealth += healthPerHeart;
		currentHealth = maxHealth;
		UpdateHearts();
		ItemsToSave.itemsToSave.SaveToFile();
	}
}

	
function modifyHealth(amount:float)
{
	currentHealth = Mathf.Clamp(currentHealth,0,maxHealth);
	
	if(!shielded)
		currentHealth += amount;
	else if(shielded&&amount<0)
		currentHealth += (amount/2);
	else if (shielded&&amount>0)
		currentHealth += amount;
		
		UpdateHearts();
	if(amount<=-1&&amount>-maxHealth)
	{
		Fabric.EventManager.Instance.PostEvent("SFX/Player/GetHit", gameObject);	// Audio - Player Take Damage
	}
		
	if(currentHealth<=0)
		currentHealth=0;
	if(currentHealth==0&&!Health.playerIsDead)
		Dead();
}

function UpdateHearts() 
{
	var restAreEmpty:boolean = false;
	var i:int =0;
	for (var heart:Transform in hearts)
	{
		//var heartInset = heart.GetComponent(GUITexture).pixelInset;
		//heartInset.x = heartInset.x*ScreenSize.X;
		//heartInset.y = heartInset.y*ScreenSize.Y;
		//heartInset.width = heartInset.width*ScreenSize.X;
		//heartInset.height = heartInset.width*ScreenSize.Y;
		if (restAreEmpty)
			heart.GetComponent(GUITexture).texture = heartImages[0]; // heart is empty
		else
		{
			i += 1; // current iteration
			if (currentHealth >= i * healthPerHeart)
				heart.GetComponent(GUITexture).texture = heartImages[heartImages.Length-1]; // health of current heart is full
			else
			{
				var currentHeartHealth:float = (healthPerHeart - (healthPerHeart * i - currentHealth));
				var healthPerImage:int = healthPerHeart / heartImages.Length; // how much health is there per image

				if(currentHeartHealth>5)
					heart.GetComponent(GUITexture).texture = heartImages[2];
				else if(currentHeartHealth>0&&currentHeartHealth<5.01)
					heart.GetComponent(GUITexture).texture = heartImages[1];
				else if(currentHeartHealth==0)
					heart.GetComponent(GUITexture).texture = heartImages[0];
					
				restAreEmpty = true;
			}
		}
	}
	for (var face:Transform in faces)
	{
		//var faceInset = face.GetComponent(GUITexture).pixelInset;
		//faceInset.x = faceInset.x*ScreenSize.X;
		//faceInset.y = faceInset.y*ScreenSize.Y;
		//faceInset.width = ScreenSize.X*45;
		//faceInset.height = ScreenSize.Y*45;
		//face.GetComponent(GUITexture).pixelInset = new Rect(x * spacingX * ScreenSize.X, y * spacingY * ScreenSize.Y,ScreenSize.X*45,ScreenSize.Y*45);
		if(!RaptorSuitController.usingRaptorSuit)
		{
			if(currentHealth/maxHealth>=.75)
				face.GetComponent(GUITexture).texture = faceImages[0];
			else if((currentHealth/maxHealth<=.749)&&(currentHealth/maxHealth>=.5))
				face.GetComponent(GUITexture).texture = faceImages[1];
			else if((currentHealth/maxHealth<=.499)&&(currentHealth/maxHealth>=.25))
				face.GetComponent(GUITexture).texture = faceImages[2];
			else if((currentHealth/maxHealth<=.249)&&(currentHealth/maxHealth>0))
				face.GetComponent(GUITexture).texture = faceImages[3];
			else if(currentHealth==0)
				face.GetComponent(GUITexture).texture = faceImages[4];
		}
		else
			face.GetComponent(GUITexture).texture = faceImages[5];
	}
		
}

function Dead()
{
	UpdateHearts();
	//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
	
	// Audio - Player Death
	Fabric.EventManager.Instance.PostEvent("SFX/Player/Die", gameObject);
	
	SpewMeat();
	playerIsDead=true;
	GameController.anim.SetTrigger("death");
	GameController.anim.SetBool("dead",playerIsDead);
	yield WaitForSeconds(2);
	dead=true;
	GameController.stats.timesDied++;
	ItemsToSave.itemsToSave.SaveToFile();
}


function Shield()
{
	//shielded=true;
	//yield WaitForSeconds(10);
	//shielded=false;
	shieldTime=30;
}

//UI Controls
/*function SelectNumber()
{
	if(dead)
	{
		if((Input.GetButtonDown("Down")||Input.GetAxis("DPadUpDown")<0||Input.GetAxis("LThumbstick Up/Down")<0)&&!toggleUpDown&&!toggleUpDown2&&selected<2)
		{
			toggleUpDown=true;
			toggleUpDown2=true;
			selected++;
		}
		if((Input.GetButtonDown("Up")||Input.GetAxis("DPadUpDown")>0||Input.GetAxis("LThumbstick Up/Down")>0)&&selected>1&&!toggleUpDown&&!toggleUpDown2)
		{
			toggleUpDown=true;
			toggleUpDown2=true;
			selected--;
		}
	}
}

function ToggleBooleans()
{
	if(Input.GetAxis("DPadUpDown")==0)
		toggleUpDown=false;
	
	if(Input.GetAxis("LThumbstick Up/Down")==0)
		toggleUpDown2=false;
	
	if(Input.GetButtonDown("GUIAccept"))
		accept=true;
	if(Input.GetButtonUp("GUIAccept"))
		accept=false;
}*/

function OnGUI()
{
	GUI.matrix = Matrix4x4.TRS (Vector3(0f, 0f, 0f), Quaternion.identity, Vector3 (ScreenSize.X, ScreenSize.Y, 1f));
	if(loading)
	{
		GUI.depth=0;
		GUI.DrawTexture(Rect(0, 0, 1920, 1200), blackOutBG);
	}
}
	/*
	GUI.depth = 1;	
	//if(Options.showHUD)
	//	GUI.DrawTexture(Rect(15, 15, 728, 237), hudImage);
	if(playerIsDead)
	{
		if(dead)
		{
			GUI.DrawTexture(Rect(0, 0, 1920, 1200), greyOut);
			GUI.DrawTexture(Rect(0, 0, 1920, 1200), deathMenu);
			if(selected==1)
			{
				if (GUI.Button(new Rect(810,520,166,57),restartButton, buttonStyle)||accept) 
					Application.LoadLevel(Application.loadedLevel);
			}
			else
			{
				if (GUI.Button(new Rect(810,520,166,57),"", buttonStyle)) 
					Application.LoadLevel(Application.loadedLevel);
			}
			
			if(selected==2)
			{
				if (GUI.Button(new Rect(810,600,238,41),mapButton, mapStyle)||accept) 
					Application.LoadLevel(1);
			}
			else
			{
				if (GUI.Button(new Rect(810,600,238,41),"", mapStyle)) 
					Application.LoadLevel(1);
			}
		}
	}
}*/

function SpewMeat()
{
	//meatsToSpew=GameController.gameControllerScript.levelScript.meatScore;
/*	while(meatsToSpew>0)
	{
		var meatSpewClone=Instantiate(meat,GameController.player.transform.position,Quaternion.identity);
		meatsToSpew--;
		meatSpewClone.GetComponent(Rigidbody2D).velocity.x=Random.Range(-5,5);
		meatSpewClone.GetComponent(Rigidbody2D).velocity.y=Random.Range(2,8);
	}*/
	
	iHams2=GameController.gameControllerScript.levelScript.hams;
	iBacons2=GameController.gameControllerScript.levelScript.bacons;
	iChops2=GameController.gameControllerScript.levelScript.chops;
	iRibs2=GameController.gameControllerScript.levelScript.ribs;
	iSausages2=GameController.gameControllerScript.levelScript.sausages;
	iSteaks12=GameController.gameControllerScript.levelScript.steaks1;
	iSteaks22=GameController.gameControllerScript.levelScript.steaks2;
	
	while(iHams2>0)
	{
		var meatClone2 = Instantiate(deathMeatHam,GameController.player.transform.position,Quaternion.identity);
		iHams2--;
		meatClone2.GetComponent(Rigidbody2D).velocity.x=Random.Range(-5,5);
		meatClone2.GetComponent(Rigidbody2D).velocity.y=Random.Range(2,8);
	}
	while(iBacons2>0)
	{
		var meatClone22 = Instantiate(deathMeatBacon,GameController.player.transform.position,Quaternion.identity);
		iBacons2--;
		meatClone22.GetComponent(Rigidbody2D).velocity.x=Random.Range(-5,5);
		meatClone22.GetComponent(Rigidbody2D).velocity.y=Random.Range(2,8);
	}
	while(iChops2>0)
	{
		var meatClone32 = Instantiate(deathMeatChop,GameController.player.transform.position,Quaternion.identity);
		iChops2--;
		meatClone32.GetComponent(Rigidbody2D).velocity.x=Random.Range(-5,5);
		meatClone32.GetComponent(Rigidbody2D).velocity.y=Random.Range(2,8);
	}
	while(iRibs2>0)
	{
		var meatClone42 = Instantiate(deathMeatRib,GameController.player.transform.position,Quaternion.identity);
		iRibs2--;
		meatClone42.GetComponent(Rigidbody2D).velocity.x=Random.Range(-5,5);
		meatClone42.GetComponent(Rigidbody2D).velocity.y=Random.Range(2,8);
	}
	while(iSausages2>0)
	{
		var meatClone5 = Instantiate(deathMeatSausage,GameController.player.transform.position,Quaternion.identity);
		iSausages2--;
		meatClone5.GetComponent(Rigidbody2D).velocity.x=Random.Range(-5,5);
		meatClone5.GetComponent(Rigidbody2D).velocity.y=Random.Range(2,8);
	}
	while(iSteaks12>0)
	{
		var meatClone62 = Instantiate(deathMeatSteak1,GameController.player.transform.position,Quaternion.identity);
		iSteaks12--;
		meatClone62.GetComponent(Rigidbody2D).velocity.x=Random.Range(-5,5);
		meatClone62.GetComponent(Rigidbody2D).velocity.y=Random.Range(2,8);
	}
	while(iSteaks22>0)
	{
		var meatClone72 = Instantiate(deathMeatSteak2,GameController.player.transform.position,Quaternion.identity);
		iSteaks22--;
		meatClone72.GetComponent(Rigidbody2D).velocity.x=Random.Range(-5,5);
		meatClone72.GetComponent(Rigidbody2D).velocity.y=Random.Range(2,8);
	}
	yield WaitForSeconds(3);
	if(!EatPlayerMovement.eating)
	{
		var beamClone=Instantiate(beam,Vector3(GameController.player.transform.position.x,GameController.player.transform.position.y+3.5,0),beam.transform.rotation);
	}
	yield WaitForSeconds(1.25);
	if(!EatPlayerMovement.eating)
	{
	var ghostClone=Instantiate(ghost,GameController.player.transform.position,Quaternion.identity);
	ghostClone.GetComponent(Rigidbody2D).velocity.y=1;
	}
	
	yield WaitForSeconds(5);
	LoadIt();
}

function LoadIt()
{
	loading=true;
	yield WaitForSeconds(.4);
	//DEMO_SWITCH
	/*
	if(Application.loadedLevelName=="Jungle - 1"||Application.loadedLevelName=="Jungle - 2")
		Application.LoadLevel("Map - Jungle");
	else	
	*/
	//DEMO_SWITCH_END
		Application.LoadLevel("Map - Overworld");
}