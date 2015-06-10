var col:BoxCollider2D;

function Start ()
{
	col=GetComponent(BoxCollider2D);
}

function Update ()
{
	if(NewSpear.spearMelee)
		col.enabled=true;
	else
		col.enabled=false;
}