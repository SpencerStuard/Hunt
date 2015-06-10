var spriteRenderer:SpriteRenderer;
var bodySprite:Sprite[];

function Start ()
{
	spriteRenderer=GetComponent(SpriteRenderer);
}

function LateUpdate ()
{
	if(!GameController.playerController.endGame)
	{
		if(GameController.playerController.usingChute)
			spriteRenderer.sprite=bodySprite[1];
		else
			spriteRenderer.sprite=bodySprite[0];
	}
}