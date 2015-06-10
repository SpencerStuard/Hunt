var sprayTan:GameObject;
var sprayTanVomit:GameObject;
var mouth:Transform;
var sprayFrom:Transform;

var karateSounds:AudioClip[];

var anim:Animator;

var talkedTo:boolean;
var talkedTo2:boolean; //won
var talkedTo3:boolean; //lost
var sparring:boolean;
var round:int;

var inRange:boolean;

var col1:GameObject;
var col2:GameObject;
var col3:GameObject;

//hp bar
var screenPosition:Vector3;
var background:Texture2D;
var foreground:Texture2D;
var frame:Texture2D;
var enemyHP:float;
var maxHP:int;

var modSpeed:int;

var hit:boolean;

var randomNumber:int;
var randomTimer:float;

var rolling:boolean;

var flyingKick:boolean;
var onGround:boolean;

var mask:LayerMask;
var isJumping:boolean;

var ready:boolean;

var talkSounds:boolean;

var playerWin:int;
var playerWon:boolean;
var karateWin:int;
var karateWon:boolean;
var saved:boolean;


var rb2D:Rigidbody2D;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	modSpeed=1;
	enemyHP=10;
	maxHP=enemyHP;
	round=0;
	anim=GetComponent(Animator);
	//InvokeRepeating("RandomNumber",0,Random.Range(5,10));
	playerWon=false;
	karateWon=false;
	karateWin=0;
	sparring=false;
	if(GameController.stats.karateMasterWins==0)
	{
		playerWin=0;
		talkedTo=false;
		talkedTo2=false;
		talkedTo3=false;
	}
	else
	{
		playerWin=2;
		talkedTo=true;
		talkedTo2=true;
	}
}

function Update ()
{
	HPGui();
	anim.SetBool("flyingKick",flyingKick);
	anim.SetBool("isJumping",isJumping);
	anim.SetBool("onGround",onGround);
	anim.SetInteger("randomNumber",randomNumber);
	anim.SetBool("sparring",sparring);
	anim.SetBool("inRange",inRange);
	anim.SetFloat("hSpeed",rb2D.velocity.x);
	anim.SetBool("rolling",rolling);
	if(!sparring)
	{
		WalkBackToSpot();
		if(talkSounds)
		PlayerWalkBackToSpot();
		
	}
	if(talkedTo)
		Spar();
	if(sparring&&enemyHP==0)
	{
		playerWin++;
		Colliders(2);
		Colliders(4);
		Colliders(6);
		sparring=false;
		enemyHP=maxHP;
		//talkedTo=false;
		inRange=false;
		AudioSource.PlayClipAtPoint(karateSounds[5], transform.position, Options.sfxVolume);
		//round++;
	}
	if(!sparring&&ready&&round>0)
		talkedTo=true;
	var hit: RaycastHit2D = Physics2D.Raycast(transform.position, -Vector2.up,1,mask);
	if(hit)
		onGround=true;
	else
		onGround=false;
	
	if(hit&&randomNumber==3)
	{	
		flyingKick=false;
		Colliders(6);
		//RandomNumber();
	}
	if(sparring||playerWin==2||karateWin==2)
		ready=false;
	
	if(sparring&&GameController.health.currentHealth<=2)
		PlayerLose();
}

function SprayTan()
{
	var sprayTanClone = Instantiate(sprayTan, sprayFrom.position, Quaternion.Euler(sprayTan.transform.eulerAngles.x,sprayTan.transform.eulerAngles.y*transform.localScale.x,sprayTan.transform.eulerAngles.z));
}

function Vomit()
{
	var sprayTanVomitClone = Instantiate(sprayTanVomit, mouth.position, transform.rotation);
	AudioSource.PlayClipAtPoint(karateSounds[9], transform.position, Options.sfxVolume);
}

function TakeDamage(damage:float)
{
	enemyHP-=damage;
	if(!hit)
	{
		hit=true;
		anim.SetTrigger("hit2");
		yield WaitForSeconds(1.3);
		hit=false;
	}
		if(enemyHP<0)
			enemyHP=0;
}

function Spar()
{
	if(randomNumber!=2&&randomNumber!=3&&sparring)
		FacePlayer();
	
	if(!sparring&&!talkSounds&&ready)
	{
		talkSounds=true;
		AudioSource.PlayClipAtPoint(karateSounds[round], transform.position, Options.sfxVolume);
		yield WaitForSeconds(1.5);
		AudioSource.PlayClipAtPoint(karateSounds[3], transform.position, Options.sfxVolume);
		yield WaitForSeconds(1.5);
		AudioSource.PlayClipAtPoint(karateSounds[4], transform.position, Options.sfxVolume);
		yield WaitForSeconds(.5);
		round++;
		sparring=true;
		talkSounds=false;
	}
	if(round!=0&&sparring)
	{
		gameObject.tag="Enemy";
		//anim.SetTrigger("MeleeCombo");
		if(randomNumber==0)
			MeleeCombo();
		else if(randomNumber==1)
			RollAway();
		else if(randomNumber==2)
			RollTowards();
		else if (randomNumber==3&&onGround)
			JumpKick();		
	}
	else if(!sparring)
		gameObject.tag="NPCKarate";
}

function FacePlayer()
{
	if(GameController.player.transform.position.x-.5 > transform.position.x)
		transform.localScale.x = 1;
	else if(GameController.player.transform.position.x+.5 < transform.position.x)
		transform.localScale.x = -1;
}

