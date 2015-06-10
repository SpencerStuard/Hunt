var circCol:Collider2D;
var meatVal:int;
var sounds:AudioClip[];
var isHam:boolean;
var isBacon:boolean;
var isChop:boolean;
var isRibs:boolean;
var isSausage:boolean;
var isSteak1:boolean;
var isSteak2:boolean;

function OnCollisionEnter2D(col:Collision2D)
{
	if(col.gameObject.tag=="Land")
	{
		GetComponent(Rigidbody2D).isKinematic=true;
		circCol.isTrigger=true;
	}
}

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player")
	{
		//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
		
		// Audio - Ham Sound
		Fabric.EventManager.Instance.PostEvent("SFX/HamHit", gameObject);
		
		GameController.gameControllerScript.levelScript.meatScore+=meatVal;
		if(isHam)
			GameController.gameControllerScript.levelScript.hams+=1;
		else if(isBacon)
			GameController.gameControllerScript.levelScript.bacons+=1;
		else if(isChop)
			GameController.gameControllerScript.levelScript.chops+=1;
		else if(isRibs)
			GameController.gameControllerScript.levelScript.ribs+=1;
		else if(isSausage)
			GameController.gameControllerScript.levelScript.sausages+=1;
		else if(isSteak1)
			GameController.gameControllerScript.levelScript.steaks1+=1;
		else if(isSteak2)
			GameController.gameControllerScript.levelScript.steaks2+=1;
		gameObject.SetActive(false);
	}
}