var sounds:AudioClip[];
var fireball:GameObject;
var charges:int;
var hand:Transform;
var inUse:boolean;
var needsCharge:boolean;

var particle:GameObject;

function Start()
{
	needsCharge=false;
	charges=5;
}

function ShowEffect()
{
	var particleClone = Instantiate (particle, GameController.player.transform.position, particle.transform.rotation);
}

function UseMagic()
{
	if(charges>0&&!inUse)
	{
		inUse=true;
		if(CharController.onGround)
			GameController.anim.SetTrigger("magicBlastGround");
		else
		{
			GameController.anim.SetTrigger("magicBlastAir");
			GameController.playerrb2D.velocity.x=0;
			var v:Vector2=(GameController.player.transform.position - GameController.crosshair.transform.position);
			GameController.playerrb2D.AddForce(v * 50);
		}
		//AudioSource.PlayClipAtPoint(MagicScript.castSounds[Random.Range(0,MagicScript.castSounds.length)], GameController.player.transform.position, Options.sfxVolume);
		
		// Audio - Fireball Shoot
		Fabric.EventManager.Instance.PostEvent("SFX/Magic/Fireball/Shoot", GameController.player.gameObject);
	
		yield WaitForSeconds(.15);
		//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
		ShowEffect();
		yield WaitForSeconds(.15);
		charges--;
		GameController.stats.spellsCast++;
		var fireballClone = Instantiate (fireball, hand.position, transform.rotation);
		fireballClone.GetComponent(Rigidbody2D).velocity = (transform.right * 10 );
		yield WaitForSeconds(.217);
		inUse=false;
	}
}
