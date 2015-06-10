static var usingFlippers:boolean;
var passive:boolean;
var ammoCount:int=-1;

function Start()
{
	passive=true;
	usingFlippers=false;
}
function Update()
{
	for(var i:int = 0; i < GameController.weaponSelect.weaponsArray.Count; i++)
	{
		if(GameController.weaponSelect.weapons[11] == GameController.weaponSelect.weaponsArray[i])
		{
			usingFlippers=true;
			this.enabled=false;
		}
		else
			gameObject.SetActive(false);
	}
}