var damage:float;
var karateController:MonoBehaviour;
var hitMe:boolean;
var hitSounds : AudioClip[];
var hitEffects:GameObject[];
var col:BoxCollider2D;


function Start()
{
	damage=1;
	InvokeRepeating("HitMe",1,1);
	col=GetComponent(BoxCollider2D);
}

function HitMe()
{
	//if(!karateController.attacking)
		hitMe=false;
}

//function OnCollisionEnter2D(collision:Collision2D)
function OnTriggerEnter2D(collision:Collider2D)
{
	if (collision.gameObject.tag == ("Enemy")&&!hitMe)
	{
		hitMe=true;
		collision.gameObject.SendMessage ("TakeDamage", damage);
	 	//collision.collider.gameObject.SendMessage("BlinkOnDamage",SendMessageOptions.DontRequireReceiver);
	 	//collision.collider.SendMessage("BlinkOnDamage",SendMessageOptions.DontRequireReceiver);
	 	//AudioSource.PlayClipAtPoint(hitSounds[Random.Range(0,hitSounds.length)], transform.position, Options.sfxVolume);
	 	var hitEffectClone = Instantiate(hitEffects[Random.Range(0,hitEffects.Length)], transform.position, Quaternion.identity);
	}
}

function Update()
{
	if(karateController.twoInUse||karateController.threeInUse)
		col.enabled=true;
	else
		col.enabled=false;
}