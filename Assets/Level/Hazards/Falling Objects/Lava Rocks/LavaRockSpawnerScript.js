var lavaRock:GameObject;
var spawned:boolean;
var respawnTimer:float;

function Start () 
{
	respawnTimer=Random.Range(10,20);
}

function Update ()
{
	if(spawned)
		Timer();
	if(!spawned)
	{
		spawned=true;
		var lavaRockClone=Instantiate(lavaRock,transform.position,Quaternion.identity);
	}
}

function Timer()
{
	if(respawnTimer>0)
		respawnTimer-=Time.deltaTime;
	if(respawnTimer<=0)
	{
		spawned=false;
		respawnTimer=Random.Range(10,20);
	}
	
}