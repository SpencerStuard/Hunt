var mask:LayerMask;
var playerMask:LayerMask;
var onGround:boolean;
var onLeftSide:boolean;
var onRightSide:boolean;
var pushable:boolean;
var pullable:boolean;

var playerOnLeft:boolean;
var playerOnRight:boolean;
var facingBox:boolean;

var rb2D:Rigidbody2D;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
}

function Update()
{
	if(transform.parent==null)
	{
		var groundHit: RaycastHit2D = Physics2D.Raycast(Vector2(transform.position.x,transform.position.y-.65),-Vector2.up,.1,mask);
		if(groundHit)
		{
			if(groundHit.collider.tag=="Land")
				onGround=true;
		}
		else
			onGround=false;
		
		//Debug.DrawRay(Vector2(transform.position.x-.65,transform.position.y),-Vector2.right*.05);
		var leftSideHit:RaycastHit2D = Physics2D.Raycast(Vector2(transform.position.x-.65,transform.position.y),-Vector2.right,.05,mask);
		if(leftSideHit)
		{
			if(leftSideHit.collider.tag=="PushableCrate"||leftSideHit.collider.tag=="Enemy")
				onLeftSide=true;
		}
		else
			onLeftSide=false;


		var rightSideHit:RaycastHit2D = Physics2D.Raycast(Vector2(transform.position.x+.65,transform.position.y),Vector2.right,.05,mask);
		if(rightSideHit)
		{
			if(rightSideHit.collider.tag=="PushableCrate"||rightSideHit.collider.tag=="Enemy")
				onRightSide=true;
		}
		else
			onRightSide=false;
					
									
		if(Physics2D.Raycast(Vector2(transform.position.x-.5,transform.position.y),-Vector2.right,.15,playerMask)&&GameController.player.transform.position.x<transform.position.x)
			playerOnLeft=true;
		else
			playerOnLeft=false;
			
			
		if(Physics2D.Raycast(Vector2(transform.position.x+.5,transform.position.y),Vector2.right,.15,playerMask)&&GameController.player.transform.position.x>transform.position.x)
			playerOnRight=true;
		else
			playerOnRight=false;
		


	/*	var slopeHit: RaycastHit2D = Physics2D.Raycast(Vector2(transform.position.x,transform.position.y-.5), -Vector2.up,2,mask);
		if(slopeHit)
		{
			var slopeAngle:float = Vector2.Angle(slopeHit.normal,slopeHit.transform.up);
			Debug.Log(slopeAngle);
			if(slopeAngle>20&&slopeAngle<45)
				rb2D.mass=1;
			else
				rb2D.mass=5;
		}*/
		
		
		if(!onRightSide&&!onLeftSide)
			pushable=true;
		else
			pushable=false;
		
		if(onRightSide&&!onLeftSide||!onRightSide&&onLeftSide||!onRightSide&&!onLeftSide)
			pullable=true;
		else
			pullable=false;
		
		//Facing Box
		if((GameController.player.transform.position.x<transform.position.x&&GameController.player.transform.localScale.x==1)||(GameController.player.transform.position.x>transform.position.x&&GameController.player.transform.localScale.x==-1))
			facingBox=true;
		else
			facingBox=false;
			
		if(facingBox&&GameController.playerController.pushing&&pushable&&GameController.playerController.h!=0||!onGround)
			rb2D.isKinematic=false;
		else
			rb2D.isKinematic=true;
			//Debug.Log(GameController.player.transform.position,transform.position)
		
		
			
		//if(GameController.playerController.pushing&&pushable)
			//this.gameObject.transform.position.x=GameController.playerController.linecastHolder[15].transform.position.x+.3*GameController.player.transform.localScale.x;
			//rb2D.velocity.x=GameController.playerrb2D.velocity.x;
	}
}

function FixedUpdate()
{
	if(transform.parent==null)
	{
		if(Vector2.Distance(GameController.player.transform.position,transform.position)<.9&&pullable&&GameController.playerController.pushing&&GameController.playerController.runningBackwards&&facingBox)
			rb2D.velocity.x=GameController.playerrb2D.velocity.x*1.5;
		else if(Vector2.Distance(GameController.player.transform.position,transform.position)<.9&&pushable&&GameController.playerController.pushing&&GameController.playerController.runningForward&&facingBox)
			rb2D.velocity.x=GameController.playerrb2D.velocity.x;
	}
}
