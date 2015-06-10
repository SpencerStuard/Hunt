var enemyHP:float;
var moveSpeed:float=1.0;
var inLOS : boolean=false;
var mask : LayerMask;
var moving:boolean=false;
var maxHP:float;
var inRange:boolean;
var losRange:float;

var startSpeed:float;

var gettingKnocked:boolean;

//var gameController:GameObject;
var nearbyEnemies:NearbyEnemies;

var screenPosition:Vector3;

//damage
var damage:int;

//hp bar
var background:Texture2D;
var foreground:Texture2D;
var frame:Texture2D;

//Status Effects
var onGround:boolean;
var feared:boolean;
var stunned:boolean;
var stunProtect:float;
var modSpeed:float;
var frozen:boolean;
var isCubed:boolean;
var electrocuted:boolean;

//stun
var stunStar:GameObject;
var spawnedStunStar:boolean;
var stunStarLoc:Transform;

//death
var dead:boolean;


var attacking:boolean;

var idleTimer:float;
var idleTime:float;

var hidingInBush:boolean;

//hamstring
var hamSpeed:float;

//facing player
var facingPlayer:boolean;
var seenPlayer:boolean;

var alert:GameObject;
var alerted:boolean;

var dart:GameObject;
var shot:boolean;

var anim:Animator;
var blowgun:Transform;

var hit:boolean;

//var rightHand:Transform;
var pipe:GameObject;
var hasPipe:boolean;
var meleeDistance:boolean;
var col1:GameObject;
var col2:GameObject;

var righthand_renderer:SpriteRenderer;
var handSprite:Sprite[];

//Slope Adjust
var slopeAngle2:float;
var surfaceNormal:Vector3;

//Obstacles
var hittingWall:boolean;

var alreadyDead:boolean;
var flyOff:boolean;

//Jumping out of the jeep in Truck Levels
var hanging:boolean;
var truckBlower:boolean;
var groundCollider:BoxCollider2D;

//Prevent jumping off the truck ledge
var hitGround: RaycastHit2D;
var stopSpeed:int;

var rb2D:Rigidbody2D;

function Start()
{
	rb2d = GetComponent(Rigidbody2D);
	anim=GetComponent(Animator);
	enemyHP=10;
	maxHP=10;
	nearbyEnemies = GameController.gameController.GetComponent(NearbyEnemies);
	damage = 2;
	modSpeed=1;
	hamSpeed=1;
	startSpeed = Random.Range(.75,1.5);
	//if(startSpeed>1)
	//	transform.localScale.x=-1;
	//else
	//	transform.localScale.x=1;
	frozen=false;
	stunned=false;
	attacking=false;
	idleTime=Random.Range(10,25);
	hasPipe=true;
	InvokeRepeating("RandomNumber",1,1);
	
	if(truckBlower)	
		Hang();
}

function LateUpdate()
{
	HPGui();
}

function Update()
{
	if(Time.timeScale > 0)
	{
		anim.SetFloat("hSpeed",rb2D.velocity.x*transform.localScale.x);
		anim.SetBool("meleeDistance",meleeDistance);
		anim.SetBool("stunned",stunned);
		anim.SetBool("onGround",onGround);
		
		if(rb2D.velocity.x!=0)
			moving=true;
		else
			moving=false;
		if(!frozen&&!stunned&&!dead&&!hanging&&!truckBlower)
			FacePlayer();
		if(!frozen&&!stunned)
			LineOfSight();
		Frozen();
			
		Kill();
		//HPGui();
		NearEnough();
		SlopeAdjust();
		//Frozen();
		
		if(!inLOS&&!inRange)
			idleTimer+=Time.deltaTime;
		else
			idleTimer=0;
		
		if(idleTimer>idleTime)
			idleTimer=0;
		
		if(!stunned&&!dead)
			stunProtect+=Time.deltaTime;
		else
			stunProtect=0;
		if(!feared)
		{
			if(seenPlayer&&!moving&&hasPipe)
				ShootDart();
			else if(!hasPipe&&meleeDistance)
				Melee();
		}
		if(enemyHP<0)
			enemyHP=0;
		if(flyOff)
			transform.position.x-=.5;
		
		if(!groundCollider.enabled&&rb2D.velocity.y<0)
			groundCollider.enabled=true;
	}
}


