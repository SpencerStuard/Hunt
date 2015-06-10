var spriteRend:SpriteRenderer;

function Start()
{
	spriteRend = GetComponent(SpriteRenderer);	
	spriteRend.sortingLayerName="Player";
}

function Update () 
{
	if(GameController.playerController.grabbingRope)
		spriteRend.sortingOrder=5;
	else
		spriteRend.sortingOrder=-5;
}