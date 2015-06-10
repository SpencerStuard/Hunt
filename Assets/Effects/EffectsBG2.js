var particleSys: ParticleSystem;

function Start () 
{
	particleSys = GetComponent(ParticleSystem);
	particleSys.GetComponent(Renderer).sortingLayerName = "BG 3";
	particleSys.GetComponent(Renderer).sortingOrder=95;
}