var spd:float;
var up:boolean;
var down:boolean;

var onScreen:boolean; //determines what he's doing
var moveUp:boolean;
var backOff:boolean;

var pasFrontLeft:Vector2 = Vector2(-0.2523422, -0.05195618);
var pasBackLeft:Vector2 = Vector2(-1.062195, -0.00478363);
var pasBackRight:Vector2 = Vector2(-1.338943, -0.1624527);
var spawner:GameObject[];
var numPassengers:int;
var passengers:GameObject[];
var whichPassenger:int = 0;
var wait:int;
var spawned:boolean;
var round:int;

var truckRespawnDelay:float;
var ready:boolean;

var rb2D:Rigidbody2D;

var playedHorn:boolean;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	numPassengers=3;
	wait = 7;
	yield WaitForSeconds(75);
	moveUp=true;
	ready=true;
	gameObject.Find("Meat Truck").SendMessage("EnemyAlert",1);
	truckRespawnDelay = 30;
}

function Update ()
{
	//if(transform.position.x>-94)
	//	onScreen=true;
		
	if(transform.position.x>-86.5&&moveUp)
	{
		moveUp=false;
		if(!onScreen)
			spd=.7;
		onScreen=true;
	}		
	if(transform.position.x<-94)
	{
		backOff=false;
		onScreen=false;
		if(ready)
			truckRespawnDelay-=Time.deltaTime;
		spd=0;
	}
	
	if(moveUp)
	{
		if(spd<2)
		{
			spd=2;
			if(!playedHorn)
				Fabric.EventManager.Instance.PostEvent("SFX/Vehicles/Jeep/Honk", gameObject);
			truckRespawnDelay=30;
		}
		
	}
	if(backOff)
	{
		spd=-2;
		playedHorn=false;
	}

	if(onScreen&&!backOff)
	{
		if(spd>1.2)
		{
			up=false;
			down=true;
			spd*=-1;
		}
		else if(spd<.8)
		{
			down=false;
			up=true;
		}

		if(up)
			spd+=(Time.deltaTime/5);
		if(down)
			spd-=(Time.deltaTime/5);
	}
	
	if(onScreen && transform.position.x >-84.5 && !spawned)
		DropPassengers();
		
	if(numPassengers == 0)
		backOff=true;
	
	if(!onScreen && numPassengers == 0)
	{
		numPassengers=3;
		whichPassenger=0;
		passengers[0].SetActive(true);
		passengers[1].SetActive(true);
		passengers[2].SetActive(true);
		round++;
	}
	if(truckRespawnDelay<=0 && round<3)
	{
		gameObject.Find("Meat Truck").SendMessage("EnemyAlert",1);
		moveUp=true;
	}
	
}

function FixedUpdate()
{
	rb2D.velocity.x=spd;
}

function DropPassengers()
{
	if(numPassengers > 0)
	{
		spawned=true;
		numPassengers--;
		spawner[whichPassenger].SendMessage("SpawnEnemy");
		whichPassenger++;
		
		yield WaitForSeconds(10);
		spawned=false;
	}
}