function Update () 
{
	if(!RaptorSuitController.usingRaptorSuit)
	{
		transform.position.x = GameController.player.transform.position.x+(.5*GameController.player.transform.localScale.x);
		transform.position.y = GameController.player.transform.position.y;
		transform.localScale.x=GameController.player.transform.localScale.x;
	}
	else
	{
		transform.position.x = GameController.gameControllerScript.raptorPlayer.transform.position.x+(.5*GameController.gameControllerScript.raptorPlayer.transform.localScale.x);
		transform.position.y = GameController.gameControllerScript.raptorPlayer.transform.position.y;
		transform.localScale.x=GameController.gameControllerScript.raptorPlayer.transform.localScale.x;
	}
}