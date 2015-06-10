var target:Transform;
var weaponSelect:WeaponSelect;
var crosshair:Transform;
var rend:Renderer;

function Start()
{
	rend=GetComponent(Renderer);
}

function Update ()
{
	if(!StartMenuScript.inAMenu)
		EnableRenderer();
}

function EnableRenderer()
{
	if(WeaponSelect.wepName=="Rocks"&&WeaponSelect.currentAmmo!=0&&!CharController.idling&&!GameController.playerController.freezePlayer)
		rend.enabled=true;
	else
		rend.enabled=false;
}
