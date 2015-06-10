var inLOS:boolean=false;
var mask : LayerMask;

var attacking:boolean=false;
var enemies:Transform;

var outOfRange:boolean;

var nearby:NearbyEnemies;
var relativePosPlayer:Vector2;
var relativePosEnemy:Vector2;
var anim:Animator;

var rb2D:Rigidbody2D;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	nearby=GameObject.Find("GameController").GetComponent(NearbyEnemies);
}

function Update ()
{
	relativePosPlayer=GameController.player.transform.position - transform.position;

	Animations();
	FacePlayerDirection();
	FindEnemies();
	if(enemies!=null)
	{	
		//LineOfSight();
		PteroRange();
		if(/*inLOS&&*/!outOfRange)
			Attack();
		relativePosEnemy=enemies.position - transform.position;
	}
	else
	{
		inLOS=false;
		attacking=false;
	}
	
	if((/*!inLOS||*/outOfRange)||nearby.enemiesNear.Count==0)
		HoverAbovePlayer();
}

function Animations()
{
	anim.SetFloat("vSpeed",rb2D.velocity.y);
	anim.SetFloat("hSpeed",rb2D.velocity.x);
	anim.SetBool("attacking",attacking);
	anim.SetFloat("DistanceToEnemy",Mathf.Abs(relativePosEnemy.x));
}

function FacePlayerDirection()
{
	if(!attacking)
		transform.localScale.x=-GameController.player.transform.localScale.x;
	else if(rb2D.velocity.x>0)
		transform.localScale.x=-1;
	else if (rb2D.velocity.x<0)
		transform.localScale.x=1;
}

function LineOfSight()
{
	Debug.DrawLine(transform.position, enemies.position, Color.black);
    if (!Physics2D.Linecast (transform.position, enemies.position, mask))
    {
		inLOS=true;
    }
    else 
    {
        inLOS=false;
    }
}

function PteroRange()
{
	if(Vector2.Distance(transform.position,enemies.position)>12)
		outOfRange=true;
	else
		outOfRange=false;

}

function Attack()
{	
	attacking=true;
	if(Mathf.Abs(relativePosEnemy.x)<4)
	{
		rb2D.velocity.y=Mathf.Clamp(rb2D.velocity.y,-3,12);
		rb2D.AddForce(20 * relativePosEnemy);
		rb2D.AddForce(60 * Vector2.up);
	}
	else if(Mathf.Abs(relativePosEnemy.x)>4)
	{
		rb2D.velocity.y=Mathf.Clamp(rb2D.velocity.y,-6,15);
		rb2D.AddForce(20 * relativePosEnemy);
		rb2D.AddForce(-12 * Vector2.up);
	}
}

function FindEnemies()
{
	if(nearby.enemiesNear.Count>0)
		enemies=nearby.enemiesNear[0];
	//else
	//	enemies==null;
}

function HoverAbovePlayer()
{
	attacking=false;
	rb2D.velocity.x=0;
	rb2D.velocity.y=0;
	iTween.MoveUpdate(gameObject,iTween.Hash("x", GameController.player.transform.position.x, "speed", 14));
	iTween.MoveUpdate(gameObject,iTween.Hash("y", GameController.player.transform.position.y+2, "speed", 14));
}