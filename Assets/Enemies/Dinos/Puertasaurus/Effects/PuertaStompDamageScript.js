//var hit:boolean;
var damage:int;
var gib:GameObject;

function Start()
{
	hit=false;
	damage=Health.maxHealth;
}
function OnParticleCollision(col:GameObject)
{
	if(col.tag=="Player"||col.tag=="Enemy")
	{
		var gibClone=Instantiate(gib,transform.position,Quaternion.identity);
		col.transform.parent.SendMessage("SendTakeDamage");
		yield WaitForSeconds(.5);
		GameController.health.modifyHealth(-damage);
		//hit=true;
	}
}