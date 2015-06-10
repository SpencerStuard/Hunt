#pragma strict
var v:int;

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player")
	{
		StartCutscene();
	}
}

function StartCutscene()
{
	while(WeaponSelect.attacking)
 	{
    	yield;
 	}
 	GameController.playerController.inputFrozen=true;
	GameController.playerController.h=0;
	GameController.player.transform.localScale.x=1;
	ResetAnimations();
	yield WaitForSeconds(2);
	SkateboardScript.skateInputFrozen=true;
}

function ResetAnimations()
{
	yield WaitForSeconds(1);
	GameController.playerController.anim.SetBool("skatePush 0",false);
	GameController.playerController.anim.SetInteger("v",v);
}

function Start () {
	v=0;
}

function Update () {

}