static var usingSnorkel:boolean;
var passive:boolean;
var ammoCount:int=-1;

function Awake()
{
	usingSnorkel=false;
	passive=true;
}

function Update()
{
	for(var i:int = 0; i < GameController.weaponSelect.weaponsArray.Count; i++)
	{
		if(GameController.weaponSelect.weapons[12] == GameController.weaponSelect.weaponsArray[i])
		{
			usingSnorkel=true;
			this.enabled=false;
		}
		else
			gameObject.SetActive(false);
	}
}