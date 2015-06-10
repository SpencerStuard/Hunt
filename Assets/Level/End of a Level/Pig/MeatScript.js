var popUp:boolean;
var goToHand:boolean;
var startY:float;
var levelComplete:Texture2D;
var sr:SpriteRenderer;
var end2:boolean;
var rb2D:Rigidbody2D;

function Awake()
{
	sr=GetComponent(SpriteRenderer);
}

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	startY=transform.position.y;
}

function OnCollisionEnter2D(col:Collision2D)
{
	rb2D.isKinematic=true;
	yield WaitForSeconds(1);
	GameController.anim.SetFloat("hSpeed",0);
	GameController.playerController.freezePlayer=true;
	//GameController.anim.SetTrigger("EndGame1");
	GameController.playerController.endGame=true;
	yield WaitForSeconds(.5);
	popUp=true;
	yield WaitForSeconds(1.5);
	popUp=false;
	goToHand=true;
	yield WaitForSeconds(2.5);
	sr.enabled=false;
	GameController.playerController.freezePlayer=false;
	GameController.player.transform.localScale.x=1;
	end2=true;
	Camera.main.GetComponent(CameraFollow).enabled=false;
}

function Update()
{
	if(popUp)
		transform.position=Vector3.Lerp(transform.position,Vector3(transform.position.x,startY+2,0),Time.deltaTime*3);	
		
	if(goToHand)
		transform.position=Vector3.Lerp(transform.position,Vector3(GameController.player.transform.position.x,GameController.player.transform.position.y+1.25,0),Time.deltaTime*10);
		
	if(end2)
	{
		GameController.playerrb2D.velocity.x=2;
		GameController.anim.SetFloat("hSpeed",5);	
	}
}

function OnGUI()
{
	GUI.matrix = Matrix4x4.TRS (Vector3(0f, 0f, 0f), Quaternion.identity, Vector3 (ScreenSize.X, ScreenSize.Y, 1f));
	
	if(GameController.playerController.endGame)
		GUI.DrawTexture(Rect(0, 0, 1920, 1200), levelComplete);
}
