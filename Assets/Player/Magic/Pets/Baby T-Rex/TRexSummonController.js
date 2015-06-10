var attacking:boolean;
var nearby:NearbyEnemies;
var anim:Animator;
var idleTime:float;


var rb2D:Rigidbody2D;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	attacking=false;
	nearby=GameObject.Find("GameController").GetComponent(NearbyEnemies);
	anim=GetComponent(Animator);

}

function Update()
{
	FacePlayer();
	Move();
	Attack();
	anim.SetFloat("hSpeed",Mathf.Abs(rb2D.velocity.x));
	if(rb2D.velocity.x==0)
		idleTime+=Time.deltaTime;
	else
		idleTime=0;
	if(idleTime>10)
		anim.SetBool("idle",true);
	else
		anim.SetBool("idle",false);
}

function FacePlayer()
{
	transform.localScale.y = Mathf.Abs(transform.localScale.x);
	if(!attacking)
	{
		if(GameController.player.transform.position.x-2 > transform.position.x)
			transform.localScale.x = -.3;
		else if(GameController.player.transform.position.x+2 < transform.position.x)
			transform.localScale.x = .3;
	}
	else
	{
		if(nearby.enemiesNear[0].transform.position.x-2 > transform.position.x)
			transform.localScale.x = -1;
		if(nearby.enemiesNear[0].transform.position.x+2 < transform.position.x)
			transform.localScale.x = 1;
	}
}

function Move()
{
	if(Vector2.Distance(transform.position,GameController.player.transform.position)>3.5)
		rb2D.velocity.x=5.5*-transform.localScale.x;
}

function Attack()
{
	if(nearby.enemiesNear.Count>0)
		attacking=true;
}