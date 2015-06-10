private var object_pos:Vector3;
var mouseAngle:float;

var cam:Camera;

function Start ()
{
	cam=GetComponent(Camera).main;
}

function Update ()
{
var crosshairScreenSpace : Vector3 = cam.main.WorldToScreenPoint (GameController.player.transform.position);
		
	mouse_pos = crosshairScreenSpace;
	mouse_pos.z = 0; //The distance between the camera and object
	object_pos = Camera.main.WorldToScreenPoint(transform.position);
	mouse_pos.x = object_pos.x - mouse_pos.x;
	mouse_pos.y = object_pos.y - mouse_pos.y;

	mouseAngle = Mathf.Atan2(mouse_pos.y, mouse_pos.x) * Mathf.Rad2Deg;
	transform.rotation = Quaternion.Euler(Vector3(0, 0, mouseAngle));
}