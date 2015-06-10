var folThis:Transform;

/*function OnEnable ()
{
	if(transform.root.transform.localScale.x==1)
		transform.eulerAngles.z=90;
	else
		transform.eulerAngles.z=-90;
}
*/
function Update () 
{
	

	if(folThis!=null)
	{
		transform.position=folThis.position;
		transform.eulerAngles.z=folThis.eulerAngles.z-90;
		//if(folThis.root.localScale.x==1)
		//	transform.eulerAngles=Vector3(folThis.eulerAngles.z, -90, 0);
		//else
		//	transform.eulerAngles=Vector3(folThis.eulerAngles.z, 90, 0);
		alreadyHit=true;
	}
	
	if(alreadyHit&&folThis==null)
		Destroy(gameObject);
}

function FolThis(x:Transform)
{
	folThis=x;
}