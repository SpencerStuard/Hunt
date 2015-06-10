var cameraFollow:CameraFollow;
var speed:float;
var distanceX:float;
var distanceY:float;
var object:Transform;
var previousPosition:Vector3;
var thisColor:Color32;
var useY:boolean;
var ySpeed:float;

var rend:Renderer;

function Start()
{
	cameraFollow=GameObject.Find("Main Camera").GetComponent(CameraFollow);
	//object=cameraFollow.player;
	object=GameObject.Find("Main Camera").gameObject.transform;
	rend=GetComponent(Renderer);
	//previousPosition=object.position;
	//previousPosition=Vector3(-10.47016,94.12498,0);
	rend.material.color=thisColor;
	//distanceX=7.364055;
	//distanceY=-8.471222;
	rend.material.mainTextureOffset = new Vector2((distanceX/5) * speed, 0);
	//transform.position.y = (distanceY/10) * -speed; //with Y
	ySpeed = speed*.1;
}

function Update()
{
	//object=cameraFollow.player;

	if(!GameController.playerController.startUp)
	{
		//object=cameraFollow.player;

		if(object.position.x>previousPosition.x)
			distanceX += Mathf.Abs(object.position.x - previousPosition.x);
		else 
			distanceX -= Mathf.Abs(object.position.x - previousPosition.x);
			
		if(object.position.y>previousPosition.y)
			distanceY += Mathf.Abs(object.position.y - previousPosition.y);
		else
			distanceY -= Mathf.Abs(object.position.y - previousPosition.y);
			
		previousPosition=object.position;
		
		if(useY)
		{
			//rend.material.mainTextureOffset = new Vector2((distanceX/5) * speed, (distanceY/10) * speed); //with Y
			rend.material.mainTextureOffset = new Vector2((distanceX/5) * speed, 0);
			transform.position.y = (distanceY/10) * -ySpeed; //with Y
			
		}
		else
			rend.material.mainTextureOffset = new Vector2((distanceX/5) * speed, 0); //to disable Y
	}
}
