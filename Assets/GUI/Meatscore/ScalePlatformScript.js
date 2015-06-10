var spinner:Transform;
var splat:GameObject;
var i:int;

function OnCollisionEnter2D(col:Collision2D)
{
	i++;
	var splatClone=Instantiate(splat,col.gameObject.transform.position,Quaternion.identity);
	col.gameObject.transform.parent=transform;
	col.gameObject.GetComponent(Rigidbody2D).isKinematic=true;
	if(transform.localPosition.y>1)
		transform.position.y-=0.0110625;
	spinner.eulerAngles.z-=4.5;
}