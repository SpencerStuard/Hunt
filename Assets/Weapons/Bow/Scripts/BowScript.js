var sounds:AudioClip[];
var drySounds:AudioClip[];
var drawSounds:AudioClip[];
var force:int;
var weaponName:String = "Bow";
static var ammoCount:int=20;
var regularCount:int=20;
var punchCount:int=5;
var plungerCount:int=3;
var usingQuiver:boolean;

static var shootingBow:boolean;

var arrowType:GameObject[];
var arrowSelected:int;

static var justFired:boolean;

var left_hand:Transform;
var right_hand:Transform;

var screenPosition:Vector3;

var drawTimer:float;
var wasUsingTrigger:boolean;

//var itemsToSave:ItemsToSave;

var i:int;

var init:boolean;

//Draw Bar
var background:Texture2D;
var foreground:Texture2D;
var frame:Texture2D;
var playingDrawSound:boolean;
var ts:AudioSource;

//bow textures for HUD
var loadout:WeaponLoadoutGUI;
var bowTextures:Texture2D[];

//static camera fix
var staticCam:boolean;

var rend:Renderer;

function Awake()
{
	loadout=GameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI);
	left_hand=GameObject.Find("/Player/left_arm").transform;
	right_hand=GameObject.Find("/Player/right_hand").transform;
}

function Start()
{
	init=false;
	loadout.weaponTextures[4]=bowTextures[0];
	
	if(Application.loadedLevelName=="Jungle - Truck Defense")
		staticCam=true;
	else
		staticCam=false;
		
	rend = GetComponent(Renderer);
}

function LateUpdate()
{
	if(!init)
	{
		init=true;
		if(!QuiverScript.usingQuiver)
		{
			regularCount=20;
			punchCount=5;
			plungerCount=3;
		}
		else if(QuiverScript.usingQuiver)
			{
			regularCount=40;
			punchCount=10;
			plungerCount=6;
		}
		//damage=3;
		//bowMaxDamage=3;
	}
}

function OnGUI()
{
	if(drawTimer>0)
	{
		GUI.DrawTexture(new Rect (screenPosition.x-(50*ScreenSize.X), screenPosition.y+(180*ScreenSize.Y), 130*ScreenSize.X, 26*ScreenSize.Y), background, ScaleMode.StretchToFill);
		GUI.DrawTexture(new Rect(screenPosition.x-(50*ScreenSize.X), screenPosition.y+(180*ScreenSize.Y), 130*ScreenSize.X*(drawTimer/3), 26*ScreenSize.Y), foreground, ScaleMode.StretchToFill);
		GUI.DrawTexture(new Rect(screenPosition.x-(50*ScreenSize.X), screenPosition.y+(180*ScreenSize.Y), 130*ScreenSize.X, 26*ScreenSize.Y), frame, ScaleMode.StretchToFill);
		//GUI.HorizontalScrollbar(Rect (screenPosition.x-(50*ScreenSize.X), screenPosition.y+(180*ScreenSize.Y), 100*ScreenSize.X, 20*ScreenSize.Y), 0, drawTimer, 0, 3);
		//GUI.HorizontalScrollbar(Rect (screenPosition.x*ScreenSize.X, screenPosition.y-75*ScreenSize.Y, 100*ScreenSize.X, 20*ScreenSize.Y), 0, drawTimer, 0, 3);
	}
		
}

function DrawpowerGUI()
{
	screenPosition = Camera.main.WorldToScreenPoint(GameController.player.transform.position);
	//screenPosition = Camera.main.WorldToScreenPoint(Vector2(GameController.player.transform.position.x-.425,GameController.player.transform.position.y));
	//screenPosition.y = Screen.height - screenPosition.y  + 45;
	//if(staticCam)
		screenPosition.y = Screen.height - screenPosition.y-(325*ScreenSize.Y);
}

function Update ()
{
	KeepAtHand();
	if(!StartMenuScript.inAMenu&&!CharController.inCover&&!CharController.rolling&&!CharController.grabbingOn&&!CharController.crouching&&!CharController.sliding&&!CharController.knockedDown&&!GameController.playerController.freezePlayer&&!GameController.playerController.thrown&&!HangGliderScript.usingGlider&&!Health.playerIsDead&&!GameController.playerController.usingChute&&!GameController.playerController.endGame)
	{
		drawTimer = Mathf.Clamp(drawTimer,0,3);
		Fire();
		DrawpowerGUI();
		force=10*drawTimer;
		ArrowAmmo();
		AttackingOrNot();
		ArrowSelect();
	}
		HideBowIdle();
		
		if(drawTimer >= 3)
		{
			// Audio - Draw Bowstring
			Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Bow/Draw", Fabric.EventAction.StopSound, gameObject);
		}
		

}

