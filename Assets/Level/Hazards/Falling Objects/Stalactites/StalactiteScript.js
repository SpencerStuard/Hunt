var randomChance:int;
var anim:Animator;
var unstable:boolean;
var col:PolygonCollider2D;
var poofCloud:GameObject;
var rockSplosion:GameObject;

function Start ()
{
	col=GetComponent(PolygonCollider2D);
	anim=GetComponent(Animator);
	randomChance=Random.Range(0,50);
	if(randomChance>40)
	{
		unstable=true;
		//anim.enabled=true;
		InvokeRepeating("Shake",1,Random.Range(3,10));
	}

}

function Update ()
{
	if(unstable&&Mathf.Abs(GameController.player.transform.position.x - transform.position.x)<1&&transform.position.y>GameController.player.transform.position.y)
	{
		if(gameObject.GetComponent(Rigidbody2D)==null)
		{
			gameObject.AddComponent(Rigidbody2D);
			anim.enabled=false;
			var poofCloudClone=Instantiate(poofCloud,Vector2(transform.position.x,transform.position.y+.3),Quaternion.identity);
		}
	}
}

function Shake()
{
	anim.SetTrigger("shake");
}

function OnCollisionEnter2D(coll:Collision2D)
{
	if(coll.gameObject.tag=="Player")
	{
		GameController.health.modifyHealth(-5);
		GameController.playerController.SendTakeDamage();
	}
	if(coll.gameObject.tag!="EnemyProjectile")
	{
		var rockSplosionClone=Instantiate(rockSplosion,Vector2(transform.position.x,transform.position.y-.3),Quaternion.identity);
		Destroy(gameObject);
	}
}