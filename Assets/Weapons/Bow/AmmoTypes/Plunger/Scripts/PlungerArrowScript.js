var clipStorage : AudioClip[];

var frontOfPlunger:Transform;
var frontLeft:Transform;
var frontRight:Transform;
var land:LayerMask;
var landInFront:boolean;
var hasPlayed:boolean;

var rope:GameObject;
var arrowBack:Transform;
var spawnRope:boolean;

var facingDown:boolean;

var bowScript:BowScript;

var forceWhenShot:float;

var trail:GameObject;
var rb2D:Rigidbody2D;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	forceWhenShot=WeaponSelect.force;
	if(forceWhenShot>0)
		FaceCorrectDirection();
	spawnRope=false;
	bowScript = GameObject.Find("BowWeapon").GetComponent(BowScript);
}


function Update()
{
	DirectionFacing();
	if(gameObject.GetComponent(Rigidbody2D)!=null)
		ArrowArc();
	LineCast();
	PickUp();
	StickDirection();
}


function DirectionFacing()
{
	if((transform.localScale.x==1 && transform.eulerAngles.z== 270) || (transform.localScale.x==-1 && transform.eulerAngles.z== 90.00002))
		facingDown=true;
	else
		facingDown=false;
}
function FaceCorrectDirection()
{
	if(CharController.facingRight&& transform.eulerAngles.z<90&& transform.eulerAngles.z>270 || CharController.facingLeft&&transform.eulerAngles.z<90 && transform.eulerAngles.z>270)
	{
		transform.localScale.x=1;
	}
	else if(CharController.facingLeft&& transform.eulerAngles.z>90&& transform.eulerAngles.z<270 ||	CharController.facingRight&& transform.eulerAngles.z>90 && transform.eulerAngles.z<270)
	{
		yield WaitForEndOfFrame;
		transform.localScale.x=-1;
	}
}

function OnCollisionEnter2D(collision:Collision2D)
{	
	if(gameObject.GetComponent(Rigidbody2D)!=null)
		rb2D.isKinematic=true;
	transform.parent=collision.collider.transform;
	if(gameObject.GetComponent(Rigidbody2D)!=null)
		Destroy(gameObject.GetComponent(Rigidbody2D));
	gameObject.layer=bpLayerz.IGNORELAYER;
	
	trail.GetComponent(ParticleSystem).enableEmission= false;
}

function ArrowArc()
{
	if(rb2D.velocity.y != 0)
	{
		var angle : float = Mathf.Atan (rb2D.velocity.y/rb2D.velocity.x); // Find angle in radians
		angle *= Mathf.Rad2Deg;
		transform.eulerAngles.z = angle; //(angle*GameController.player.transform.localScale.x);
	}
}

function LineCast()
{
	Debug.DrawLine(transform.position, frontOfPlunger.position);
	Debug.DrawLine(transform.position, frontLeft.position);
	Debug.DrawLine(transform.position, frontRight.position);
	if (Physics2D.Linecast (transform.position, frontOfPlunger.position, land) || Physics2D.Linecast (transform.position, frontLeft.position, land) || Physics2D.Linecast (transform.position, frontRight.position, land))
	{
		landInFront=true;
		
		if(!spawnRope)
		{
			yield WaitForEndOfFrame;
			if(!facingDown)
				SpawnRope();
		}
	}
	else
		landInFront=false;
}

function StickDirection()
{
	if(landInFront)
	{
		if(transform.eulerAngles.z<45&&transform.eulerAngles.z>0||transform.eulerAngles.z>315&&transform.eulerAngles.z<360)
			transform.eulerAngles.z=0;
			
		else if(transform.eulerAngles.z<315&&transform.eulerAngles.z>225)//||transform.eulerAngles.z>225&&)
			transform.eulerAngles.z=270;
			
		else if(transform.eulerAngles.z<225&&transform.eulerAngles.z>135)
			transform.eulerAngles.z=180;
			
		else if(transform.eulerAngles.z<135&&transform.eulerAngles.z>45)
			transform.eulerAngles.z=90;

		
		if(!hasPlayed)
		{
			//AudioSource.PlayClipAtPoint(clipStorage[Random.Range(0,clipStorage.length)], transform.position, Options.sfxVolume);
			
			// Audio - Plunger Arrow Impact
			Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Bow/PlungerImpact/Ground", gameObject);
		
			hasPlayed=true;
		}
	}
}

function SpawnRope()
{
	yield WaitForSeconds(.1);
	if(!spawnRope)
	{
		spawnRope=true;
		var ropeClone = Instantiate(rope, arrowBack.position, Quaternion.Euler(0, 0, 0));
		ropeClone.transform.position.y = arrowBack.position.y-1.65;
		ropeClone.transform.position.x = arrowBack.position.x+(.02*transform.localScale.x);
		//ropeClone.transform.position.x=arrowBack.position.x;
		ropeClone.transform.position.z = 4;
		ropeClone.transform.parent=arrowBack;
		ropeClone.transform.position.y=arrowBack.position.y-13.7;//-1.5;
	}
}

function PickUp()
{
	if (Vector2.Distance(GameController.player.transform.position, transform.position)<2&&Input.GetButtonDown("Interact"))
		{
			//transform.parent=null;
			if(GameController.player.transform.parent!=null)
				GameController.player.transform.parent=null;
			
			GameController.player.SendMessage("GrabbingRope",false);
			bowScript.plungerCount++;
			Destroy(gameObject);
		}
}