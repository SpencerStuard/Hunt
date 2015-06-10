static var force:float;

var weaponName:String = "Rocks";
static var ammoCount:int;
static var throwingRock:boolean;
var whenThrew:float;
var lastThrew:float;

var maxAmmo:int=50;

var digSounds:AudioClip[];
var digRockCloud:GameObject;
var rockDig:Transform;
var restockTimer=2.0;
static var digging:boolean;
var left_hand:Transform;
var Rock:GameObject;

function Awake()
{
	rockDig=GameObject.Find("rockDig").transform;
	left_hand=GameObject.Find("/Player/left_hand").transform;
}

function Start()
{
	ammoCount=maxAmmo;
	throwingRock=false;
	whenThrew=0;
	lastThrew=0;
	digging=false;
}

function Update () 
{
	transform.position.x=left_hand.transform.position.x;
	transform.position.y=left_hand.transform.position.y;
	if(!StartMenuScript.inAMenu&&!CharController.inCover&&!CharController.rolling&&!CharController.sliding&&!CharController.knockedDown&&!GameController.playerController.freezePlayer&&!GameController.playerController.thrown&&!Health.playerIsDead&&!GameController.playerController.endGame)
	{
		if(!CharController.crouching)
			Throw();
		IsDigging();
	}
	
	if(GameController.playerController.usingChute)
	{
		attackingSword=false;
		GameController.weaponSelect.FirstWeapon();
	}
}


function FixedUpdate()
{
	if(CharController.runningForward&&!CharController.inFront)
	{
		force=14;
	}
	else if(CharController.runningBackwards&&!CharController.inBack)
	{
		force=6;
	}
	else
	{
		force=10;
	}
}

function Throw()
{
	if ((Input.GetButtonDown("Attack")||CharController.triggerDown)&&(ammoCount>0&&!throwingRock)&&!GameController.playerController.grabbingOn)//&&whenThrew==0&&transform.childCount == 1))
	{
		throwingRock=true;
		GameController.stats.rocksThrown++;
		yield WaitForSeconds(.215);
		var rockClone=Instantiate(Rock,transform.position,Quaternion.identity);
		rockClone.GetComponent(Rigidbody2D).velocity = (transform.right * (NewRockWeapon.force+GameController.skateVelocity));
		//rockClone.rigidbody2D.AddTorque(10);
		ammoCount--;
		yield WaitForSeconds(0.215);
		throwingRock=false;
	}
}

function IsDigging()
{
	if(CharController.onGround&&!throwingRock&&Input.GetButtonDown("Interact")&&CharController.crouching&&ammoCount<200)
	{
		//AudioSource.PlayClipAtPoint(digSounds[Random.Range(0,digSounds.length)], transform.position, Options.sfxVolume);
		
		// Audio - Dig for Rocks
		Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Rocks/Dig", gameObject);
		
		var newDigRockCloud:GameObject=Instantiate(digRockCloud,rockDig.position,Quaternion.identity);
		Destroy(newDigRockCloud,1.5);
	}
	if(CharController.h==0&&CharController.crouching&&CharController.onGround&&Input.GetButton("Interact"))
		digging=true;
	else
		digging=false;
	
	if(!CharController.crouching||ammoCount==50)
	{
		digging=false;
		restockTimer=2;
	}
	//if(!Input.GetButton("Interact"))
	//{
		//digging=false;
	//}
		if(digging)
	{
		restockTimer-=Time.deltaTime;
	}
	if (digging&&restockTimer<0&&ammoCount<50)
	{
		ammoCount++;
		restockTimer=2;
		//AudioSource.PlayClipAtPoint(digSounds[Random.Range(0,digSounds.length)], transform.position, Options.sfxVolume);
		
		// Audio - Dig for Rocks
		Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Rocks/Dig", gameObject);
		
		var newDigRockCloud2:GameObject=Instantiate(digRockCloud,rockDig.position,Quaternion.identity);
		Destroy(newDigRockCloud2,1.5);
	}
}
