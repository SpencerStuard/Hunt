var anim:Animator;
var charController:CharController;
var passive:boolean;
static var usingSkateboard:boolean;
static var skateboardScript:SkateboardScript;
static var force:float;
var rolling:boolean;
//static var boosting:boolean;
//static var outofSkateZone:boolean;
var dismounted:boolean;
var japanAir:boolean;
var christAir:boolean;
static var alreadyJumpAnim:boolean;
static var skateInputFrozen:boolean;

var rb2D:Rigidbody2D;

function Start ()
{
	skateInputFrozen=false;
	skateboardScript = this;
	rb2D = GetComponent(Rigidbody2D);
	//allChildren=gameObject.GetComponentsInChildren(Renderer);
	//spawnerScript=GameObject.Find("SkateboardSpawner").GetComponent(SkateboardSpawnerScript);
	//force=3;
	usingSkateboard=true;
	anim=gameObject.GetComponent(Animator);
	charController=GameController.player.GetComponent(CharController);
	transform.parent=GameController.player.transform;
	dismounted=false;
}

function Update ()
{
	if(usingSkateboard&&(Input.GetButtonDown("Item")||HangGliderScript.usingGlider)||CharController.takingDamage)
	{
		if(!GameController.autoSkateMode)
		{
			Dismount();
		}
	}

	anim.SetBool("alreadyJumpAnim",alreadyJumpAnim);
	GameController.anim.SetBool("alreadyJumpAnim",alreadyJumpAnim);
	anim.SetBool("onGround",charController.onGround);
	if(usingSkateboard)
	{
		transform.parent=GameController.player.transform;
		//transform.position.x=transform.parent.transform.position.x;
		transform.localPosition.x=0;
		transform.localPosition.y=-.54;//=GameController.player.transform.position.y-.62;
		transform.eulerAngles.z=transform.parent.eulerAngles.z;
		transform.localScale.x=transform.parent.localScale.x;
		transform.localScale.y=transform.parent.localScale.y;
		
		if(GameController.playerrb2D.velocity.x>0.5||(GameController.playerrb2D.velocity.x<-0.5))
			anim.SetBool("forward",true);
		else
			anim.SetBool("forward",false);
		if(!skateInputFrozen)
		{
			GameController.anim.SetBool("JapanAir",japanAir);
			GameController.anim.SetBool("ChristAir",christAir);
		}
		
		if(!GameController.autoSkateMode)
		{
			SkateForward();
		}
		
		//if(!charController.actuallyJumping)
		//	alreadyJumpAnim=false;
		if(!skateInputFrozen)
		{
			if(!alreadyJumpAnim&&charController.actuallyJumping)
			{
				alreadyJumpAnim=true;
				anim.SetTrigger("Kickflip");
				GameController.anim.SetBool("SkateJump", true);
			}
			else if(!charController.actuallyJumping)
			{
				GameController.anim.SetBool("SkateJump", false);
			}
		}
					
		if(charController.isDoubleJumping&&charController.inairTime>.4&&(WeaponSelect.wepName!="Bow"&&WeaponSelect.wepName!="Sling"))
			DoASweetTrick();

	
		if(charController.hideBoardTrick)
			transform.localScale.y=0;
		else if(!charController.hideBoardTrick)
			transform.localScale.y=1;
			
		if(GameController.playerrb2D.velocity.y==0)
		{
			transform.parent.transform.eulerAngles.z=0;
			//alreadyJumpAnim=false;
		}
		
		if((Mathf.Abs(GameController.playerrb2D.velocity.x) > 0.1) && charController.onGround)
		{
			if(!rolling)
			{
				Fabric.EventManager.Instance.PostEvent("SFX/Vehicles/Skateboard/Loop", gameObject);
				rolling=true;
			}
		}
		else
		{
			Fabric.EventManager.Instance.PostEvent("SFX/Vehicles/Skateboard/Loop", Fabric.EventAction.StopSound, null, gameObject);
			rolling=false;
		}
	}
	
	if(!usingSkateboard&&Vector2.Distance(transform.position,GameController.player.transform.position)<2&&Input.GetButtonDown("Interact"))
	{
		dismounted=false;
		transform.eulerAngles.z=0;
		GameController.player.transform.position.y +=.25;
		usingSkateboard=true;
		if(gameObject.GetComponent(Rigidbody2D)!=null)
			Destroy(gameObject.GetComponent(Rigidbody2D));
	}
	if(gameObject.GetComponent(Rigidbody2D)!=null)
		if(rb2D.velocity.x==0)
			anim.SetBool("forward",false);
			
			
	if(!usingSkateboard&&Vector2.Distance(transform.position,GameController.player.transform.position)<2&&Input.GetButtonDown("Item")&&dismounted)
	{
		GameController.SkateSpawnerScript.spawnedSkateboard=false;
		Destroy(gameObject);
		GameController.SkateSpawnerScript.passive=false;
		GameController.SkateSpawnerScript.GetComponent(Renderer).enabled=true;
	}
	
	if(dismounted&&rb2D.velocity.x==0)
		Fabric.EventManager.Instance.PostEvent("SFX/Vehicles/Skateboard/Loop", Fabric.EventAction.StopSound, null, gameObject);
	
	
	if(!japanAir&&!christAir)
	{
		if(!skateInputFrozen)
			GameController.playerController.hideBoardTrick=false;
	}
}

