var clipStorage : AudioClip[];
var rockHitPoof:GameObject;
var damage:float;

var rb2D:Rigidbody2D;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	damage=(.35*WeaponSelect.force)/8;
	SpinRock();
}

function OnCollisionEnter2D(collision:Collision2D)
{
	if(collision.gameObject.tag=="Enemy")
	{
		collision.gameObject.SendMessage ("TakeDamage", damage);
		collision.collider.gameObject.SendMessage("BlinkOnDamage",SendMessageOptions.DontRequireReceiver);
		if(collision.collider.gameObject.tag=="EnemyHead")
	 		collision.gameObject.SendMessage ("TakeDamage", damage*.5);
	}
	var newRockHitPoof:GameObject=Instantiate(rockHitPoof,transform.position,transform.rotation);
	Destroy(newRockHitPoof,.5);
  	//AudioSource.PlayClipAtPoint(clipStorage[Random.Range(0,clipStorage.length)], transform.position, Options.sfxVolume);
  	
  	// Audio - Slingshot Rock Hit Enemy
	Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Rocks/Impact/Enemy", gameObject);
	
	Destroy(gameObject);
}

function SpinRock()
{
	rb2D.AddTorque(10);
}

function Slow()
{
	rb2D.drag=6.5;
}