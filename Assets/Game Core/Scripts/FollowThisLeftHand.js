var followThis:Transform;
var xDiff:float;
var yDiff:float;

function Awake()
{
	followThis = GameObject.Find("/Player/left_hand").transform;
}
function Update () 
{
	transform.position.x = followThis.position.x+xDiff;
	transform.position.y = followThis.position.y+yDiff;
	transform.rotation.eulerAngles.z=followThis.transform.eulerAngles.z;//*GameController.player.transform.localScale.x;
}