#pragma strict
#pragma downcast

var eggCollider:CircleCollider2D;
var eggOffset:Vector3;
var makePlayerRun:boolean;
var eggBoundary:GameObject;
var eggRenderer:SpriteRenderer;
var magic:MagicScript;

var eggSparkle:GameObject;

function Start()
{
	eggCollider = gameObject.GetComponent(CircleCollider2D);
	magic=GameObject.Find("_Magic").GetComponent(MagicScript);
	makePlayerRun = false;
}

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player")
	{
		//lock player to unarmed/no magic
		while(GameController.weaponSelect.i != 0)
		{
			GameController.weaponSelect.PrevWeapon();
		}
		magic.magicArmed=false;
		GameController.weaponSelect.weaponsArmed=false;

		for (var child : Transform in col.transform)
		{
			if (child.name == "left_arm")
			{
				transform.parent=child.transform;
				var underarmPosition:Vector3;
				underarmPosition = child.transform.TransformPoint(eggOffset);
				transform.position=Vector3(underarmPosition.x, underarmPosition.y, 0.1);
				transform.rotation=Quaternion.Euler(0,0,child.transform.rotation.eulerAngles.z-90);
				eggRenderer.sortingLayerName="Player";
				eggRenderer.sortingOrder=4;
			}
		}
		GameController.eggHeld = 1;
       
		StartCutscene();
	}
}

function Update()
{
	if(Vector2.Distance(GameController.player.transform.position,transform.position)<1&&Input.GetButtonDown("Interact"))
	{
		eggCollider.enabled=true;
		eggSparkle.SetActive(false);
	}
}

function FixedUpdate()
{
	if(makePlayerRun)
	{
		GameController.playerrb2D.velocity = Vector2(5f, 0);
		GameController.anim.SetFloat("hSpeed",5f);
	}
}

var stompTime:float;
var shakeAmount:Vector3;
var shakeTime:float;

var cutsceneSpawner:PropSpawnerScript;

function StartCutscene()
{
	while(!CharController.onGround||WeaponSelect.attacking)
 	{
    	yield;
 	}
 	
 	Fabric.EventManager.Instance.PostEvent("Music/Switch", Fabric.EventAction.SetSwitch, "Truck_Defense", GameController.gameController);
 	
	cutsceneSpawner=GameObject.Find("Cutscene Spawner").GetComponent(PropSpawnerScript);
	
	GameController.player.transform.localScale.x=1;
	GameController.playerController.idling=false;
	GameController.playerController.carlton=false;
	GameController.playerController.freezePlayer=true;
	GameController.playerController.anim.SetFloat("StandingIdle", -0.5f);
	GameController.playerController.anim.SetFloat("hSpeed", 0f);
	
	var roarPosition : GameObject = new GameObject();
	roarPosition.transform.position = Vector3(transform.position.x - 1, transform.position.y, 0);
	Fabric.EventManager.Instance.PostEvent("SFX/Enemies/TRex/Roar", roarPosition);
	
	for(var i : int = 0; i < 8; i++)
	{
		yield WaitForSeconds(stompTime/2);
		
		if(i < 4)
		{
			cutsceneSpawner.SpawnRandom();
		}
		
		if(i % 2 == 0)
		{
			Fabric.EventManager.Instance.PostEvent("SFX/Enemies/TRex/Stomp", roarPosition);
			GameController.shakeCam.Shake(shakeAmount.x,shakeAmount.y,shakeAmount.z,shakeTime);
		}
	}
	
	yield WaitForSeconds(1.5);
	eggBoundary.SetActive(false);
	
	makePlayerRun = true;
}

function StopRunning()
{
	makePlayerRun = false;
	GameController.playerrb2D.velocity = Vector2.zero;
	GameController.anim.SetFloat("hSpeed",0f);
}