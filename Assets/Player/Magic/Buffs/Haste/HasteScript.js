var sounds:AudioClip[];
static var magicSpeed:float;
var particle:GameObject;
var charges:int;
var needsCharge:boolean;
var inUse:boolean;
var hasteTimer:float;

function Start()
{
	inUse=false;
	needsCharge=false;
	charges=5;
	hasteTimer=0;
}

function Update()
{
	if(hasteTimer>0)
	{
		magicSpeed=3.3;
		hasteTimer-=Time.deltaTime;
	}
	else
	{
		hasteTimer=0;
		magicSpeed=0;
	}
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
		
		// Audio - Cast Haste
		Fabric.EventManager.Instance.PostEvent("SFX/Magic/Haste/Activate", GameController.player.gameObject);
		
		yield WaitForSeconds(.217);
		charges--;
		GameController.stats.spellsCast++;
		if(hasteTimer==0)
			ShowEffect();
		//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
		
		// Audio - Haste Deactivate
		Fabric.EventManager.Instance.PostEvent("SFX/Magic/Haste/Deactivate", gameObject);
		
		//magicSpeed=3.3;//CharController.maxSpeed;
		hasteTimer=15;
		yield WaitForSeconds(.3);
		inUse=false;
		//yield WaitForSeconds(15);
		//magicSpeed=0;
	}
}