function TakeDamage(damage:float)
{
	if(!frozen&&!hidingInBush)//&&transform.parent==null)
	{
		if(!seenPlayer)
			SeenPlayer();
		if(enemyHP>0)
			enemyHP-=damage;
		ChangeHandSprite();
	if(!hit)
	{
		hit=true;
		shot=false;
		if(!stunned)
			anim.SetTrigger("hit2");
		yield WaitForSeconds(.1);
		hit=false;
	}
	
		//if(enemyHP<0)
		//	enemyHP=0;
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
	if(seenPlayer||(transform.localScale.x==-1&&(transform.position.x>GameController.player.transform.position.x))||transform.localScale.x==1&&(transform.position.x<GameController.player.transform.position.x))
		facingPlayer=true;
	else
		facingPlayer=false;
		
    if (!Physics2D.Linecast (transform.position, GameController.player.transform.position, mask)&&!CharController.inCover&&inRange&&!hidingInBush&&facingPlayer&&!feared)
    {
    	if(!seenPlayer)
			SeenPlayer();
		inLOS=true;
		if(!gettingKnocked)
			rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,(-2*stopSpeed),(2*stopSpeed));
		
		if(hasPipe)
		{
			if(!shot&&Mathf.Abs(transform.position.x-GameController.player.transform.position.x)<2)
			{
				rb2D.velocity.x=2*-transform.localScale.x*(startSpeed*modSpeed*stopSpeed);
				//ShootDart();
			}
			else if(shot)
				rb2D.velocity.x=0;
				
			if(!shot&&Mathf.Abs(transform.position.x-GameController.player.transform.position.x)>5)
				rb2D.velocity.x=2*transform.localScale.x*(startSpeed*modSpeed*stopSpeed);
		}
		else 
			if(Mathf.Abs(transform.position.x-GameController.player.transform.position.x)>1)
			{
				meleeDistance=false;
				rb2D.velocity.x=2*transform.localScale.x*(startSpeed*modSpeed*stopSpeed);
			}
			else if(Mathf.Abs(transform.position.x-GameController.player.transform.position.x)<=1)
				meleeDistance=true;	
	}
    else if(!feared)
    {
        inLOS=false;
        if(!gettingKnocked)
        	rb2D.velocity=Vector2(0,rb2D.velocity.y);
    }
    else if(feared)
    	rb2D.velocity.x=3*transform.localScale.x*modSpeed;
    	
	if (Physics2D.Linecast (transform.position, Vector2(transform.position.x,transform.position.y-.7), mask) && groundCollider.enabled)
    	onGround=true;
    else
    	onGround=false;	
    	
    	//if meleeing, jump over obstacles
    if(!hasPipe)
    {
		//check for obstacle to jump over
		//Debug.DrawRay(Vector2(transform.position.x,transform.position.y-.44),Vector2.right*transform.localScale.x*.5);
		var obstacleHit:RaycastHit2D = Physics2D.Raycast(Vector2(transform.position.x,transform.position.y-.44),Vector2.right*transform.localScale.x,1,mask);
		if(obstacleHit)
		{
			var slopeAngle:float = Vector2.Angle(obstacleHit.normal,obstacleHit.transform.up);
			if(slopeAngle==90)
			{
				if(onGround&&inRange&&seenPlayer&&facingPlayer&&!meleeDistance)
				{
					anim.SetTrigger("jump");
					rb2D.velocity.y=5.5;
					rb2D.velocity.x=-.2*transform.localScale.x;
				}
				hittingWall=true;		
			}
		}
		else
			hittingWall=false;

	    //if(!onGround&&rb2D.velocity.y<1&&rb2D.velocity.y>-1)	//make sure he doesn't get stuck on the edge of box
	  	//	rb2D.AddForce(Vector2.right*20*-transform.localScale.x);
	  		
		hitGround = Physics2D.Raycast(Vector2(transform.position.x-.5*-transform.localScale.x,transform.position.y), -Vector2.up,1.7,mask);
		Debug.DrawRay (Vector2(transform.position.x-.5*-transform.localScale.x,transform.position.y), -Vector2.up*1.7, Color.green);
    }
    else
    {
    	hitGround = Physics2D.Raycast(Vector2(transform.position.x-.5*transform.localScale.x,transform.position.y), -Vector2.up,1.7,mask);
		Debug.DrawRay (Vector2(transform.position.x-.5*transform.localScale.x,transform.position.y), -Vector2.up*1.7, Color.green);
	}
	
	if(hitGround)
		stopSpeed=1;
	else
		stopSpeed=0;
}


