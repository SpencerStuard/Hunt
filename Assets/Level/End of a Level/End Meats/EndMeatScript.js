var ran:float;
var ran2:int;
var startZ:float;
var rend:SpriteRenderer;

var rb2D:Rigidbody2D;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	transform.eulerAngles.z=Random.Range(0,360);
	startZ=transform.eulerAngles.z;
	Hide();
	ran=Random.Range(startZ,360);
	ran2=(Random.Range(-15,15));
}

function Update ()
{
	transform.localScale.y=transform.localScale.x;
	transform.localScale.x=Mathf.Lerp(transform.localScale.x,1,Time.deltaTime*4);
	transform.position=Vector3.Lerp(transform.position,Vector3(GameController.player.transform.position.x+6,ExitLevelScript.truckClone.transform.position.y+1.75,0),Time.deltaTime*1);
	rb2D.AddTorque(ran2);
	//transform.eulerAngles.z=Mathf.Lerp(transform.eulerAngles.z,ran,Time.deltaTime*1);
}

function Hide()
{
	yield WaitForSeconds(.2);
	rend.sortingLayerName="BG 1";
	yield WaitForSeconds(1.3);
	gameObject.SetActive(false);
}