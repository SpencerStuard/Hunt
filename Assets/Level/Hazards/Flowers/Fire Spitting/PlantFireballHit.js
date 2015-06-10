var sounds:AudioClip[];

var damage:int;
var explosion:GameObject;

function Start()
{
	damage=5;
//	particleSystem.GetComponent(Renderer).sortingLayerName = "Effects";
}

function OnCollisionEnter2D(collision:Collision2D)
{
	if(collision.gameObject.tag=="Player")
	{
		GameController.health.modifyHealth(-damage);
		GameController.playerController.SendTakeDamage();
	}
	//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
	
	// Audio - Fireball Impact
	Fabric.EventManager.Instance.PostEvent("SFX/Magic/Fireball/Impact", gameObject);
		
	var explosionClone = Instantiate (explosion, transform.position, Quaternion.identity);
	Destroy(gameObject);
	
}

function Update()
{
	Destroy(gameObject,5);
}
