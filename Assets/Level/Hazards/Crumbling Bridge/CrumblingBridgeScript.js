var mask:LayerMask;
var sounds:AudioClip[];
var sprites:Sprite[];
var crumble:boolean;
var rockCrumble:GameObject;
var spriteRenderer:SpriteRenderer;
var i:int;

function Start()
{
	i=0;
	spriteRenderer=GetComponent(SpriteRenderer);
	spriteRenderer.sprite=sprites[0];
}

function Update ()
{
    if(Physics2D.Linecast(Vector2(spriteRenderer.bounds.min.x,spriteRenderer.bounds.max.y+.05), Vector2(spriteRenderer.bounds.max.x,spriteRenderer.bounds.max.y+.05),mask))
		Crumble();
}

function Crumble()
{
	if(!crumble)
	{
		if(i<5)
		{
			i++;
			var randX:float=Random.Range(spriteRenderer.bounds.min.x,spriteRenderer.bounds.max.x);
			var randY:float=Random.Range(spriteRenderer.bounds.min.y,spriteRenderer.bounds.max.y);
			crumble=true;
			AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], GameController.player.transform.position, Options.sfxVolume);
			var rockCrumbleClone=Instantiate(rockCrumble,Vector2(randX,randY),Quaternion.identity);
			spriteRenderer.sprite=spriteRenderer.sprite=sprites[i];
			Destroy(rockCrumbleClone,.75);
			yield WaitForSeconds(1);
			crumble=false;
		}
		else
			Destroy(gameObject);
	}
}

