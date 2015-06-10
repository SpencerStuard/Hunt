var anim:Animator;
var head:Transform;
var earMuffs:Transform;

function Start ()
{
	//earMuffs=GameObject.Find("Ear Muffs").transform;
	//head=GameObject.Find("head").transform;
	anim=GetComponent(Animator);
}

function Update ()
{
	/*transform.position.x=head.position.x;
	transform.position.y=head.position.y-.25;
	transform.rotation=head.rotation;
	
	earMuffs.transform.position.x=head.position.x-.15*GameController.player.transform.localScale.x;
	earMuffs.transform.position.y=head.position.y;
	earMuffs.transform.rotation=head.rotation;*/
	
	anim.SetBool("onGround",GameController.playerController.onGround);
	anim.SetInteger("h",GameController.playerController.h);
	anim.SetFloat("vSpeed",GameController.playerrb2D.velocity.y);
	if(GameController.playerController.isJumping||GameController.playerController.isDoubleJumping)
		anim.SetBool("jumping",true);
	else
		anim.SetBool("jumping",false);
		
	
}
