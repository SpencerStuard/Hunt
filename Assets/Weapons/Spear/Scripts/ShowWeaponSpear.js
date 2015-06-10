var target:Transform;
var weaponSelect:WeaponSelect;
var crosshair:Transform;
var right_hand:Transform;
//var newSpear:NewSpear;

var cam:Camera;
var rend:Renderer;

function Start ()
{
	cam=GetComponent(Camera).main;
	crosshair=GameObject.Find("Crosshair").transform;
	rend=GetComponent(Renderer);
}

function Update ()
{
	if(!StartMenuScript.inAMenu)
		EnableRenderer();
	MoveToRight();
}

function LateUpdate()
{
	if(!CharController.grabbingOn&&!CharController.rolling&&!NewSpear.spearMelee&&!HangGliderScript.usingGlider&&!Health.playerIsDead&&!StartMenuScript.inAMenu)//&&NewSpear.poleTimer==0)
		LookAtMouse();
	else
		transform.rotation.eulerAngles=right_hand.rotation.eulerAngles*GameController.player.transform.localScale.x;
}

function EnableRenderer()
{
	if((WeaponSelect.wepName=="Throwing Spear"&&WeaponSelect.currentAmmo!=0||WeaponSelect.wepName=="Stabbing Spear"&&!NewSpear.spearMelee||WeaponSelect.wepName=="Polevaulting Spear"&&!NewSpear.poleVaulting)&&!CharController.idling&&NewSpear.poleTimer==0&&!GameController.playerController.freezePlayer)
		rend.enabled=true;
	else
		rend.enabled=false;
}

function LookAtMouse()
{
	var crosshairScreenSpace : Vector3 = cam.WorldToScreenPoint (crosshair.position);
		
	mouse_pos = crosshairScreenSpace;
	mouse_pos.z = 0; //The distance between the camera and object
	object_pos = Camera.main.WorldToScreenPoint(target.position);
	mouse_pos.x = mouse_pos.x - object_pos.x;
	mouse_pos.y = mouse_pos.y - object_pos.y;

	
	mouseAngle = Mathf.Atan2(mouse_pos.y, mouse_pos.x) * GameController.player.transform.localScale.x * Mathf.Rad2Deg;
	transform.rotation = Quaternion.Euler(Vector3(0, 0, mouseAngle));
	transform.localScale.x=GameController.player.transform.localScale.x;
}

function MoveToRight()
{
	if(CharController.grabbingOn)
	{
		transform.position.x=right_hand.position.x;
		transform.position.y=right_hand.position.y;
		transform.localScale.x=GameController.player.transform.localScale.x;
		transform.localEulerAngles.z=200;
		rend.sortingOrder=7;
	}
	else
	{
		transform.position.x=target.position.x;
		transform.position.y=target.position.y;
		rend.sortingOrder=3;
	}
}
