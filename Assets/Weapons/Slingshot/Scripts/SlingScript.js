var sounds:AudioClip[];
var drawSounds:AudioClip[];
var force:int;
var weaponName:String = "Sling";
static var ammoCount:int=30;
var pebbleCount:int=30;
static var balloonCount:int=5;

static var shootingSling:boolean;

var rockType:GameObject[];
var rockSelected:int;

var left_arm:Transform;
var right_hand:Transform;
var realright_hand:Transform;
var rightShoulder:Transform;

var screenPosition:Vector3;

var drawTimer:float;

//var offset:float;
var fireFrom:Transform;
var slingStrap:Transform;

var wasUsingTrigger:boolean;

//Draw Bar
var background:Texture2D;
var foreground:Texture2D;
var frame:Texture2D;

var playingDrawSound:boolean;
var ts:AudioSource;

//bow textures for HUD
var loadout:WeaponLoadoutGUI;
var slingTextures:Texture2D[];

//static camera fix
var staticCam:boolean;

var rend:Renderer;

function Awake()
{
	loadout=GameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI);
	left_arm=GameObject.Find("/Player/left_arm").transform;
	right_hand=GameObject.Find("sling_right_arm").transform;
	realright_hand=GameObject.Find("/Player/right_hand").transform;
	rightShoulder=GameObject.Find("/Player/right_arm/RightShoulder").transform;
	fireFrom=GameObject.Find("fireFrom").transform;
	slingStrap=GameObject.Find("sling_strap").transform;
}

function Start()
{
	loadout.weaponTextures[3]=slingTextures[0];
	pebbleCount=30;
	balloonCount=5;
	
	if(Application.loadedLevelName=="Jungle - Truck Defense")
		staticCam=true;
	else
		staticCam=false;
	rend=GetComponent(Renderer);
}


function OnGUI()
{
	if(drawTimer>0)
	{
		GUI.DrawTexture(new Rect (screenPosition.x-(50*ScreenSize.X), screenPosition.y+(180*ScreenSize.Y), 100*ScreenSize.X, 20*ScreenSize.Y), background, ScaleMode.StretchToFill);
		GUI.DrawTexture(new Rect(screenPosition.x-(50*ScreenSize.X), screenPosition.y+(180*ScreenSize.Y), 100*ScreenSize.X*(drawTimer/1), 20*ScreenSize.Y), foreground, ScaleMode.StretchToFill);
		GUI.DrawTexture(new Rect(screenPosition.x-(50*ScreenSize.X), screenPosition.y+(180*ScreenSize.Y), 100*ScreenSize.X, 20*ScreenSize.Y), frame, ScaleMode.StretchToFill);
	}
	//	GUI.HorizontalScrollbar(Rect (screenPosition.x-(50*ScreenSize.X), screenPosition.y+(180*ScreenSize.Y), 100*ScreenSize.X, 20*ScreenSize.Y), 0, drawTimer, 0, 1);
		
}

function DrawpowerGUI()
{
	screenPosition = Camera.main.WorldToScreenPoint(GameController.player.transform.position);
	//screenPosition.y = Screen.height - screenPosition.y;
	//if(staticCam)
	screenPosition.y = Screen.height - screenPosition.y-(325*ScreenSize.Y);	
}

function Update ()
{
	KeepAtHand();
	if(!StartMenuScript.inAMenu&&!CharController.inCover&&!CharController.rolling&&!CharController.grabbingOn&&!CharController.crouching&&!CharController.sliding&&!CharController.knockedDown&&!GameController.playerController.freezePlayer&&!GameController.playerController.thrown&&!HangGliderScript.usingGlider&&!Health.playerIsDead&&!GameController.playerController.usingChute&&!GameController.playerController.endGame)
	{
		Fire();
		DrawpowerGUI();
		drawTimer = Mathf.Clamp(drawTimer,0,1);
		force=8*drawTimer;
		AttackingOrNot();
	}
	transform.localScale.y=GameController.player.transform.localScale.x;
	SlingAmmo();
	KeepAtShoulder();
	
	//if(!CharController.takingDamage&&!CharController.grabbingOn)
		//transform.rotation.eulerAngles.z=transform.parent.rotation.eulerAngles.z;
	RockSelect();
	
	if(CharController.grabbingOn)
		rend.sortingOrder=7;
	else
		rend.sortingOrder=-1;
		
	
	if(drawTimer >= 1)
	{
		// Audio - Draw Slingshot
		Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Slingshot/Draw", Fabric.EventAction.StopSound, gameObject);
	}
	
}

