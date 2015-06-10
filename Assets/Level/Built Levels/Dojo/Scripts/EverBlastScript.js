var startX:float;
var startY:float;
var stopY:boolean;

function Start()
{
	startX=transform.position.x;
	startY=transform.position.y;
}

function Update()
{	
	transform.position.x=startX;
	
	if(stopY)
		transform.position.y=startY;
}