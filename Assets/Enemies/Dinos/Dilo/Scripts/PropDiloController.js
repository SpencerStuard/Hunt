var anim:Animator;
var rb2d:Rigidbody2D;
var runSpeed:float;
var animationSpeed:float;

function Start () 
{
	rb2d=gameObject.GetComponent(Rigidbody2D);
	anim=gameObject.GetComponent(Animator);
	
	transform.localScale.x = -1;
}

function Update()
{
if(Time.timeScale > 0)
{
	rb2d.velocity=Vector3.right * runSpeed;

	anim.speed=animationSpeed;
	
	anim.SetBool("moving",true);
	anim.SetBool("Fleeing",true);
}
}
