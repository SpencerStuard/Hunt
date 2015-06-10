var sr:SpriteRenderer;
var alpha:float;

function Start () 
{
	sr.color.a=0;
}

function Update ()
{
	alpha = sr.color.a;
	if(alpha<0.666)
	sr.color.a+=.01;
}