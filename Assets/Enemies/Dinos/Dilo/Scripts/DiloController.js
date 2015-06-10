var enemyHP:float;
var inLOS : boolean=false;
var mask : LayerMask;
var moving:boolean=false;
var maxHP:float;
var inRange:boolean;
var inSpitRange:boolean;
var losRange:float;

var startSpeed:float;

var gettingKnocked:boolean;
var spitVenom:boolean;

var tongue:Transform;
var venom:GameObject;

var fleeing:boolean;

var anim:Animator;

var nearbyEnemies:NearbyEnemies;

var screenPosition:Vector3;

//damage
var damage:int;

var spitTimer:float;

var fleeSpeed:float;

//hp bar
var background:Texture2D;
var foreground:Texture2D;
var frame:Texture2D;

//frozen
var modSpeed:float;
var frozen:boolean;
var isCubed:boolean;

//stun
var stunned:boolean;
var stunStar:GameObject;
var spawnedStunStar:boolean;
var stunStarLoc:Transform;
var stunProtect:float;
var stunTime:float;

//fear
var feared:boolean;

//death
var dead:boolean;
var deathbloodl:GameObject;
var deathbloodu:GameObject;
var deathbloodr:GameObject;

//Lightning
var electrocuted:boolean;

//hamstring
var hamSpeed:float;

//facing player
var facingPlayer:boolean;
var seenPlayer:boolean;

var alert:GameObject;
var alerted:boolean;

//Slope Adjust
var slopeAngle2:float;
var surfaceNormal:Vector3;
var onGround:boolean;

//Meat Drops
var meats:GameObject[];

var rb2D:Rigidbody2D;

function Start()
{
	rb2d = GetComponent(Rigidbody2D);
	nearbyEnemies = GameController.gameController.GetComponent(NearbyEnemies);
	damage = 5;
	maxHP=20;
	enemyHP=maxHP;
	startSpeed = Random.Range(.8,1.2);
	/*if(startSpeed>1)
		transform.localScale.x=-1;
	else
		transform.localScale.x=1;*/
	modSpeed=1;
	hamSpeed=1;
	frozen=false;
	stunned=false;
	spawnedStunStar=false;
}

function LateUpdate()
{
	HPGui();
}


function Update()
{
if(Time.timeScale > 0)
{
	if(!frozen&&!stunned&&!dead)
	{	
		FacePlayer();
		LineOfSight();
		Move();
	}
	Kill();
//	HPGui();
	NearEnough();
	DamageNumbers();
	SpitVenom();
	//if(modSpeed<1)
		Frozen();
	
	if(rb2D.velocity.x==0)
		moving=false;
	else
		moving=true;	
	
	anim.SetBool("dead",dead);
	anim.SetBool("moving", moving);
	anim.SetBool("Fleeing", fleeing);
	anim.SetBool("Stunned", stunned);
	anim.SetBool("spitVenom", spitVenom);
	anim.SetFloat("speed",rb2D.velocity.x*-transform.localScale.x);
	
	barDisplay = enemyHP;
	
	if(!stunned)
		stunProtect+=Time.deltaTime;
	else
		stunProtect=0;
	
	if(stunTime>0)
	{
		stunTime-=Time.deltaTime;
		stunned=true;
	}
	else
		stunned=false;
		
	SlopeAdjust();
	
	if(enemyHP<0)
		enemyHP=0;
}
}


