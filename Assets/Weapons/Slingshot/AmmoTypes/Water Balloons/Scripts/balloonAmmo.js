var hit:boolean;
var fired:boolean;
var damage:float;
var pissSplash:GameObject;

var anim:Animator;

var rb2D:Rigidbody2D;
var colli2D:Collider2D;

function Start()
{
	colli2D=GetComponent(Collider2D);
	rb2D = GetComponent(Rigidbody2D);
	damage=.5;
	hit=false;
	fired=true;
	FaceCorrectDirection();
}

function OnCollisionEnter2D(col:Collision2D)
{
	if(col.gameObject.tag=="Enemy")
	{
		col.gameObject.SendMessage ("TakeDamage", damage);
		col.collider.gameObject.SendMessage("BlinkOnDamage",SendMessageOptions.DontRequireReceiver);
	}
	hit=true;
	rb2D.isKinematic=true;
	transform.eulerAngles.z=0;
	colli2D.enabled = false;
	Destroy(gameObject,.617);
}

function Update ()
{
	ArrowArc();
	anim.SetBool("fired",fired);
	anim.SetBool("hit",hit);
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

function ArrowArc()
{
	if(rb2D.velocity.y != 0)
	{
		var angle : float = Mathf.Atan (rb2D.velocity.y/rb2D.velocity.x); // Find angle in radians
		angle *= Mathf.Rad2Deg;
		transform.eulerAngles.z = angle;
	}
}

function PissSplash()
{
	var pissSplashClone = Instantiate(pissSplash, transform.position, transform.rotation);
}

function Slow()
{
	rb2D.drag=4;
	rb2D.gravityScale=-.6;
	yield WaitForSeconds(.5);
	rb2D.gravityScale=0;
	//transform.eulerAngles.z=270;
	yield WaitForSeconds(5);
	transform.eulerAngles.z=270*-transform.localScale.x;
	//if(transform.eulerAngles.z!=270)
		//transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.EulerAngles(0,0,270), Time.deltaTime * 6);
	
}