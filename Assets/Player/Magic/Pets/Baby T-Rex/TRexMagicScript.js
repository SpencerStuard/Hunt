//var sounds:AudioClip[];
var egg:GameObject;
var charges:int;
var hand:Transform;
var inUse:boolean;
var needsCharge:boolean;

function Start()
{
	needsCharge=false;
	charges=1;
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
		yield WaitForSeconds(.3);
		charges--;
		GameController.stats.spellsCast++;
		var eggClone = Instantiate (egg, hand.position, transform.rotation);
		eggClone.GetComponent(Rigidbody2D).velocity = (transform.right * 10 );
		eggClone.GetComponent(Rigidbody2D).AddTorque(10);
		//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
		yield WaitForSeconds(.217);
		inUse=false;
	}
}