function TakeDamage(damage:float)
{
	if(!frozen)
	{
		if(!seenPlayer)
			SeenPlayer();
		if(enemyHP>0)
			enemyHP-=damage;
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
		var alertClone=Instantiate(alert,Vector2(stunStarLoc.transform.position.x,stunStarLoc.transform.position.y+1),Quaternion.identity);
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
    if (!Physics2D.Linecast (transform.position, GameController.player.transform.position, mask)&&!CharController.inCover&&facingPlayer&&inRange)
    {
        if(!seenPlayer)
			SeenPlayer();
		inLOS=true;
	}
	else	
		   inLOS=false;
    	
    if(enemyHP<10||feared)
    {
    	fleeing=true;
    	fleeSpeed=2.5*modSpeed*hamSpeed;
    }
    else
    {
    	fleeing=false;
    	fleeSpeed=1*modSpeed*hamSpeed;
    }
    
	if (Physics2D.Linecast (transform.position, Vector2(transform.position.x,transform.position.y-1), mask))
    	onGround=true;
    else
    	onGround=false;
}

function Move()
{
	if(inLOS&&inRange&&!spitVenom||feared)
	{
		rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,-fleeSpeed,fleeSpeed);
		
		if(!fleeing)
			{
				if(transform.localScale.x!=GameController.player.transform.localScale.x&&(Vector2.Distance(GameController.player.transform.position,transform.position)>4))
						rb2D.AddForce(Vector2.right * -transform.localScale.x * 50 * startSpeed); //runs at you with back turned
				else if(transform.localScale.x!=GameController.player.transform.localScale.x&&(Vector2.Distance(GameController.player.transform.position,transform.position)<2))
						rb2D.AddForce(Vector2.right * transform.localScale.x * 35 * startSpeed); //backpedals quickly if you're too close and yer back is turned
				else if(inSpitRange&&transform.localScale.x==GameController.player.transform.localScale.x)
					rb2D.AddForce(Vector2.right * transform.localScale.x * 20 * startSpeed); //backpedals slowly if facing it
			}
		else
			rb2D.AddForce(Vector2.right * -transform.localScale.x * 50 * startSpeed); //flee
			
			
    }
    else 
    {
        if(!gettingKnocked)
    	    rb2D.velocity=Vector2(0,rb2D.velocity.y);
    }
}

function ModSpeed(x:float)
{
	modSpeed=x;
	yield WaitForSeconds(13);
	modSpeed=1;
}

function Hamstring()
{
	hamSpeed=.5;
	yield WaitForSeconds(3);
	hamSpeed=1;
}


function FacePlayer()
{
	if(seenPlayer)
	{
		if(!fleeing||spitVenom)
		{
			if(GameController.player.transform.position.x-1 > transform.position.x&&inLOS)
				transform.localScale.x = -1;
			else if(GameController.player.transform.position.x < transform.position.x&&inLOS)
				transform.localScale.x = 1;
		}
		else if(fleeing)
		{
			if(GameController.player.transform.position.x-1 > transform.position.x&&inLOS)
				transform.localScale.x = 1;
			else if(GameController.player.transform.position.x < transform.position.x&&inLOS)
				transform.localScale.x = -1;
		}
	}
}


function Kill()
{
	if(enemyHP==0)
	{
		nearbyEnemies.enemiesNear.Remove(gameObject.transform);
		anim.SetTrigger("Death1");
	
		if(!dead)
		{
			dead=true;
			var meatClone=Instantiate(meats[Random.Range(0,meats.length)],transform.position,Quaternion.identity);
			//var deathBloodL=Instantiate(deathbloodl,transform.position,deathbloodl.transform.rotation);
			//deathBloodL.SendMessage("This",this.transform);
			var deathBloodU=Instantiate(deathbloodu,transform.position,deathbloodu.transform.rotation);
//			deathBloodU.SendMessage("This",this.transform);
			//var deathBloodR=Instantiate(deathbloodr,transform.position,deathbloodr.transform.rotation);
			//deathBloodR.SendMessage("This",this.transform);
			GameController.stats.dilosKilled++;
			if(BloodLustScript.usingBloodLust)
				EnemiesKilled.enemiesKilled++;
		}
		yield WaitForSeconds(7.5);
		if(GameObject.Find("spear(Clone)") != null)		//Finds if the spear is inside of this enemy.
			GameObject.Find("spear(Clone)").transform.parent=null; //Unparent it so it falls to the ground to be picked up.
		gameObject.SetActive(false);
		//Destroy(gameObject);
	}
}

function HPGui()
{
	screenPosition = Camera.main.WorldToScreenPoint(transform.position);
	screenPosition.y = Screen.height - screenPosition.y; //adjusts the bar above the enemy a bit
}

function OnGUI()
{
	if(Options.hpBars&&!dead)
	{
            GUI.DrawTexture(new Rect(screenPosition.x, screenPosition.y-(195*ScreenSize.Y), 100*ScreenSize.X, 20*ScreenSize.Y), background, ScaleMode.StretchToFill);
            GUI.DrawTexture(new Rect(screenPosition.x, screenPosition.y-(195*ScreenSize.Y), 100*(enemyHP/maxHP)*ScreenSize.X, 20*ScreenSize.Y), foreground, ScaleMode.StretchToFill);
            GUI.DrawTexture(new Rect(screenPosition.x, screenPosition.y-(195*ScreenSize.Y), 103*ScreenSize.X, 23*ScreenSize.Y), frame, ScaleMode.StretchToFill);
    }
}




