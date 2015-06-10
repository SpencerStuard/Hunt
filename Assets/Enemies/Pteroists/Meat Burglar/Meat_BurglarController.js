//Line of Sight&Range
var inLOS:boolean;
var mask:LayerMask;
var inRange:boolean;
var meleeRange:boolean;
var seenPlayer:boolean;

//facing back of truck
var facingPlayer:boolean;
var backOfTruck:Transform;
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
var hittingWall:boolean;
var onGround:boolean;
var fearTimer:float;
var feared:boolean;
var stunned:boolean;
var stunProtect:float;
var hamSpeed:float;
var modSpeed:float;
var frozen:boolean;
var isCubed:boolean;
var electrocuted:boolean;
var swing:boolean;

//Health
var enemyHP:float;
var maxHP:float;
var dead:boolean;
//Health Bar
var background:Texture2D;
var foreground:Texture2D;
var frame:Texture2D;
var screenPosition:Vector3;

//Rigidbody2D Reference post Unity 5
var rb2D:Rigidbody2D;

//Meat stuff
var meatSplosion:GameObject;
var meats:GameObject[];
var meatHammerCount:int;

var flyOff:boolean;

function Start()
{
	backOfTruck = gameObject.Find("Meat Truck/BackOfTruck").transform;
	rb2D = GetComponent(Rigidbody2D);
	nearbyEnemies = GameController.gameController.GetComponent(NearbyEnemies);
	maxHP=20;
	enemyHP=maxHP;
	anim=GetComponent(Animator);
	startSpeed=Random.Range(.75,1.5);
	modSpeed=1;
	hamSpeed=1;
	meatHammerCount=0;
	flyOff=false;
//	number=1;
//	InvokeRepeating("RandomNumber",2,2);	//For enemies that combo
//	InvokeRepeating("PunchNumber",1,1);		//To make enemies attack Up/Down.
}

function Update () 
{
	if(Time.timeScale > 0)
	{
		Animations();	//Controls most transitions
		if(!frozen&&!stunned&&!dead)
		{
			CoreMovement();
			FacePlayer();
			//if(!feared)
			//	Attacks();
		}
		
		
		HPGui();		//Health bar.
		
		Kill();			//If enemy dies.
		
		Misc();
		
		Frozen();		//Frozen status effects, cubing, movespeed etc.
		
		if(enemyHP<0)		//Prevents enemy from going under 0 for Kill()
			enemyHP=0;
			
		if(flyOff)
			transform.position.x-=.5;
	}
}


/*-----------------------------------------------------------------------------------------------------------------------------------------*/


function Animations()
{
	anim.SetFloat("hSpeed",rb2D.velocity.x);		//Moving back/forward for run anim
	//anim.SetFloat("vSpeed",rb2D.velocity.y); //Falling
	anim.SetBool("meleerange",meleeRange);		//In melee range
	anim.SetBool("stun",stunned);		//Stun
	anim.SetBool("onGround",onGround);
	anim.SetBool("dead",dead);
	//anim.SetBool("Swing",swing);
}


/*-----------------------------------------------------------------------------------------------------------------------------------------*/


//HP Bar
function HPGui()		//Positions the HP bar above the enemy.
{
	screenPosition = Camera.main.WorldToScreenPoint(Vector2(transform.position.x-.425,transform.position.y));
	screenPosition.y = Screen.height - screenPosition.y  + 45;
}

function OnGUI()		//Sets the frame, background, and adjusts the current HP bar to the enemies current HP.
{
	if(Options.hpBars&&!dead)
	{
            GUI.DrawTexture(new Rect(screenPosition.x, screenPosition.y-(195*ScreenSize.Y), 100*ScreenSize.X, 20*ScreenSize.Y), background, ScaleMode.StretchToFill);
            GUI.DrawTexture(new Rect(screenPosition.x, screenPosition.y-(195*ScreenSize.Y), 100*(enemyHP/maxHP)*ScreenSize.X, 20*ScreenSize.Y), foreground, ScaleMode.StretchToFill);
            GUI.DrawTexture(new Rect(screenPosition.x, screenPosition.y-(195*ScreenSize.Y), 103*ScreenSize.X, 23*ScreenSize.Y), frame, ScaleMode.StretchToFill);
    }
}


