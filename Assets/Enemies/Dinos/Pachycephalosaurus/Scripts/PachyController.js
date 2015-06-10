var enemyHP:float;
var inLOS : boolean=false;
var mask : LayerMask;
var moving:boolean=false;
var maxHP:float;
var inRange:boolean;
var losRange:float;

var startSpeed:float;

var anim:Animator;

var gettingKnocked:boolean;

//var anim:Animator;

var nearbyEnemies:NearbyEnemies;

var screenPosition:Vector3;

//damage
var damage:int;

var chargeSpeed:float;

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
var stunProtect:float;
var stunStar:GameObject;
var spawnedStunStar:boolean;
var stunStarLoc:Transform;

//fear
var feared:boolean;

//death
var dead:boolean;

//Lightning
var electrocuted:boolean;

//hamstring
var hamSpeed:float;

//charging
var chargeTimer:float;
var charging:boolean;
var runningLeft:boolean;
var runningRight:boolean;

var dustCloudSmoke:GameObject;
var dustSpawned:boolean;

var prevXVeloc:float;

//facing player
var facingPlayer:boolean;
var seenPlayer:boolean;
var alert:GameObject;
var alerted:boolean;

var ramming:boolean;

var playerX:float;

//Meat Drops
var meats:GameObject[];

var rb2D:Rigidbody2D;

function Start()
{
	rb2d = GetComponent(Rigidbody2D);
	anim=GetComponent(Animator);
	nearbyEnemies = GameController.gameController.GetComponent(NearbyEnemies);
	damage = 5;
	startSpeed = Random.Range(1,1.5);
	//chargeTimer = Random.Range(7,13);
	modSpeed=1;
	hamSpeed=1;
	frozen=false;
	stunned=false;
	spawnedStunStar=false;
	InvokeRepeating("OldVelocity",.3,.3);
}

function LateUpdate()
{
	HPGui();
}

function Update()
{
	if(enemyHP<0)
		enemyHP=0;
}

function FixedUpdate()
{
	if(!frozen&&!stunned&&!dead)
	{	
		FacePlayer();
		LineOfSight();
		Move();
	}
	Kill();
	//HPGui();
	NearEnough();
	if(modSpeed<1)
		Frozen();
	//Charge();
	charging=true;
	
	if(rb2D.velocity.x<=1&&rb2D.velocity.x>-1)
		moving=false;
	else
		moving=true;
	//rb2D.velocity.x+=.05;
	anim.SetBool("moving", moving);
	anim.SetBool("Ramming", ramming);
	anim.SetBool("Stunned", stunned);
	anim.SetBool("dead", dead);
	
	if(Mathf.Abs(rb2D.velocity.x)>3.75)
		ramming=true;
	else
		ramming=false;
		
	if(!stunned)
		stunProtect+=Time.deltaTime;
	else
		stunProtect=0;

	
	if(Mathf.Round(transform.position.x)==Mathf.Round(GameController.player.transform.position.x))
		playerX=GameController.player.transform.position.x;
	else if(Vector2.Distance(GameController.player.transform.position,transform.position)>losRange/2)
		playerX=GameController.player.transform.position.x;
	else if((transform.localScale.x==1&&(transform.position.x>GameController.player.transform.position.x))||transform.localScale.x==-1&&(transform.position.x<GameController.player.transform.position.x)&&seenPlayer)
		playerX=GameController.player.transform.position.x;
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
    	
    if(feared)
    {
    	fleeing=true;
    	charging=false;
    	chargeSpeed=1.5*modSpeed*hamSpeed*startSpeed;
    	rb2D.velocity.x=5*-transform.localScale.x*modSpeed*hamSpeed*startSpeed;
    }
    else if(!charging&&!feared)
    {
    	//fleeing=false;
    	chargeSpeed=0;//1*modSpeed*hamSpeed;
    	//chargeSpeed=0;
    }
    else if(charging)
    	chargeSpeed=5.5*modSpeed*hamSpeed*startSpeed;
}

