//animation
var anim:Animator;
var enemyController:RaptorController;

var rangeToPlayer:float;
var lastJumpAttack:float;
var jumpingAttack:boolean;

var randomAttack:float=5;
var inAir:boolean;

//var rb2D:Rigidbody2D;

function Start () 
{
//	rb2d = GetComponent(Rigidbody2D);
	lastJumpAttack=0;
}

function Update()
{
	Range();
	
	Animations();
	if(!enemyController.frozen||!enemyController.stunned)
		JumpingAttack();
		
	if(enemyController.frozen||enemyController.electrocuted)
		anim.enabled=false;
	else
		anim.enabled=true;
	
	if(enemyController.electrocuted)
		enemyController.rb2D.isKinematic=true;
	else
		enemyController.rb2D.isKinematic=false;
	
	if(enemyController.feared)
		lastJumpAttack=0;
		
	if(!enemyController.moving&&jumpingAttack)
		jumpingAttack=false;
	
}

function Range()
{
	rangeToPlayer = Vector2.Distance(GameController.player.transform.position, transform.position);
}

function Animations()
{
	anim.SetBool("moving",enemyController.moving);
	anim.SetBool("dead",enemyController.dead);
	anim.SetBool("Stunned", enemyController.stunned);
	anim.SetFloat("rangeToPlayer",rangeToPlayer);
	anim.SetBool("jumpingAttack",jumpingAttack);
	anim.SetBool("inAir",inAir);
}

function JumpingAttack()
{
	lastJumpAttack+=Time.deltaTime;
	if(rangeToPlayer<6&&lastJumpAttack>randomAttack&&enemyController.inLOS&&rangeToPlayer>1.5)
	{
		enemyController.rDistance=.25;
		enemyController.rb2D.velocity.x=0;
		jumpingAttack=true;
		//yield WaitForSeconds(.55);
		lastJumpAttack=0;
		randomAttack = Random.Range(5,15);
	}
}

function JumpForce()
{
	inAir=true;
	jumpingAttack=false;
	enemyController.rb2D.gravityScale=5;
	enemyController.rb2D.velocity.y+=8;
	enemyController.rb2D.velocity.x=10*-transform.localScale.x;
	enemyController.rDistance=3.5;
	yield WaitForSeconds(.35);
	inAir=false;
	enemyController.rb2D.gravityScale=1;
}

function JumpForceBush()
{
		//jumpingAttack=false;
		inAir=true;
		enemyController.rb2D.velocity.y+=8;
		enemyController.rb2D.velocity.x=10*-transform.localScale.x;
		yield WaitForSeconds(.35);
		inAir=false;
		lastJumpAttack=0;
}