function Fire()
{
	if(!Options.usingController&&!justFired)
	{
		if(Input.GetButton("Attack"))
		{
			drawTimer+=Time.deltaTime;
			
			if(!Fabric.EventManager.Instance.IsEventActive("SFX/Weapons/Bow/Draw", gameObject) 
				&& drawTimer < 3)
			{
				// Audio - Draw Bowstring
				Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Bow/Draw", gameObject);
			}
		}
		if(Input.GetButtonUp("Attack"))
		{
			// Audio - STOP Draw Bowstring
			Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Bow/Draw", Fabric.EventAction.StopSound, gameObject);
			
			FireBow();
		}
	}
	
	if(Options.usingController&&!justFired)
	{
		if(CharController.firePressed)
		{
			drawTimer+=Time.deltaTime;
			wasUsingTrigger=true;
		}
		
		if(drawTimer>0&&!CharController.firePressed&&wasUsingTrigger)
		{
			FireBow();
			wasUsingTrigger=false;
		}
	}
	
	if(Options.usingController&&!justFired)
	{
		if(Input.GetButton("Attack"))
		{
			drawTimer+=Time.deltaTime;
			
			if(!Fabric.EventManager.Instance.IsEventActive("SFX/Weapons/Bow/Draw", gameObject) 
				&& drawTimer < 3)
			{
				// Audio - Draw Bowstring
				Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Bow/Draw", gameObject);
			}
		}
		if(Input.GetButtonUp("Attack"))
		{
			FireBow();
			
			// Audio - STOP Draw Bowstring
			Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Bow/Draw", Fabric.EventAction.StopSound, gameObject);
		}
	}
}

function FireBow()
{
	playingDrawSound=false;
	if(ammoCount>0)
	{
		//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
		
		// Audio - Bow Fire
		Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Bow/Fire", gameObject);
		
		GameController.stats.arrowsShot++;
		var arrowClone = Instantiate(arrowType[arrowSelected], transform.position, transform.rotation);
		arrowClone.GetComponent(Rigidbody2D).velocity = (transform.right * (force+GameController.skateVelocity));
	
		if(arrowSelected==0)
			regularCount--;
		if(arrowSelected==1)
			punchCount--;
		if(arrowSelected==2)
			plungerCount--;
	}
	else if(ammoCount==0)
		//AudioSource.PlayClipAtPoint(drySounds[Random.Range(0,drySounds.Length)], transform.position, Options.sfxVolume);
		
		// Audio - Bow Misfire
		Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Bow/Misfire", gameObject);
		
	drawTimer=0;
	justFired=true;
	yield WaitForSeconds(.33);
	justFired=false;
}

function KeepAtHand()
{
	if(!CharController.grabbingOn)
	{
		if (GameController.player.transform.localScale.x==-1)
			transform.position.x=left_hand.position.x+.04;
		else
			transform.position.x=left_hand.position.x-.04;
		transform.position.y=left_hand.position.y+.07;
	}
	
	if(CharController.grabbingOn)
	{
		drawTimer=0;
		transform.position.y=right_hand.position.y+.3;
		if(GameController.player.transform.localScale.x==1)
		{	
			if(!CharController.shimmy)
			{
				transform.eulerAngles.z=243;
				transform.position.x=right_hand.position.x+.18;
			}
			else
			{
				transform.eulerAngles.z=80;
				transform.position.y=right_hand.position.y-.25;
				transform.position.x=right_hand.position.x-.07;
			}
		}
		else
		{
			if(!CharController.shimmy)
			{
				transform.eulerAngles.z=300;
				transform.position.x=right_hand.position.x-.18;
			}
			else
			{
				transform.eulerAngles.z=100;
				transform.position.y=right_hand.position.y-.25;
				transform.position.x=right_hand.position.x+.07;
			}
		}
	}
	else if(HangGliderScript.usingGlider)
		transform.eulerAngles.z=right_hand.eulerAngles.z;
	
	if(CharController.crouching||CharController.knockedDown||GameController.playerController.thrown)
		drawTimer=0;
	if(GameController.playerController.usingChute)
	{
		drawTimer=0;
		shootingBow=false;
		GameController.weaponSelect.FirstWeapon();
	}
}

function ArrowAmmo()
{
	if(arrowSelected==0)
	{
		ammoCount=regularCount;
		loadout.weaponTextures[4]=bowTextures[0];	
	}
	if(arrowSelected==1)
	{
		ammoCount=punchCount;
		loadout.weaponTextures[4]=bowTextures[1];	
	}
	if(arrowSelected==2)
	{
		ammoCount=plungerCount;
		loadout.weaponTextures[4]=bowTextures[2];	
	}
}

function AttackingOrNot()
{
	if(drawTimer>0)
		shootingBow=true;
	else
		shootingBow=false;
}

function HideBowIdle()
{
	if(CharController.idling||GameController.playerController.freezePlayer||GameController.playerController.grabbingRope)
		rend.enabled=false;
	else
		rend.enabled=true;
}

function ArrowSelect()
{
	if(Input.GetButtonDown("SwitchArrow")&&arrowSelected!=2)
		arrowSelected++;
	else if(Input.GetButtonDown("SwitchArrow")&&arrowSelected==2)
		arrowSelected=0;
}
