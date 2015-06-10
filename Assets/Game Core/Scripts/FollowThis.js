var followThis:Transform;

function Awake()
{
	followThis = GameObject.Find("fireFrom").transform;
}

function Start () 
{
	transform.position = followThis.position;
	//this.enabled=false;
}