function SkateForward()
{
	if(charController.runningForward&&charController.onGround)
		charController.anim.SetBool("skatePush 0",true);
	else
		charController.anim.SetBool("skatePush 0",false);
		//return;
	
/*	if(alreadyJumpAnim)
	{
		yield WaitForSeconds(.33);
		alreadyJumpAnim=false;
	}
*/
}

function OnCollisionEnter2D(col:Collision2D)
{
	if(col.gameObject.tag=="Land")
	{
		if((christAir||japanAir)&&usingSkateboard)
		{
			if(GameController.autoSkateMode)
			{
				if(GameController.health.currentHealth <= 5)
				{
				Dismount();
				}
				GameController.playerController.Flinch();
				GameController.health.modifyHealth(-5);
			}
			else
			{
				Dismount();
				GameController.playerController.SendTakeDamage();
				GameController.health.modifyHealth(-10);
				charController.KnockDown();
				yield WaitForSeconds(.25);
				charController.knocked=false;
			}
		}
		GameController.playerController.hideBoardTrick=false;
	}
}


function OnTriggerEnter2D(col:Collider2D)
{

	if(usingSkateboard&&col.gameObject.tag=="Water")
	{
		Dismount();
		rb2D.drag=7;
	}
/*	if(usingSkateboard&&col.gameObject.tag=="SkateSlope")
	{
		outofSkateZone=false;
		transform.parent.transform.eulerAngles.z=col.transform.eulerAngles.z;
	}
	if(usingSkateboard&&col.gameObject.tag=="SkateSpeedBoost")
	{
		GameObject.Find("Player").GetComponent(Rigidbody2D).AddForce(transform.right * GameController.player.transform.localScale.x * 150);
		Debug.Log("go!");
		//boosting=true;
		yield WaitForSeconds(1);
		boosting=false;
	}
	if(usingSkateboard&&col.gameObject.tag=="SkateSpeedBoostDown")
	{
		GameObject.Find("Player").GetComponent(Rigidbody2D).AddForce(transform.right * GameController.player.transform.localScale.x * 150);
		GameObject.Find("Player").GetComponent(Rigidbody2D).AddForce(Vector2.up * -8250);
		Debug.Log("go down!");
		//boosting=true;
		yield WaitForSeconds(1);
		boosting=false;
	}
	if(usingSkateboard&&col.gameObject.tag=="SkateSpeedBoostUp")
	{
		GameObject.Find("Player").GetComponent(Rigidbody2D).AddForce(transform.right * GameController.player.transform.localScale.x * 150);
		//GameObject.Find("Player").GetComponent(Rigidbody2D).AddForce(Vector2.up * 350);
		boosting=true;
		yield WaitForSeconds(1);
		boosting=false;
	}*/
		
}

/*function OnTriggerExit2D(col:Collider2D)
{
	//if(GameObject.Find("Player").GetComponent(Rigidbody2D).velocity.y==0)
		//transform.parent.transform.eulerAngles.z=0;
	outofSkateZone=true;
}*/

	
	var rendererComponents:Component[];
	var skateboardRenderers:SpriteRenderer[];
function Dismount()
{
	charController.onGround=false;
	gameObject.layer=bpLayerz.IGNORELAYER;
	transform.parent=null;
	usingSkateboard=false;
	GameController.anim.SetTrigger("dismount");
	if(!GameController.playerController.thrown)
	{
		var pVelocity:float=GameController.playerrb2D.velocity.x;
	}
	if(japanAir||christAir)
	{
		transform.eulerAngles.z=180;
		transform.position.y+=.87;
		japanAir=false;
		christAir=false;
	}
	transform.localScale.y=1;
	if(gameObject.GetComponent(Rigidbody2D)==null)
		gameObject.AddComponent(Rigidbody2D);
	rb2D = gameObject.GetComponent(Rigidbody2D);
	if(rb2D.velocity.x>0)
		Fabric.EventManager.Instance.PostEvent("SFX/Vehicles/Skateboard/Loop", gameObject);
	if(GameController.autoSkateMode)
	{
		rb2D.drag=1;
		rb2D.angularDrag=0;
	}
	
	rb2D.velocity.x=pVelocity;
	rb2D.collisionDetectionMode=CollisionDetectionMode2D.Continuous;
	
	
	if(GameController.autoSkateMode)
	{
		rendererComponents = gameObject.GetComponentsInChildren(SpriteRenderer);
		
		for(var i:int=0;i<rendererComponents.length;i++)
		{
			skateboardRenderers[i] = rendererComponents[i] as SpriteRenderer;
			skateboardRenderers[i].sortingLayerName="BG 1";
			skateboardRenderers[i].sortingOrder=100;
		}
	}
	
	GameController.player.transform.eulerAngles.z=0;
	yield WaitForEndOfFrame;
	dismounted=true;
	
	//Fabric.EventManager.Instance.PostEvent("SFX/Vehicles/Skateboard/Loop", Fabric.EventAction.StopSound, null, gameObject);
	rolling=false;
}

function DoASweetTrick()
{
	if(Random.Range(0,10)>5)
	{
		if(!japanAir)
		{
			japanAir=true;
			GameController.stats.tricksTricked++;
		}
		yield WaitForSeconds(.95);
		japanAir=false;
	}
	else
	{
		if(!christAir)
		{
			christAir=true;
			//GameController.stats.tricksTricked++;
		}
		yield WaitForSeconds(.95);
		christAir=false;
	}
}
