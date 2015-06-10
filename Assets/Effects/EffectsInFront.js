var particleSys: ParticleSystem;
function Start () 
{
	particleSys = particleSys.GetComponent(ParticleSystem);
	particleSys.GetComponent(Renderer).sortingLayerName = "Effects";
}