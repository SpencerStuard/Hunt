var anim:Animator;

var loadUp:boolean;

var rb2D:Rigidbody2D;

function Awake()
{
	rb2D = GetComponent(Rigidbody2D);

	anim=GetComponent(Animator);
	loadUp=false;
}

function FixedUpdate()
{
	if(!loadUp)
	{
		if(Mathf.Abs(transform.position.x-GameController.player.transform.position.x)>8)
			rb2D.velocity.x=-1.5;
		else
		{
			rb2D.velocity.x=0;
			anim.SetTrigger("stopped");	
		}
	}
	else
	{
		anim.SetTrigger("forward");
		rb2D.velocity.x=1.5;
	}
}

function LoadUp(x:int)
{
	if(x>0)
		loadUp=true;
}