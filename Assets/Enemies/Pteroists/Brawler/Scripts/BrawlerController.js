//Line of Sight&Range
var inLOS:boolean;
var mask:LayerMask;
var inRange:boolean;
var meleeRange:boolean;
var alert:GameObject;
var alerted:boolean;


//facing player
var facingPlayer:boolean;
var seenPlayer:boolean;
var nearbyEnemies:NearbyEnemies;

//Run Speed Modifier for Variation of like enemies
var startSpeed:float;

//Misc
var hit:boolean;
var anim:Animator;
var stunStar:GameObject;
var spawnedStunStar:boolean;

//Body Part References
var arm:Transform;
var hand:Transform;
var stunStarLoc:Transform;;

//Status Effects
var onGround:boolean;
var hittingWall:boolean;
var fearTimer:float;
var feared:boolean;
var stunned:boolean;
var stunProtect:float;
var hamSpeed:float;
var modSpeed:float;
var frozen:boolean;
var isCubed:boolean;
var electrocuted:boolean;

//Health
var enemyHP:float;
var maxHP:float;
var dead:boolean;
//Health Bar
var background:Texture2D;
var foreground:Texture2D;
var frame:Texture2D;
var screenPosition:Vector3;

//Attacks and Combos
var thrown:boolean;
var hasPlayer:boolean;
var number:int;

//Melee Colliders
var col1:GameObject;
var col2:GameObject;
var col3:GameObject;

//Slope Adjust
var slopeAngle2:float;
var surfaceNormal:Vector3;

var flyOff:boolean;

//Jumping out of the jeep in Truck Levels
var hanging:boolean;
var truckBrawler:boolean;
var groundCollider:BoxCollider2D;

//Restrict how often you're thrown
var throwTimer:float;

var stopSpeed:float;

var rb2D:Rigidbody2D;

function Start () 
{
	rb2d = GetComponent(Rigidbody2D);
	modSpeed=1;
	stopSpeed=1;
	hamSpeed=1;
	maxHP=20;
	enemyHP=maxHP;
	anim=GetComponent(Animator);
	nearbyEnemies = GameController.gameController.GetComponent(NearbyEnemies);
	startSpeed=Random.Range(.6,1.31);
	number=1;
	InvokeRepeating("RandomNumber",2,2);
	InvokeRepeating("PunchNumber",1,1);
	throwTimer=0;
	if(truckBrawler)	
		Hang();
}

function LateUpdate()
{
	HPGui();
}

function Update () 
{
	if(Time.timeScale > 0)
	{
		Animations();
		if(!frozen&&!stunned&&!dead&&!hanging&&!truckBrawler)
		{
			LineOfSight();
			if(seenPlayer&&!hasPlayer)
				FacePlayer();
			if(!feared)
				Attacks();
		}
		//HPGui();
		Kill();
		Frozen();
		SlopeAdjust();
		
		if(hasPlayer)
		{
			GameController.player.transform.position=hand.transform.position;//Vector2(hand.localPosition.x+(.3*transform.localScale.x),hand.localPosition.y-.05);
			GameController.player.transform.rotation=hand.transform.rotation;
		}
		
		if(!stunned&&!dead)
			stunProtect+=Time.deltaTime;
		else
		{
			stunProtect=0;
			if(GameController.playerController.freezePlayer2)
				GameController.playerController.freezePlayer2=false;
			if(hasPlayer)
			{
				hasPlayer=false;
				GameController.anim.SetTrigger("recover");
				GameController.player.transform.eulerAngles=Vector3(0,0,0);
			}
				for (var child : Transform in transform)
				{
					if(child.GetComponent(SpriteRenderer)!=null)
						if(child.gameObject.name!="GroundCollider")
							child.GetComponent(Renderer).sortingLayerName = "Enemy";
				}
		}
		if(enemyHP<0)
			enemyHP=0;
			
		if(flyOff)
			transform.position.x-=.5;
		
		throwTimer+=Time.deltaTime;
		if(throwTimer<15&&number==1)
			number=Random.Range(1,5);
		
		if(!groundCollider.enabled&&rb2D.velocity.y<0)
			groundCollider.enabled=true;
	}		
}

function Animations()
{
	anim.SetFloat("hSpeed",rb2D.velocity.x);
	anim.SetBool("meleerange",meleeRange);
	anim.SetInteger("number",number);
	anim.SetBool("stun",stunned);
	anim.SetBool("onGround",onGround);
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
		var alertClone=Instantiate(alert,Vector2(transform.position.x,transform.position.y+1.5),Quaternion.identity);
		alertClone.transform.parent=transform;
		Destroy(alertClone,.5);
	}
}

