var particleSys:ParticleSystem;

function Start()
{
	//particleSys=GetComponent(ParticleSystem);
	//particleSys.GetComponent(Renderer).sortingLayerName = "Player";
}

function Update()
{
	if(!particleSys.IsAlive()) 
		Destroy(gameObject);
}