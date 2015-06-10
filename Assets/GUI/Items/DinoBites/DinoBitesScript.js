var weaponName:String="Dino Bites";
var passive:boolean;
var healthToHeal:int;
var ammoCount:int=1;

function Start ()
{
	ammoCount=1;
	passive=false;
	healthToHeal=2000;
}

function Update ()
{
	if((Input.GetButtonDown("Item")||Input.GetButtonDown("Attack")||CharController.triggerDown))
	{
		ammoCount--;
		GameController.health.modifyHealth(healthToHeal);
		GameController.weaponSelect.FirstWeapon();
		GameController.stats.dinobitesEaten++;
		passive=true;
		//gameObject.SetActive(false);
	}
}