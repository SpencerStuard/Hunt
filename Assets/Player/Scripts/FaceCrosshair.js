 function Update()
{
	//if(!CharController.ledgeGrab)
	//{
		if (GameController.crosshair.transform.position.x < GameController.player.transform.position.x)
		{
			GameController.player.transform.localScale.x= -1;
		}
		else if (GameController.crosshair.transform.position.x > GameController.player.transform.position.x)
		{
			GameController.player.transform.localScale.x= 1;
		}
	//}
}