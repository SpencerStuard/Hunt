var yDistance:float;
var xDistance:int;

function Update ()
{
	transform.position.x=GameController.player.transform.position.x+xDistance;
	transform.position.y=GameController.player.transform.position.y+yDistance;
}