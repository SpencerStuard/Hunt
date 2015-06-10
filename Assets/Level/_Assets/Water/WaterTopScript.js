#pragma strict

function OnTriggerEnter2D()
{
	GameController.playerController.waterTop=true;
}

function OnTriggerExit2D()
{
	GameController.playerController.waterTop=false;
}