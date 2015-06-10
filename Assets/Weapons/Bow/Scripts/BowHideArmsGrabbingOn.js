var left_arm:GameObject;
var right_arm:GameObject;

var lRend:Renderer;
var rRend:Renderer;

function Awake()
{
	left_arm = GameObject.Find("Left Arm");
	right_arm = GameObject.Find("Right Arm");
}

function Start()
{
	lRend = left_arm.GetComponent(Renderer);
	rRend = right_arm.GetComponent(Renderer);
}

function Update ()
{
	if(CharController.grabbingOn||CharController.idling||GameController.playerController.freezePlayer)
	{
		lRend.enabled=false;
		rRend.enabled=false;
	}
	else
	{
		lRend.enabled=true;
		rRend.enabled=true;
	}
}
