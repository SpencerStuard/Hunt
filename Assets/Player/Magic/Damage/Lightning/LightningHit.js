var damage:float;
var multiplier:float;
var hit:boolean;
var particleSys:ParticleSystem;

function Start()
{
	//particleSys=GetComponent(ParticleSystem);
	damage=.5*multiplier;
	//particleSys.GetComponent(Renderer).sortingLayerName = "Effects";
	//InvokeRepeating("Pulse",.4,.4);
}

function Update()
{
	//Pulse();
}

/*function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Enemy"&&!hit)
	{
		//hit=true;
		col.gameObject.SendMessage ("TakeDamage", damage, SendMessageOptions.DontRequireReceiver);
		//col.gameObject.SendMessage("Electrocute",.4);
	}
}*/

function OnTriggerStay2D(col:Collider2D)
{
	if(col.gameObject.tag=="Enemy"&&!hit)
	{
		hit=true;
		col.gameObject.SendMessage("Electrocute",.2);
		col.gameObject.SendMessage ("TakeDamage", damage, SendMessageOptions.DontRequireReceiver);
		yield WaitForSeconds(.25);
		hit=false;
	}
}

//function Pulse()
//{
//		hit=false;
//}
