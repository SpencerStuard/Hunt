var hit:boolean;
var damage:float;

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player"&&!hit)
	{
		hit=true;
		GameController.health.modifyHealth(-damage);
		GameController.playerController.SendTakeDamage();
		yield WaitForSeconds(1.5);
		hit=false;
	}
}