function Fire()
{
	if(!Options.usingController)
	{
		if(Input.GetButton("Attack"))
		{
			drawTimer+=Time.deltaTime;
			
			if(!Fabric.EventManager.Instance.IsEventActive("SFX/Weapons/Slingshot/Draw", gameObject) 
				&& drawTimer < 1)
			{
				// Audio - Draw Slingshot
				Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Slingshot/Draw", gameObject);
			}
			
		}

		if(Input.GetButtonUp("Attack"))
		{
			// Audio - STOP Draw Slingshot
			Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Slingshot/Draw", Fabric.EventAction.StopSound, gameObject);
			FireSling();
		}
	}
	
	if(Options.usingController)
	{
		if(CharController.firePressed)
		{
			drawTimer+=Time.deltaTime;
			wasUsingTrigger=true;
		}

		if(drawTimer>0&&!CharController.firePressed&&wasUsingTrigger)
		{
			FireSling();
			wasUsingTrigger=false;
		}
	}
	
	if(Options.usingController)
	{
		if(Input.GetButton("Attack"))
		{
			drawTimer+=Time.deltaTime;
			
			if(!Fabric.EventManager.Instance.IsEventActive("SFX/Weapons/Slingshot/Draw", gameObject) 
				&& drawTimer < 1)
			{
				// Audio - Draw Slingshot
				Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Slingshot/Draw", gameObject);
			}
		}
		if(Input.GetButtonUp("Attack"))
		{
			FireSling();
			// Audio - STOP Draw Slingshot
			Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Slingshot/Draw", Fabric.EventAction.StopSound, gameObject);
		}
	}
}

function FireSling()
{
	playingDrawSound=false;
	if(rockSelected==0) //Pebbles
	{
		if(ammoCount>0)
		{
			//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
			
			// Audio - Slingshot Fire
			Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Slingshot/Fire", gameObject);
	
			GameController.stats.slingshotShot++;
			var slingrocksClone = Instantiate(rockType[0], fireFrom.position, transform.rotation);
			slingrocksClone.GetComponent(Rigidbody2D).velocity = (transform.right*transform.localScale.x * (GameController.skateVelocity+force*(0.5+drawTimer)*Random.Range(0.8,1.2)));
			
			var slingrocksClone2 = Instantiate(rockType[1], fireFrom.position, transform.rotation);
			slingrocksClone2.GetComponent(Rigidbody2D).velocity = (transform.right*transform.localScale.x * (GameController.skateVelocity+force*(0.5+drawTimer)*Random.Range(0.9,1.1)));
			
			var slingrocksClone3 = Instantiate(rockType[2], fireFrom.position, transform.rotation);
			slingrocksClone3.GetComponent(Rigidbody2D).velocity = (transform.right*transform.localScale.x * (GameController.skateVelocity+force*(0.5+drawTimer)*Random.Range(0.7,1.3)));
			
			pebbleCount--;
		}
		drawTimer=0;
	}
	
	if(rockSelected==1) //Balloon
	{
		if(ammoCount>0)
		{
			//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
			
			// Audio - Slingshot Misire
			Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Slingshot/Misfire", gameObject);
			
			var balloonClone = Instantiate(rockType[3], fireFrom.position, transform.rotation);
			balloonClone.GetComponent(Rigidbody2D).velocity = (transform.right*transform.localScale.x * (force*(0.025+drawTimer)));
			balloonCount--;
		}
		drawTimer=0;
	}
}

