var layerNum:int;
var playerLayer:boolean;
var enemyLayer:boolean;
var particleSys:ParticleSystem;

function Start ()
{
	particleSys=GetComponent(ParticleSystem);		
	if(playerLayer)
		particleSys.GetComponent(Renderer).sortingLayerName = "Player";
	else if(enemyLayer)
		particleSys.GetComponent(Renderer).sortingLayerName = "Enemy";
	else
		particleSys.GetComponent(Renderer).sortingLayerName = "Effects";
	particleSys.GetComponent(Renderer).sortingOrder=layerNum;
}