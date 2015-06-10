var damage:int;
var explosion:GameObject;

function Start()
{
	damage=5;
//	particleSystem.GetComponent(Renderer).sortingLayerName = "Effects";
}

function OnCollisionEnter2D(collision:Collision2D)
{
	if(collision.gameObject.tag=="Player")
	{
		GameController.health.modifyHealth(-damage);
		GameController.playerController.SendTakeDamage();
	}
	var explosionClone = Instantiate (explosion, transform.position, Quaternion.identity);
	Destroy(gameObject);
	
}

function Update()
{
	Destroy(gameObject,5);
}
