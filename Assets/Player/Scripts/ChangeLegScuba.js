var spriteRenderer:SpriteRenderer;
var legSprite:Sprite[];

function Start ()
{
	spriteRenderer=GetComponent(SpriteRenderer);
}

function Update ()
{
	if(FlipperScript.usingFlippers)
			spriteRenderer.sprite=legSprite[0];
		
}