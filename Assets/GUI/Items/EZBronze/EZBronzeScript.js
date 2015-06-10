var weaponName:String="EZ-Bronze";
var passive:boolean;
//static var usingEZBRonze:boolean;
var followThis:Transform;
var sprayTan:GameObject;
var rend:SpriteRenderer;
var usingSprayTan:boolean;
var ammoCount:int=-1;

function Awake()
{
	rend=GetComponent(SpriteRenderer);
	followThis = GameObject.Find("/Player/right_hand").transform;
}

function Start ()
{
	passive=false;
}

function Update ()
{
	if(usingSprayTan)
		rend.enabled=false;
	transform.localScale.x=GameController.player.transform.localScale.x;
	transform.position = followThis.position;
	transform.rotation.eulerAngles.z=(followThis.rotation.eulerAngles.z-45)*GameController.player.transform.localScale.x;
	if((Input.GetButtonDown("Item")||Input.GetButtonDown("Attack")||CharController.triggerDown)&&!GameController.playerController.grabbingOn&&!usingSprayTan&&GameController.playerController.onGround&&!SkateboardScript.usingSkateboard)
	{	
		GameController.playerController.freezePlayer2=true;
		usingSprayTan=true;
		SprayTan();
	}
	if(GameController.playerController.knocked)
		usingSprayTan=false;
}

function SprayTan()
{
	GameController.anim.SetTrigger("EZSpray");
	yield WaitForSeconds(.3);
	var sprayTanClone = Instantiate(sprayTan, Vector3(followThis.position.x-(.2*GameController.player.transform.localScale.x),followThis.position.y,followThis.position.z), Quaternion.identity);
	yield WaitForSeconds(1.55);
	GameController.playerController.freezePlayer2=false;
	GameController.player.BroadcastMessage ("SprayTanColor");
	if(GameController.playerController.knocked)
		return;
	GameController.playerController.usingEZBronze=true;
	GameController.weaponSelect.FirstWeapon();
	GameController.stats.spraytanUsed++;
	passive=true;
}