static var spawnedSuit:boolean;
var weaponName:String="Raptor Suit";
var raptorSuit:GameObject;
var hand:Transform;
var passive:boolean;
var poof:GameObject;
//var unarmed:GameObject;
var ammoCount:int;
var nearbyEnemies:NearbyEnemies;

function Start ()
{	
	RaptorSuitController.usingRaptorSuit=false;
	nearbyEnemies=GameObject.Find("GameController").GetComponent(NearbyEnemies);
	ammoCount=1;
	passive=false;
	spawnedSuit=false;
	if(Application.loadedLevel > 2)
		hand=GameObject.Find("/Player/right_hand").transform;
	gameObject.SetActive(false);
}

function Update ()
{
	if(!spawnedSuit)
	{
		transform.position.x=hand.position.x;
		transform.position.y=hand.position.y-.05;
		//if(GameController.player.transform.localScale.x==1)
		transform.localScale.x=GameController.player.transform.localScale.x;
		transform.rotation.eulerAngles.z=hand.transform.eulerAngles.z*GameController.player.transform.localScale.x;
	}
	if(nearbyEnemies.enemiesNear.Count==0)
		if(!spawnedSuit&&!CharController.grabbingOn&&(Input.GetButtonDown("Item")||Input.GetButtonDown("Attack")||CharController.triggerDown))
			SpawnSuit();
}

function SpawnSuit()
{
	ammoCount--;
	CharController.knockedDown=true;
	spawnedSuit=true;
	var poofClone=Instantiate(poof,GameController.player.transform.position,Quaternion.identity);
	GameController.anim.enabled=false;
	yield WaitForSeconds(.5);
	var suitClone = Instantiate(raptorSuit,GameController.player.transform.position,Quaternion.identity);
	CharController.knockedDown=false;
	GameController.stats.raptorsuitUsed++;
	passive=true;
	GameController.player.BroadcastMessage("HideShadow");
	if(GameController.playerController.takingDamage)
		GameController.player.BroadcastMessage ("NormalColor");
	GameController.player.SetActive(false);
	yield WaitForEndOfFrame;
	//GameController.player.transform.position.y=-500;
	gameObject.SetActive(false);
	if(GameController.playerController.takingDamage)
		GameController.player.BroadcastMessage ("Normal");
}