var dartGuy:GameObject;
var spawned:boolean;
var openBox:Sprite;
var spriteRenderer:SpriteRenderer;
var dartClone:GameObject;

function Start()
{
	spriteRenderer=GetComponent(SpriteRenderer);
}

function Update()
{
	if(Vector2.Distance(transform.position,GameController.player.transform.position)<1&&Input.GetButtonDown("Interact"))
	{
		var dartGuyClone=Instantiate(dartGuy,Vector2(transform.position.x,transform.position.y),Quaternion.identity);
		dartClone=dartGuyClone;
		//dartGuyClone.rigidbody2D.velocity.y=4;
		var dartScript = dartGuyClone.GetComponent(MonoBehaviour);
		dartScript.seenPlayer=true;
		Jump();
		//dartGuyClone.rigidbody2D.velocity.x=(6*dartGuyClone.transform.localScale.x);
		//dartGuyClone.rigidbody2D.AddForce(Vector2.up*400);
		//dartGuyClone.rigidbody2D.AddForce(Vector2.right*500);//*dartGuyClone.transform.localScale.x);
		spriteRenderer.sprite=openBox;
	}
}

function Jump()
{
	//dartClone.rigidbody2D.AddForce(Vector2.up*100);
	dartClone.GetComponent(Rigidbody2D).velocity.y=4;
	//yield WaitForSeconds(.2);
	yield WaitForEndOfFrame;
	dartClone.GetComponent(Rigidbody2D).velocity.x=(3*-dartClone.transform.localScale.x);
	//dartClone.rigidbody2D.AddForce(Vector2.right*200);//*dartGuyClone.transform.localScale.x);
}