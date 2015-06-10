static var usingParachutePants:boolean;
var passive:boolean;
var ammoCount:int=-1;

function Start()
{
	passive=true;
	usingParachutePants=false;
}
function Update()
{
	for(var i:int = 0; i < GameController.weaponSelect.weaponsArray.Count; i++)
	{
		if(GameController.weaponSelect.weapons[13] == GameController.weaponSelect.weaponsArray[i])
		{
			usingParachutePants=true;
			this.enabled=false;
		}
		else
			gameObject.SetActive(false);
	}
}