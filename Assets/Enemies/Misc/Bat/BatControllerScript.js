//Animations
var anim:Animator;
var flapping:boolean;
var hanging:boolean;
var gliding:boolean;

//Attack
var attack:boolean;
var xSpeed:float;
var ySpeed:float;

//Line of Sight and Range
var mask:LayerMask;
var inRange:boolean;
var inLOS:boolean;

//Where to attack
var yPos:float;
var explosion:GameObject;

//Misc
var seenPlayer:boolean;

//References
var rb2D:Rigidbody2D;

//Death Pit Fix
var enemyHP:float;

function Start ()
{
	//rb2D = GetComponent(Rigidbody2D);
	//anim=GetComponent(Animator);
	hanging=true;
	flapping=false;
	gliding=false;
	attack=false;
	
	xSpeed=Random.Range(3.5,6.5);
	ySpeed=Random.Range(-4.5,-2.25);
}

function Update ()
{
	if(Time.timeScale > 0)
	{
		//Set animations
		anim.SetBool("flapping",flapping);
		anim.SetBool("hanging",hanging);
		anim.SetBool("gliding",gliding);
		
		//Face the Player
		if(inLOS&&!attack)
			FacePlayer();
		
		//Distance Check to Player
		if(Vector2.Distance(transform.position,GameController.player.transform.position)<8&&inLOS)
		{
			inRange=true;
			hanging=false;
			flapping=true;
			if(!attack)
			{
				rb2D.isKinematic=false;
				attack=true;
				yPos=GameController.player.transform.position.y+(Random.Range(-1.5,1.5));	
			}
		}
		else
			inRange=false;
		
		//Line of Sight
		if (!Physics2D.Linecast (transform.position, GameController.player.transform.position, mask)&&!CharController.inCover)
			inLOS=true;
		else
			inLOS=false;
	}
}

function FacePlayer()
{
	if(GameController.player.transform.position.x > transform.position.x)
			transform.localScale.x = -1;
		else
			transform.localScale.x = 1;
}

function FixedUpdate()
{
	if(attack)
	{
		if(yPos<transform.position.y)
			rb2D.velocity.y=ySpeed;
		else
			rb2D.velocity.y=0;
		rb2D.velocity.x=xSpeed*-transform.localScale.x;
	}
}

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player")
	{
		GameController.health.modifyHealth(-2.5);
		GameController.playerController.SendTakeDamage();
	}
}

function TakeDamage()
{
	if(BloodLustScript.usingBloodLust)
			EnemiesKilled.enemiesKilled+=.5;
	var explosionClone = Instantiate(explosion, transform.position, Quaternion.identity);
	GameController.stats.batsKilled++;
	gameObject.SetActive(false);
}

function Alerted()
{

}