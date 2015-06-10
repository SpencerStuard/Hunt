var followMe:Transform;

function Update ()
{
	transform.position=followMe.position;
}

function This(x:Transform)
{
	followMe=x;
}