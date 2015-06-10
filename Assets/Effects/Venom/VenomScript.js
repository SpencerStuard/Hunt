var hit:boolean;
var damage:int;

function Start()
{
	hit=false;
	damage=5;
}
function OnParticleCollision(col:GameObject)
{

	if(!hit&&col.tag=="Player")
	{
		col.transform.parent.SendMessage("SendTakeDamage");
		GameController.health.modifyHealth(-damage);
		if(transform.parent!=null)
			col.transform.parent.SendMessage("KnockBack",Vector2(-transform.parent.localScale.x*100,0));
		hit=true;
	}
}