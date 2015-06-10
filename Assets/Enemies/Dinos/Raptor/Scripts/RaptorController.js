var sniffSounds:AudioClip[];

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

var animateRaptor:AnimateRaptor;

//damage
var damage:int;

//hp bar
var background:Texture2D;
var foreground:Texture2D;
var frame:Texture2D;

//frozen
var modSpeed:float;
var frozen:boolean;
var isCubed:boolean;

var onGround:boolean;

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

var electrocuted:boolean;

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

var patrol:boolean;
var patrolling:boolean;

var rDistance:float;
var lastPlayerPos:float;

//Slope Adjust
var slopeAngle2:float;
var surfaceNormal:Vector3;

var SO:SpriteLayerChanger;

//Meat Drops
var meats:GameObject[];

var rb2D:Rigidbody2D;

//shadow
var shadowScript:ShadowTestScript;

function Start () 
{
	rb2d = GetComponent(Rigidbody2D);
	SO=GetComponent(SpriteLayerChanger);
	rDistance=3.5;
	enemyHP=8;
	maxHP=8;
	nearbyEnemies = GameController.gameController.GetComponent(NearbyEnemies);
	damage = 5;
	modSpeed=1;
	hamSpeed=1;
	startSpeed = Random.Range(.75,1.5);
	frozen=false;
	stunned=false;
	dead=false;
	attacking=false;
	idleTime=Random.Range(10,25);
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
		FacePlayer();
	if(!frozen&&!stunned&&!animateRaptor.jumpingAttack&&!dead)
		LineOfSight();
	if(enemyHP<0)
		enemyHP=0;
	
	Kill();
	//HPGui();
	if(!dead)
	{
		NearEnough();
		DamageNumbers();
		SlopeAdjust();	
	}
	if(modSpeed<1&&!hidingInBush)
		Frozen();
	
	attacking=animateRaptor.inAir;
	
	if(!inLOS)//&&!inRange)
		idleTimer+=Time.deltaTime;
	else
		idleTimer=0;
	
	if(idleTimer>idleTime)
	{
		animateRaptor.anim.SetTrigger("Sniff");
		idleTimer=0;
	}
	
	if(hidingInBush&&gameObject.layer!=bpLayerz.IGNORELAYER)
		gameObject.layer=bpLayerz.IGNORELAYER;
	
	
	HideInBush();
	
	
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
		
	if(enemyHP<0)		//Prevents enemy from going under 0 for Kill()
		enemyHP=0;
}
}


function TakeDamage(damage:float)
{
	if(!frozen&&!hidingInBush)//&&transform.parent==null)
	{
		if(enemyHP>0)
			enemyHP-=damage;
		if(!seenPlayer)
			SeenPlayer();
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
    if ((!Physics2D.Linecast (transform.position, GameController.player.transform.position, mask)&&!CharController.inCover&&inRange&&!hidingInBush&&facingPlayer)||feared)
    {
    	if(!seenPlayer)
			SeenPlayer();
		inLOS=true;
		if(!gettingKnocked&&!animateRaptor.inAir)
			rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,(-2),(2));
		else if(animateRaptor.inAir)
			rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,(-10),(10));
		
		rb2D.AddForce(Vector2.right * -transform.localScale.x * 50 * startSpeed); //enable to move
		rb2D.velocity.x*=modSpeed*hamSpeed;
		//rb2D.velocity.x=((5*-transform.localScale.x)*(modSpeed*startSpeed));
	}
    else 
    {
    	//patrolling=false;
        inLOS=false;
        if(!gettingKnocked)
        	rb2D.velocity=Vector2(0,rb2D.velocity.y);
    }
    

    if(patrol&&onGround)
    {
	    if(!inLOS&&!seenPlayer)
	    {
	    	patrolling=true;
	    	rb2D.velocity.x=(3*-transform.localScale.x*startSpeed); //enable to move
	    	var hit: RaycastHit2D = Physics2D.Raycast(transform.position, Vector2(-1*transform.localScale.x,-1).normalized,3,mask);
	    	Debug.DrawRay (transform.position, Vector2(-1*transform.localScale.x,-1).normalized*3, Color.green);
	    	if(hit)
	    	{
	    		//Debug.Log(hit.point);
	    		//blah.transform.position=hit.point;
	    	}
	    	if(!hit)
	    	{
	    		transform.localScale.x*=-1;
	    	}

	    }
	    
	    var hit2: RaycastHit2D = Physics2D.Raycast(transform.position, Vector2(-1*transform.localScale.x,0).normalized,1.5,mask);
		//Debug.DrawRay (transform.position, Vector2(-1*transform.localScale.x,0).normalized*1.5, Color.blue);
	    if(hit2)
	    	transform.localScale.x*=-1;
		
		if(seenPlayer&&!inLOS)
    		seenPlayer=false;
	}
	
	if(/*onGround&&*/seenPlayer)
	{
	
		Debug.DrawRay (transform.position, Vector2(-1*transform.localScale.x,0).normalized*1.5, Color.blue);
		//Debug.DrawRay (transform.position, Vector2(-1*transform.localScale.x,-1).normalized*3, Color.blue);
		var wallHit:RaycastHit2D = Physics2D.Raycast(transform.position, Vector2(-1*transform.localScale.x,0).normalized,1.5,mask);
		if(/*(!Physics2D.Raycast(transform.position, Vector2(-1*transform.localScale.x,-1).normalized,3,mask)&&Mathf.Abs(transform.position.y-GameController.player.transform.position.y)>.5)||*/wallHit&&Vector2.Angle(wallHit.normal,wallHit.transform.up)>80)
		{
			transform.localScale.x*=-1;
		}
	}
	    
	if(Mathf.Abs(rb2D.velocity.x)>0)
    	moving=true;
    else
    	moving=false;
    	
    if (Physics2D.Linecast (transform.position, Vector2(transform.position.x,transform.position.y-1.25), mask))
    	onGround=true;
    else
    	onGround=false;

}


