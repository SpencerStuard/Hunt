var sounds:AudioClip[];
var weaponName:String = "Unarmed";
var ammoCount:int=-1;
static var attackingUnarmed:boolean;

var unarmedComboNum:int;
var unarmedCombo1:boolean;
var unarmedCombo2:boolean;
var unarmedCombo3:boolean;

var force:float= 4.0;
//var left_foot:Transform;
var anim:Animator;

var punchOneFinished:boolean;
var punchTwoFinished:boolean;
var kicking:boolean;
static var alreadyFlyingKicked:boolean;

var whenAttacked:float;
var timeBetweenAttacks:float;

static var flyingKick:boolean;

var flyingKickTimer:float;

static var stomping:boolean;
static var canStomp:boolean;
var poof:GameObject;


function Awake()
{
	anim = GameObject.Find("Player").GetComponent(Animator);
}

function Start()
{
	if(GameController.playerController.startUp)
		StartUp();
}

function StartUp()
{
	//yield WaitForSeconds(.1);
	yield WaitForEndOfFrame;
	GameController.playerrb2D.AddForce(Vector2.up * -200);
	GameController.playerrb2D.AddForce(Vector2.right * 400);
	flyingKickTimer=-1;
	flyingKick=true;
	anim.SetBool("flyingKick", true);
}

function Update()
{
	if(flyingKick)
		flyingKickTimer+=Time.deltaTime;
	else
		flyingKickTimer=0;

 if(!StartMenuScript.inAMenu&&!CharController.inCover&&!CharController.rolling&&!WeaponLoadout.weaponLoadoutMenu&&!CharController.crouching&&!CharController.sliding&&!CharController.knockedDown&&!GameController.playerController.freezePlayer&&!GameController.playerController.freezePlayer2&&!GameController.playerController.thrown&&!Health.playerIsDead&&!GameController.playerController.usingChute&&!GameController.playerController.endGame)
	if(!CharController.inputFrozen)
		Attack();

  anim.SetBool("flyingKick", flyingKick);
  anim.SetBool("stomping",stomping);
  
  if(CharController.crouching)
	{
		unarmedComboNum=0;
		whenAttacked=0;
		punchOneFinished=false;
		punchTwoFinished=false;
		unarmedCombo1=false;
		unarmedCombo2=false;
		unarmedCombo3=false;
	}
  
  if(CharController.onGround)
	alreadyFlyingKicked=false;
	
	if(GameController.playerController.thrown)
	{
		kicking=false;
		unarmedCombo1=false;
		unarmedCombo2=false;
		unarmedCombo3=false;
		punchOneFinished=false;
		punchTwoFinished=false;
		unarmedComboNum=0;
		whenAttacked=0;
	}
	
	if(!attackingUnarmed)
		GameController.playerController.punching=false;
}

