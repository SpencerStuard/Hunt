var jumpSounds:AudioClip[];
var anim:Animator;
static var usingRaptorSuit:boolean;
var mask:LayerMask;
var onGround:boolean;
var h:int;
var v:int;
var poof:GameObject;

var heatTimer:float;
static var flippedLid:boolean;
var steam:GameObject;
var steamClone:GameObject;
var overHeated:boolean;
var spawnedSteam:boolean;
var screenPosition:Vector3;

//Draw Bar
var background:Texture2D;
var foreground:Texture2D;
var frame:Texture2D;

var poppingOff:boolean;
static var popItOff:boolean;

var rb2D:Rigidbody2D;

function Start () 
{	
	rb2D = GetComponent(Rigidbody2D);
	popItOff=false;
	poppingOff=false;
	GameObject.Find("GameController").GetComponent(NearbyEnemies).LostPlayer();
	usingRaptorSuit=true;
	overHeated=false;
	anim=GetComponent(Animator);
	GameController.health.UpdateHearts();
	GameController.gameControllerScript.raptorPlayer=gameObject;
	flippedLid=false;
}

function Update ()
{
	OverHeatGUI();
	if(!overHeated)
		Controls();
	FaceCursor();
	anim.SetInteger("h",h);
	anim.SetInteger("v",v);
	anim.SetBool("flippedLid",flippedLid);
	anim.SetBool("onGround",onGround);
	anim.SetFloat("vSpeed",rb2D.velocity.y);
	if((!overHeated)&&h!=-0&&flippedLid||!onGround&&flippedLid)
		flippedLid=false;
	if(heatTimer>50)
		heatTimer=50;
	if(heatTimer==50)
	{
		overHeated=true;
		h=0;
		v=0;
	}
	//GameController.player.transform.position=transform.position;
	
	OverHeat();

	if(v>-1)
	{
		rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,-2,2);
		rb2D.AddForce(Vector2.right * h * 50);
	}
	
	if(h==0)
		rb2D.velocity=Vector2(0,rb2D.velocity.y);
	
	var hit: RaycastHit2D = Physics2D.Raycast(transform.position, -Vector2.up,.5,mask);
		if(hit)
			onGround=true;
		else
			onGround=false;
		
	
	if((Input.GetAxis("Controller Attack")>0||Input.GetButtonDown("Attack"))&&h==0&&!flippedLid&&usingRaptorSuit||overHeated&&onGround)
		FlipLid();
			
	if(usingRaptorSuit&&Input.GetButtonDown("Item")||GameController.playerController.takingDamage||popItOff||Health.playerIsDead)
		PopOff();
}

function PopOff()
{
	if(!poppingOff)
	{
		poppingOff=true;
		overHeated=false;
		rb2D.isKinematic=false;
		var poofClone=Instantiate(poof,transform.position,Quaternion.identity);
		//poofClone.transform.parent=transform;
		yield WaitForSeconds(.5);
		usingRaptorSuit=false;
		gameObject.tag="Untagged";
		GameController.gameControllerScript.realPlayer.transform.position=transform.position;
		yield WaitForEndOfFrame;
		//GameController.player.transform.position.y=transform.position.y;
//		GameController.gameControllerScript.realPlayer.transform.position=transform.position;
		if(gameObject.GetComponent(AudioListener)!=null)
			Destroy(gameObject.GetComponent(AudioListener));
		GameController.player.SetActive(true);
		rb2D.velocity.x=Random.Range(-2,2);
		rb2D.velocity.y=3;
		GetComponent(BoxCollider2D).enabled=false;
		rb2D.fixedAngle=false;
		rb2D.AddTorque(50*Random.Range(-10,10));
		GameController.weaponSelect.FirstWeapon();
		GameController.anim.enabled=true;
		GameController.health.UpdateHearts();
		this.enabled=false;
Destroy(gameObject,5);
	}
}

