#pragma strict

var cameraZooming:boolean;
var mainCamera:Camera;
var zoomMax:float;
var skateboardScript:SkateboardScript;

function Start ()
{
	cameraZooming=false;
	zoomMax=7.5;
}

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player")
	{
		GameController.playerrb2D.gravityScale=0.5;
		TrickRoutine();
		cameraZooming=true;
		skateboardScript=GameObject.Find("Skateboard(Clone)").GetComponent(SkateboardScript);
	}
}

function TrickRoutine()
{
	yield WaitForSeconds(0.3);
	GameController.playerController.anim.SetBool("SkateJump",true);
	skateboardScript.anim.SetTrigger("Kickflip");
	yield WaitForSeconds(1.1);
	SkateboardScript.alreadyJumpAnim=true;
	GameController.playerController.actuallyJumping=true;
	GameController.playerController.anim.SetBool("JapanAir",true);
	yield WaitForSeconds(.95);
	GameController.playerController.anim.SetBool("JapanAir",false);
	yield WaitForSeconds(.1);
	GameController.playerController.anim.SetBool("ChristAir",true);
	yield WaitForSeconds(.95);
	GameController.playerController.anim.SetBool("ChristAir",false);
	yield WaitForSeconds(.3);
	GameController.playerController.inputFrozen=false;
	skateboardScript.skateInputFrozen=false;
}




function Update ()
{
	if(cameraZooming)
	{
		if(mainCamera.orthographicSize<zoomMax)
		{
			mainCamera.orthographicSize+=Time.deltaTime;
		}
	}
}