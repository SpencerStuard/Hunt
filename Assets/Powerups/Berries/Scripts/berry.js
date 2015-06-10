var eatSounds:AudioClip[];
var healthToHeal:int;

function Start()
{
	healthToHeal=10;
	//transform.eulerAngles.z=15;
	//InvokeRepeating("Flip",1,.5);
}

function Update ()
{
	if(Mathf.Abs(GameController.player.transform.position.x-transform.position.x)<.5&&Mathf.Abs(GameController.player.transform.position.y-transform.position.y)<1&&Input.GetButton("Interact"))
	{
		GameController.health.modifyHealth(healthToHeal);
		//AudioSource.PlayClipAtPoint(eatSounds[Random.Range(0,eatSounds.length)], transform.position, Options.sfxVolume);
		
		// Audio - Eat Berry
		Fabric.EventManager.Instance.PostEvent("SFX/Player/Eat/Berry", gameObject);
		
		Destroy(gameObject);
	}
}