function Controls()
{
	if(Input.GetButton("Left")||Input.GetAxis("LThumbstick Left/Right")<0)
		h=-1;
	else if(Input.GetButton("Right")||Input.GetAxis("LThumbstick Left/Right")>0)
		h=1;
	else
		h=0;
		
	if(Input.GetButton("Up")||Input.GetAxis("LThumbstick Up/Down")>0)
		v=1;
	else if(Input.GetButton("Down")||Input.GetAxis("LThumbstick Up/Down")<0)
		v=-1;
	else
		v=0;
		
	if(onGround&&Input.GetButtonDown("Jump"))
	{
		anim.SetTrigger("jump");
		//AudioSource.PlayClipAtPoint(jumpSounds[Random.Range(0,jumpSounds.length)], transform.position, Options.sfxVolume);
		
		// Audio - Jump Sound
		Fabric.EventManager.Instance.PostEvent("SFX/Player/Jump", gameObject);
		
		rb2D.velocity.y=8;//AddForce(new Vector2(0f, 300));
		if(heatTimer<50&&!flippedLid)
			heatTimer+=5;
	}
}

function FaceCursor()
{
	if(!Options.usingController)
	{
		if (GameController.crosshair.transform.position.x < transform.position.x)
			transform.localScale.x= -1;
		else
			transform.localScale.x= 1;
	}
	else if(Options.usingController)
	{
		if(Input.GetAxis("RThumbStickLeftRight")<0)
			transform.localScale.x= -1;
		if(Input.GetAxis("RThumbStickLeftRight")>0)
			transform.localScale.x= 1;
	}
}

function FlipLid()
{
	flippedLid=true;
	if(onGround&&!poppingOff)
		rb2D.isKinematic=true;
	if(!overHeated)
		rb2D.isKinematic=false;
}

function OverHeat()
{
	if(heatTimer<50&&!flippedLid)
	{
		heatTimer+=Time.deltaTime;
		//if(!overHeated)
		heatTimer+=Time.deltaTime*Mathf.Abs(h*1.5);
	}
	else if(heatTimer>0&&flippedLid)
	{
		if(!spawnedSteam&&heatTimer>1)
		{
			spawnedSteam=true;
			steamClone=Instantiate(steam,Vector2(transform.position.x+.2*transform.localScale.x,transform.position.y+.3),steam.transform.rotation);
			steamClone.transform.parent=transform;
		}
		if(!overHeated)
			heatTimer-=Time.deltaTime*10;
		else
			heatTimer-=Time.deltaTime*5;
	}
	
	if(spawnedSteam&&heatTimer<=0||spawnedSteam&&h!=0)
	{
		spawnedSteam=false;
		steamClone.GetComponent(ParticleSystem).Stop();
		
		if(overHeated)
		{
			overHeated=false;
			rb2D.isKinematic=false;
		}	
	}
}

function OnGUI()
{
	if(heatTimer>0)
		{
			GUI.DrawTexture(new Rect (screenPosition.x-(50*ScreenSize.X), screenPosition.y+(180*ScreenSize.Y), 100*ScreenSize.X, 20*ScreenSize.Y), background, ScaleMode.StretchToFill);
			GUI.DrawTexture(new Rect(screenPosition.x-(50*ScreenSize.X), screenPosition.y+(180*ScreenSize.Y), 100*ScreenSize.X*(heatTimer/50), 20*ScreenSize.Y), foreground, ScaleMode.StretchToFill);
			GUI.DrawTexture(new Rect(screenPosition.x-(50*ScreenSize.X), screenPosition.y+(180*ScreenSize.Y), 100*ScreenSize.X, 20*ScreenSize.Y), frame, ScaleMode.StretchToFill);
		}//GUI.HorizontalScrollbar(Rect (screenPosition.x*ScreenSize.X, screenPosition.y-75*ScreenSize.Y, 100*ScreenSize.X, 20*ScreenSize.Y), 0, heatTimer, 0, 50);
		//GUI.HorizontalScrollbar(Rect (screenPosition.x-(50*ScreenSize.X), screenPosition.y-(30*ScreenSize.Y), 100*ScreenSize.X, 20*ScreenSize.Y), 0, heatTimer, 0, 50);
}
function OverHeatGUI()
{
	screenPosition = Camera.main.WorldToScreenPoint(transform.position);
	screenPosition.y = Screen.height - screenPosition.y-(325*ScreenSize.Y);
}