var bloodSplosion:GameObject;
var hit:boolean;
var enemyHit:boolean;

function OnCollisionEnter2D(coll:Collision2D)
{
	if(coll.gameObject.tag=="Player"&&!hit)
	{
		hit=true;
		var bloodSplosionClone=Instantiate(bloodSplosion,Vector2(GameController.player.transform.position.x,GameController.player.transform.position.y+1),Quaternion.identity);
		GameController.health.modifyHealth(-Health.maxHealth);
	}
	if(coll.gameObject.tag=="Enemy"&&!enemyHit)
	{
		enemyHit=true;
		var bloodSplosionClone2=Instantiate(bloodSplosion,Vector2(coll.gameObject.transform.position.x,coll.gameObject.transform.position.y+1),Quaternion.identity);
		coll.gameObject.GetComponent(MonoBehaviour).enemyHP=0;
		yield WaitForSeconds(10);
		enemyHit=false;
	}
}