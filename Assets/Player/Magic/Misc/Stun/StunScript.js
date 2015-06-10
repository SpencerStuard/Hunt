var sounds:AudioClip[];
var particle:GameObject;
var charges:int;
var needsCharge:boolean;
var inUse:boolean;

function Start()
{
	inUse=false;
	needsCharge=false;
	charges=22;
}

function ShowEffect()
{
	var particleClone = Instantiate (particle, transform.position, Quaternion.identity);
}

function UseMagic()
{
	if(charges>0&&!inUse)
	{
		inUse=true;
		if(CharController.onGround)
		{
			GameController.anim.SetTrigger("magicShoutGround");
		}
		else
			GameController.anim.SetTrigger("magicShoutAir");
		//AudioSource.PlayClipAtPoint(MagicScript.castSounds[Random.Range(0,MagicScript.castSounds.length)], GameController.player.transform.position, Options.sfxVolume);
		
		// Audio - Stun Cast
		Fabric.EventManager.Instance.PostEvent("SFX/Magic/Stun/Cast", GameController.player.gameObject);
		
		yield WaitForSeconds(.217);
		//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
		charges--;
		GameController.stats.spellsCast++;
		ShowEffect();
		yield WaitForSeconds(.3);
		inUse=false;
	}
}