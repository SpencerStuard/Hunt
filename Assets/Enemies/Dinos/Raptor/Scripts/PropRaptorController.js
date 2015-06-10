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
	rb2d.velocity=Vector3.right * runSpeed;

	anim.speed=animationSpeed;
	
	anim.SetBool("moving",true);
	
	anim.SetBool("dead",false);
	anim.SetBool("Stunned", false);
	anim.SetFloat("rangeToPlayer",0);
	anim.SetBool("jumpingAttack",false);
	anim.SetBool("inAir",false);
}
