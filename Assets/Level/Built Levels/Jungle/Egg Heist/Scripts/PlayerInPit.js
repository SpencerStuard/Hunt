#pragma strict

var tRexController:TRexController;

function OnTriggerEnter2D(col: Collider2D)
{
	if(col.gameObject.tag=="Player")
	{
		col.SendMessage("Pit");
		tRexController.PlayerInPit();
	}
}

function Start () {

}

function Update () {

}