function Move()
{
	if(inLOS&&charging)//&&inRange)
	{
		rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,-chargeSpeed,chargeSpeed);
		//rb2D.AddForce(Vector2.right * -transform.localScale.x * 20 * startSpeed * chargeSpeed);
		rb2D.velocity.x+=.15*-transform.localScale.x;
		//Debug.Log(rb2D.velocity.x);
    }
    else if(!inLOS&&transform.localScale.x==1&&rb2D.velocity.x<0)
    	rb2D.velocity.x+=.075;
    else if(!inLOS&&transform.localScale.x==1&&rb2D.velocity.x>0)
    	rb2D.velocity.x=0;
    else if(!inLOS&&transform.localScale.x==-1&&rb2D.velocity.x>0)
    	rb2D.velocity.x-=.075;
    else if(!inLOS&&transform.localScale.x==-1&&rb2D.velocity.x<0)
    	rb2D.velocity.x=0;
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
		if(playerX-8 > transform.position.x&&inLOS&&!feared)
			transform.localScale.x = -1;
		else if(playerX-1 > transform.position.x&&inLOS&&feared)
			transform.localScale.x = 1;
		else if(playerX+8 < transform.position.x&&inLOS&&!feared)
			transform.localScale.x = 1;
		else if(playerX+1 < transform.position.x&&inLOS&&feared)
			transform.localScale.x = -1;
		//if((rb2D.velocity.x<(chargeSpeed*.1)&&transform.localScale.x==-1)||(rb2D.velocity.x>(chargeSpeed*.1)&&transform.localScale.x==1))
		if(Mathf.Abs(rb2D.velocity.x)<chargeSpeed-.2&&Mathf.Abs(rb2D.velocity.x)>0)
		{
			var dustCloudClone=Instantiate(dustCloudSmoke,Vector3(transform.position.x,transform.position.y-1.5,transform.position.z),dustCloudSmoke.transform.rotation);
			dustCloudClone.transform.parent=GameController.dustHolder;
		}
}


function Kill()
{
	if(enemyHP==0)
	{
		nearbyEnemies.enemiesNear.Remove(gameObject.transform);
		//anim.SetTrigger("Death1");
		if(!dead)
		{
			dead=true;
			GameController.stats.pachysKilled++;
			var meatClone=Instantiate(meats[Random.Range(0,meats.length)],transform.position,Quaternion.identity);
			if(BloodLustScript.usingBloodLust)
				EnemiesKilled.enemiesKilled++;
		}
		yield WaitForSeconds(10);
		if(GameObject.Find("spear(Clone)") != null)		//Finds if the spear is inside of this enemy.
			GameObject.Find("spear(Clone)").transform.parent=null; //Unparent it so it falls to the ground to be picked up.
		//Destroy(gameObject);
		gameObject.SetActive(false);
	}
}

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="PushableCrate")
		col.gameObject.SendMessage("Explode");
}

function OnGUI()
{
	if(Options.hpBars)
	{
            GUI.DrawTexture(new Rect(screenPosition.x, screenPosition.y-(195*ScreenSize.Y), 100*ScreenSize.X, 20*ScreenSize.Y), background, ScaleMode.StretchToFill);
            GUI.DrawTexture(new Rect(screenPosition.x, screenPosition.y-(195*ScreenSize.Y), 100*(enemyHP/maxHP)*ScreenSize.X, 20*ScreenSize.Y), foreground, ScaleMode.StretchToFill);
            GUI.DrawTexture(new Rect(screenPosition.x, screenPosition.y-(195*ScreenSize.Y), 103*ScreenSize.X, 23*ScreenSize.Y), frame, ScaleMode.StretchToFill);
    }
}


function HPGui()
{
	screenPosition = Camera.main.WorldToScreenPoint(transform.position);
	screenPosition.y = Screen.height - screenPosition.y;
}

function NearEnough()
{
	if(Vector2.Distance(GameController.player.transform.position,transform.position)<losRange)
		inRange=true;
	else
		inRange=false;
}

function KnockBack(knockForce:Vector2)
{
	//stunned=true;
	//rb2D.AddForce(Vector2.right * transform.localScale.x * (knockForce*50));
	rb2D.AddForce(knockForce);
	gettingKnocked=true;
	yield WaitForSeconds(.25);
	gettingKnocked=false;
	rb2D.velocity.x=0;
}

/*function OnCollisionEnter2D(col:Collision2D)
{
	if(col.gameObject.tag=="Player"&&!frozen&&charging)
	{
		col.gameObject.SendMessage("KnockBack",Vector2(-transform.localScale.x*1400,200));
		GameController.health.modifyHealth(-damage);
		rb2D.velocity.x*=.2;
		GameController.playerController.SendTakeDamage();
	}
	if(col.gameObject.tag=="Land"&&Mathf.Abs(prevXVeloc)>5.5)
	{
		Debug.Log(prevXVeloc);
		GameController.shakeCam.Shake(.5,.5,.5,.5); //x,y,z,time
		Stun(4);
	}
}*/

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
			stunStarClone.transform.eulerAngles.z=stunStarLoc.transform.eulerAngles.z;
		}

		stunned=true;
		yield WaitForSeconds(x);
		stunned=false;
		spawnedStunStar=false;
		Destroy(stunStarClone);
		transform.localScale.x=-transform.localScale.x;
	}
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
	if(!seenPlayer)
		SeenPlayer();
	yield WaitForSeconds(6);
	feared=false;
}

function OldVelocity()
{
	if(gameObject.GetComponent(Rigidbody2D)!=null)
		prevXVeloc=rb2D.velocity.x;
}

function LostPlayer()
{
	seenPlayer=false;
	alerted=false;
}