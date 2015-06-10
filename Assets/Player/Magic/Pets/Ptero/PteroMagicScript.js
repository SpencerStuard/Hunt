var pteroPet:GameObject;
var sounds:AudioClip[];
var particle:GameObject;
var charges:int;
var needsCharge:boolean;
var inUse:boolean;

function Start()
{
	needsCharge=false;
	charges=1;
}

function ShowEffect()
{
	var particleClone = Instantiate (particle, GameController.player.transform.position, Quaternion.identity);
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
		
		// Audio - Summon Pterodactyl
		Fabric.EventManager.Instance.PostEvent("SFX/Pets/Pterodactyl/Summon", GameController.player.gameObject);
		ShowEffect();
		//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
		charges--;
		GameController.stats.spellsCast++;
		yield WaitForSeconds(.3);
		
		var summonedPtero : GameObject = Instantiate(pteroPet, transform.position, transform.rotation);
		yield WaitForSeconds(.217);
		inUse=false;
		yield WaitForSeconds(60);
		Destroy(summonedPtero);
	}
}
