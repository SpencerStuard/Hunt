var clipStorage : AudioClip[];
var rockHitPoof:GameObject;
var hitEffects:GameObject[];
var damage:float;

var rb2D:Rigidbody2D;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	//rb2D.AddTorque(10);
	damage=.5;
	//rb2D.isKinematic = true;
	SpinRock();
}


function OnCollisionEnter2D(collision:Collision2D)
{
	//AudioSource.PlayClipAtPoint(clipStorage[Random.Range(0,clipStorage.length)], transform.position, Options.sfxVolume);
	
	// Audio - Rock Hit Enemy
	Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Rocks/Impact/Enemy", gameObject);
		
	if (collision.gameObject.tag == ("Enemy"))
	{
		collision.gameObject.SendMessage ("TakeDamage", damage);
	 	collision.collider.gameObject.SendMessage("BlinkOnDamage",SendMessageOptions.DontRequireReceiver);
	 	var hitEffectClone = Instantiate(hitEffects[Random.Range(0,hitEffects.Length)], transform.position, Quaternion.identity);
	 //	collision.collider.gameObject.SendMessage("BloodSquirt",SendMessageOptions.DontRequireReceiver);
	}
	
	var newRockHitPoof:GameObject=Instantiate(rockHitPoof,transform.position,transform.rotation);
	newRockHitPoof.GetComponent(ParticleSystem).GetComponent(Renderer).sortingLayerName = "Player";
	//Destroy(newRockHitPoof,.5);
	Destroy(gameObject);
}


function SpinRock()
{
	rb2D.AddTorque(10);
}

function Slow()
{
	rb2D.drag=5.5;
	rb2D.AddTorque(-8);
	/*if(rb2D.velocity.x>0)
		rb2D.velocity.x-=3.5;
	else
		rb2D.velocity.x+=3.5;
	rb2D.velocity.y-=9;*/
}
