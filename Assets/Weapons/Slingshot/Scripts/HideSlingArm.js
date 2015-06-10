var rend:Renderer;

function Start()
{
	rend=GetComponent(Renderer);
}

function Update ()
{	if(WeaponSelect.wepName==("Sling")&&!CharController.grabbingOn&&!CharController.idling&&!GameController.playerController.freezePlayer)
		rend.enabled=true;
	else
		rend.enabled=false;
}
