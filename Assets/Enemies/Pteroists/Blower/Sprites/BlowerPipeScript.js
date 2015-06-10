var rb2D:Rigidbody2D;
var truckLevel:boolean;

function Awake()
{
	if(Application.loadedLevelName=="Jungle - Truck Defense")
		truckLevel=true;
	else
		truckLevel=false;
}

function Start()
{
	if(!truckLevel)
		this.enabled=false;
}

function Update () 
{
	if(truckLevel)
		rb2D.velocity.x=-5;
}