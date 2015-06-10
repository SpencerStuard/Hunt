var sounds:AudioClip[];
var particle:GameObject;
var KarateMasterPrefab:GameObject;

var garyLevel:boolean;

var x:int; //wait to destroy

var rb2D:Rigidbody2D;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	if(Application.loadedLevelName=="Dojo"||Application.loadedLevelName=="Jungle - Truck Defense")
		garyLevel=true;
}

function OnCollisionEnter2D(col:Collision2D)
{
	var particleClone = Instantiate (particle, transform.position, Quaternion.identity);
	gameObject.GetComponent(Renderer).enabled=false;
	rb2D.isKinematic=true;
	//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);
	
	// Audio - Spray Tan
	Fabric.EventManager.Instance.PostEvent("SFX/SprayTan", gameObject);
	
	yield WaitForSeconds(1);
	if(!garyLevel)
		var karateMasterClone = Instantiate (KarateMasterPrefab, transform.position, Quaternion.identity);
	else
		GameObject.Find("Meat Truck").SendMessage("SummonedGary");
		
		
	Destroy(gameObject);
}