function FacePlayer()
{
	if(!feared)
	{
		if(GameController.player.transform.position.x > transform.position.x&&inLOS)
			transform.localScale.x = 1;
		else if(GameController.player.transform.position.x < transform.position.x&&inLOS)
			transform.localScale.x = -1;
	}
	else
	{
		if(GameController.player.transform.position.x-2 > transform.position.x)
			transform.localScale.x = -1;
		else if(GameController.player.transform.position.x+2 < transform.position.x)
			transform.localScale.x = 1;
	}
}


function Kill()
{
	if(enemyHP==0)
	{
		if(!alreadyDead)
		{
			stunned=false;
			anim.SetTrigger("dead");
			alreadyDead=true;
		}
		nearbyEnemies.enemiesNear.Remove(gameObject.transform);
		//anim.SetTrigger("Death1");
		if(!dead)
		{
			GameController.stats.dartguysKilled++;
			dead=true;
			if(BloodLustScript.usingBloodLust)
				EnemiesKilled.enemiesKilled++;
		}
		yield WaitForSeconds(2.5);
		if(GameObject.Find("spear(Clone)") != null)
			GameObject.Find("spear(Clone)").transform.parent=null; 
		gameObject.SetActive(false);
		
		//Destroy(gameObject);
	}
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


function HPGui()
{
	screenPosition = Camera.main.WorldToScreenPoint(Vector2(transform.position.x-.425,transform.position.y));
	screenPosition.y = Screen.height - screenPosition.y  + 45;
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
	//rb2D.AddForce(Vector2.right * transform.localScale.x * (knockForce*50));
	rb2D.AddForce(knockForce);
	gettingKnocked=true;
	yield WaitForSeconds(.25);
	rb2D.velocity.x=0;
	gettingKnocked=false;
}

/*function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player"&&!frozen&&!stunned&&attacking)
	{
		//knockback direction hit is from
		var knockDir:Vector2 = transform.position - col.transform.position;
		knockDir.y=0;
		GameController.health.modifyHealth(-damage);
		GameController.playerController.SendTakeDamage();
	}
}*/

function ShootDart()
{
	shot=true;
	anim.SetTrigger("shoot");
	yield WaitForSeconds(2);
	shot=false;
}

function DartForce()
{
	if(hasPipe)
	{
		var dartClone=Instantiate(dart,Vector2(blowgun.position.x+.3,blowgun.position.y),Quaternion.identity);
		dartClone.GetComponent(Rigidbody2D).velocity.x=6*transform.localScale.x;
		dartClone.transform.localScale.x=transform.localScale.x;
		Destroy(dartClone,5);
	}
}

function Melee()
{
	anim.SetTrigger("melee");
}

function RandomNumber()
{
	if(gameObject.activeSelf)
		anim.SetFloat("punchAngle",Random.Range(-1,2));
}

function Colliders(x:int)
{
	if(x==1)
		col1.layer=bpLayerz.ENEMY;
	if(x==2)	
		col1.layer=bpLayerz.ENEMYLIMB;
	if(x==3)
		col2.layer=bpLayerz.ENEMY;
	if(x==4)
		col2.layer=bpLayerz.ENEMYLIMB;
//	if(x==5)
//		col3.layer=bpLayerz.ENEMY;
//	if(x==6)
//		col3.layer=bpLayerz.ENEMYLIMB;	
}

function ChangeHandSprite()
{
	if(enemyHP>=maxHP/2)
		righthand_renderer.sprite=handSprite[0];
	else
	{
		if(hasPipe)
		{
			hasPipe=false;
			righthand_renderer.sprite=handSprite[1];
			DropPipe();
		}
	}
}

function DropPipe()
{
	var pipeClone=Instantiate(pipe,blowgun.position,Quaternion.identity);
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


//Freeze & Stun
function Stun(x:float)
{
	if(stunProtect>2)
	{
		anim.SetTrigger("stunned");
		if(!spawnedStunStar)
		{
			spawnedStunStar=true;
			var stunStarClone = Instantiate(stunStar, stunStarLoc.position, Quaternion.Euler(0,0,0));
			stunStarClone.transform.parent = stunStarLoc;
		}

		stunned=true;
		yield WaitForSeconds(x);
		stunned=false;
		spawnedStunStar=false;
		Destroy(stunStarClone);
	}
}

function Electrocute(x:float)
{
	electrocuted=true;
	yield WaitForSeconds(x);
	electrocuted=false;
}

function Hamstring()
{
	hamSpeed=.5;
	yield WaitForSeconds(3);
	hamSpeed=1;
}

function Frozen()
{
	if(frozen||electrocuted)
		anim.enabled=false;
	else
		anim.enabled=true;
	
	if(dead||electrocuted)//||hanging)
		rb2D.isKinematic=true;
	else
		rb2D.isKinematic=false;


	if(modSpeed==0)
		frozen=true;
	else
		frozen=false;
	
	if(frozen)
	{
		rb2D.mass=.1;
	
	//	for (var child : Transform in transform)
	//		child.gameObject.layer=bpLayerz.ENEMY;
	}
	
	else
	{
		rb2D.mass=1;
		gameObject.layer=bpLayerz.ENEMY;
	//	for (var child : Transform in transform)
	//		child.gameObject.layer=bpLayerz.ENEMYLIMB;
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

function Hang()
{
	groundCollider.enabled=false;
	transform.parent=null;
	anim.SetTrigger("jump");
	rb2D.velocity.y=8.8;
	//rb2D.velocity.x=1.8;
	//yield WaitForSeconds(.5);
	//hanging=true;
	/*anim.SetTrigger("hanging");
	yield WaitForSeconds(2);
	anim.SetTrigger("climbup");
		if(transform.localScale.x==1)
		{
			iTween.MoveBy(gameObject, iTween.Hash("name", "Climb", "y", .413207, "easeType", "easeInOutQuad", "time", .7));
			iTween.MoveBy(gameObject, iTween.Hash("name", "Climb", "x", 0.38246, "y", .65, "easeType", "linear", "delay", .5, "time", .3));
		}
		if(transform.localScale.x==-1)
		{
			iTween.MoveBy(gameObject, iTween.Hash("name", "Climb", "y", .413207, "easeType", "easeInOutQuad", "time", .7));
			iTween.MoveBy(gameObject, iTween.Hash("name", "Climb", "x", -0.38246, "y", .65, "easeType", "linear", "delay", .5, "time", .3));
		}*/
	yield WaitForSeconds(1);
	//groundCollider.enabled=true;
	//yield WaitForSeconds(.2);
	hanging=false;
	gameObject.tag="Enemy";
	//anim.SetTrigger("stand");
	truckBlower=false;
}
