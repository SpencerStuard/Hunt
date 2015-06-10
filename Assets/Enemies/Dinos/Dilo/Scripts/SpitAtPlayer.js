//mouse follow
private var mouse_pos:Vector3;
var target:Transform;
private var object_pos:Vector3;
private var mouseAngle:float;
var crosshair:Transform;

function Start()
{
	crosshair=GameController.player.transform;
}

function Update()
{
var crosshairScreenSpace : Vector3 = GetComponent(Camera).main.WorldToScreenPoint (crosshair.position);
		
	mouse_pos = crosshairScreenSpace;
	mouse_pos.z = 0; //The distance between the camera and object
	object_pos = Camera.main.WorldToScreenPoint(target.position);
	mouse_pos.x = mouse_pos.x - object_pos.x;
	mouse_pos.y = mouse_pos.y - object_pos.y;
	
	mouseAngle = Mathf.Atan2(mouse_pos.y, mouse_pos.x) * Mathf.Rad2Deg;
	transform.rotation = Quaternion.Euler(Vector3(mouseAngle, 90, 0));
	//transform.localScale.x=GameController.player.transform.localScale.x;
}