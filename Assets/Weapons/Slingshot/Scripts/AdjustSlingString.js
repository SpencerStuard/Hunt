var moveYBy:float;
var moveXBy:float;
var slingScript:SlingScript;
var slingStrap:Transform;
var slingRightArm:Transform;

var rend:LineRenderer;

function Start()
{
	rend=GetComponent(LineRenderer);
}

function Awake()
{
	slingStrap=GameObject.Find("sling_strap").transform;
	slingRightArm=GameObject.Find("sling_right_arm").transform;
}

function Update ()
{
	moveYBy = Mathf.Clamp(moveYBy,-.3,0);
	moveXBy = Mathf.Clamp(moveXBy,-.3,0);
	
	//transform.localScale.x=GameController.player.transform.localScale.x;
	
	if(slingScript.drawTimer!=0)
	{	
		moveYBy -=.0115;
		moveXBy -=.0115;
	}
	if(slingScript.drawTimer==0)
	{
		moveYBy=0;
		moveXBy=0;
	}
	
	
	rend.SetPosition(0, Vector3(0,-.1,-1));
	rend.SetPosition(1, Vector3(slingStrap.localPosition.x-.3,slingStrap.localPosition.y-.3,0));
	rend.SetPosition(2, Vector3(0,.1,-1));
	
	slingStrap.localPosition.x=moveXBy+.3;
	slingStrap.localPosition.y=moveYBy+.3;
	rend.sortingLayerName="Player";
	rend.sortingOrder=4;
	transform.localScale.x=-1;
}