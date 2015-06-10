#pragma strict
var enemyHP:float;
var rb2D:Rigidbody2D;

function Start () 
{
	enemyHP=500;
	rb2D = GetComponent(Rigidbody2D);
}

function Update ()
{
if(Time.timeScale > 0)
{
	rb2D.velocity.x=.6*-transform.localScale.x;
}
}

function Electrocute()
{

}

function IsCubed()
{

}