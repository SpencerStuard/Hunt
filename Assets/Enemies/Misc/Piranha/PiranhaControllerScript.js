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

var rs:float;

//Meat Drops
var meats:GameObject[];

var rb2D:Rigidbody2D;

function Start () 
{
	rb2d = GetComponent(Rigidbody2D);
	modSpeed=1;
	hamSpeed=1;
	maxHP=20;
	enemyHP=maxHP;
	anim=GetComponent(Animator);
	nearbyEnemies = GameController.gameController.GetComponent(NearbyEnemies);		//For social enemies.
	startSpeed=Random.Range(.75,1.5);
//	number=1;
//	InvokeRepeating("RandomNumber",2,2);	//For enemies that combo
//	InvokeRepeating("PunchNumber",1,1);		//To make enemies attack Up/Down.
}

function Update () 
{
	if(Time.timeScale > 0)
	{
		//Animations();	//Controls most transitions
		
		if(!frozen&&!stunned&&!dead)
		{
			CoreMovement();
			//if(seenPlayer&&!hasPlayer)
			FacePlayer();
			//if(!feared)
			//	Attacks();
		}
		
		
		//HPGui();		//Health bar.
		
		Kill();			//If enemy dies.
		
		Misc();
		
		//Frozen();		//Frozen status effects, cubing, movespeed etc.
		
		//SlopeAdjust();		//Apply force opposite of the slope's normal to smooth moving and prevent sliding
		
		if(enemyHP<0)		//Prevents enemy from going under 0 for Kill()
			enemyHP=0;
	}
}


/*-----------------------------------------------------------------------------------------------------------------------------------------*/


function Animations()
{
	anim.SetFloat("hSpeed",rb2D.velocity.x);		//Moving back/forward for run anim
	//anim.SetFloat("vSpeed",rb2D.velocity.y); //Falling
	anim.SetBool("meleerange",meleeRange);		//In melee range
	anim.SetInteger("number",number);		//Combo number
	anim.SetBool("stun",stunned);		//Stun
	anim.SetBool("onGround",onGround);
}


/*-----------------------------------------------------------------------------------------------------------------------------------------*/


//HP Bar
function HPGui()		//Positions the HP bar above the enemy.
{
	screenPosition = Camera.main.WorldToScreenPoint(Vector2(transform.position.x-.425,transform.position.y));
	screenPosition.y = Screen.height - screenPosition.y  + 45;
}

/*function OnGUI()		//Sets the frame, background, and adjusts the current HP bar to the enemies current HP.
{
	if(Options.hpBars&&!dead)
	{
            GUI.DrawTexture(new Rect(screenPosition.x, screenPosition.y-(195*ScreenSize.Y), 100*ScreenSize.X, 20*ScreenSize.Y), background, ScaleMode.StretchToFill);
            GUI.DrawTexture(new Rect(screenPosition.x, screenPosition.y-(195*ScreenSize.Y), 100*(enemyHP/maxHP)*ScreenSize.X, 20*ScreenSize.Y), foreground, ScaleMode.StretchToFill);
            GUI.DrawTexture(new Rect(screenPosition.x, screenPosition.y-(195*ScreenSize.Y), 103*ScreenSize.X, 23*ScreenSize.Y), frame, ScaleMode.StretchToFill);
    }
}*/


/*-----------------------------------------------------------------------------------------------------------------------------------------*/


