var goTo:Transform;
var map:boolean;

function Update () 
{
	if(Vector2.Distance(GameController.player.transform.position,transform.position)<1&&Input.GetButtonDown("Up")&&!Health.playerIsDead)
		if(!map)
			Door();
		else
			Application.LoadLevel("Map - Overworld");
}

function Door()
{
	yield WaitForEndOfFrame;
	GameController.player.transform.position=goTo.transform.position;
}