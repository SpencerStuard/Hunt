var special:boolean;

function OnTriggerEnter2D(col:Collider2D)
{
	if (col.gameObject.tag == ("Player"))
	{
		if(transform.parent!=null&&!special)
			GameController.player.transform.parent = this.transform.parent.parent;
		else if(!special)
			GameController.player.transform.parent = this.transform.parent;
		else if(special)
			GameController.player.transform.parent = this.transform;
	}
}

function OnTriggerExit2D()
{
	GameController.player.transform.eulerAngles.z=0;
	GameController.player.transform.parent = null;
}

function Update()
{

	if(CharController.rolling&&!CharController.onGround)
	{
		GameController.player.transform.parent = null;
	}
}