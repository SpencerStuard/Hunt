static var usingGlider:boolean;
var hand:Transform;
var ejecting:boolean;
var coll:PolygonCollider2D;
var boxColl:BoxCollider2D;
var crash:boolean;
var crashedGlider:Sprite;

function Start ()
{
	usingGlider=false;
	coll=gameObject.GetComponent(PolygonCollider2D);
	boxColl=gameObject.GetComponent(BoxCollider2D);
	boxColl.enabled=false;
}

function Update ()
{
	//Debug.Log(GameController.player.active);

	if(usingGlider)
		GameController.stats.hangglideTime+=Time.deltaTime;
	if(GameController.player.activeInHierarchy&&!RaptorSuitController.usingRaptorSuit)
	{	
		GameController.anim.SetBool("ejecting",ejecting);
		GameController.anim.SetBool("HangGlide",usingGlider);
	}
	if(Vector2.Distance(transform.position,GameController.player.transform.position)<1&&Input.GetButtonDown("Interact")&&!usingGlider&&CharController.onGround)
	{
		usingGlider=true;
		GameController.player.transform.localScale.x=transform.localScale.x;
		if(gameObject.GetComponent(Rigidbody2D)!=null)
			Destroy(gameObject.GetComponent(Rigidbody2D));
		boxColl.enabled=false;
		transform.parent=GameController.player.transform;
		transform.position.x=GameController.player.transform.position.x;
		transform.position.y=GameController.player.transform.position.y+.35;
		
	}
	else if(Input.GetButtonDown("Interact")&&usingGlider)
	{
		usingGlider=false;
		transform.parent.eulerAngles.z=0;
		transform.parent=null;
		gameObject.AddComponent(Rigidbody2D);
		//boxColl.enabled=true;
	}
	if(usingGlider)
		coll.enabled=true;
	else
		coll.enabled=false;
			
		//if(GameController.player.GetComponent(Rigidbody2D).velocity.x==0)
		//	coll.enabled=false;
		//else
			//coll.enabled=true;
	//}
	if(crash)
		Crash();
}

function OnTriggerEnter2D(collision:Collider2D)
{
	if(collision.gameObject.tag=="Land")
	{
		ejecting=true;
		usingGlider=false;
		transform.parent.eulerAngles.z=0;
		transform.parent=null;
		GameController.player.BroadcastMessage ("TakeDamage");
		GameController.health.modifyHealth(-10);
		crash=true;
		yield WaitForSeconds(.075);
		if(transform.localScale.x==1)
			GameController.playerController.rollingRight=true;
		else
			GameController.playerController.rollingLeft=true;
		ejecting=false;
	}
}

function Crash()
{
	GetComponent(Renderer).sprite=crashedGlider;
	transform.rotation.eulerAngles.z=-45;
	transform.position.y-=.075;
	Destroy(gameObject,5);
}
