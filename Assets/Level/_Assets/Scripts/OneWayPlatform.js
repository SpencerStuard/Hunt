function Update()
{
	PassableLand();
}

function PassableLand()
{
	if(GameController.playerController.passableOverHead||GameController.playerrb2D.velocity.y>0&&GameController.player.transform.position.y<transform.position.y)
		gameObject.layer=bpLayerz.PASSABLELAND;
	
	//else if(GameController.player.transform.position.y>transform.position.y+.3)
	if(GameController.playerrb2D.velocity.y<0&&GameController.player.transform.position.y>transform.position.y+.3&&!GameController.playerController.crouching)	
		gameObject.layer=bpLayerz.LAND;
}
