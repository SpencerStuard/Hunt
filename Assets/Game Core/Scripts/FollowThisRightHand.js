var followThis:Transform;
var yOffset:float;

function Awake()
{
	followThis = GameObject.Find("/Player/right_hand").transform;
}
function Update () 
{
	transform.position.x = followThis.position.x;
	transform.position.y = followThis.position.y+yOffset;
	transform.rotation.eulerAngles.z=followThis.transform.eulerAngles.z*GameController.player.transform.localScale.x;
}