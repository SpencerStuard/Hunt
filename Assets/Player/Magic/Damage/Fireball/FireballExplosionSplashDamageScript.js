function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Enemy")
		col.gameObject.SendMessage ("TakeDamage", 5);
	else if(col.gameObject.tag=="Player")
	{
		GameController.player.SendMessage("KnockDown");
		GameController.health.modifyHealth(-5);
		GameController.playerController.SendTakeDamage();
	}
}