function LineOfSight()
{
	//check for obstacle to jump over
	//Debug.DrawRay(Vector2(transform.position.x,transform.position.y-.44),Vector2.right*transform.localScale.x*.5);
	var obstacleHit:RaycastHit2D = Physics2D.Raycast(Vector2(transform.position.x,transform.position.y-.44),Vector2.right*transform.localScale.x,1,mask);
	if(obstacleHit)
	{
		var slopeAngle:float = Vector2.Angle(obstacleHit.normal,obstacleHit.transform.up);
		if(slopeAngle==90)
		{
			if(onGround&&inRange&&seenPlayer&&facingPlayer&&!meleeRange)
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

	if(Vector2.Distance(transform.position,GameController.player.transform.position)<.8)
		meleeRange=true;
	else
		meleeRange=false;
		
	//if(Vector2.Distance(transform.position,GameController.player.transform.position)<6)
	if(Mathf.Abs(transform.position.x-GameController.player.transform.position.x)<6)
		inRange=true;
	else
		inRange=false;
	
	if(!meleeRange&&seenPlayer&&(!onGround&&!hittingWall||onGround&&!hittingWall)&&inLOS||!meleeRange&&seenPlayer&&!inLOS&&Mathf.Abs(transform.position.y-GameController.player.transform.position.y)<2&&!hittingWall||feared)
	{
		rb2D.velocity.x=3*transform.localScale.x*modSpeed*startSpeed*hamSpeed*stopSpeed;
	
		if(thrown||stunned)
			thrown=false;
	}
	
	if((transform.localScale.x==-1&&(transform.position.x>GameController.player.transform.position.x))||transform.localScale.x==1&&(transform.position.x<GameController.player.transform.position.x))
		facingPlayer=true;
	else
		facingPlayer=false;

    if (!Physics2D.Linecast (transform.position, GameController.player.transform.position, mask)&&!CharController.inCover&&facingPlayer)
    {
		if(!seenPlayer&&inRange&&onGround)
			SeenPlayer();
		inLOS=true;
		//rb2D.velocity.x=2*transform.localScale.x * startSpeed;
	}
    else
		inLOS=false;
        
    //Debug.DrawLine(transform.position,Vector2(transform.position.x,transform.position.y-.5), Color.black);
    if (Physics2D.Linecast (transform.position, Vector2(transform.position.x,transform.position.y-.7), mask))
    	onGround=true;
    else
    	onGround=false;
    	
    if(meleeRange&&Mathf.Abs(rb2D.velocity.x)>0)		//stop movement if in melee range
		rb2D.velocity.x=0;
    	
    //if(!onGround&&rb2D.velocity.y<1&&rb2D.velocity.y>-1)
    //	rb2D.AddForce(Vector2.right*20*-transform.localScale.x);
    
    var hitGround: RaycastHit2D = Physics2D.Raycast(Vector2(transform.position.x-.5*-transform.localScale.x,transform.position.y), -Vector2.up,1.7,mask);
//	Debug.DrawRay (Vector2(transform.position.x-.5*-transform.localScale.x,transform.position.y), -Vector2.up*1.7, Color.green);
	if(hitGround)
		stopSpeed=1;
	else if(!feared)
		stopSpeed=0;
}



function FacePlayer()
{

	if(GameController.player.transform.position.x > transform.position.x)
		if(!feared)
			transform.localScale.x = 1;
		else
			transform.localScale.x = -1;
	else if(GameController.player.transform.position.x < transform.position.x)
		if(!feared)
			transform.localScale.x = -1;
		else
			transform.localScale.x = 1;
}


function TakeDamage(damage:float)
{
	if(!frozen)
	{
		if(!seenPlayer)
			transform.localScale.x=-GameController.player.transform.localScale.x;
		if(enemyHP>0)
			enemyHP-=damage;
		if(!hit)
		{
			hit=true;
			if(!stunned)
				anim.SetTrigger("hit2");
			yield WaitForSeconds(.1);
			hit=false;
		}
	}
}

function RandomNumber()
{
	if(gameObject.activeSelf)
		number=Random.Range(0,5);
}

function PunchNumber()
{
	if(gameObject.activeSelf)
	{
		if(!Health.playerIsDead)
			anim.SetFloat("punchAngle",Random.Range(-1,2));
		else
			anim.SetFloat("punchAngle",-1);
	}
}

function Attacks()
{
	if(!thrown&&CharController.onGround&&facingPlayer)
	{	
		if(number==1&&modSpeed==1&&!Health.playerIsDead&&throwTimer>15)
		{
			throwTimer=0;
			ThrowPlayer();
		}
		if(number==0||number==4)
			Punch();
		if(number==2||number==3)
			Kick();
	}
}

function ThrowPlayer()
{
	if(meleeRange)
		if(!GameController.playerController.freezePlayer2&&!GameController.playerController.freezePlayer2)
		{
			thrown=true;
			for (var child : Transform in transform)
			{
				if(child.GetComponent(SpriteRenderer)!=null)
					child.GetComponent(Renderer).sortingLayerName = "Effects";
			}
	
			CharController.punching=false;
			SwordWeapon.attackingSword=false;
			if(SkateboardScript.usingSkateboard)
				GameObject.Find("Skateboard(Clone)").GetComponent(MonoBehaviour).Dismount();
			GameController.playerController.freezePlayer2=true;
			anim.SetTrigger("throw");
			yield WaitForSeconds(.2);
			GameController.anim.SetTrigger("hit2freeze");
			hasPlayer=true;
			GameController.player.transform.position=hand.transform.position;//Vector2(hand.localPosition.x+(.3*transform.localScale.x),hand.localPosition.y-.05);
			GameController.player.transform.rotation=hand.transform.rotation;
			var rdmn:int;
			rdmn=Random.Range(0,2);
			if(rdmn==0)
				transform.localScale.x=1;
			else
				transform.localScale.x=-1;
		}
}

function Throw()
{
//	yield WaitForSeconds(.7);
			GameController.playerController.punching=false;
			NewSpear.spearMelee=false;
			SwordWeapon.attackingSword=false;
			MagicScript.casting=false;
			GameController.playerController.freezePlayer2=false;
			yield WaitForEndOfFrame;
			GameController.playerController.KnockBack(Vector2(transform.localScale.x*400,200));
			hasPlayer=false;
			GameController.health.modifyHealth(-5);
			GameController.anim.SetTrigger("thrown");
			GameController.playerController.thrown=true;
			for (var child : Transform in transform)
			{
				if(child.GetComponent(SpriteRenderer)!=null)
					if(child.gameObject.name!="GroundCollider")
						child.GetComponent(Renderer).sortingLayerName = "Enemy";
			}
			GameController.player.transform.rotation.z=0;
			GameController.player.transform.localScale.y=1;
			GameController.playerController.groundTimer=0;
}

function Punch()
{
	if(meleeRange)
		anim.SetTrigger("punch");
}

function Kick()
{
	if(meleeRange)
		anim.SetTrigger("kick");
}

function Colliders(x:int)
{
	if(!dead)
	{
		if(x==1)
			col1.layer=bpLayerz.ENEMY;
		if(x==2)	
			col1.layer=bpLayerz.ENEMYLIMB;
		if(x==3)
			col2.layer=bpLayerz.ENEMY;
		if(x==4)
			col2.layer=bpLayerz.ENEMYLIMB;
		if(x==5)
			col3.layer=bpLayerz.ENEMY;
		if(x==6)
			col3.layer=bpLayerz.ENEMYLIMB;	
	}
}

function Kill()
{
	if(enemyHP==0)
	{
		anim.SetTrigger("dead");
		anim.SetBool("alreadyDead",true);
		nearbyEnemies.enemiesNear.Remove(gameObject.transform);
		//anim.SetTrigger("Death1");
		if(!dead)
		{
			GameController.stats.brawlerKilled++;
			dead=true;
			col1.layer=bpLayerz.ENEMYLIMB;
			col2.layer=bpLayerz.ENEMYLIMB;
			col3.layer=bpLayerz.ENEMYLIMB;
			if(BloodLustScript.usingBloodLust)
				EnemiesKilled.enemiesKilled++;
		}
		yield WaitForSeconds(8);
		if(GameObject.Find("spear(Clone)") != null)		//Finds if the spear is inside of this enemy.
			GameObject.Find("spear(Clone)").transform.parent=null; //Unparent it so it falls to the ground to be picked up.
		//Destroy(gameObject);
		gameObject.SetActive(false);
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


function KnockBack(knockForce:Vector2)
{
	//rb2D.AddForce(Vector2.right * transform.localScale.x * (knockForce*50));
	rb2D.AddForce(knockForce); //NOT THIS
	gettingKnocked=true;
	yield WaitForSeconds(.25);
	gettingKnocked=false;
	rb2D.velocity.x=0;
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
		rb2D.AddForce(-surfaceNormal*15); //NOT THIS
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
	}
	
	else
	{
		rb2D.mass=1;
		gameObject.layer=bpLayerz.ENEMY;
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
	fearTimer+=6;
	feared=true;
	yield WaitForSeconds(fearTimer);
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
	rb2D.velocity.x=1.8;
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
	truckBrawler=false;
	rb2D.velocity.x=0;
}