var particleSys:ParticleSystem;

function Start()
{
	//particleSys=GetComponent(ParticleSystem);
	//particleSys.GetComponent(Renderer).sortingLayerName = "Effects";
}

function Update()
{
	if(!particleSys.IsAlive()) 
		Destroy(gameObject);
}