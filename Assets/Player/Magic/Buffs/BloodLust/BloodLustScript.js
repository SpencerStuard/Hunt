var sounds:AudioClip[];
var alreadyHealed:boolean;
static var usingBloodLust:boolean;
var particle:GameObject;
var charges:int;
var needsCharge:boolean;
var inUse:boolean;
var bloodLustTimer:float;

function Start()
{
	inUse=false;
	needsCharge=false;
	charges=3;
	alreadyHealed=false;
	usingBloodLust=false;
	bloodLustTimer=0;
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
		
		// Audio - Cast Bloodlust
		Fabric.EventManager.Instance.PostEvent("SFX/Magic/Bloodlust/Activate", GameController.player.gameObject);
		
		yield WaitForSeconds(.217);
		charges--;
		GameController.stats.spellsCast++;
		bloodLustTimer=30;
		if(!usingBloodLust)
			ShowEffect();
		yield WaitForSeconds(.05);
		//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
		
		// Audio - Bloodlust Deactivate
		Fabric.EventManager.Instance.PostEvent("SFX/Magic/Bloodlust/Deactivate", gameObject);
		
		yield WaitForSeconds(.25);
		inUse=false;
		//yield WaitForSeconds(30);
		//usingBloodLust=false;
		//alreadyHealed=false;
	}
}

function Update()
{
	if(usingBloodLust)
	{
		if ((EnemiesKilled.enemiesKilled>1)&&(EnemiesKilled.enemiesKilled % 2 == 0)&&!alreadyHealed)
		{
			//Debug.Log("HEAL");
			GameController.health.modifyHealth(5);
			alreadyHealed=true;
		}
		else if(EnemiesKilled.enemiesKilled % 2 != 0)
			alreadyHealed=false;
	}
	
	if(bloodLustTimer>0)
	{
		bloodLustTimer-=Time.deltaTime;
		usingBloodLust=true;
	}
	else
	{
		bloodLustTimer=0;
		usingBloodLust=false;
	}
}