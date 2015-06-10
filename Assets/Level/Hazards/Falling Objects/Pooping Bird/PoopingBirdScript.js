var turd:GameObject;
var randomNumber:int;
var spawned:boolean;
var respawnTimer:float;


var rb2D:Rigidbody2D;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	randomNumber=Random.Range(0,20);
	respawnTimer=Random.Range(0,8);
	if(randomNumber>10)
		transform.localScale.x=-1;
	else
		transform.localScale.x=1;
	spawned=true;
}

function Update ()
{
	rb2D.velocity.x=(Random.Range(2,5)*transform.localScale.x);
	if(Mathf.Abs(transform.position.x-GameController.player.transform.position.x)>35)
		Destroy(gameObject);
	
	if(spawned)
		Timer();
	if(!spawned)
	{
		spawned=true;
		var turdClone=Instantiate(turd,transform.position,Quaternion.identity);
		//lavaRockClone.rb2D.velocity = (0, -5);
	}
}

function Timer()
{
	if(respawnTimer>0)
		respawnTimer-=Time.deltaTime;
	if(respawnTimer<=0)
	{
		spawned=false;
		respawnTimer=Random.Range(3,10);
	}
	
}