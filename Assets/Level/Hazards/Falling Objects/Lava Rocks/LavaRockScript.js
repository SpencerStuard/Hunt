var explosion:GameObject;
var coll:CircleCollider2D;
var hit:boolean;
var randomNumber:int;
var direction:int;

var rb2D:Rigidbody2D;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	randomNumber=Random.Range(0,30);
	if(randomNumber<10)
		direction=-1;
	else if(randomNumber>10&&randomNumber<20)
		direction=0;
	else if(randomNumber>20)
		direction=1;

	coll=GetComponent(CircleCollider2D);
	rb2D.AddTorque(randomNumber*randomNumber);	
	rb2D.velocity = (Vector2(direction,-1).normalized * 5);
}

function OnCollisionEnter2D(col:Collision2D)
{
		var explosionClone=Instantiate(explosion,transform.position,Quaternion.identity);
		coll.enabled=true;
		GameController.shakeCam.Shake(.05,.05,0,.1);
		Destroy(explosionClone,.75);
		yield WaitForEndOfFrame;
		yield WaitForEndOfFrame;
		Destroy(transform.parent.gameObject);
}


function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player"&&!hit)
	{
		hit=true;
		col.gameObject.SendMessage("KnockDown");
		GameController.health.modifyHealth(-10);
		GameController.playerController.SendTakeDamage();
	}
	if(col.gameObject.tag=="Enemy"&&!hit)
	{
		hit=true;
		col.gameObject.SendMessage ("TakeDamage", 5);
		col.gameObject.BroadcastMessage("BlinkOnDamage");
	}
}
