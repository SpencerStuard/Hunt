var damage:float;
var explosion:GameObject;
//var collisionEvents = new ParticleSystem.CollisionEvent[16];
var collisionEvents: ParticleCollisionEvent[];
var i:float;

var iceCube:GameObject;

var hit:boolean;

function Start()
{
	damage=.05;
	collisionEvents = new ParticleCollisionEvent[16];

}

function OnParticleCollision(col:GameObject)
{

	//var numCollisionEvents = particleSystem.GetCollisionEvents(col, collisionEvents);
	var pos = collisionEvents[0].intersection;
	if(!hit)
	{
		hit=true;
		var explosionClone = Instantiate (explosion, pos, Quaternion.identity);
	}

	if(col.tag=="Enemy")
	{
		col.transform.parent.SendMessage ("TakeDamage", damage);
		//col.transform.parent.SendMessage ("ModSpeed", .01);
		if(!col.transform.parent.GetComponent(MonoBehaviour).isCubed)
		{
			col.transform.parent.SendMessage ("IsCubed",true);
			SpawnIceCube(col);
		}
		col.transform.parent.BroadcastMessage("IceGrow", .01);
	}
}

function SpawnIceCube(col:GameObject)
{	
	var iceCubeClone = Instantiate (iceCube, col.transform.position, Quaternion.identity);
	iceCubeClone.transform.parent = col.transform.parent;
}