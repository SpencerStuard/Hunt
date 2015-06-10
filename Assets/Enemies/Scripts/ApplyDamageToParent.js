static var inMe:boolean=false;
static var hitFromDirection:int=1;
var hitMe:boolean;
//var hitThis:boolean;
//var enemyController:EnemyController;
static var playingSound:boolean;
var hitEffects:GameObject[];



function Update()
{
	if(!SwordWeapon.attackingSword&&!NewSpear.spearMelee)
		hitMe=false;
}


function OnCollisionEnter2D(col:Collision2D)
{
	 if (col.gameObject.tag == ("Spear"))
	 {
	 	inMe=true;
	 }
}

function OnTriggerEnter2D(collision:Collider2D)
{
	if (collision.gameObject.tag == ("Unarmed"))
	{
		SendMessage ("BlinkOnDamage",SendMessageOptions.DontRequireReceiver);
		//transform.parent.SendMessage ("SeenPlayer",SendMessageOptions.DontRequireReceiver);
	}

	if ((collision.gameObject.tag == ("PlayerWeaponSpear")||collision.gameObject.tag == ("PlayerWeaponSword"))&&!hitMe&&(SwordWeapon.attackingSword||NewSpear.spearMelee))
	{	
		hitMe=true;
		if(NewSpear.spearMelee&&!playingSound)
		{
			playingSound=true;
			//AudioSource.PlayClipAtPoint(NewSpear.statSounds[Random.Range(0,NewSpear.statSounds.length)], transform.position, Options.sfxVolume);
			
			// Audio - Spear Hits Enemy
			Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Spear/Impact/Enemy", gameObject);
		}
		if(SwordWeapon.attackingSword&&!playingSound)
		{
			playingSound=true;
			//AudioSource.PlayClipAtPoint(SwordWeapon.statSounds[Random.Range(0,SwordWeapon.statSounds.length)], transform.position, Options.sfxVolume);
			
			// Audio - Spear Hits Enemy
			Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Sword/Hit", gameObject);
		}
		transform.parent.SendMessage ("TakeDamage", .5);
		var hitEffectClone = Instantiate(hitEffects[Random.Range(0,hitEffects.Length)], transform.position, Quaternion.identity);
		SendMessage ("BlinkOnDamage",SendMessageOptions.DontRequireReceiver);
		//transform.parent.SendMessage ("StunMelee", .2,SendMessageOptions.DontRequireReceiver);
		if(NewSpear.upperCut)
		{
			NewSpear.upperCut=false;
			transform.parent.SendMessage ("StunMelee", .6,SendMessageOptions.DontRequireReceiver);
			transform.parent.SendMessage("MeleeKnockBack",Vector2(0,125),SendMessageOptions.DontRequireReceiver);
		}
		//transform.parent.SendMessage ("SeenPlayer",SendMessageOptions.DontRequireReceiver);
	}
	if(collision.gameObject.tag == ("PlayerPet"))
	{	
		transform.parent.SendMessage ("TakeDamage", .15);
		SendMessage ("BlinkOnDamage",SendMessageOptions.DontRequireReceiver);
		var hitEffectClone2 = Instantiate(hitEffects[Random.Range(0,hitEffects.Length)], transform.position, Quaternion.identity);
		//transform.parent.SendMessage ("SeenPlayer",SendMessageOptions.DontRequireReceiver);
	}
}


function ImDead()
{
	var spearChild = GameObject.Find("spear(Clone)");
	spearChild.transform.parent=null;
	if(spearChild.GetComponent(Rigidbody2D)==null)
		spearChild.AddComponent(Rigidbody2D);
	spearChild.transform.localScale.y=1;
	if(transform.localScale.x<0)
		spearChild.transform.localScale.x=-1;
	else
		spearChild.transform.localScale.x=1;
	spearChild.GetComponent(Rigidbody2D).isKinematic=false;
	spearChild.gameObject.layer=bpLayerz.IGNORELAYER;
}

function BlinkOnDamage()
{

}