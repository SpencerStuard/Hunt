var sounds:AudioClip[];
var particle:GameObject;
var charges:int;
var needsCharge:boolean;
var inUse:boolean;

function Start()
{
	inUse=false;
	needsCharge=false;
	charges=2;
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
		{
			GameController.anim.SetTrigger("magicShoutGround");
		}
		else
			GameController.anim.SetTrigger("magicShoutAir");
		//AudioSource.PlayClipAtPoint(MagicScript.castSounds[Random.Range(0,MagicScript.castSounds.length)], GameController.player.transform.position, Options.sfxVolume);
		
		// Audio - Cast Shield
		Fabric.EventManager.Instance.PostEvent("SFX/Magic/Shield/Activate", GameController.player.gameObject);
		
		yield WaitForSeconds(.217);
		//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
		
		// Audio - Shield Deactivate
		Fabric.EventManager.Instance.PostEvent("SFX/Magic/Shield/Deactivate", gameObject);
		
		charges--;
		GameController.stats.spellsCast++;
		if(!GameController.health.shielded)
			ShowEffect();
		GameController.health.Shield();
		yield WaitForSeconds(.3);
		inUse=false;
	}
}