function OnGUI()
{
	if(Options.hpBars&&sparring)
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
	if(x==5)
		col3.layer=bpLayerz.ENEMY;
	if(x==6)
		col3.layer=bpLayerz.ENEMYLIMB;	
}

function MeleeCombo()
{
	if(Mathf.Abs(transform.position.x-GameController.player.transform.position.x)>1.5)
		{
			rb2D.velocity.x=3*transform.localScale.x;
			inRange=false;
		}
		else
			inRange=true;
}

function RollAway()
{
	//Debug.Log("#### 3 - ROLL");
	rolling=true;
	//jumped=false;
	//backingOff=false;
	//threeInUse=true;
	
	//rb2D.velocity.y=0;
	rb2D.velocity.x=9*-transform.localScale.x;
	yield WaitForSeconds(.4);
	rolling=false;
	randomNumber=0;
}

function RollTowards()
{
	//Debug.Log("#### 3 - ROLL");
	rolling=true;
	//jumped=false;
	//backingOff=false;
	//threeInUse=true;
	
	//rb2D.velocity.y=0;
	rb2D.velocity.x=6.5*transform.localScale.x;
	rolling=true;
	yield WaitForSeconds(.5);
	rolling=false;
	randomNumber=0;
}

function JumpKick()
{
	//roll away
	rolling=true;
	rb2D.velocity.x=9*-transform.localScale.x;
	yield WaitForSeconds(.4);
	rb2D.velocity.x=0;
	rolling=false;
	//jump
	isJumping=true;
	onGround=false;
	rb2D.velocity.y=6;
	yield WaitForSeconds(.5);
	isJumping=false;
	//rb2D.velocity.x=0;
	//rb2D.velocity.y=0;
	//kick
	flyingKick=true;
	rb2D.velocity.x=10*transform.localScale.x;
	rb2D.velocity.y=-9;
	Colliders(5);
/*	var hit: RaycastHit2D = Physics2D.Raycast(transform.position, -Vector2.up,1,mask);
	if(hit)
	{
		onGround=true;	
		rb2D.velocity.x=0;
		rb2D.velocity.y=0;
		flyingKick=false;
		Colliders(6);
		RandomNumber();
	}*/

}

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag==("Player")&&flyingKick)
	{	
		flyingKick=false;
		rb2D.velocity.x=0;
		rb2D.velocity.y=0;
		anim.SetTrigger("FlipBack");
		JumpBack();
		RandomNumber();			
	}
	if(col.gameObject.tag==("Land")&&flyingKick&&randomNumber==3)
	{
		flyingKick=false;
		randomNumber=Random.Range(0,3);
	}
/*	if(col.gameObject.tag==("Land")&&!onGround)
	{
		rb2D.velocity.x=0;
		rb2D.velocity.y=0;
		flyingKick=false;
		onGround=true;
		RandomNumber();
	}*/		
}

function JumpBack()
{
	rb2D.AddForce(Vector2.up * 350);
	rb2D.AddForce(Vector2.right * -85 * transform.localScale.x);
}


function RandomNumber()
{
	randomNumber=Random.Range(0,4);
}

function WalkBackToSpot()
{
	if(transform.position.x<2.75)
	{
		rb2D.velocity.x=2;
		transform.localScale.x=1;
		//ready=false;
	}
	else if(transform.position.x>3.25)
	{
		rb2D.velocity.x=-2;
		transform.localScale.x=-1;
		//ready=false;
	}
	else
	{
		rb2D.velocity.x=0;
		transform.localScale.x=-1;
		yield WaitForSeconds(1);
		
		if(playerWin<2&&karateWin<2)
			ready=true;
		else if(playerWin==2)
		{
			playerWon=true;
			talkedTo2=true;
			GameController.stats.karateMasterWins=1;
			if(!saved)
			{
				saved=true;
				ItemsToSave.itemsToSave.SaveToFile();
			}
		}
		else if(karateWin==2)
		{
			karateWon=true;	
			talkedTo3=true;	
		}
	}
}

function PlayerWalkBackToSpot()
{
	if(GameController.player.transform.position.x<-5.25)
	{
		//GameController.playerController.freezePlayer=true;
		GameController.playerrb2D.velocity.x=4;
		GameController.player.transform.localScale.x=1;
		CharController.h=1;
	}
	else if(GameController.player.transform.position.x>-4.75)
	{
		//GameController.playerController.freezePlayer=true;
		GameController.playerrb2D.velocity.x=-4;
		GameController.player.transform.localScale.x=-1;
		CharController.h=1;
	}
	else
	{
		GameController.playerrb2D.velocity.x=0;
		GameController.player.transform.localScale.x=1;
		CharController.h=0;
		//GameController.playerController.freezePlayer=false;
	}
	
}

function PlayerLose()
{
	if(sparring)
		AudioSource.PlayClipAtPoint(karateSounds[6], transform.position, Options.sfxVolume);
	sparring=false;
	GameController.health.modifyHealth(30);
	karateWin++;
}

function Restart()
{
	round=0;
	playerWin=0;
	playerWon=false;
	karateWin=0;
	karateWon=false;
	randomNumber=0;
	talkedTo=false;
	talkedTo2=false;
	talkedTo3=false;
	enemyHP=maxHP;
}
