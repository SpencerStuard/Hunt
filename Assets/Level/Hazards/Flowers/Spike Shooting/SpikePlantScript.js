/*
var spike:GameObject;
var attacking:boolean;
var popped:boolean;
var i:int;
var maxShoot:int;

function Start ()
{
	maxShoot=Random.Range(4,8);
}

function Update ()
{
	if(Vector2.Distance(transform.position,GameController.player.transform.position)<2&&i<maxShoot)
		PopUp();
	if(attacking&&i<maxShoot)
		SpinAndShoot();
	if(i>=maxShoot&&popped)
		PopDown();
	if(Vector2.Distance(transform.position,GameController.player.transform.position)>10&&i>=maxShoot)
		i=0;
}

function PopUp()
{
	if(!popped)
	{
		//rigidbody2D.isKinematic=false;
		popped=true;
		rigidbody2D.velocity.y=7;
		yield WaitForSeconds(.3);
		rigidbody2D.velocity.y=0;
		rigidbody2D.isKinematic=true;
		attacking=true;
		//SpinAndShoot();
	}
}

function PopDown()
{
	popped=false;
	attacking=false;
	rigidbody2D.isKinematic=false;
	//rigidbody2D.velocity.y=-7;
	//yield WaitForSeconds(.3);
	//rigidbody2D.velocity.y=0;
	//rigidbody2D.isKinematic=true;
	//SpinAndShoot();
}

function SpinAndShoot()
{
	attacking=false;
	var spikeClone = Instantiate (spike, transform.position, Quaternion.identity);
	spikeClone.rigidbody2D.velocity = (Vector2.up * 10);
	var spikeClone2 = Instantiate (spike, transform.position, Quaternion.Euler(0,0,180));
	spikeClone2.rigidbody2D.velocity = (-Vector2.up * 10);
	var spikeClone3 = Instantiate (spike, transform.position, Quaternion.Euler(0,0,270));
	spikeClone3.rigidbody2D.velocity = (Vector2.right * 10);
	var spikeClone4 = Instantiate (spike, transform.position, Quaternion.Euler(0,0,90));
	spikeClone4.rigidbody2D.velocity = (-Vector2.right * 10);
	yield WaitForSeconds(.6);
	var spikeClone5 = Instantiate (spike, transform.position, Quaternion.identity);
	spikeClone5.rigidbody2D.velocity = (Vector2(1,1).normalized * 10);
	var spikeClone6 = Instantiate (spike, transform.position, Quaternion.identity);
	spikeClone6.rigidbody2D.velocity = (Vector2(1,-1).normalized * 10);
	var spikeClone7 = Instantiate (spike, transform.position, Quaternion.identity);
	spikeClone7.rigidbody2D.velocity = (Vector2(-1,1).normalized * 10);
	var spikeClone8 = Instantiate (spike, transform.position, Quaternion.identity);
	spikeClone8.rigidbody2D.velocity = (Vector2(-1,-1).normalized * 10);
	yield WaitForSeconds(.6);
	attacking=true;
	i++;
}
*/