#pragma strict

var effector:AreaEffector2D;

function Start ()
{
	effector=GetComponent(AreaEffector2D);
}

function Update ()
{
	if(GameController.playerController.actuallyJumping)
	{
		effector.forceMagnitude=0;
	}
	else
	{
		effector.forceMagnitude=20;
	}
}