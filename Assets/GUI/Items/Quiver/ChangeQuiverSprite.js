var arrowSprite:Sprite[];
var bowScript:BowScript;
var quiverSprite:SpriteRenderer;
var stomach:Transform;

function Start ()
{
	quiverSprite = GetComponent(SpriteRenderer);//.sprite = arrowSprite[0];
	quiverSprite.sprite = arrowSprite[0];
	if(Application.loadedLevel !=0)
			stomach = GameObject.FindGameObjectWithTag ("PlayerBody").transform;
}

function Update()
{
	if(Application.loadedLevel !=0)
	{
		transform.position.x=stomach.position.x-.12*(GameController.player.transform.localScale.x);
		transform.position.y=stomach.position.y+.07;
		transform.localScale.x=GameController.player.transform.localScale.x;
		transform.rotation.eulerAngles.z=stomach.rotation.eulerAngles.z*transform.localScale.x;
		

		if(QuiverScript.usingQuiver&&!GameController.playerController.freezePlayer)
			quiverSprite.enabled=true;
		else
			quiverSprite.enabled=false;

		if(WeaponSelect.wepName=="Bow")
		{
			if(bowScript.ammoCount>1)
				quiverSprite.sprite = arrowSprite[0];
			else if(bowScript.ammoCount==1)
				quiverSprite.sprite = arrowSprite[1];
			else if(bowScript.ammoCount==0)
				quiverSprite.sprite = arrowSprite[2];
		}
	}
}
