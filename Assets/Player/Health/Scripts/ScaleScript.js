var inset:GUITexture;
var startX:float;
var startY:float;
var startW:float;
var startH:float;

var x:int;

function Start ()
{
	inset = GetComponent(GUITexture);
	//startX=inset.pixelInset.x;
	//startY=inset.pixelInset.y;
	if(x==1)
	{
		startW=35;
		startH=35;
	}
	else if(x==2)
	{
		startW=728;
		startH=237;
		startX=inset.pixelInset.x;
		startY=inset.pixelInset.y;
	}
	else if (x==3)
	{
		startW=115;
		startH=115;
		startX=inset.pixelInset.x;
		startY=inset.pixelInset.y;
	}
}

function Update ()
{
	//if(x==1||x==3)
	//{
	inset.pixelInset.x = startX*ScreenSize.X;
	inset.pixelInset.y = startY*ScreenSize.Y;
	//}
	inset.pixelInset.width = startW*ScreenSize.X;
	inset.pixelInset.height = startH*ScreenSize.Y;
}