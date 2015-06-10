var damage:int;
var explosion:GameObject;

function Start ()
{
	damage=5;
	Destroy(gameObject,5);
}

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player")
	{
		GameController.health.modifyHealth(-damage);
		GameController.playerController.SendTakeDamage();
	}
	var explosionClone=Instantiate(explosion,transform.position,Quaternion.identity);
	Destroy(gameObject);
}