var anim:Animator;

var rb2D:Rigidbody2D;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	anim=GetComponent(Animator);
}

function Update ()
{
	if(Input.GetButton("Right"))
	{
		rb2D.velocity.x=3;
		anim.SetFloat("hSpeed",5);
	}
	else
	{
		rb2D.velocity.x=0;
		anim.SetFloat("hSpeed",0);
	}
	
	if(Input.GetButton("Jump"))
	{
		rb2D.velocity.y=15;
		anim.SetTrigger("jump");
	}	
}