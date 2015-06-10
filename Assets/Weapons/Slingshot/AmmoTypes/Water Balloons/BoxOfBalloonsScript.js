var spriteRenderer:SpriteRenderer;
var sprite:Sprite[];
var used:boolean;

function Start ()
{
	spriteRenderer=GetComponent(SpriteRenderer);
	spriteRenderer.sprite=sprite[0];
}


function Update () 
{
	
	if(Vector2.Distance(transform.position,GameController.player.transform.position)<.5&&Input.GetButtonDown("Interact"))
		UnlockBalloon();
}

function UnlockBalloon()
{
	if(!GameController.savedItems.ammoUnlocked[4])
	{
		GameController.savedItems.ammoUnlocked[4]=true;
		GameController.anim.SetTrigger("PissBalloonUnlock");
		GameController.playerController.freezePlayer=true;
		yield WaitForSeconds(6);
		GameController.playerController.freezePlayer=false;
		spriteRenderer.sprite=sprite[1];
		SlingScript.balloonCount=5;
	}
	else if(!used)
	{
		used=true;
		SlingScript.balloonCount=5;
		spriteRenderer.sprite=sprite[1];
	}
}