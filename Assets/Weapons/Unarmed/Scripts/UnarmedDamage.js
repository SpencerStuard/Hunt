var damage:float;
var hitMe:boolean;
var hitSounds : AudioClip[];
var hitEffects:GameObject[];


function Start()
{
	damage=.7;
}

function Update()
{
	if(!Unarmed.attackingUnarmed)
	{
		hitMe=false;
		GameController.playerController.atPeak=false;
	}
	
	if(!CharController.usingEZBronze)
		damage=1;
	else
		damage=4;
}

//function OnCollisionEnter2D(collision:Collision2D)
function OnTriggerEnter2D(collision:Collider2D)
{
	if (collision.gameObject.tag == ("Enemy")&&!hitMe)
	{
		GameController.playerController.atPeak=false;
		hitMe=true;
		collision.gameObject.SendMessage ("TakeDamage", damage);
		collision.gameObject.SendMessage ("StunMelee", .4,SendMessageOptions.DontRequireReceiver);
	 	//AudioSource.PlayClipAtPoint(hitSounds[Random.Range(0,hitSounds.length)], transform.position, Options.sfxVolume);
	 	
 		// Audio - Hit Enemy
		Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Unarmed/HitEnemy", gameObject);
	 	
	 	
	 	var hitEffectClone = Instantiate(hitEffects[Random.Range(0,hitEffects.Length)], transform.position, Quaternion.identity);
	}
	
	else if (collision.gameObject.tag == ("EverBlastBag")&&!hitMe)
	{
		hitMe=true;
	 	//AudioSource.PlayClipAtPoint(hitSounds[Random.Range(0,hitSounds.length)], transform.position, Options.sfxVolume);
	 	
	 	// Audio - Hit Enemy
		Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Unarmed/HitEnemy", gameObject);
					
	 	hitEffectClone = Instantiate(hitEffects[Random.Range(0,hitEffects.Length)], transform.position, Quaternion.identity);
	 	var anim = collision.transform.parent.GetComponent("Animator");
	 	anim.SetBool("hitBAG", true);
	 	anim.SetInteger("playerTransform",GameController.player.transform.localScale.x);
	 	yield WaitForSeconds(0.3);
	 	anim.SetBool("hitBAG", false);
	}
}