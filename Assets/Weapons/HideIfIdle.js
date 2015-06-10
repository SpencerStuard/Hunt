var rend:Renderer;

function Start()
{
	rend=GetComponent(Renderer);
}

function Update()
{
	if(Application.loadedLevel !=0)
	{
		if(CharController.idling||GameController.playerController.freezePlayer||GameController.playerController.endGame||GameController.playerController.grabbingRope)
			rend.enabled=false;
		else
			rend.enabled=true;
	}
}
