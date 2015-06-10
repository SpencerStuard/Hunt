import System.Collections.Generic;

var enemiesNear = new List.<Transform>();

var startSpeed:float;
var anim:Animator;
var mask:LayerMask;
var inRange:boolean;
var inLOS:boolean;
var moving:boolean;
var feared:boolean;
var jumped:boolean;
var latchedOn:boolean;
var onGround:boolean;
var damage:float;
var hit:boolean;
var explosion:GameObject;
var fleeing:boolean;
var attacking:boolean;
var modSpeed:float;
var isCubed:boolean;
var enemyHP:float;

//facing player
var facingPlayer:boolean;
var seenPlayer:boolean;
var nearbyEnemies:NearbyEnemies;

var alert:GameObject;
var alerted:boolean;

//Slope Adjust
var slopeAngle2:float;
var surfaceNormal:Vector3;

var alreadyLatched:boolean;

var rb2D:Rigidbody2D;


function Start ()
{
	rb2D = GetComponent(Rigidbody2D);
	nearbyEnemies = GameController.gameController.GetComponent(NearbyEnemies);
	modSpeed=1;
	damage=-.5;
	anim = GetComponent(Animator);
	startSpeed = Random.Range(.75,1.5);
	if(startSpeed>1)
		transform.localScale.x=-1;
	else
		transform.localScale.x=1;
}

function Update ()
{
if(Time.timeScale > 0)
{
	LineOfSight();
	Range();
	FacePlayer();
	anim.SetBool("moving",moving);
	if(!latchedOn&&facingPlayer)
		LatchOn();
	if(latchedOn)
	{
		ShakeOff();
		Damage();
	}
	CompyPack();
	if(transform.eulerAngles.z!=0)
		transform.eulerAngles.z=0;
	transform.localScale.y=.75;
	
	SlopeAdjust();
}
}

function SeenPlayer()
{
	seenPlayer=true;
	nearbyEnemies.AlertEnemiesNearBy();
}

function Alerted()
{
	if(!alerted)
	{
		alerted=true;
		var alertClone=Instantiate(alert,Vector2(transform.position.x,transform.position.y+.5),Quaternion.identity);
		alertClone.transform.parent=transform;
		Destroy(alertClone,.5);
	}
}

function LineOfSight()
{
	if(seenPlayer||(transform.localScale.x==1&&(transform.position.x>GameController.player.transform.position.x))||transform.localScale.x==-1&&(transform.position.x<GameController.player.transform.position.x))
		facingPlayer=true;
	else
		facingPlayer=false;

	//Debug.DrawLine(transform.position, GameController.player.transform.position, Color.black);
    if ((!Physics2D.Linecast (transform.position, GameController.player.transform.position, mask)&&!CharController.inCover&&inRange&&facingPlayer)||feared)
    {
		if(!seenPlayer)
			SeenPlayer();
		inLOS=true;
		rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,(-4),(4));
		rb2D.AddForce(Vector2.right * -transform.localScale.x * 50 * startSpeed); //enable to move
	}
    else
		inLOS=false;
        
    if(inLOS)
    	moving=true;
    else
    	moving=false;
    //Debug.DrawLine(transform.position,Vector2(transform.position.x,transform.position.y-.3), Color.black);
    if (Physics2D.Linecast (transform.position, Vector2(transform.position.x,transform.position.y-.3), mask)&&!latchedOn)
    	onGround=true;
    else
    	onGround=false;
    
    
    anim.SetBool("onGround",onGround);
    anim.SetBool("latchedOn",latchedOn);
}


function Range()
{
	if(Vector2.Distance(GameController.player.transform.position,transform.position)<8)
		inRange=true;
	else
		inRange=false;
}


function FacePlayer()
{
	if(!feared&&!fleeing&&attacking&&seenPlayer)
	{
		if(GameController.player.transform.position.x-1 > transform.position.x&&inLOS)
			transform.localScale.x = -1;
		else if(GameController.player.transform.position.x+1 < transform.position.x&&inLOS)
			transform.localScale.x = 1;
	}
	else if(seenPlayer&&(feared||fleeing))
	{
		if(GameController.player.transform.position.x-2 > transform.position.x)
			transform.localScale.x = 1;
		else if(GameController.player.transform.position.x+2 < transform.position.x)
			transform.localScale.x = -1;
	}
}

