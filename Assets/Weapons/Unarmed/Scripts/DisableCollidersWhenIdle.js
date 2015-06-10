var unarmed:MonoBehaviour;
var whichHand:int; //1 = left, 2 = right
var colli2D:Collider2D;

function Start()
{
	colli2D=GetComponent(Collider2D);
	unarmed = transform.parent.GetComponent(MonoBehaviour);
}

function Update ()
{
	if((((whichHand==1&&unarmed.unarmedCombo1)||whichHand==2&&unarmed.unarmedCombo2))&&CharController.punching&&GameController.playerController.atPeak)
		Enable();
	else
		this.colli2D.enabled = false;
}

function Enable()
{
	//yield WaitForSeconds(.25);
	this.colli2D.enabled = true;
}