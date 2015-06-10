var sounds:AudioClip[];
var hitSounds:AudioClip[];
static var statSounds:AudioClip[];
var weaponName:String = "Sword";
static var ammoCount:int=-1;
static var damage:float;
static var attackingSword:boolean;
var charController:CharController;
var wasIdle:boolean;

var right_hand:Transform;
//animator
var anim:Animator;

var rend:Renderer;

function Awake()
{
	charController=GameObject.Find("Player").GetComponent(CharController);
	right_hand=GameObject.Find("/Player/right_hand").transform;
	anim=GameObject.Find("Player").GetComponent(Animator);
}

function Start()
{
	damage=.1;
	rend=GetComponent(Renderer);
	statSounds = new AudioClip[hitSounds.length];
	for (var i:int; i<hitSounds.length; i++)
		statSounds[i]=hitSounds[i];
}

function Update()
{	
	anim.SetBool("attackingSword", SwordWeapon.attackingSword);
		
	if(!StartMenuScript.inAMenu&&!CharController.inCover&&!CharController.rolling&&!CharController.grabbingOn&&!CharController.crouching&&!CharController.sliding&&!CharController.knockedDown&&!GameController.playerController.freezePlayer&&!GameController.playerController.thrown&&!HangGliderScript.usingGlider&&!Health.playerIsDead&&!GameController.playerController.endGame)
		Attack();
		
	KeepInHand();
	
	if(charController.idleTimer>15)
		wasIdle=true;
	
	//if((/*!attackingSword&&(Input.anyKey||ControllerInUse.controllerInUse)&&wasIdle*/!attackingSword&&!CharController.idling)||GameController.playerrb2D.velocity.y<-1)
		if(CharController.idling||GameController.playerController.freezePlayer)
			rend.enabled=false;
		else if(!CharController.idling&&!attackingSword&&wasIdle&&rend.enabled==false||CharController.knockedDown)
		{
			rend.enabled=true;
			wasIdle=false;
		}
		
	if(GameController.playerrb2D.velocity.y<-1||CharController.knockedDown)
		attackingSword=false;	
}

function Attack()
{
	if ((!attackingSword)&&(Input.GetButtonDown("Attack")||CharController.triggerDown)&&CharController.onGround)
	{
		GameController.stats.swordSwung++;
		attackingSword=true;
		//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
		
		// Audio - Swing Sword
		Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Sword/Swing", gameObject);
		
		gameObject.layer=bpLayerz.MELEE;
	}
	
	if(!attackingSword)
	{
		gameObject.layer=bpLayerz.IGNORELAYER;
		ApplyDamageToParent.playingSound=false;
	}
}

function KeepInHand()
{
	var attackAngle:float;
	transform.localScale.x = GameController.player.transform.localScale.x;
	if(attackingSword)
		attackAngle=0;
	else
		attackAngle=28;
	if(!GameController.playerController.freezePlayer2&&!HangGliderScript.usingGlider)
		transform.eulerAngles.z=((right_hand.localEulerAngles.z+attackAngle)*transform.localScale.x);
	else
		transform.eulerAngles.z=right_hand.eulerAngles.z;
	transform.position=right_hand.position;
	
	if(GameController.playerController.usingChute)
	{
		attackingSword=false;
		GameController.weaponSelect.FirstWeapon();
	}
}


function HideOrShow(xx:int)
{
	if(xx==1)
		rend.enabled=false;
	//else if(xx==2)
	//	attackingSword=false;
	//else if(xx==3)
	else if(xx==2)
	{
		attackingSword=false;
		//yield WaitForEndOfFrame;
		//yield WaitForEndOfFrame;
		//yield WaitForEndOfFrame;
		yield WaitForSeconds(.05);
		rend.enabled=true;	
	}
	
	//else if(xx==4)
		//rend.enabled=true;
}
