var hit:boolean;
var prevVel:Vector2;
var exploEffect:GameObject;
var snowTrail:GameObject;
var trail:GameObject;
var mask:LayerMask;
var spawned:boolean;

var player:GameObject;

var rb2D:Rigidbody2D;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
}

function OnCollisionEnter2D(col:Collision2D)
{
	if(col.gameObject.tag=="Player"&&!hit)
	{
		gameObject.layer=bpLayerz.IGNORELAYER;
		rb2D.velocity=prevVel;
		GameController.health.modifyHealth(-10);
		GameController.anim.SetTrigger("thrown");
	}
}

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Wall")
	{
		Destroy(trail);
		Destroy(gameObject);
		var exploClone=Instantiate(exploEffect,transform.position,Quaternion.identity);
	}
}

function Update()
{
	if(RaptorSuitController.usingRaptorSuit)
		player=GameController.gameControllerScript.raptorPlayer;
	else
			player=GameController.gameControllerScript.realPlayer;

	if(transform.position.x<player.transform.position.x)
		rb2D.isKinematic=false;

	var hit2: RaycastHit2D = Physics2D.Raycast(transform.position, -Vector2.up,5,mask);
	if(hit2)
	{
		if(!spawned)
		{
			spawned=true;
			trail=Instantiate(snowTrail,hit2.point,Quaternion.identity);
		}
		trail.transform.position=hit2.point;
	}
	else
	{
		Destroy(trail);
		spawned=false;
	}
	if(!hit)
		prevVel=rb2D.velocity;
}
