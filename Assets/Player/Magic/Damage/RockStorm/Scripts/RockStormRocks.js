var clipStorage : AudioClip[];
var rockHitPoof:GameObject;
var damage:float;

function Start()
{
	damage=.5;
}

function OnCollisionEnter2D(collision:Collision2D)
{
	if (collision.gameObject.tag == ("Enemy")&&!collision.gameObject.GetComponent(MonoBehaviour).frozen)
	{
		collision.gameObject.SendMessage ("TakeDamage", damage);
		collision.collider.gameObject.SendMessage("BlinkOnDamage",SendMessageOptions.DontRequireReceiver);
	}
	var newRockHitPoof:GameObject=Instantiate(rockHitPoof,transform.position,Quaternion.identity);
	Destroy(newRockHitPoof,.5);
  	//AudioSource.PlayClipAtPoint(clipStorage[Random.Range(0,clipStorage.length)], transform.position, Options.sfxVolume);
  	
  	// Audio - Rock Storm Impact
	Fabric.EventManager.Instance.PostEvent("SFX/Magic/RockStorm/Impact", gameObject);
  	
	Destroy(gameObject);
}