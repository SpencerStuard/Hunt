var sounds:AudioClip[];

var inRange:boolean;
var inLOS:boolean;
var mask:LayerMask;

var anim:Animator;

var barrel:GameObject;
var fireFrom:Transform;
var deployed:boolean;
var projectile:GameObject;
var waitTime:float;

var playedSound:boolean;
var playedSound2:boolean;

var smoke:GameObject;

//Health
var enemyHP:float;
var maxHP:float;
var dead:boolean;
//Health Bar
var background:Texture2D;
var foreground:Texture2D;
var frame:Texture2D;
var screenPosition:Vector3;

//useless
var seenPlayer:boolean;
var isTurret:boolean;

function Start () 
{
	isTurret=true;
	anim=GetComponent(Animator);
	inRange=false;
	inLOS=false;
	firing=false;
	maxHP=20;
	enemyHP=maxHP;
}

function Update ()
{
	if(!dead)
	{
		Animations();
		InRange();
		LineOfSight();
		AimAtPlayer();
		if(deployed&&waitTime>4)
			Fire();
		if(deployed)
			waitTime+=Time.deltaTime;

	}
	Kill();
}

function LateUpdate()
{
	HPGui();
}

function Animations()
{
	anim.SetBool("inRange",inRange);
}

function InRange()
{
	if(Vector2.Distance(transform.position,GameController.player.transform.position)<8)
		inRange=true;
	else
	{
		if(inRange)
		{
			//yield WaitForSeconds(1);
			//if(Vector2.Distance(transform.position,GameController.player.transform.position)>8)
				inRange=false;
		}
		if(!playedSound2&&deployed)
		{
			playedSound2=true;
			AudioSource.PlayClipAtPoint(sounds[2], transform.position, Options.sfxVolume);
		}
		waitTime=2;
		barrel.transform.rotation = Quaternion.Slerp(barrel.transform.rotation,Quaternion.Euler(0, 0, 0),Time.deltaTime*3);
		yield WaitForSeconds(1);
		deployed=false;
		playedSound2=false;
	}
	
	if(inRange&&!deployed)
	{
		if(!playedSound)
		{
			playedSound=true;
			AudioSource.PlayClipAtPoint(sounds[1], transform.position, Options.sfxVolume);
		}
		yield WaitForSeconds(1);
		deployed=true;
		playedSound=false;
	}

}

function LineOfSight()
{
	if (!Physics2D.Linecast (transform.position, GameController.player.transform.position, mask)&&!CharController.inCover)
		inLOS=true;
	else
		inLOS=false;
}

function AimAtPlayer()
{
	if(deployed)
	{
	    var diff:Vector3 = (GameController.player.transform.position) - barrel.transform.position;
		diff.Normalize();
		var rot_z:float = Mathf.Atan2(diff.y, diff.x) * Mathf.Rad2Deg;
		barrel.transform.rotation = Quaternion.Slerp(barrel.transform.rotation,Quaternion.Euler(0, 0, rot_z - 90),Time.deltaTime*2);
	}
	//else
		//barrel.transform.eulerAngles.z=0;
		//barrel.transform.rotation = Quaternion.Slerp(barrel.transform.rotation,Quaternion.Euler(0, 0, 0),Time.deltaTime*2);
}


/*-----------------------------------------------------------------------------------------------------------------------------------------*/


function Fire()
{
	var fireBallClone=Instantiate(projectile,fireFrom.position,Quaternion.identity);
	AudioSource.PlayClipAtPoint(sounds[0], transform.position, Options.sfxVolume);
	fireBallClone.GetComponent(Rigidbody2D).AddForce(fireFrom.transform.up*350);
	waitTime=0;
	yield WaitForSeconds(.1);
	fireBallClone.layer=bpLayerz.ENEMYPROJECTILE;
	if(GameController.player.transform.position.x < transform.position.x)
		barrel.transform.eulerAngles.z-=15;
	else
		barrel.transform.eulerAngles.z+=15;
	var smokeClone=Instantiate(smoke,fireFrom.position,Quaternion.identity);
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
	if(Options.hpBars)
	{
            GUI.DrawTexture(new Rect(screenPosition.x, screenPosition.y-(195*ScreenSize.Y), 100*ScreenSize.X, 20*ScreenSize.Y), background, ScaleMode.StretchToFill);
            GUI.DrawTexture(new Rect(screenPosition.x, screenPosition.y-(195*ScreenSize.Y), 100*(enemyHP/maxHP)*ScreenSize.X, 20*ScreenSize.Y), foreground, ScaleMode.StretchToFill);
            GUI.DrawTexture(new Rect(screenPosition.x, screenPosition.y-(195*ScreenSize.Y), 103*ScreenSize.X, 23*ScreenSize.Y), frame, ScaleMode.StretchToFill);
    }
}


/*-----------------------------------------------------------------------------------------------------------------------------------------*/


function TakeDamage(damage:float)
{
		enemyHP-=damage;		//Apply damage to heath.
		if(enemyHP<0)		//Prevents enemy from going under 0 for Kill()
			enemyHP=0;
}

//Death
function Kill()
{
	if(enemyHP==0)
	{
		//nearbyEnemies.enemiesNear.Remove(gameObject.transform);		//Removes this enemy from array of enemies.
		//anim.SetTrigger("Death1");		//Play death animation.
		if(!dead)
		{
			GameController.stats.standardKilled++;		//Adds 1 death to stats.
			dead=true;
			if(BloodLustScript.usingBloodLust)
				EnemiesKilled.enemiesKilled++;		//Adds to enemies killed on bloodlust to regenerate HP.
		}
		yield WaitForSeconds(2.5);
		if(GameObject.Find("spear(Clone)") != null)		//Finds if the spear is inside of this enemy.
			GameObject.Find("spear(Clone)").transform.parent=null; //Unparent it so it falls to the ground to be picked up.
		Destroy(gameObject);		//Removes this enemy from the world.
	}
}


/*-----------------------------------------------------------------------------------------------------------------------------------------*/

function Alerted()
{
//to prevent errors
}