var spriteRenderer:SpriteRenderer;
var faceSprite:Sprite[];

var startColor:Color;
var endColor:Color;

var time:float;


function Awake ()
{
	spriteRenderer=GetComponent(SpriteRenderer);
}

function LateUpdate ()
{
	if(SnorkelScript.usingSnorkel)
		spriteRenderer.sprite=faceSprite[2];
	else if(!SnorkelScript.usingSnorkel&&BowScript.shootingBow&&GameController.playerController.grabTimer==0)
		spriteRenderer.sprite=faceSprite[1];
	else if(GameController.playerController.grabTimer>2)
		spriteRenderer.sprite=faceSprite[3];
}

function Update()
{
	if(GameController.playerController.grabTimer>1)
	{
		time+=Time.deltaTime;
		spriteRenderer.color = Color.Lerp(startColor, endColor, time);
	}
	else
	{
		spriteRenderer.color = Color.white;
		time=0;
	}
}