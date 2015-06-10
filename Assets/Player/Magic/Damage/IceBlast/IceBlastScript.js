//var sounds:AudioClip[];
var ice:GameObject;
var particle:GameObject;
var charges:int;
static var castingIce:boolean;
var inUse:boolean;
var hand:Transform;
var needsCharge:boolean;

function Start()
{
	needsCharge=false;
	charges=5;
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
			GameController.anim.SetTrigger("magicBlastGround1Sec");
		else
		{
			GameController.anim.SetTrigger("magicBlastAir");
			GameController.playerrb2D.velocity.x=0;
			var v:Vector2=(GameController.player.transform.position - GameController.crosshair.transform.position);
			GameController.playerrb2D.AddForce(v * 50);
		}
		//AudioSource.PlayClipAtPoint(MagicScript.castSounds[Random.Range(0,MagicScript.castSounds.length)], GameController.player.transform.position, Options.sfxVolume);
		
		// Audio - Ice Blast Cast
		Fabric.EventManager.Instance.PostEvent("SFX/Magic/IceBlast/Cast", GameController.player.gameObject);
		
		castingIce=true;
		yield WaitForSeconds(.3);
		charges--;
		GameController.stats.spellsCast++;
		var iceClone = Instantiate (ice, hand.position, transform.rotation);
		yield WaitForSeconds(.7);
		inUse=false;
		castingIce=false;
	}
}