function KeepAtHand()
{
	if(!CharController.grabbingOn&&!HangGliderScript.usingGlider)
	{
		//if (GameController.player.transform.localScale.x==-1)
		//	transform.position.x=left_arm.position.x;
		//if (GameController.player.transform.localScale.x==1)
			transform.position.x=left_arm.position.x;
		transform.position.y=left_arm.position.y+.05;
	}
	
	else if(CharController.grabbingOn&&!HangGliderScript.usingGlider)
	{
		drawTimer=0;
		transform.position.x = realright_hand.position.x;
		transform.position.y = realright_hand.position.y+.35;
		transform.eulerAngles.z=270;
	}
	else if(HangGliderScript.usingGlider)
	{
		transform.position=left_arm.position;
		transform.eulerAngles.z=realright_hand.eulerAngles.z;
	}
	
	if(CharController.crouching||CharController.knockedDown||GameController.playerController.thrown)
		drawTimer=0;
		
	if(GameController.playerController.usingChute)
	{
		drawTimer=0;
		shootingSling=false;
		Debug.Log("wrp");
		GameController.weaponSelect.FirstWeapon();
	}
	
}

function AttackingOrNot()
{
	if(drawTimer>0)
		shootingSling=true;
	else
		shootingSling=false;
}

function SlingAmmo()
{
	if(rockSelected==0)
	{
		ammoCount=pebbleCount;
		loadout.weaponTextures[3]=slingTextures[0];
	}
	if(rockSelected==1)
	{
		ammoCount=balloonCount;
		loadout.weaponTextures[3]=slingTextures[1];
	}
	//if(rockSelected==2)
	//	ammoCount=plungerCount;
}


function KeepAtShoulder()
{
	if(drawTimer==0)
	{
		right_hand.position.x=rightShoulder.position.x;
		right_hand.eulerAngles.z=rightShoulder.eulerAngles.z*GameController.player.transform.localScale.x;
		//offset=0;
		right_hand.position.y=rightShoulder.position.y;
	}
	else
	{
		if(drawTimer>0)
		{
			right_hand.position.x = slingStrap.position.x-(.35*GameController.player.transform.localScale.x);
			
			//right_hand.position.y = slingStrap.position.y-(.*GameController.player.transform.localScale.x);
		}
			
		if(transform.eulerAngles.z<330&&transform.eulerAngles.z>265)
		{
			right_hand.eulerAngles.z=65;
			right_hand.position.y = slingStrap.position.y+.2;
		}
		else if((transform.eulerAngles.z>30&&transform.eulerAngles.z<95)&&transform.localScale.y==1)
		{
			right_hand.eulerAngles.z=130;
			right_hand.position.y = slingStrap.position.y-.2;
		}
		else if((transform.eulerAngles.z>0&&transform.eulerAngles.z<30)||(transform.eulerAngles.z>330&&transform.eulerAngles.z<360))
		{
			right_hand.eulerAngles.z=90;
			right_hand.position.y = slingStrap.position.y;
		}
		//left side
		if((transform.eulerAngles.z>210&&transform.eulerAngles.z<315)&&transform.localScale.y==-1)
		{
			right_hand.eulerAngles.z=315;
			right_hand.position.y = slingStrap.position.y+.2;
		}
		else if((transform.eulerAngles.z>90&&transform.eulerAngles.z<150)&&transform.localScale.y==-1)
		{
			right_hand.eulerAngles.z=230;
			right_hand.position.y = slingStrap.position.y-.2;
		}
		else if(transform.eulerAngles.z>150&&transform.eulerAngles.z<210)
		{
			right_hand.eulerAngles.z=270;
			right_hand.position.y = slingStrap.position.y;
		}
	}
}

function RockSelect()
{
	if(Input.GetButtonDown("SwitchArrow")&&rockSelected==0&&GameController.savedItems.ammoUnlocked[4])
		rockSelected=1;
	else if(Input.GetButtonDown("SwitchArrow")&&rockSelected==1&&GameController.savedItems.ammoUnlocked[3])
		rockSelected=0;
}
