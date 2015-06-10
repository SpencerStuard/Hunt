var hit:boolean;
var blinking:boolean;

var parentScript:MonoBehaviour;

var rend:Renderer;

function Start()
{
	parentScript=transform.parent.GetComponent(MonoBehaviour);
	rend=GetComponent(Renderer);
}

function Update()
{
	if(parentScript.modSpeed!=1)//&&!transform.parent.GetComponent(MonoBehaviour).stunned)
		TurnBlue();
	else if(parentScript.electrocuted&&!blinking)//&&transform.parent.GetComponent(MonoBehaviour).modSpeed==1)
		BlinkYellow();
	else if(!hit)
		Normal();
}

function TurnBlue()
{
	var iceColor:Color = Color32(0, 192, 247, 255);
	rend.material.color = iceColor;
}

function BlinkYellow()
{
	blinking=true;
	var elecYellow:Color = Color32(238, 210, 2, 255);
	rend.material.color = elecYellow;
	yield WaitForSeconds(.2);
	rend.material.color = elecYellow;
	blinking=false;
	/*for(var n = 0; n < 5; n++)
	{
		rend.material.color = Color.white;
		yield WaitForSeconds(.1);
		rend.material.color = Color.yellow;
 		yield WaitForSeconds(.1);
	}
	rend.material.color = Color.white;*/
}

function BlinkOnDamage()
{
	hit=true;
	//var chrisColor:Color = Color32(252, 236, 0, 200);
	//rend.material.color = Color.red;
	yield WaitForSeconds(.2);
	//rend.material.color = Color.white;
	hit = false;
}

function Normal()
{
	rend.material.color = Color.white;
}

/*function StartDie()
{
	StartCoroutine(Die());
}

function Die()
{
	Debug.Log("fdh");
	var dieColor:Color=Color32(255,255,255,0);
	rend.material.color = dieColor;
	yield WaitForSeconds(.3);
	for(var n = 0; n <4; n++)
	{
		rend.material.color = Color.white;
		yield WaitForSeconds(.3);
		rend.material.color = dieColor;
 		yield WaitForSeconds(.3);
	}
	rend.material.color = Color.white;
}*/