function NearEnough()
{
	if(Vector2.Distance(GameController.player.transform.position,transform.position)<losRange)
		inRange=true;
	else
		inRange=false;
		
	if(Vector2.Distance(GameController.player.transform.position,transform.position)<7)
		inSpitRange=true;
	else
		inSpitRange=false;
}

function KnockBack(knockForce:Vector2)
{
	//rb2D.AddForce(Vector2.right * transform.localScale.x * (knockForce*50));
	rb2D.velocity += knockForce;
	//rb2D.AddForce(knockForce);
	gettingKnocked=true;
	yield WaitForSeconds(.25);
	gettingKnocked=false;
	rb2D.velocity.x=0;
}

function MeleeKnockBack(knockForce:Vector2)
{
	rb2D.velocity += knockForce;
}

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="PushableCrate"&&moving)
		col.gameObject.SendMessage("Explode");
}

function DamageNumbers()
{
		//damage=15;
}

function SpitVenom()
{
	if(inLOS&&!spitVenom&&!feared)//inSpitRange
		spitTimer+=Time.deltaTime;
	else
		spitTimer=0;
		
	if(spitTimer>5&&inSpitRange)
	{
		spitVenom=true;
		yield WaitForSeconds(2.25);
		spitVenom=false;
	}	
}

function FireVenom()
{
	var venomClone = Instantiate (venom, tongue.position, venom.transform.rotation);
	venomClone.GetComponent(Rigidbody2D).velocity = (Vector2(GameController.player.transform.position.x,GameController.player.transform.position.y+.5) - transform.position).normalized * 10;
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
	if(slopeAngle2>10&&!moving)
		rb2D.AddForce(-surfaceNormal*25);
}


//Freeze & Stun
function Stun(x:float)
{
	if(stunProtect>2)
	{
		if(!spawnedStunStar)
		{
			spawnedStunStar=true;
			var stunStarClone = Instantiate(stunStar, stunStarLoc.position, Quaternion.identity);
			stunStarClone.transform.parent = stunStarLoc;
		}

		//stunned=true;
		stunTime+=x;
		yield WaitForSeconds(x);
		//stunned=false;
		
		spawnedStunStar=false;
		Destroy(stunStarClone);
	}
}

function StunMelee(x:float)
{
	stunTime+=x;
	anim.SetTrigger("stunhit");
	rb2D.velocity.x=0;
}

function Electrocute(x:float)
{
	electrocuted=true;
	yield WaitForSeconds(x);
	electrocuted=false;
}

function Frozen()
{
	if(frozen||electrocuted)
		anim.enabled=false;
	else
		anim.enabled=true;
	
	if(dead||electrocuted)
		rb2D.isKinematic=true;
	else
		rb2D.isKinematic=false;


	if(modSpeed==0)
		frozen=true;
	else
		frozen=false;
	
	for (var child : Transform in transform)
	{
		if(child.gameObject.name!="GroundCollider")
		{
			if(frozen)
			{
				rb2D.mass=.1;
				//for (var child : Transform in transform)
				//if(child.gameObject.name!="GroundCollider")
				child.gameObject.layer=bpLayerz.ENEMY;
			}
			
			else
			{
				rb2D.mass=1;
				gameObject.layer=bpLayerz.ENEMY;
				//for (var child : Transform in transform)
				//if(child.gameObject.name!="GroundCollider")
				child.gameObject.layer=bpLayerz.ENEMYLIMB;
			}
		}
	}
	if(frozen)
	{
		var hit: RaycastHit2D = Physics2D.Raycast(transform.position, -Vector2.up,3.5,mask);
			if(hit)
				transform.up=hit.normal;
			else
				transform.eulerAngles.z=0;
	}

}

function IsCubed()
{
	isCubed=true;
}

function Fear()
{
	feared=true;
	yield WaitForSeconds(6);
	feared=false;
}

function LostPlayer()
{
	seenPlayer=false;
	alerted=false;
}