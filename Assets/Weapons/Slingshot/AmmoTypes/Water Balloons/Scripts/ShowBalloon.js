var slingScript:SlingScript;
var rend:Renderer;

function Start()
{
	rend=GetComponent(Renderer);
}

function Update()
{
	ShowOrHide();
	Flip();
}

function ShowOrHide()
{
	if(slingScript.rockSelected==1&&slingScript.ammoCount>0&&WeaponSelect.wepName=="Sling"&&slingScript.balloonCount>0&&!CharController.idling)
		rend.enabled=true;
	else
		rend.enabled=false;
}

function Flip()
{
	if(slingScript.drawTimer!=0)
		transform.eulerAngles.z=(45*GameController.player.transform.localScale.x);
	else
		transform.localEulerAngles.z=0;
		
	transform.localScale.x=GameController.player.transform.localScale.x;
}
