#pragma strict
var shatterFX:GameObject;
var polyCollider:PolygonCollider2D;
var amount:float;
var explodePosition:Transform;

function Start () {
	polyCollider=GetComponent(PolygonCollider2D);
	amount = 11;
}

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player")
	{
		GameController.playerrb2D.velocity += -transform.right * amount;
		GameController.playerController.Flinch();
		Instantiate(shatterFX,explodePosition.position,Quaternion.identity);
		Destroy(gameObject);
	}
	else if(col.gameObject.tag=="EnemyLimb")
	{
		Instantiate(shatterFX,explodePosition.position,Quaternion.identity);
		Destroy(gameObject);
	}
}

function Update () {

}