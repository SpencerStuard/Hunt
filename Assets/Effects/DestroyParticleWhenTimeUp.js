var shield:boolean;
var haste:boolean;
var bloodlust:boolean;

function Update () 
{
	if(shield)
	{
		if(!GameController.health.shielded)
			Destroy(gameObject);
	}
	else if(haste)
	{
		if(HasteScript.magicSpeed==0)
			Destroy(gameObject);
	}
	else if(bloodlust)
	{
		if(!BloodLustScript.usingBloodLust)
			Destroy(gameObject);
	}
}