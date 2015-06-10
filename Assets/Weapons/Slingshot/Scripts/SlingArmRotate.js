var slingWep:Transform;

function Awake()
{
	slingWep=GameObject.Find("SlingWepNew").transform;
}

function Update()
{
	transform.localScale.y=slingWep.localScale.y;
}