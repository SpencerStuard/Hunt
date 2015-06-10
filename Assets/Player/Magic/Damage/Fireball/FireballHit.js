//var sounds:AudioClip[];
var damage:float;
var explosion:GameObject;

function Start()
{
	damage=2;
}

function OnCollisionEnter2D(collision:Collision2D)
{
	//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
	
	// Audio - Fireball Impact
	Fabric.EventManager.Instance.PostEvent("SFX/Magic/Fireball/Impact", gameObject);
	if(collision.gameObject.tag=="Enemy")
	{
	if(collision.gameObject.GetComponent(MonoBehaviour).modSpeed!=null)
		if(collision.gameObject.GetComponent(MonoBehaviour).modSpeed<1)
		{
			collision.gameObject.Find("IceCube(Clone)").SendMessage("Melt");
			collision.gameObject.SendMessage ("TakeDamage", damage*.5);
		}
		else
		{	
			collision.gameObject.SendMessage ("TakeDamage", damage);
	 		collision.collider.gameObject.SendMessage("BlinkOnDamage",SendMessageOptions.DontRequireReceiver);
	 	}
	}
	if(collision.gameObject.tag=="Blocker")
		collision.gameObject.SetActive(false);

	var explosionClone = Instantiate (explosion, transform.position, Quaternion.identity);
	Destroy(gameObject);
	
}

function Update()
{
	Destroy(gameObject,10);
}
