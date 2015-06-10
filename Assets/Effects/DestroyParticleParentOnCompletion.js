//var particleSys:ParticleSystem;

function Start()
{
	//particleSys=GetComponent(ParticleSystem);
	//if(particleSys!=null)
		//particleSys.GetComponent(Renderer).sortingLayerName = "Effects";
}

function Update()
{
	if(transform.childCount == 0)
		Destroy(gameObject);
}