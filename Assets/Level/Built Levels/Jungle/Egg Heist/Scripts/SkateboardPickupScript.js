#pragma strict

var skateboardSpawner:GameObject;
var tRex:GameObject;
var tRexController:TRexController;
var skateboardPickupCollider:CircleCollider2D;
var skateBoundary:GameObject;
var magic:MagicScript;

var colliderComponents;
//var colliderComponents:Component[];
//var levelColliders:EdgeCollider2D[];
var frictionlessMaterial:PhysicsMaterial2D;

var bones:GameObject[];

function Start ()
{
	skateboardPickupCollider = gameObject.GetComponent(CircleCollider2D);
	magic=GameObject.Find("_Magic").GetComponent(MagicScript);
}

function OnTriggerEnter2D(col:Collider2D)
{

	if(col.gameObject.tag=="Player")
	{
		GameController.playerrb2D.velocity.x=0;
		GameController.playerController.anim.SetFloat("StandingIdle", -25f);
		GameController.playerController.anim.SetFloat("hSpeed", 0f);
		
		//activate skateboard
		skateboardSpawner.SetActive(true);
		skateboardSpawner.GetComponent(SkateboardSpawnerScript).SpawnSkateboard();
		skateboardSpawner.SetActive(false);
		
		GameController.autoSkateMode=true;
		skateBoundary.SetActive(false);
		
		SpawnTRex();
		
		while(GameController.weaponSelect.i != 0)
		{
			GameController.weaponSelect.PrevWeapon();
		}
		magic.magicArmed=false;
		GameController.weaponSelect.weaponsArmed=false;
		
		/*
		colliderComponents = GameObject.Find("BG1.0").GetComponentsInChildren(EdgeCollider2D);
		
		for (var edge:EdgeCollider2D in colliderComponents)
		{
			edge.sharedMaterial=frictionlessMaterial;
		}
		*/
		for (var bone:GameObject in bones)
		{
			bone.transform.parent=null;
			var boneRigidbody = bone.AddComponent(Rigidbody2D);
			bone.AddComponent(BoxCollider2D);
			bone.layer=bpLayerz.IGNORELAYER;
			
			var mode:ForceMode2D = ForceMode2D.Impulse;
			
			boneRigidbody.velocity = Vector3(Random.Range(-1f,1f),Random.Range(-1f,1f),0);
			boneRigidbody.AddTorque(Random.Range(-1f,1f), mode);
		}
	}

}

function Update ()
{
	if(Vector2.Distance(GameController.player.transform.position,transform.position)<1&&Input.GetButtonDown("Interact"))
	{
		PickupSkateboard();
	}
}

function SpawnTRex()
{
	while(GameController.playerrb2D.velocity.x<0)
	{
		yield;
	}
	
	tRex.SetActive(true);
	Destroy(gameObject);
}

function PickupSkateboard()
{
	while(!CharController.onGround)
 	{
    	yield;
 	}
	skateboardPickupCollider.enabled=true;
}