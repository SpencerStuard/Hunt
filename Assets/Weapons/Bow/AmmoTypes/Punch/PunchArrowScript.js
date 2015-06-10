var forceWhenShot:float;
var destroyAfter:int; //destroy arrow after X seconds of collision
var damage:float;
var powArray:GameObject[];
var randomPowEffect:int;
var bubbles:GameObject;
var trail:GameObject;

var rb2D:Rigidbody2D;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	forceWhenShot=WeaponSelect.force;
	damage=(0.5*forceWhenShot)/30;
	destroyAfter=3;
	if(forceWhenShot>0)
		FaceCorrectDirection();
}


function Update()
{
	ArrowArc();
	randomPowEffect=Random.Range(0,powArray.length);
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
	gameObject.layer=bpLayerz.IGNORELAYER;
	
	if(collision.gameObject.tag=="Enemy")
	{
		if(collision.gameObject.GetComponent(MonoBehaviour).frozen&&forceWhenShot>25)
		{
			collision.gameObject.BroadcastMessage("Shatter");
			Pow();	
			Destroy(gameObject);
		}
		else if(collision.gameObject.GetComponent(MonoBehaviour).frozen&&forceWhenShot<25)
		{
			rb2D.velocity.x=0;
			rb2D.velocity.y=0;
		}
		else
		{
			collision.gameObject.SendMessage("Stun",(5*forceWhenShot)/30);
			collision.gameObject.SendMessage ("TakeDamage", damage);
		 	collision.collider.gameObject.SendMessage("BlinkOnDamage");
			Pow();
			//collision.gameObject.SendMessage("KnockBack", forceWhenShot);
			collision.gameObject.SendMessage("KnockBack",Vector2(transform.localScale.x*forceWhenShot*50,50));
			Destroy(gameObject);
		}
	}
	//if(collision.gameObject.tag=="IceCube")
		//collision.gameObject.SendMessage("Shatter");
	
	//if(collision.gameObject.tag=="MovingPlatform")
	//{
	//	rb2D.isKinematic = true;
	//	transform.parent = collision.collider.gameObject.transform;
	//}
	trail.GetComponent(ParticleSystem).enableEmission= false;
	Destroy(gameObject,destroyAfter);
}

function ArrowArc()
{
	if(rb2D.velocity.y != 0)
	{
		var angle : float = Mathf.Atan (rb2D.velocity.y/rb2D.velocity.x); // Find angle in radians
		angle *= Mathf.Rad2Deg;
		transform.eulerAngles.z = angle;
	}
}

function Pow()
{
	var powClone = Instantiate(powArray[randomPowEffect], transform.position, transform.rotation);
	Destroy(powClone,.25);
}

function Slow()
{
	rb2D.drag=5;
	var bubbleClone=Instantiate(bubbles,transform.position,Quaternion.identity);
	bubbleClone.transform.parent=transform.parent;
}