var spawnedSkateboard:boolean;
var weaponName:String="Skateboard";
var skateBoard:GameObject;
var hand:Transform;
var passive:boolean;
var ammoCount:int=-1;

function Awake ()
{
	spawnedSkateboard=false;
	passive=false;
	if(Application.loadedLevel !=0&&hand==null)
		hand=GameObject.Find("/Player/right_hand").transform;
	//this.enabled=false;
}

function Update ()
{
	//if(!spawnedSkateboard)
	//{
		transform.position.x=hand.position.x;
		transform.position.y=hand.position.y-.05;
		
		//transform.position.y=hand.position.y-.05;
		transform.rotation.eulerAngles.z=hand.transform.eulerAngles.z*GameController.player.transform.localScale.x;
	//}
	
	if(!spawnedSkateboard&&(Input.GetButtonDown("Item")||Input.GetButtonDown("Attack")||CharController.triggerDown)&&!GameController.playerController.grabbingOn)
	{
		SpawnSkateboard();
	}
}

function SpawnSkateboard()
{
	GameController.player.transform.position.y+=.25;
	spawnedSkateboard=true;
	var skateBoardClone = Instantiate(skateBoard,transform.position,Quaternion.identity);
	skateBoardClone.transform.parent=GameController.player.transform;
	GetComponent(Renderer).enabled=false;
	GameController.weaponSelect.FirstWeapon();
	passive=true;
}
