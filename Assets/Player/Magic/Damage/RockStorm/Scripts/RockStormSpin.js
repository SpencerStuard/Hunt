var moveLeft:boolean;
var moveRight:boolean;
var moveTimer:float;
var rockCloud1:boolean;
var rockCloud2:boolean;

function Update ()
{
	moveTimer+=Time.deltaTime;
	moveTimer = Mathf.Clamp(moveTimer,-3,6);
	if(rockCloud1)
	{
		transform.localEulerAngles.z+=15;
		
		if(moveTimer<3)
		{
			moveRight=true;
			moveLeft=false;
		}
		if(moveTimer>3)
		{
			moveRight=false;
			moveLeft=true;
		}
		if(moveTimer==6)
		{
			moveTimer=0;
		}
		if(moveRight)
		{
			transform.position.x+=.02;
		}
		if(moveLeft)
		{
			transform.position.x-=.02;
		}
	}
	
	if(rockCloud2)
	{
		transform.localEulerAngles.z+=5;
		
		if(moveTimer<3)
		{
			moveRight=false;
			moveLeft=true;
		}
		if(moveTimer>3)
		{
			moveRight=true;
			moveLeft=false;
		}
		if(moveTimer==6)
		{
			moveTimer=0;
		}
		if(moveRight)
		{
			transform.position.x+=.02;
		}
		if(moveLeft)
		{
			transform.position.x-=.02;
		}
	}

}