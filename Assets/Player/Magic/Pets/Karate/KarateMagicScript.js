var sprayCan:GameObject;
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
			//AudioSource.PlayClipAtPoint(MagicScript.castSounds[Random.Range(0,MagicScript.castSounds.length)], GameController.player.transform.position, Options.sfxVolume);
			yield WaitForSeconds(.3);
			charges--;
			GameController.stats.spellsCast++;
			var sprayCanClone = Instantiate (sprayCan, hand.position, transform.rotation);
			sprayCanClone.GetComponent(Rigidbody2D).velocity = (transform.right * 10 );
			sprayCanClone.GetComponent(Rigidbody2D).AddTorque(10);
			yield WaitForSeconds(.217);
			inUse=false;
		}
}
