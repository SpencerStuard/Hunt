var wepInfo : WeaponSelect;

var guiTxt:GUIText;

function Start()
{
	guiTxt = GetComponent(GUIText);
}

function Update ()
{
	if(wepInfo.currentAmmo!=-1)
	{
		guiTxt.text =  "Weapon: " + wepInfo.wepName + " -  Ammo: " + wepInfo.currentAmmo;
	}
	else
	{
		guiTxt.text =  "Weapon: " + wepInfo.wepName;
	}
}