function CoreMovement()		//Core movement function. Line of Sight, Moving, In Range, Facing Player, Ground Check, Hitting Wall (to jump over)
{
	if(Mathf.Abs(transform.position.x-GameController.player.transform.position.x)<6)		//Checks if the enemy is close enough to see.
		inRange=true;
	else
		inRange=false;
		
	if(Vector2.Distance(transform.position,GameController.player.transform.position)<1)		//Checks if the enemy is close enough to melee.
		meleeRange=true;
	else
		meleeRange=false;
	
	//if(!meleeRange&&inLOS&&seenPlayer||feared)		//If the enemy isn't in melee range, move forward. Or, if enemy is feared, flee.
	//if(!meleeRange&&seenPlayer&&(!onGround&&!hittingWall||onGround&&!hittingWall)&&inLOS||!meleeRange&&seenPlayer&&!inLOS&&!hittingWall||feared)
	if(inRange)
	{
			rb2D.velocity.x=rs*-transform.localScale.x;//*modSpeed*startSpeed*hamSpeed;		//Sets the X velocity to move him the direciton he's facing multiplied by modSpeed (frozen modifier), the startSpeed (to vary enemy to enemy from stacking), and the hamSpeed (if enemy has been Hamstringed by an arrow).
	
		//if(thrown||stunned)
		//	thrown=false;
	
	
	if(transform.position.y>GameController.player.transform.position.y+.4)	//make him swim to your Y location
		rb2D.velocity.y=-2;
	else if(transform.position.y<GameController.player.transform.position.y-.4)
		rb2D.velocity.y=2;
	else	
		rb2D.velocity.y=0;
		
	}
		
	if((transform.localScale.x==-1&&(transform.position.x>GameController.player.transform.position.x))||transform.localScale.x==1&&(transform.position.x<GameController.player.transform.position.x)) //Checks if enemy is facing the player or not.
		facingPlayer=true;
	else
		facingPlayer=false;

    if (!Physics2D.Linecast (transform.position, GameController.player.transform.position, mask)&&!CharController.inCover&&facingPlayer)		//Draws a line from the enemy to the player, if it connects, he's in Line of Sight.
    {
		if(!seenPlayer&&inRange)		//If enemy hasn't seen the player and is in range, enemy is alerted to player presence.
			SeenPlayer();
		inLOS=true;
	}
    else
		inLOS=false;
        
    if (Physics2D.Linecast (transform.position, Vector2(transform.position.x,transform.position.y-.7), mask))		//Checks if the enemy is on the ground by drawing a line 0.5 Y straight down.
    	onGround=true;
    else
    	onGround=false;
    	
	//check for obstacle to jump over
	/*Debug.DrawRay(Vector2(transform.position.x,transform.position.y-.44),Vector2.right*transform.localScale.x*.5);
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
		hittingWall=false;*/

	if(meleeRange&&Mathf.Abs(rb2D.velocity.x)>0)		//stop movement if in melee range
		rb2D.velocity.x=0;

   /* if(!onGround&&rb2D.velocity.y<1&&rb2D.velocity.y>-1)	//make sure he doesn't get stuck on the edge of box
  		rb2D.AddForce(Vector2.right*20*-transform.localScale.x);*/

} 


/*-----------------------------------------------------------------------------------------------------------------------------------------*/


function FacePlayer()		//Determines which direction the player is and faces him if he's been seen.
{

	if(GameController.player.transform.position.x > transform.position.x)
		if(!feared)		//Enemy faces away if he's been feared.
			transform.localScale.x = -1;
		else
			transform.localScale.x = 1;
	else if(GameController.player.transform.position.x < transform.position.x)
		if(!feared)		//Enemy faces away if he's been feared.
			transform.localScale.x = 1;
		else
			transform.localScale.x = -1;
}


/*-----------------------------------------------------------------------------------------------------------------------------------------*/


//Alerted to player's presence
function SeenPlayer()
{
	seenPlayer=true;
	nearbyEnemies.AlertEnemiesNearBy();		//Sent from EnemiesNear script to alert other nearby enemies.
}

function Alerted()
{
	if(!alerted)		//Spawns the exclamation point.
	{
		alerted=true;
		var alertClone=Instantiate(alert,Vector2(transform.position.x,transform.position.y+1.5),Quaternion.identity);
		alertClone.transform.parent=transform;
		Destroy(alertClone,.5);
	}
}


