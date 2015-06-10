var sounds:AudioClip[];
var particle:GameObject;
var needsCharge:boolean;
var inUse:boolean;
var charges:int;

function Start()
{
	charges=-92;
	inUse=false;
	needsCharge=false;
}

function ShowEffect()
{
	var particleClone = Instantiate (particle, transform.position, Quaternion.identity);
}

function UseMagic()
{
	if(!inUse)
	{
		inUse=true;
		if(CharController.onGround)
			GameController.anim.SetTrigger("magicShoutGround");
		else
			GameController.anim.SetTrigger("magicShoutAir");
		//AudioSource.PlayClipAtPoint(MagicScript.castSounds[Random.Range(0,MagicScript.castSounds.length)], GameController.player.transform.position, Options.sfxVolume);
		Fabric.EventManager.Instance.PostEvent("SFX/Magic/Fear/Cast", GameController.player.gameObject);
		yield WaitForSeconds(.217);
		ShowEffect();
		yield WaitForSeconds(.15);
		AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
		yield WaitForSeconds(.15);
		inUse=false;
	}
}