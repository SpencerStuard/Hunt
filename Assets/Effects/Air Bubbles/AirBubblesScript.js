var particleSys:ParticleSystem;
var hit:boolean;

function Start ()
{
	//particleSys=GetComponent(ParticleSystem);
}

function Update ()
{
	if(GameController.playerController.swimming&&SnorkelScript.usingSnorkel)
		particleSys.enableEmission= true;
	else
		particleSys.enableEmission= false;
}