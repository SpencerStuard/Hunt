var moveXBy:float;
var bowScript:BowScript;

var rend:LineRenderer;

function Start()
{
	rend=GetComponent(LineRenderer);
}

function Update ()
{
	moveXBy = Mathf.Clamp(moveXBy,-.19,0);
	
	if(bowScript.drawTimer!=0)
	moveXBy -=.00115;
	
	rend.SetPosition(0, Vector3(0,.375,0));
	rend.SetPosition(1, Vector3(moveXBy*2,0,0));
	rend.SetPosition(2, Vector3(0,-.375,0));
	rend.sortingLayerName="Player";
	rend.sortingOrder=7;
	
	if(bowScript.drawTimer==0)
		moveXBy=0;
}

