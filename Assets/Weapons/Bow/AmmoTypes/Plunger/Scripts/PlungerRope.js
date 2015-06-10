var canClimb:boolean;
var xDistance:float;
var grabbingRope:boolean;
var justJumped:boolean;
var ropeTop:Transform;
var ropeBottom:Transform;

var col:BoxCollider2D;

//var feet:GameObject;
//var head:GameObject;
//var ropeInFront:boolean;

function Start()
{
	col=gameObject.GetComponent(BoxCollider2D);
}

function Update()
{
	XDistance();
	JumpOff();
	if(grabbingRope)
	{
		ClimbRope();
		GameController.player.transform.parent=transform;
		if(GameController.player.transform.localScale.x==1)
			GameController.player.transform.localPosition.x = -.3;// * -GameController.player.transform.localScale.x;
		else
			GameController.player.transform.localPosition.x = .3;// * -GameController.player.transform.localScale.x;
	}
}

function XDistance()
{
	xDistance = Mathf.Abs(transform.position.x-GameController.player.transform.position.x);
	if(xDistance<1)
		canClimb=true;
	else
		canClimb=false;
}

function JumpOff()
{
	if(Input.GetButtonDown("Jump")&&grabbingRope)
	{
		GameController.player.transform.parent=null;
		justJumped=true;
		grabbingRope=false;
		GameController.player.SendMessage("GrabbingRope",grabbingRope);
		GameController.player.SendMessage("RopeJump");
		yield WaitForSeconds(.35);
		justJumped=false;
	}
	if(CharController.onGround&&grabbingRope&&CharController.h!=0)
	{
		grabbingRope=false;
		GameController.player.SendMessage("GrabbingRope",grabbingRope);
	}
	if(Input.GetButtonDown("Interact")&&grabbingRope||Health.playerIsDead)
	{
		GameController.player.transform.parent=null;
		grabbingRope=false;
		justJumped=true;
		GameController.player.SendMessage("GrabbingRope",grabbingRope);
		yield WaitForSeconds(.35);
		justJumped=false;
		
	}
		
		//Debug.Log(CharController.onGround);
}

function ClimbRope()
{
	if(CharController.v>0&&(GameController.player.transform.position.y<ropeTop.position.y)&&!CharController.aboveHead)
		GameController.player.transform.position.y+=.05;
	
	if(CharController.v<0&&(GameController.player.transform.position.y>ropeBottom.position.y)&&!CharController.onGround)
		GameController.player.transform.position.y-=.05;
		
	if(Mathf.Abs(GameController.player.transform.position.y-ropeBottom.position.y)<.05)
	{
		GameController.player.transform.parent=null;
		grabbingRope=false;
		justJumped=true;
		GameController.player.SendMessage("GrabbingRope",grabbingRope);
		yield WaitForSeconds(.35);
		justJumped=false;
	}
		
}

function OnTriggerEnter2D(col:Collider2D)
{
	if(!SkateboardScript.usingSkateboard&&!HangGliderScript.usingGlider)
	{
		if (col.gameObject.tag == ("Player")&&!justJumped&&CharController.ropeInFront&&!CharController.onGround)
		{
			grabbingRope=true;
			GameController.player.SendMessage("GrabbingRope",grabbingRope);
		}
		
		if (col.gameObject.tag == ("Player")&&!justJumped&&CharController.ropeInFront&&CharController.onGround&&CharController.v!=0)
		{
			grabbingRope=true;
			GameController.player.SendMessage("GrabbingRope",grabbingRope);
		}
	}
}