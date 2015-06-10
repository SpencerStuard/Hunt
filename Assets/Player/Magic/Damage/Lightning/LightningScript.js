var sounds:AudioClip[];
var lightning:GameObject[]; //0 small //1 med //2 big
var lightningSpark:GameObject;
var charges:int;
//var hand:Transform;
var inUse:boolean;
var chargeTimer:float;
var needsCharge:boolean;
var spawned:boolean[];
var canUse:boolean;
var hand:Transform;

var lightningClone1:GameObject;
var lightningClone2:GameObject;
var lightningClone3:GameObject;

var screenPosition:Vector3;

//Draw Bar
var background:Texture2D;
var foreground:Texture2D;
var frame:Texture2D;

function Start()
{
	needsCharge=true;
	charges=9;
	canUse=true;
}

function Update()
{
	if(chargeTimer>0)
	{
		if(!inUse)
		{	
			inUse=true;
			//AudioSource.PlayClipAtPoint(MagicScript.castSounds[Random.Range(0,MagicScript.castSounds.length)], GameController.player.transform.position, Options.sfxVolume);
			
			// Audio - Lightning Zap
			Fabric.EventManager.Instance.PostEvent("SFX/Magic/Lightning/Zap", GameController.player.gameObject);
		}	
		GameController.anim.SetTrigger("magicShoutBlastLoop");
	}

	if(chargeTimer<1&&chargeTimer>0&&!spawned[0])
	{
		spawned[0]=true;
		//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
		
		// Audio - Lightning Zap
		Fabric.EventManager.Instance.PostEvent("SFX/Magic/Lightning/Zap", GameController.player.gameObject);
		
		charges--;
		GameController.stats.spellsCast++;
		lightningClone1 = Instantiate (lightning[0], hand.transform.position, transform.rotation);
		var lightningSparkClone = Instantiate (lightningSpark, hand.transform.position, transform.rotation);
	}
	else if(chargeTimer>1&&chargeTimer<2&&!spawned[1])
	{
		Destroy(lightningClone1);
		spawned[1]=true;
		//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
		
		// Audio - Lightning Zap
		Fabric.EventManager.Instance.PostEvent("SFX/Magic/Lightning/Zap", GameController.player.gameObject);
		
		charges--;
		GameController.stats.spellsCast++;
		lightningClone2 = Instantiate (lightning[1], hand.transform.position, transform.rotation);
		var lightningSparkClone2 = Instantiate (lightningSpark, hand.transform.position, transform.rotation);
	}
	else if(chargeTimer>2&&chargeTimer<3&&!spawned[2])
	{
		Destroy(lightningClone2);
		spawned[2]=true;
		//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
		
		// Audio - Lightning Zap
		Fabric.EventManager.Instance.PostEvent("SFX/Magic/Lightning/Zap", GameController.player.gameObject);
		
		charges--;
		GameController.stats.spellsCast++;
		lightningClone3 = Instantiate (lightning[2], hand.transform.position, transform.rotation);
		var lightningSparkClone3 = Instantiate (lightningSpark, hand.transform.position, transform.rotation);
	}
	else if(chargeTimer>=3)//||chargeTimer>3)
	{
		canUse=false;
		Destroy(lightningClone3);
		chargeTimer=0;
		inUse=false;
	}
	
	//destroy old ones
	//if(spawned[1])
	//	Destroy(lightningClone);

	if(chargeTimer>0&&(Options.usingController&&Input.GetAxis("Controller Magic")==0)||(!Options.usingController&&Input.GetButtonUp("Magic"))||GameController.playerController.freezePlayer2||charges==0)
	{	
		canUse=true;
		spawned[0]=false;
		spawned[1]=false;
		spawned[2]=false;
		Destroy(lightningClone1);
		Destroy(lightningClone2);
		Destroy(lightningClone3);
		chargeTimer=0;
		inUse=false;
	}
	
	ChargeGUI();
}

function ChargeMagic()
{	
	if(CharController.onGround&&canUse)
	{
		chargeTimer = Mathf.Clamp(chargeTimer,0,3);
		chargeTimer+=Time.deltaTime;
	}
	
}

function OnGUI()
{
	if(chargeTimer>0)
	{
		GUI.DrawTexture(new Rect (screenPosition.x-(50*ScreenSize.X), screenPosition.y+(180*ScreenSize.Y), 100*ScreenSize.X, 20*ScreenSize.Y), background, ScaleMode.StretchToFill);
		GUI.DrawTexture(new Rect(screenPosition.x-(50*ScreenSize.X), screenPosition.y+(180*ScreenSize.Y), 100*ScreenSize.X*(chargeTimer/3), 20*ScreenSize.Y), foreground, ScaleMode.StretchToFill);
		GUI.DrawTexture(new Rect(screenPosition.x-(50*ScreenSize.X), screenPosition.y+(180*ScreenSize.Y), 100*ScreenSize.X, 20*ScreenSize.Y), frame, ScaleMode.StretchToFill);
	}
		//GUI.HorizontalScrollbar(Rect (screenPosition.x-(50*ScreenSize.X), screenPosition.y+(180*ScreenSize.Y), 100*ScreenSize.X, 20*ScreenSize.Y), 0, chargeTimer, 0, 3);
		//GUI.HorizontalScrollbar(Rect (screenPosition.x*ScreenSize.X, screenPosition.y-75*ScreenSize.Y, 100*ScreenSize.X, 20*ScreenSize.Y), 0, chargeTimer, 0, 3);
		//GUI.HorizontalScrollbar(Rect (screenPosition.x, screenPosition.y-75, 100, 20), 0, chargeTimer, 0, 3);
}

function ChargeGUI()
{
	screenPosition = Camera.main.WorldToScreenPoint(GameController.player.transform.position);
	//screenPosition.y = Screen.height - screenPosition.y+6;
	screenPosition.y = Screen.height - screenPosition.y-(325*ScreenSize.Y);
}