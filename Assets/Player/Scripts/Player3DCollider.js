var playerScript:CharController;
var stomach:Transform;

function Update()
{
	transform.eulerAngles.z = stomach.eulerAngles.z;
	transform.position.y = stomach.position.y;

	var collider = GetComponent(CapsuleCollider);
	if(playerScript.crouching||playerScript.rolling)
	{
		collider.height=.5;
		collider.center = Vector3(.17,-.15,0);
	}
	else //if(!playerScript.rolling||!playerScript.crouching)
	{
		collider.height=1.15;
		collider.center = Vector3(.0,.1,0);
	}
}