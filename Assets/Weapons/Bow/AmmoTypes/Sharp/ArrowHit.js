var sounds:AudioClip[];
var forceWhenShot:float;
var hitEnemy:boolean;
var destroyAfter:int; //destroy arrow after X seconds of collision
var bubbles:GameObject;
var pierce:GameObject;
var pierce2:GameObject;
var trail:GameObject;
var exited:boolean;
var damage:float;
var gotHit:boolean;
var startX:int;
//var sr:SpriteRenderer;
//var shaft:Sprite;

var rb2D:Rigidbody2D;
var colli2D:Collider2D;
var hitEffects:GameObject;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	colli2D = GetComponent(Collider2D);
	//sr=GetComponent(SpriteRenderer);
	forceWhenShot=WeaponSelect.force;
	if(forceWhenShot>20)
		colli2D.isTrigger = true;
	damage=(2*forceWhenShot)/30;
	destroyAfter=3;
	transform.localScale.x=GameController.player.transform.localScale.x;
	startX=transform.localScale.x;
}

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Enemy"&&!hitEnemy&&forceWhenShot>20)
	{
		//Debug.Log("took damage 1");
		hitEnemy=true;
		col.gameObject.SendMessage ("TakeDamage", damage*1.5);
		var pierceClone=Instantiate(pierce,transform.position,Quaternion.identity);
		pierceClone.transform.parent=col.gameObject.transform;
		var bloodScript=pierceClone.GetComponent(bloodRotateWithParent);
		bloodScript.z=transform.eulerAngles.z*transform.localScale.x;
	}
	else if (col.gameObject.tag=="Land")
		colli2D.isTrigger = false;
}
function OnTriggerExit2D(col:Collider2D)
{
	if(!exited)
		if(col.gameObject.tag=="Enemy")
		{
			exited=true;
			rb2D.velocity.x*=.5;
			gameObject.layer=bpLayerz.PROJECTILE;
			colli2D.isTrigger = false;
			var pierceClone2=Instantiate(pierce2,transform.position,Quaternion.identity);
			pierceClone2.transform.parent=col.gameObject.transform;
			pierceClone2.GetComponent(bloodRotateWithParent2).z=transform.eulerAngles.z*transform.localScale.x;
		}
}

function Update()
{
	KeepScale();
	ArrowArc();		
}


function OnCollisionEnter2D(collision:Collision2D)
{
	gameObject.layer=bpLayerz.IGNORELAYER;
	if(collision.gameObject.tag=="Enemy"&&!gotHit)
	{
		var hitZRot:float=transform.eulerAngles.z;
		GetComponent(Renderer).sortingLayerName="Enemy";
		gotHit=true;
		rb2D.isKinematic = true;
		//hitEffects.SetActive(true);
		//var hitEffectsClone=Instantiate(hitEffects, transform.position, Quaternion.identity);
		//hitEffectsClone.SendMessage("FolThis", transform);
		//hitEffectsClone.transform.parent = collision.collider.gameObject.transform;
		//hitEffectsClone.transform.eulerAngles.z=transform.eulerAngles.z+90;
//		hitEffectClone.transform.parent = collision.collider.gameObject.transform;
		transform.parent = collision.collider.gameObject.transform;
		
		
		colli2D.isTrigger=true;
		transform.eulerAngles.z=hitZRot;
		//transform.position.x+=.25*startX;
		if(collision.gameObject.transform.localScale.x==-1&&startX==-1)
			transform.localScale.x=1;
		if(collision.gameObject.transform.localScale.x==-1&&startX==1)
			transform.localScale.x=-1;
		//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);	
		
		// Audio - Arrow Impact
		Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Bow/ArrowImpact/Enemy", gameObject);
			
		collision.gameObject.SendMessage ("TakeDamage", damage);
	 	collision.collider.gameObject.SendMessage("BlinkOnDamage",SendMessageOptions.DontRequireReceiver);
	 	
	 	if(collision.collider.gameObject.tag=="EnemyHead")
	 		collision.gameObject.SendMessage ("TakeDamage", damage*.5);
	 		
	 	if(collision.collider.gameObject.tag=="EnemyLeg"&&forceWhenShot>10)
	 		collision.gameObject.SendMessage ("Hamstring");
		

		if (collision.gameObject.transform.localScale.x==-1)
		{
			transform.rotation.z=transform.rotation.z*-1;
		}
	}
	
	if(collision.gameObject.tag=="Water")
		rb2D.velocity.x*=.25;
	
	if(collision.gameObject.tag=="Land")
	{
		//sr.sprite=shaft;
		rb2D.isKinematic = true;
		//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
		
		// Audio - Arrow Impact
		Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Bow/ArrowImpact/Ground", gameObject);
	}
		
	if(collision.gameObject.tag=="MovingPlatform")
	{
		//sr.sprite=shaft;
		//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
		
		// Audio - Arrow Impact
		Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Bow/ArrowImpact/Ground", gameObject);
		
		rb2D.isKinematic = true;
		transform.parent = collision.collider.gameObject.transform;
	}
	trail.GetComponent(ParticleSystem).enableEmission= false;
	//Destroy(gameObject,destroyAfter);
}

function KeepScale()
{
	if(transform.localScale.x>.001&&transform.localScale.x<1)
			transform.localScale.x=1;

	if(transform.localScale.x<-.001&&transform.localScale.x>-1)
			transform.localScale.x=-1;

	transform.localScale.y=1;
	transform.localScale.z=1;
}

function ArrowArc()
{
	if(rb2D.velocity.y != 0)
	{
		var angle : float = Mathf.Atan (rb2D.velocity.y/rb2D.velocity.x); // Find angle in radians
		angle *= Mathf.Rad2Deg;
		transform.eulerAngles.z = angle;
	}
}

function Slow()
{
	rb2D.drag=5;
	var bubbleClone=Instantiate(bubbles,transform.position,Quaternion.identity);
	bubbleClone.transform.parent=transform.parent;
}
