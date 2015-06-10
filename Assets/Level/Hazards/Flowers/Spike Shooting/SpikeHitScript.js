function OnCollisionEnter2D(col:Collision2D)
{
	Fabric.EventManager.Instance.PostEvent("SFX/Enemies/Pterorists/PipegunBlower/DartHit", gameObject);
	
	if(col.gameObject.tag=="Player")
	{
		GameController.health.modifyHealth(-1);
		GameController.playerController.SendTakeDamage();
	}

	Destroy(gameObject);
}