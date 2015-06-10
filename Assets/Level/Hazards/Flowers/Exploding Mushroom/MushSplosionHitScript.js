var damage:float;

function Start ()
{
	damage=-.2;
}

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player")//&&!hit)
	{
		//hit=true;
		GameController.health.modifyHealth(damage);
		GameController.playerController.SendTakeDamage();
	}
}