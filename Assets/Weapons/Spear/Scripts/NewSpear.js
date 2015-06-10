var loadout:WeaponLoadoutGUI;
var throwSounds:AudioClip[];
var swingSounds:AudioClip[];
var poleSounds:AudioClip[];
var hitSounds:AudioClip[];
static var statSounds:AudioClip[];
var weaponName:String;
static var ammoCount:int;
var force:int;
static var throwingSpear:boolean;
var spearWeapon:GameObject;
var lefthand:Transform;
var spear:GameObject;
var spearL:GameObject;

var spearTextures:Texture2D[];

static var poleVaulting:boolean=false;
static var poleVaulting2:boolean;
static var vaultMultiplier:float;
static var switchToUnarmed:boolean;
static var switchToSpear:boolean;
static var poleTimer:float;
var runBeforeVault:float;

var anim:Animator;

var typeSelected:int;

static var spearMelee:boolean;

var col:BoxCollider2D;

var passive:boolean;

var meleed:int;
static var upperCut:boolean;


function Start()
{
	loadout=GameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI);
	loadout.weaponTextures[2]=spearTextures[1];
	lefthand=GameObject.Find("/Player/left_hand").transform;
	spearWeapon=GameObject.Find("SpearWeapon");
	GetComponent(Renderer).enabled=false;
//	rigidbody2D.isKinematic=true;
	throwingSpear=false;
	ammoCount=1;
	runBeforeVault=3;
	anim=GameObject.Find("Player").GetComponent(Animator);
	typeSelected=1;
	weaponName="Stabbing Spear";
	col=GetComponent(BoxCollider2D);
	passive=false;
	
	statSounds = new AudioClip[hitSounds.length];
	for (var i:int; i<hitSounds.length; i++)
		statSounds[i]=hitSounds[i];
	
	meleed=0;
}

function Update()
{
	if ((Input.GetButtonDown("Attack")||CharController.triggerDown)&&ammoCount==1&&!throwingSpear&&!spearMelee&&!CharController.crouching&&!CharController.grabbingOn&&!CharController.sliding&&!CharController.knockedDown&&GameController.playerController.lastRoll>.35&&!GameController.playerController.freezePlayer&&!GameController.playerController.freezePlayer2&&!GameController.playerController.thrown&&!HangGliderScript.usingGlider&&!Health.playerIsDead&&!GameController.playerController.endGame)
		Attack();
		
	ChangeForce();
	transform.position=lefthand.transform.position;
	
	if(typeSelected==3)
		PoleVault();
	AttackSelect();
	anim.SetBool("poleVaulting2",poleVaulting2);
	anim.SetBool("SpearMelee",spearMelee);
	anim.SetFloat("poleTimer",poleTimer);
	if(ammoCount==0)
		passive=true;
	else
		passive=false;
		
	if(GameController.playerController.usingChute)
	{
		GameController.weaponSelect.FirstWeapon();
	}
}

function Attack()
{

	if(typeSelected==1&&CharController.onGround&&!GameController.playerController.isJumping&&!GameController.playerController.isDoubleJumping)
	{
		//AudioSource.PlayClipAtPoint(swingSounds[Random.Range(0,swingSounds.length)], transform.position, Options.sfxVolume);
		
		// Audio - Swing Spear
		Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Spear/Swing", gameObject);
		
		if(meleed<=2)
		{
			meleed++;
			anim.SetTrigger("SpearMelee2");
		}
		else if(meleed==3)
		{
			meleed=0;
			anim.SetTrigger("SpearUpperCut");
			upperCut=true;
		}
		spearMelee=true;
		GameController.stats.spearsStabbed++;
		yield WaitForSeconds(.434);
		spearMelee=false;
		ApplyDamageToParent.playingSound=false;
		
	}
	else if(typeSelected==2 &&!CharController.inFront)
	{
		throwingSpear=true;
		GameController.stats.spearsThrown++;
		yield WaitForSeconds(.15);
		//AudioSource.PlayClipAtPoint(throwSounds[Random.Range(0,throwSounds.length)], transform.position, Options.sfxVolume);
		
		// Audio - Throw Spear
		Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Spear/Throw", gameObject);
			
		yield WaitForSeconds(.15);
		if(GameController.player.transform.localScale.x==1)
		{
			var spearClone = Instantiate(spear, transform.position, Quaternion.Euler(0,0,transform.eulerAngles.z));
			spearClone.GetComponent(Rigidbody2D).velocity = (transform.right * (force+(GameController.skateVelocity/2)));	
		}
		else
		{
			var spearCloneL = Instantiate(spearL, transform.position, Quaternion.Euler(0,0,transform.eulerAngles.z));
			spearCloneL.GetComponent(Rigidbody2D).velocity = (transform.right * (force+(GameController.skateVelocity/2)));
		}
		
		//if(GameController.player.transform.localScale.x==-1)
		//	spearClone.transform.eulerAngles.y=180;
		//else
		//	spearClone.transform.eulerAngles.y=0;
		//spearClone.transform.localScale.x=GameController.player.transform.localScale.x;
		ammoCount--;
		yield WaitForSeconds(.15);
		throwingSpear=false;
		switchToUnarmed=true;
	}

}

function ChangeForce()
{
	if(CharController.runningForward&&!CharController.inFront)
		force=12;
	else if(CharController.runningBackwards&&!CharController.inBack)
		force=6;
	else
		force=9;
}


function PoleVault()
{
	//vaultMultiplier=CharController.runTimer / runBeforeVault;
	//vaultMultiplier=Mathf.Clamp(vaultMultiplier,0,1.2);
	if(Input.GetButton("Attack")&&(ammoCount==1&&CharController.onGround&&!CharController.crouching)&&CharController.runningForward)
	{
		poleTimer+=Time.deltaTime;
		poleVaulting2=true;	
	}
	if(poleTimer>0&&Input.GetButtonUp("Attack")||CharController.runningBackwards||!GameController.playerController.onGround||GameController.playerController.h==0)
	{
		poleTimer=0;
		poleVaulting2=false;	
	}

	if(poleTimer>=2.8)
		{
			poleVaulting=true;
			CharController.onGround=false;
			GameController.playerrb2D.velocity=new Vector2(8*GameController.player.transform.localScale.x,10);
			GameController.anim.SetTrigger("poleTrigger");
			poleTimer=0;
			switchToUnarmed=true;
			//AudioSource.PlayClipAtPoint(poleSounds[Random.Range(0,poleSounds.length)], transform.position, Options.sfxVolume);
			
			// Audio - Pole Vault
			Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Spear/PoleVault", gameObject);
			
			var spearClone = Instantiate(spear, Vector2((transform.position.x+.8*GameController.player.transform.localScale.x),transform.position.y-.4), Quaternion.identity);
			spearClone.transform.eulerAngles.z=270;

			ammoCount--;
			yield WaitForSeconds(.2);
			poleVaulting2=false;
		}
	if(CharController.onGround||CharController.runningBackwards)
		poleVaulting=false;
}

function AttackSelect()
{
	if(Input.GetButtonDown("SwitchArrow"))
	{
		if(typeSelected==1)
		{
			typeSelected=2;
			weaponName="Throwing Spear";
			loadout.weaponTextures[2]=spearTextures[0];
		}
		else if(typeSelected==2)
		{
			typeSelected=3;
			weaponName="Polevaulting Spear";	
			loadout.weaponTextures[2]=spearTextures[2];
		}
		else if(typeSelected==3)
		{
			typeSelected=1;
			weaponName="Stabbing Spear";	
			loadout.weaponTextures[2]=spearTextures[1];
		}
	}
}
