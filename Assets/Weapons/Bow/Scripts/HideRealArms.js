var leftArm:GameObject;
var leftHand:GameObject;
var rightArm:GameObject;
var rightHand:GameObject;

var laRend:Renderer;
var lhRend:Renderer;
var raRend:Renderer;
var rhRend:Renderer;

function Awake()
{
	leftArm = GameObject.Find("/Player/left_arm");
	leftHand = GameObject.Find("/Player/left_hand");
	rightArm = GameObject.Find("/Player/right_arm");
	rightHand = GameObject.Find("/Player/right_hand");
}

function Start()
{
	laRend = leftArm.GetComponent(Renderer);
	lhRend = leftHand.GetComponent(Renderer);
	raRend = rightArm.GetComponent(Renderer);
	rhRend = rightHand.GetComponent(Renderer);
}

function Update ()
{
	if((WeaponSelect.wepName==("Bow")||WeaponSelect.wepName==("Sling"))&&!CharController.grabbingOn&&!CharController.idling&&!GameController.playerController.freezePlayer)
	{
		laRend.enabled = false;
		lhRend.enabled = false;
		raRend.enabled = false;
		rhRend.enabled = false;
	}
	else
	{
		laRend.enabled = true;
		lhRend.enabled = true;
		raRend.enabled = true;
		rhRend.enabled = true;
	}
}
