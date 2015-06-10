var particleSys:ParticleSystem;

function Start () 
{
	particleSys = GetComponent(ParticleSystem);
	particleSys.GetComponent(Renderer).sortingLayerName = "BG 2";
	particleSys.GetComponent(Renderer).sortingOrder=95;
}