function FacePlayer()
{
	if(Mathf.Round(transform.position.x)==Mathf.Round(GameController.player.transform.position.x))
		lastPlayerPos=GameController.player.transform.position.x;
	else if(Vector2.Distance(GameController.player.transform.position,transform.position)>losRange)
		lastPlayerPos=GameController.player.transform.position.x;
	else if((transform.localScale.x==1&&(transform.position.x>GameController.player.transform.position.x))||transform.localScale.x==-1&&(transform.position.x<GameController.player.transform.position.x)&&seenPlayer)
		lastPlayerPos=GameController.player.transform.position.x;
		
	if(!feared)
	{
		if(lastPlayerPos-rDistance > transform.position.x&&inLOS)
			transform.localScale.x = -1;
		else if(lastPlayerPos+rDistance < transform.position.x&&inLOS)
			transform.localScale.x = 1;
	}
	else
	{
		if(GameController.player.transform.position.x-rDistance > transform.position.x)
			transform.localScale.x = 1;
		else if(GameController.player.transform.position.x+rDistance < transform.position.x)
			transform.localScale.x = -1;
	}
}


function Kill()
{
	if(enemyHP==0)
	{
		//if(GameObject.Find("Karate Master Summon(Clone)")!=null)
			//GameObject.Find("Karate Master Summon(Clone)").GetComponent(MonoBehaviour).enemiesNear.Remove(transform);
		nearbyEnemies.enemiesNear.Remove(gameObject.transform);
		animateRaptor.anim.SetBool("Death1",true);
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
			GameController.stats.raptorsKilled++;
			if(BloodLustScript.usingBloodLust)
				EnemiesKilled.enemiesKilled++;
			//gameObject.BroadcastMessage("Die",SendMessageOptions.DontRequireReceiver);
		}
		//yield WaitForSeconds(2.5);
		//gameObject.GetComponent(Animator).enabled=false;
		yield WaitForSeconds(10);
		if(GameObject.Find("spear(Clone)") != null)		//Finds if the spear is inside of this enemy.
			GameObject.Find("spear(Clone)").transform.parent=null; //Unparent it so it falls to the ground to be picked up.
		gameObject.SetActive(false);
		//Destroy(gameObject);
			
	}
}


function OnGUI()
{
	GUI.depth = 75;	
	if(Options.hpBars&&!hidingInBush&&!dead)
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
	rb2D.velocity.x=0;
	rb2D.velocity.y=0;
	//rb2D.AddForce(Vector2.right * transform.localScale.x * (knockForce*50));
	rb2D.AddForce(knockForce);
	gettingKnocked=true;
	yield WaitForSeconds(.25);
	gettingKnocked=false;
	rb2D.velocity.x=0;
}

function MeleeKnockBack(knockForce:Vector2)
{
	gettingKnocked=true;
	rb2D.velocity.x=0;
	//rb2D.velocity.y=0;
	//rb2D.AddForce(Vector2.right * transform.localScale.x * (knockForce*50));
	rb2D.AddForce(knockForce);
	//gettingKnocked=true;
	yield WaitForSeconds(.25);
	gettingKnocked=false;
	//rb2D.velocity.x=0;
}

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player"&&!frozen&&!stunned&&attacking)
	{
		//if(animateRaptor.inAir)
		col.gameObject.SendMessage("KnockDown");
		if(SkateboardScript.usingSkateboard)
			GameObject.Find("Skateboard(Clone)").GetComponent(MonoBehaviour).Dismount();
		GameController.health.modifyHealth(-damage);
		GameController.playerController.SendTakeDamage();
	}
	if(col.gameObject.tag=="PushableCrate"&&moving)
		col.gameObject.SendMessage("Explode");
	
}

function DamageNumbers()
{
	if(animateRaptor.jumpingAttack)
		damage=10;
	else
		damage=5;
}

function HideInBush()
{
	animateRaptor.anim.SetBool("hidingInBush",hidingInBush);
	if(Vector2.Distance(GameController.player.transform.position,transform.position)<2&&hidingInBush)
	{
		hidingInBush=false;
		gameObject.layer=bpLayerz.ENEMY;
		seenPlayer=true;
		animateRaptor.lastJumpAttack=0;
		animateRaptor.JumpForceBush();
		shadowScript.enabled=true;
		yield WaitForSeconds(.25);
		SO.SwitchToEnemy();
		SO.Increase();
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
		rb2D.AddForce(-surfaceNormal*30);
	if(animateRaptor.jumpingAttack||stunned&&!gettingKnocked)
		rb2D.velocity.x=0;
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
//	rb2D.velocity.x=0;
	stunTime+=x;
	animateRaptor.anim.SetTrigger("stunhit");
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
			/*if(poppedOut)
				for (var child : Transform in transform)
					child.gameObject.layer=bpLayerz.IGNORELAYER;*/
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

function SniffSounds()
{
	//AudioSource.PlayClipAtPoint(sniffSounds[Random.Range(0,sniffSounds.Length)], transform.position, Options.sfxVolume);
	
	// Audio - Raptor Sniff
	Fabric.EventManager.Instance.PostEvent("SFX/Enemies/Raptor/Sniff", gameObject);
}