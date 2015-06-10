var explosion:GameObject;
var oldVelocity:float;

var rb2D:Rigidbody2D;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	InvokeRepeating("OldVelocity",.3,.3);
}

function FixedUpdate()//OnCollisionEnter2D(col:Collision2D)
{
	if(oldVelocity<-4&&rb2D.velocity.y==0)
	{
		Explode();
		//GameController.player.SendMessage("KnockDown");
		//GameController.health.modifyHealth(-10);
		//GameController.playerController.SendTakeDamage();
	}
}

function OldVelocity()
{
	oldVelocity=rb2D.velocity.y;
}

function Explode()
{
		var explosionClone=Instantiate(explosion,transform.position,Quaternion.identity);
		Destroy(gameObject);
		Destroy(explosionClone,1);
}