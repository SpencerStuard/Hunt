var cameraFollow:CameraFollow;
var speed:float;
var distanceX:float;
var distanceY:float;
var object:Transform;
var previousPosition:Vector3;

function Start()
{
	cameraFollow=GameObject.Find("Main Camera").GetComponent(CameraFollow);
	object=cameraFollow.player;
	previousPosition=object.position;
}

function Update()
{
	object=cameraFollow.player;

	if(object.position.x>previousPosition.x)
		distanceX += Mathf.Abs(object.position.x - previousPosition.x);
	else 
		distanceX -= Mathf.Abs(object.position.x - previousPosition.x);
		
	if(object.position.y>previousPosition.y)
		distanceY += Mathf.Abs(object.position.y - previousPosition.y);
	else
		distanceY -= Mathf.Abs(object.position.y - previousPosition.y);
		
	previousPosition=object.position;
	
	transform.position.x = ((distanceX/5) * speed);
	
		//GetComponent(Renderer).material.mainTextureOffset = new Vector2((distance/5) * speed, 0); //to disable Y
}