function LatchOn()
{
	if(!jumped&&Vector2.Distance(transform.position,GameController.player.transform.position)<2)
	{
		anim.SetTrigger("jump");
		rb2D.velocity.y+=(Random.Range(1,5));
		jumped=true;
	}
}

function ShakeOff()
{
	if(CharController.rolling||GameController.playerController.swimming)
	{
		latchedOn=false;
		rb2D.isKinematic=false;
		anim.SetTrigger("unlatch");
		var children = gameObject.GetComponentsInChildren(Renderer);
		for (var child in children)
			child.GetComponent(Renderer).sortingLayerName="Enemy";
		transform.parent=null;
		transform.position.y+=1;
		yield WaitForSeconds(.5);
		jumped=false;
	}
		
}

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag==("Player")&&jumped&&!latchedOn)
	{
//		Debug.Log("latch1");
		latchedOn=true;
		var children = gameObject.GetComponentsInChildren(Renderer);
		for (var child in children)
			child.GetComponent(Renderer).sortingLayerName="Player";
		transform.position.y=(GameController.player.transform.position.y+Random.Range(-.5,.5));
		if(GameController.player.transform.position.x>transform.position.x)
			transform.localScale.x=-.75;
		else
			transform.localScale.x=.75;
		transform.parent=col.transform;
		rb2D.isKinematic=true;
	}
/*	if(col.gameObject.tag==("Player")&&!jumped&&!latchedOn)
	{
		latchedOn=true;
		Debug.Log("latch2");
		transform.position.y=(GameController.player.transform.position.y+Random.Range(-.5,.5));
		if(GameController.player.transform.position.x>transform.position.x)
			transform.localScale.x=-.75;
		else
			transform.localScale.x=.75;
		transform.parent=col.transform;	
	}*/
	if(col.gameObject.tag==("Projectile"))
		TakeDamage();
}

function Damage()
{
	if(!hit)
	{
		hit=true;
		GameController.health.modifyHealth(damage);
		//GameController.playerController.SendTakeDamage();
		yield WaitForSeconds(1);
		hit=false;
	}
}

function TakeDamage()
{
	if(!seenPlayer)
			SeenPlayer();
	if(BloodLustScript.usingBloodLust)
			EnemiesKilled.enemiesKilled+=.5;
	var explosionClone = Instantiate(explosion, transform.position, Quaternion.identity);
	GameController.stats.compysKilled++;
	gameObject.SetActive(false);
	//Destroy(gameObject);
}

function CompyPack()
{
	if(nearbyEnemies.enemiesNear.Count>3)
	{	
		attacking=true;
		fleeing=false;
	}
	else
	{
		fleeing=true;
		attacking=false;
	}

}

function SlopeAdjust()
{
	var hit: RaycastHit2D = Physics2D.Raycast(transform.position, -Vector2.up,2,mask);
	if(hit)
	{
		slopeAngle2 = Vector2.Angle(hit.normal,hit.transform.up);
		if(onGround)
			surfaceNormal=Vector3.Lerp(surfaceNormal,hit.normal,Time.deltaTime*10);
		else
			surfaceNormal=Vector3(0,0,0);
	}
	else
	{
		slopeAngle2=0;
		surfaceNormal=Vector3(0,0,0);	
	}
}

function FixedUpdate()
{
	if(slopeAngle2>10)
		rb2D.AddForce(-surfaceNormal*15);
}


function Stun(x:float)
{
	TakeDamage();
}

function Electrocute()
{

}

function IsCubed()
{

}

function Fear()
{
	feared=true;
	yield WaitForSeconds(6);
	feared=false;
}

function BlinkOnDamage()
{

}

function KnockBack()
{

}

function LostPlayer()
{
	seenPlayer=false;
	alerted=false;
}