function Attack()
{
	if(CharController.onGround&&!GameController.playerController.isJumping)
	{
		if ((Input.GetButtonDown("Attack")||CharController.triggerDown)&&(unarmedComboNum==0))//&&whenAttacked==0)//&&(unarmedComboNum==0)) //punch 1
		{
			//CharController.punching=true;
			//CharController.punching1=true;
			attackingUnarmed=true;
			if(!unarmedCombo1)
			{
				unarmedCombo1=true;
				//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.Length)], GameController.player.transform.position, Options.sfxVolume);
				
				// Audio - Swing Fist
				Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Unarmed/SwingFist", GameController.player.gameObject);
		
				GameController.stats.timesPunched++;
			}
			unarmedCombo3=false;
			timeBetweenAttacks=0;
		}
		else if ((Input.GetButtonDown("Attack")||CharController.triggerDown)&&(punchOneFinished&&unarmedComboNum==1)) //punch 2
		{
			unarmedCombo1=false;
			if(!unarmedCombo2)
			{
				unarmedCombo2=true;
				//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.Length)], GameController.player.transform.position, Options.sfxVolume);
				
				// Audio - Swing Fist
				Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Unarmed/SwingFist", GameController.player.gameObject);
				
				GameController.stats.timesPunched++;
			}
			
			timeBetweenAttacks=0;
		}
		else if ((Input.GetButtonDown("Attack")||CharController.triggerDown)&&(punchTwoFinished&&unarmedComboNum==2)) //kick
		{
			if(!kicking)
			{
				kicking=true;
				//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.Length)], GameController.player.transform.position, Options.sfxVolume);
				
				// Audio - Kick
				Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Unarmed/Kick", GameController.player.gameObject);
				
				GameController.stats.timesPunched++;
				unarmedCombo2=false;
				unarmedCombo3=true;
			}
		}
	}
	
	if (!CharController.onGround&&WeaponSelect.wepName=="Unarmed")
	{
		if ((Input.GetButtonDown("Attack")||CharController.triggerDown)&&!flyingKick&&!alreadyFlyingKicked&&!HangGliderScript.usingGlider&&!SkateboardScript.usingSkateboard&&!GameController.playerController.knocked&&canStomp&&!GameController.playerController.ledgeGrab&&!GameController.playerController.grabbingRope)
		{
			if(CharController.v!=-1)
			{
				alreadyFlyingKicked=true;
				if(!flyingKick)
					//AudioSource.PlayClipAtPoint(sounds[3], GameController.player.transform.position, Options.sfxVolume);
					
					// Audio - Flying Kick
					Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Unarmed/FlyingKick", GameController.player.gameObject);
				
				flyingKick=true;
				FlyingKick();
			}
			else
			{
				if(!stomping&&canStomp)
				{
					canStomp=false;
					stomping=true;
					//AudioSource.PlayClipAtPoint(sounds[3], GameController.player.transform.position, Options.sfxVolume);
					
					// Audio - Stomp
					Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Unarmed/Stomp", GameController.player.gameObject);
					
					Stomp();
				}
			}
		}
	}
	else
		flyingKick=false;
		
	if(flyingKick&&flyingKickTimer>.5)
	{
		flyingKick=false;
		GameController.playerrb2D.velocity.x*=.2;
	}
		
	
	anim.SetBool("unarmedCombo2", unarmedCombo2);
	anim.SetBool("unarmedCombo3", unarmedCombo3);
	
	
	if(attackingUnarmed&&!kicking)
	{
		whenAttacked+=Time.deltaTime;
		timeBetweenAttacks+=Time.deltaTime;
	}

	if(whenAttacked>1.8||whenAttacked==0)
	{
		punchOneFinished=false;
		punchTwoFinished=false;
		kicking=false;
		attackingUnarmed=false;
	}
	
	if(timeBetweenAttacks>0.45)
	{
		attackingUnarmed=false;
		CharController.punching=false;	
	}
	
	if(!attackingUnarmed)
	{
		unarmedComboNum=0;
		whenAttacked=0;
		punchOneFinished=false;
		punchTwoFinished=false;
		unarmedCombo1=false;
		unarmedCombo2=false;
		unarmedCombo3=false;
	}
}

function FlyingKick()
{
	//GameController.playerrb2D.AddForce(Vector2.up * -200);
	GameController.playerrb2D.velocity.y = -4;
	GameController.playerrb2D.velocity.x = 9 * GameController.player.transform.localScale.x;
	//GameController.playerrb2D.AddForce(Vector2.right * 400 * GameController.player.transform.localScale.x);
}

function Stomp()
{
	GameController.playerrb2D.velocity.x=0;
	GameController.playerrb2D.velocity.y=-8;
}

function Poof()
{
	yield WaitForSeconds(.1);
	GameController.shakeCam.Shake(.5,0,0,.1);
	var poofClone=Instantiate(poof,Vector3(GameController.player.transform.position.x,GameController.player.transform.position.y-.225,0),poof.transform.rotation);
}
