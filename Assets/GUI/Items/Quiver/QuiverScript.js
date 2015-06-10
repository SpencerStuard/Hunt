static var usingQuiver:boolean;
var passive:boolean;
var ammoCount:int=-1;

function Awake()
{
	usingQuiver=false;
}

function Start()
{
	passive=true;
}
function Update()
{
	for(var i:int = 0; i < GameController.weaponSelect.weaponsArray.Count; i++)
	{
		//Debug.Log(i + GameController.weaponSelect.weaponsArray[i].name);
		if(GameController.weaponSelect.weapons[7].name == GameController.weaponSelect.weaponsArray[i].name)
		{
			BowScript.ammoCount=40;
			usingQuiver=true;
			this.enabled=false;
		}
	}
	
}