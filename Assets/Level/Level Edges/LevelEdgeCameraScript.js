var cam:CameraFollow;

function Start ()
{
	cam = Camera.main.GetComponent(CameraFollow);
}

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player")
		cam.folX=false;
}

function OnTriggerExit2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player")
		cam.folX=true;
}