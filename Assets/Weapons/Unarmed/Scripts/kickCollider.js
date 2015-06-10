var anim:Animator;
var damage:float;
var hitMe:boolean;
var kickedMe:boolean;
var hitEffects:GameObject[];
var unarmed:MonoBehaviour;
var hitSounds : AudioClip[];

var colli2D:Collider2D;

function Awake()
{
	colli2D = GetComponent(Collider2D);
	anim = GameObject.Find("Player").GetComponent(Animator);
	unarmed = transform.parent.GetComponent(MonoBehaviour);
}

function Start()
{
	damage=.7;
}

function Update ()
{
	//Debug.Log(kickedMe);
	EnableDisableCollider();
		
	if(!Unarmed.flyingKick)
		hitMe=false;
		
	//if(!Unarmed.attackingUnarmed)
	//	kickedMe=false;
	
	if(!CharController.usingEZBronze)
		damage=1;
	else
		damage=4;
}

function EnableDisableCollider()
{
//	if((!unarmed.unarmedCombo3&&!Unarmed.flyingKick)||kickedMe)//&&!CharController.punching)
//		this.colli2D.enabled = false;
	//else
	if(!unarmed.kicking&&!unarmed.flyingKick&&!unarmed.stomping)
	{
		kickedMe=false;
		this.colli2D.enabled = false;
	}
		
	else if(unarmed.unarmedCombo3&&!kickedMe&&!unarmed.flyingKick&&!unarmed.stomping)
	{
		yield WaitForSeconds(0.21);
		this.colli2D.enabled = true;
	}
	else if(unarmed.flyingKick||unarmed.stomping)
		this.colli2D.enabled = true;
}

//function OnCollisionEnter2D(collision:Collision2D)
function OnTriggerEnter2D(collision:Collider2D)
{
	if (collision.gameObject.tag == ("Enemy")&&!hitMe&&(Unarmed.flyingKick||unarmed.stomping))
	{
		hitMe=true;
		Unarmed.flyingKick=false;
		Unarmed.stomping=false;
		collision.gameObject.SendMessage ("TakeDamage", damage);
	 	//collision.collider.gameObject.SendMessage("BlinkOnDamage",SendMessageOptions.DontRequireReceiver);
	 	collision.gameObject.SendMessage("BlinkOnDamage",SendMessageOptions.DontRequireReceiver);
	 	GameController.playerrb2D.velocity.x=0;
	 	GameController.playerrb2D.velocity.y=0;
		GameController.playerrb2D.AddForce(Vector2.up * 120);
		GameController.playerrb2D.AddForce(Vector2.right * -55 * GameController.player.transform.localScale.x);
		//AudioSource.PlayClipAtPoint(hitSounds[Random.Range(10,12)], transform.position, Options.sfxVolume);
		
		// Audio - Hit Enemy
		Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Unarmed/HitEnemy", gameObject);
		
		var hitEffectClone = Instantiate(hitEffects[Random.Range(0,hitEffects.Length)], transform.position, Quaternion.identity);
		anim.SetBool("landed_kick",true);
		yield WaitForSeconds(.3);
		anim.SetBool("landed_kick",false);
	}
	else if (collision.gameObject.tag == ("Enemy")&&!Unarmed.flyingKick&&!kickedMe&&unarmed.kicking)
	{
		kickedMe=true;
		colli2D.enabled = false;
		collision.gameObject.SendMessage ("TakeDamage", damage,SendMessageOptions.DontRequireReceiver);
	 	//collision.collider.gameObject.SendMessage("BlinkOnDamage",SendMessageOptions.DontRequireReceiver);
	 	collision.gameObject.SendMessage("BlinkOnDamage",SendMessageOptions.DontRequireReceiver);
	 	collision.gameObject.SendMessage ("StunMelee", 1,SendMessageOptions.DontRequireReceiver);
	 //	yield WaitForEndOfFrame;
	 	//if(collision.gameObject.transform.parent.gameObject.name!="Compy(Clone)")
	 //	if(collision.gameObject!=null)
	 		collision.gameObject.SendMessage("MeleeKnockBack",Vector2(GameController.player.transform.localScale.x*1.25,2.35),SendMessageOptions.DontRequireReceiver);
	 	//AudioSource.PlayClipAtPoint(hitSounds[Random.Range(0,hitSounds.length)], transform.position, Options.sfxVolume);
	 	
	 	// Audio - Hit Enemy
		Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Unarmed/HitEnemy", gameObject);
		
	 	hitEffectClone = Instantiate(hitEffects[Random.Range(0,hitEffects.Length)], transform.position, Quaternion.identity);
	}
	
	
	else if (collision.gameObject.tag == ("EverBlastBag")&&!hitMe&&Unarmed.flyingKick)
	{
		hitMe=true;
		Unarmed.flyingKick=false;
		hitEffectClone = Instantiate(hitEffects[Random.Range(0,hitEffects.Length)], transform.position, Quaternion.identity);
	 	GameController.playerrb2D.velocity.x=0;
	 	GameController.playerrb2D.velocity.y=0;
		GameController.playerrb2D.AddForce(Vector2.up * 120);
		GameController.playerrb2D.AddForce(Vector2.right * -55 * GameController.player.transform.localScale.x);
		//AudioSource.PlayClipAtPoint(hitSounds[Random.Range(0,hitSounds.length)], transform.position, Options.sfxVolume);
		
		// Audio - Hit Enemy
		Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Unarmed/HitEnemy", gameObject);
		
		var baganim = collision.transform.parent.GetComponent("Animator");
	 	baganim.SetTrigger("hitBAG");
		baganim.SetInteger("playerTransform",GameController.player.transform.localScale.x);
		anim.SetBool("landed_kick",true);
		yield WaitForSeconds(.3);
		anim.SetBool("landed_kick",false);
	 	
	}
	else if (collision.gameObject.tag == ("EverBlastBag")&&!Unarmed.flyingKick&&!kickedMe&&!hitMe)
	{
		kickedMe=true;
		hitMe=true;
		colli2D.enabled = false;
	 	hitEffectClone = Instantiate(hitEffects[Random.Range(0,hitEffects.Length)], transform.position, Quaternion.identity);
	 	//AudioSource.PlayClipAtPoint(hitSounds[Random.Range(0,hitSounds.length)], transform.position, Options.sfxVolume);
	 	
	 	// Audio - Hit Enemy
		Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Unarmed/HitEnemy", gameObject);
		
	 	//yield WaitForSeconds(.02);
	 	baganim = collision.transform.parent.GetComponent("Animator");
	 	baganim.SetTrigger("hitBAG");
	 	baganim.SetInteger("playerTransform",GameController.player.transform.localScale.x);
	 	//yield WaitForSeconds(0.3);
	 	//anim.SetBool("hitBAG", false);
	}
}