/*-----------------------------------------------------------------------------------------------------------------------------------------*/


function CoreMovement()		//Core movement function. Line of Sight, Moving, In Range, Facing Player, Ground Check, Hitting Wall (to jump over)
{
	if(Mathf.Abs(transform.position.x-backOfTruck.position.x)<6)		//Checks if the enemy is close enough to see.
		inRange=true;
	else
		inRange=false;
		
	if(Vector2.Distance(transform.position,backOfTruck.position)<.8 && !feared)		//Checks if the enemy is close enough to melee.
		meleeRange=true;
	else
		meleeRange=false;
	
	//if(!meleeRange&&inLOS&&seenPlayer||feared)		//If the enemy isn't in melee range, move forward. Or, if enemy is feared, flee.
	if(!meleeRange&&(!onGround&&!hittingWall||onGround&&!hittingWall)&&inLOS||!meleeRange&&!inLOS&&Mathf.Abs(transform.position.y-backOfTruck.position.y)<2&&!hittingWall||feared)
	{
			rb2D.velocity.x=3*transform.localScale.x*modSpeed*startSpeed*hamSpeed;		//Sets the X velocity to move him the direciton he's facing multiplied by modSpeed (frozen modifier), the startSpeed (to vary enemy to enemy from stacking), and the hamSpeed (if enemy has been Hamstringed by an arrow).
	}
	
	if((transform.localScale.x==-1&&(transform.position.x>backOfTruck.position.x))||transform.localScale.x==1&&(transform.position.x<backOfTruck.position.x)) //Checks if enemy is facing the player or not.
		facingPlayer=true;
	else
		facingPlayer=false;
        
    if (Physics2D.Linecast (transform.position, Vector2(transform.position.x,transform.position.y-.7), mask))		//Checks if the enemy is on the ground by drawing a line 0.5 Y straight down.
    	onGround=true;
    else
    	onGround=false;
    	
	//check for obstacle to jump over
	//Debug.DrawRay(Vector2(transform.position.x,transform.position.y-.44),Vector2.right*transform.localScale.x*.5);
	var obstacleHit:RaycastHit2D = Physics2D.Raycast(Vector2(transform.position.x,transform.position.y-.44),Vector2.right*transform.localScale.x,1,mask);
	if(obstacleHit)
	{
		var slopeAngle:float = Vector2.Angle(obstacleHit.normal,obstacleHit.transform.up);
		if(slopeAngle==90)
		{
			if(onGround&&inRange&&facingPlayer&&!meleeRange)
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

	if(meleeRange&&Mathf.Abs(rb2D.velocity.x)>0)		//stop movement if in melee range
	{
		rb2D.velocity.x=0;
		swing=true;
	}

    if(!onGround&&rb2D.velocity.y<1&&rb2D.velocity.y>-1)	//make sure he doesn't get stuck on the edge of box
  		rb2D.AddForce(Vector2.right*20*-transform.localScale.x);

} 


/*-----------------------------------------------------------------------------------------------------------------------------------------*/


function FacePlayer()		//Determines which direction the player is and faces him if he's been seen.
{

	if(backOfTruck.transform.position.x > transform.position.x)
		if(!feared)		//Enemy faces away if he's been feared.
			transform.localScale.x = 1;
		else
			transform.localScale.x = -1;
	else if(backOfTruck.transform.position.x < transform.position.x)
		if(!feared)		//Enemy faces away if he's been feared.
			transform.localScale.x = -1;
		else
			transform.localScale.x = 1;
}



/*-----------------------------------------------------------------------------------------------------------------------------------------*/


//Melee
function Attacks()		//Determines what to do: throw/punch/kick.
{

}

function SeenPlayer()
{

}


/*-----------------------------------------------------------------------------------------------------------------------------------------*/


function TakeDamage(damage:float)
{
	if(!hit)
	{
		hit=true;
		anim.SetTrigger("hit2");
		yield WaitForSeconds(.1);
		hit=false;
	}
	if(!frozen)
	{
		if(enemyHP>0)
			enemyHP-=damage;		//Apply damage to health.
	}
}

//Death
function Kill()
{
	if(enemyHP==0)
	{
		nearbyEnemies.enemiesNear.Remove(gameObject.transform);		//Removes this enemy from array of enemies.
		if(!dead)
		{
			anim.SetTrigger("death");		//Play death animation.
			GameController.stats.standardKilled++;		//Adds 1 death to stats.
			dead=true;
			if(BloodLustScript.usingBloodLust)
				EnemiesKilled.enemiesKilled++;		//Adds to enemies killed on bloodlust to regenerate HP.
		}
		yield WaitForSeconds(6);
		if(GameObject.Find("spear(Clone)") != null)		//Finds if the spear is inside of this enemy.
			GameObject.Find("spear(Clone)").transform.parent=null; //Unparent it so it falls to the ground to be picked up.
		//Destroy(gameObject);		//Removes this enemy from the world.
		gameObject.SetActive(false);
	}
}


/*-----------------------------------------------------------------------------------------------------------------------------------------*/


function Misc()		//Random things like stun protect, adjusting for different cases etc.
{
	
	if(!stunned&&!dead)
		stunProtect+=Time.deltaTime;	//Protects from being chain stunned (2 second delay)
	else
	{
		stunProtect=0;
		
		if(GameController.playerController.freezePlayer2)
			GameController.playerController.freezePlayer2=false;		//If the enemy gets stunned or dies while throwing/grabbing you, unfreeze the player.
	}
}


/*-----------------------------------------------------------------------------------------------------------------------------------------*/


function FixedUpdate()
{

}


/*-----------------------------------------------------------------------------------------------------------------------------------------*/


//Status Effects
function KnockBack(knockForce:Vector2)
{
	//rb2D.AddForce(Vector2.right * transform.localScale.x * (knockForce*50));
	rb2D.AddForce(knockForce);
	gettingKnocked=true;
	yield WaitForSeconds(.25);
	gettingKnocked=false;
	rb2D.velocity.x=0;
}

function Stun(x:float)
{
	if(stunProtect>2)
	{
		anim.SetTrigger("stunned");
		if(!spawnedStunStar)		//Spawn the stun stars at the Stun Star Location.
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
	electrocuted=true;		//For electrocution "pulse".
	yield WaitForSeconds(x);
	electrocuted=false;
}

function Hamstring()
{
	hamSpeed=.5;	//Slows enemy movement by 50% if hamstringed.
	yield WaitForSeconds(3);
	hamSpeed=1;
}

function Frozen()
{
	if(frozen||electrocuted)	//Freeze animations if frozen or electrocuted.
		anim.enabled=false;
	else
		anim.enabled=true;
	
	if(dead||electrocuted)		//Freeze movement if frozen or dead.
		rb2D.isKinematic=true;
	else
		rb2D.isKinematic=false;


	if(modSpeed==0) //If he can't move anymore, freeze him.
		frozen=true;
	else
		frozen=false;
	
	if(frozen)
		rb2D.mass=.1;	//Makes him pushable while in an ice cube.
	else
	{
		rb2D.mass=1;		//Sets him back to regular mass.
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

function MeatHammer()
{
	var meatSplosionClone = Instantiate(meatSplosion, Vector2(transform.position.x+transform.localScale.x,transform.position.y-.5),Quaternion.identity);
	meatHammerCount++;
	if(meatHammerCount==4&&GameController.gameControllerScript.levelScript.meatScore>0)
	{
		var meatClone=Instantiate(meats[Random.Range(0,meats.Length-1)],Vector2(transform.position.x+transform.localScale.x*1.5,transform.position.y-1),Quaternion.identity);
		meatHammerCount=0;
		meatClone.GetComponent(Rigidbody2D).velocity.x=-6;
		meatClone.GetComponent(Rigidbody2D).velocity.y=2.5;
		GameController.gameControllerScript.levelScript.meatScore-=1;
	}
}

function Alerted()
{

}