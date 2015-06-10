static var invulnerable:boolean=false;

function Start()
{
//	GetComponent(Renderer).castShadows = true; //shadows
	//GetComponent(Renderer).receiveShadows = true; //useless?
}

function NormalColor()
{
	GameController.playerController.knocked=false;
	GameController.playerController.thrown=false;
	GameController.playerController.knockedDown=false;
	GameController.playerController.takingDamage=false;
	GameController.player.layer=bpLayerz.PLAYER;
	GameController.playerController.slingArm1.SendMessage ("NormalColor",SendMessageOptions.DontRequireReceiver);
	GameController.playerController.slingArm2.SendMessage ("NormalColor",SendMessageOptions.DontRequireReceiver);
	GameController.playerController.bowArm1.SendMessage ("NormalColor",SendMessageOptions.DontRequireReceiver);
	GameController.playerController.bowArm2.SendMessage ("NormalColor",SendMessageOptions.DontRequireReceiver);
	GetComponent(Renderer).material.color = Color.white;
}

function TakeDamage()
{
	if(!Health.playerIsDead)
	{
		Invulnerable();
		if(!CharController.usingEZBronze)
		{
			var chrisColor:Color = Color32(252, 236, 0, 200);
			GetComponent(Renderer).material.color = Color.red;
			yield WaitForSeconds(.2);
			
			for(var n = 0; n < 5; n++)
			{
				GetComponent(Renderer).material.color = Color.white;
				yield WaitForSeconds(.1);
				GetComponent(Renderer).material.color = chrisColor;
		 		yield WaitForSeconds(.1);
			}
			GetComponent(Renderer).material.color = Color.white;
		}
	}
}

function TakeDamageCosmetic()
{
	if(!Health.playerIsDead)
	{
		if(!CharController.usingEZBronze)
		{
			var chrisColor:Color = Color32(252, 236, 0, 200);
			GetComponent(Renderer).material.color = Color.red;
			yield WaitForSeconds(.2);
			
			for(var n = 0; n < 5; n++)
			{
				GetComponent(Renderer).material.color = Color.white;
				yield WaitForSeconds(.1);
				GetComponent(Renderer).material.color = chrisColor;
		 		yield WaitForSeconds(.1);
			}
			GetComponent(Renderer).material.color = Color.white;
		}
	}
}

function Invulnerable()
{
	GameController.player.layer=bpLayerz.PLAYERINVULN;
	invulnerable=true;
	yield WaitForSeconds(1.2);
	invulnerable=false;
	GameController.player.layer=bpLayerz.PLAYER;
}

function SprayTanColor()
{
	var tanColor:Color = Color32(255, 179, 0, 255);
	GetComponent(Renderer).material.color = tanColor;
	
	yield WaitForSeconds(53);
	for(var n = 0; n < 10; n++)
	{
		GetComponent(Renderer).material.color = Color.white;
		yield WaitForSeconds(.25);
		GetComponent(Renderer).material.color = tanColor;
 		yield WaitForSeconds(.25);
	}
		for(var m = 0; m < 10; m++)
	{
		GetComponent(Renderer).material.color = Color.white;
		yield WaitForSeconds(.1);
		GetComponent(Renderer).material.color = tanColor;
 		yield WaitForSeconds(.1);
	}
	GetComponent(Renderer).material.color = Color.white;
	
}