/*-----------------------------------------------------------------------------------------------------------------------------------------*/


//Melee
function Attacks()		//Determines what to do: throw/punch/kick.
{
	if(!thrown&&CharController.onGround&&facingPlayer)
	{	
		if(number==1&&modSpeed==1&&!Health.playerIsDead)
			ThrowPlayer();
		if(number==0||number==4)
			Punch();
		if(number==2||number==3)
			Kick();
	}
}

function Punch()
{
	if(meleeRange)		//If enemy is close enough to hit, set punch attack loop.
		anim.SetTrigger("punch");
}

function Kick()
{
	if(meleeRange)		//If enemy is close enough to hit, set kick attack loop.
		anim.SetTrigger("kick");
}

function RandomNumber()		//Determines attack being used in Attacks().
{
	number=Random.Range(0,5);
}

function PunchNumber()		//Determines punch/kick angle.
{
	if(!Health.playerIsDead)
		anim.SetFloat("PunchAngle",Random.Range(-1,2));
	else
		anim.SetFloat("PunchAngle",-1);
}

/*function Colliders(x:int)		//Punching/Kicking animations send a message to turn the colliders hostile during attacks and deactivate them on when not punching/kicking.
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
}*/


/*-----------------------------------------------------------------------------------------------------------------------------------------*/


//Throw
function ThrowPlayer()
{
	if(meleeRange)
		if(!GameController.playerController.freezePlayer2&&!GameController.playerController.freezePlayer2)
		{
			thrown=true;
			for (var child : Transform in transform)		//While throwing, set the enemy sprites to the top layer.
			{
				if(child.GetComponent(SpriteRenderer)!=null)
					child.GetComponent(Renderer).sortingLayerName = "Effects";
			}
	
			CharController.punching=false;		//Stops player from hitting when grabbed
			GameController.playerController.freezePlayer2=true;		//Freezes player but doesn't remove his weapons/items.
			anim.SetTrigger("throw");		//Begins throw animation
			yield WaitForSeconds(.2);
			GameController.anim.SetTrigger("hit2freeze");		//Makes player appear stunned.
			hasPlayer=true;			//Says the enemy is grabbing the player.
			GameController.player.transform.position=hand.transform.position;		//Moves the player along with the enemy hand.
			GameController.player.transform.rotation=hand.transform.rotation;		//Rotates player along with the enemy hand.
			var rdmn:int;
			rdmn=Random.Range(0,2);		//Determines what direction enemy will throw the player.
			if(rdmn==0)
				transform.localScale.x=1;
			else
				transform.localScale.x=-1;
		}
}

function Throw()		//Called during the peak of the throwing animation.
{
			GameController.playerController.freezePlayer2=false;		//Lets the player go.
			yield WaitForEndOfFrame;
			GameController.playerController.KnockBack(Vector2(transform.localScale.x*400,200));		//Throws the player
			hasPlayer=false;		//Enemy has released the player.
			GameController.health.modifyHealth(-5);		//Hurts player.
			GameController.anim.SetTrigger("thrown");		//Sets the player to look like he's been thrown and remains on his back until touches ground, or 2 seconds (whichever is sooner).
			GameController.playerController.thrown=true;		//Tells the player he's been thrown to disable some functionality.
			for (var child : Transform in transform)		//Sets the enemy sprites back to the enemy layer as normal.
			{
				if(child.GetComponent(SpriteRenderer)!=null)
					child.GetComponent(Renderer).sortingLayerName = "Enemy";
			}
			GameController.player.transform.rotation.z=0;		//Re-aligns player to the ground.
			GameController.playerController.groundTimer=0;		//Makes sure the game knows he's in the air.
}


/*-----------------------------------------------------------------------------------------------------------------------------------------*/


