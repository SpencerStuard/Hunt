#pragma strict

static var eating:boolean;
static var goingIn:boolean;
var startPosition:Transform;
var endPosition:Transform;
var eatLerp:float;
var eatTime:float;

function Start ()
{
	eating=false;
	goingIn=false;
	eatLerp=0;
	eatTime=4;
}

function Update () 
{
	if(eating)
	{
		GameController.player.transform.localScale.y=1;
		GameController.player.transform.localScale.x=-1;
		SetPlayerRotation();
		//GameController.player.transform.position=startPosition.position;
		if(eatLerp<eatTime&&goingIn)
		{
			GameController.player.transform.position=Vector3.Lerp(startPosition.position, endPosition.position, eatLerp/eatTime);
			eatLerp+=Time.deltaTime;
		}
		else
		{
			GameController.player.transform.position = endPosition.position;
			goingIn=false;
		}
		
	}
}

function SetPlayerRotation()
{
	GameController.player.transform.rotation=transform.rotation;
}