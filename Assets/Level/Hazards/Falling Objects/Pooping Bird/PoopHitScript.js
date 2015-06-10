var explosion:GameObject;

function OnCollisionEnter2D(col:Collision2D)
{
	if(col.gameObject.tag=="Player")
	{
		GameController.health.modifyHealth(-5);
		GameController.playerController.SendTakeDamage();
	}
			
	var explosionClone=Instantiate(explosion,transform.position,Quaternion.identity);
	Destroy(explosionClone,2);
	Destroy(gameObject);
	
}