function TakeDamage(damage:float)
{
	if(!frozen)
	{
		if(!seenPlayer)			//If enemy hasn't spotted the player, turn him around to face player.
			transform.localScale.x=-GameController.player.transform.localScale.x;
		if(enemyHP>0)
			enemyHP-=damage;		//Apply damage to heath.
		if(!hit)	//Puts enemy into the hit2 stun for 1.3 seconds to prevent spam attacks.
		{
			hit=true;
			anim.SetTrigger("hit2");
			yield WaitForSeconds(1.3);
			hit=false;
		}
	}
}

//Death
function Kill()
{
	if(enemyHP==0)
	{
		nearbyEnemies.enemiesNear.Remove(gameObject.transform);		//Removes this enemy from array of enemies.
		//anim.SetTrigger("Death1");		//Play death animation.
		if(!dead)
		{
			dead=true;
			GameController.stats.standardKilled++;		//Adds 1 death to stats.
			var meatClone=Instantiate(meats[Random.Range(0,meats.length)],transform.position,Quaternion.identity);
			if(BloodLustScript.usingBloodLust)
				EnemiesKilled.enemiesKilled++;		//Adds to enemies killed on bloodlust to regenerate HP.
		}
		yield WaitForSeconds(2.5);
		if(GameObject.Find("spear(Clone)") != null)		//Finds if the spear is inside of this enemy.
			GameObject.Find("spear(Clone)").transform.parent=null; //Unparent it so it falls to the ground to be picked up.
		//Destroy(gameObject);		//Removes this enemy from the world.
		gameObject.SetActive(false);
	}
}


/*-----------------------------------------------------------------------------------------------------------------------------------------*/


function Misc()		//Random things like stun protect, adjusting for different cases etc.
{
	if(hasPlayer)		//For throwing player.
	{
		GameController.player.transform.position=hand.transform.position;
		GameController.player.transform.rotation=hand.transform.rotation;
	}
	
	if(!stunned&&!dead)
		stunProtect+=Time.deltaTime;	//Protects from being chain stunned (2 second delay)
	else
	{
		stunProtect=0;
		
		if(GameController.playerController.freezePlayer2)
			GameController.playerController.freezePlayer2=false;		//If the enemy gets stunned or dies while throwing/grabbing you, unfreeze the player.
		
		if(hasPlayer)
		{
			hasPlayer=false;		//Lets player have free action back.
			GameController.anim.SetTrigger("recover");		//Sets into recovering anim to stand back up.
			GameController.player.transform.eulerAngles=Vector3(0,0,0);		//Unrotates from grab.
		}
	}
}


/*-----------------------------------------------------------------------------------------------------------------------------------------*/


/*function SlopeAdjust()
{
	var hit: RaycastHit2D = Physics2D.Raycast(transform.position, -Vector2.up,2,mask); //defines hitting the ground mask
	if(hit)
	{
		slopeAngle2 = Vector2.Angle(hit.normal,hit.transform.up);		//gets the angle of the slope
		if(onGround)
			surfaceNormal=Vector3.Lerp(surfaceNormal,hit.normal,Time.deltaTime*10);		//if the player is touching the ground (onGround is it's own variable defined above), lerp the surfaceNormal so it's smooth
		else
			surfaceNormal=Vector3(0,0,0);		//otherwise 0 out the surface normal so jumping isn't affected
	}
	else
	{
		slopeAngle2=0;		//otherwise don't worry about it
		surfaceNormal=Vector3(0,0,0);	
	}
}

function FixedUpdate()
{
	if(slopeAngle2>10)		//if the slope is great enough to be an issue in the first place...
		rb2D.AddForce(-surfaceNormal*15);		//add a constant force in the negative of the slope's normal, i.e. down and left if the slope is like \
}

*/
/*-----------------------------------------------------------------------------------------------------------------------------------------*/

/*
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
*/
function Fear()
{
	fearTimer+=6;
	feared=true;
	yield WaitForSeconds(fearTimer);
	feared=false;
}
