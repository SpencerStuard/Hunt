var followThis:Transform;
var offSetX:float;
var offSetY:float;

function Awake()
{
	followThis=GameObject.Find("/Player/left_leg").transform;
}

function Update () 
{
	if(Unarmed.flyingKick)
	{
		offSetX=.15;
		offSetY=-.1;
	}
	else
	{
		offSetX=0;
		offSetY=0;
	}

	transform.position.x = followThis.position.x+(offSetX*GameController.player.transform.localScale.x);
	transform.position.y = followThis.position.y+offSetY;
}