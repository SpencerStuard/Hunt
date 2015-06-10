import System.Collections.Generic;

var enemiesNear = new List.<Transform>();

var anim:Animator;

//flying kick
var jumped:boolean;
var kicked:boolean;
var backingOff:boolean;

//melee
var attacking:boolean;
var distancetoAttack:float;

//rolling
var rolling:boolean;

//ground check
var onGround:boolean;
var foot:Transform;
var groundCheck:Transform;
var mask:LayerMask;

//find nearest enemy position
var nearestEnemyPos:Vector2;
var playerPos:Vector2;

//Random Behavior
var rand:int;
var oneInUse:boolean;
var twoInUse:boolean;
var threeInUse:boolean;
var fourInUse:boolean;
var fiveInUse:boolean;

//piledriver
var pileDriver:boolean;
var bloodSquirt:GameObject;
var parented:boolean;

var inLOS:boolean;

var rightCollider:BoxCollider2D;

var hittingWall:boolean;

var rb2D:Rigidbody2D;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	//InvokeRepeating("RandomNumber",5,5);
	FlyingKick();
	//rand=3;
}

function Update ()
{
	EnemiesNear();
	

	
	if(onGround)
	anim.SetFloat("hSpeed",rb2D.velocity.x);
	anim.SetBool("attacking",attacking);
	anim.SetBool("rolling",rolling);
	anim.SetBool("onGround",onGround);
	anim.SetFloat("PunchAngle",1);
	anim.SetInteger("rand",rand);
	anim.SetBool("PileDriver",pileDriver);
	
	//if(enemiesNear.Count<1)
	//	enemiesNear.Add(null);	
	if(enemiesNear.Count==0)
	{
		attacking=false;
		FollowPlayer();
		fiveInUse=true;
		twoInUse=false;
		rand=5;
		inLOS=false;
		backingOff=false;
	}
	else if(enemiesNear[0]==null&&enemiesNear.Count==1)
		enemiesNear.RemoveAt(0);
	else if(enemiesNear[0]!=null&&enemiesNear.Count>0)
	{	
		if(rand==5)
			RandomNumber();
		fiveInUse=false;
		if (!Physics2D.Linecast (transform.position, Vector2(enemiesNear[0].position.x,enemiesNear[0].position.y+1), mask))
			inLOS=true;
		else
			inLOS=false;
			
			if(!rolling)
				FaceEnemy();
		if(onGround)
		if(enemiesNear[0].gameObject.name!="Compy(Clone)"&&!twoInUse&&!threeInUse&&!fourInUse&&!fiveInUse&&inLOS&&enemiesNear[0].GetComponent(MonoBehaviour).enemyHP < enemiesNear[0].GetComponent(MonoBehaviour).maxHP/4)
		{
			rand=1;
			PileDriver();
		}
		else if(inLOS&&rand==2&&!oneInUse&&!threeInUse&&!fourInUse&&!fiveInUse)
			MeleeCombo();
		else if(rand==3&&!oneInUse&&!twoInUse&&!threeInUse&&!fourInUse&&!fiveInUse)
			RollAway();
		else if(rand==4&&!oneInUse&&!twoInUse&&!threeInUse&&!fiveInUse)
			RollTowards();
		if(!inLOS)
		{
			oneInUse=false;
			rand=3;
		}

		
			
		if (Physics2D.Linecast (foot.transform.position, groundCheck.transform.position, mask))
			onGround=true;
		else
			onGround=false;
			
		
		nearestEnemyPos=enemiesNear[0].position - transform.position;
		playerPos=GameController.player.transform.position - transform.position;
		
			
		if(rolling&&onGround&&!oneInUse&&!fiveInUse)
			rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,-5,5);
		else if (onGround&&(!rolling&&!oneInUse)||fiveInUse)
			rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,-2,2);
		else if(oneInUse)
			rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,-3.5,3.5);
		
		//3 in use
		
		if((rand!=3))
			threeInUse=false;
		if(rand!=2)
			twoInUse=false;
		if(rand!=4)
			fourInUse=false;
			
		if(onGround&&backingOff&&jumped&&!kicked&&!attacking&&!twoInUse&&!threeInUse&&!fourInUse)
			RandomNumber();
			
		if((threeInUse||fiveInUse)&&onGround&&jumped)
			{
				threeInUse=false;
				backingOff=false;
				jumped=false;
			}
	}
	
	//if(twoInUse)
	//	rightCollider.enabled=true;
	//else
	//	rightCollider.enabled=false;
	
	//Check for Wall In Front Of KM
	WallJump();
}


function Move()
{
	//rb2D.AddForce(Vector2.right * 50 * transform.localScale.x);
	rb2D.velocity.x=(4 * transform.localScale.x);
}

function FlyingKick()
{
	//Debug.Log("#### 3 - KICK");
	rb2D.velocity.x=0;
	if(!jumped)
	{
		jumped=true;
		//rb2D.AddForce(Vector2.up * 650);
		rb2D.velocity.y=9;
		anim.SetTrigger("Jump");
	}
	yield WaitForSeconds(.6);
	if(!kicked)
	{
		kicked=true;
		//--gameObject.layer=bpLayerz.KARATE;
		anim.SetTrigger("JumpKick");
		//rb2D.AddForce(300 * nearestEnemyPos);
		rb2D.velocity=(13 * nearestEnemyPos);
	}
}

function OnCollisionEnter2D(col:Collision2D)
{
	if(col.gameObject.tag==("Enemy")&&!fourInUse)
	{	
		kicked=true;
		//--gameObject.layer=bpLayerz.IGNORELAYER;
		rb2D.velocity.x=0;
		rb2D.velocity.y=0;
		anim.SetTrigger("FlipBack");
		JumpBack();
		if(threeInUse)
			RandomNumber();
	}
	else
		kicked=false;
		////--gameObject.layer=bpLayerz.KARATE;
	if(col.gameObject.tag==("Land"))
		onGround=true;
		
}


function FaceEnemy()
{
	if(transform.position.x-2 > enemiesNear[0].position.x)
		transform.localScale.x = -1;

	else if(transform.position.x < enemiesNear[0].position.x)
		transform.localScale.x = 1;
}

function RollAway()
{
	//Debug.Log("#### 3 - ROLL");
	rolling=true;
	jumped=false;
	backingOff=false;
	threeInUse=true;
	
	rb2D.velocity.y=0;
		attacking=false;
		
		//rb2D.AddForce(Vector2.right * 500 * -transform.localScale.x);
		rb2D.velocity.x=8* -transform.localScale.x;
		yield WaitForSeconds(.3);
		rolling=false;
		FlyingKick();
}

function RollTowards()
{
	//Debug.Log("#### 4 - ROLL TOWARDS");
	rolling=true;
	//--gameObject.layer=bpLayerz.IGNORELAYER;
	fourInUse=true;
	//if((transform.position.x - enemiesNear[0].position.x)>(4*enemiesNear[0].localScale.x))
	if(rolling)
		rb2D.velocity.x=8* transform.localScale.x;
		//rb2D.AddForce(Vector2.right * 400 * transform.localScale.x);
	yield WaitForSeconds(.75);
		rolling=false;
	fourInUse=false;
	RandomNumber();
	//rand=2;
}

function JumpBack()
{
	if(!backingOff)
	{
		//rb2D.AddForce(Vector2.up * 350);
		rb2D.velocity.y=2;
		//rb2D.AddForce(Vector2.right * -85 * transform.localScale.x);
		rb2D.velocity.x=4*-transform.localScale.x;
		backingOff=true;
	}
}

function MeleeCombo()
{
//	Debug.Log("#### 2 - MELEE&MOVE");
	twoInUse=true;
	if(transform.localScale.x==1)
		distancetoAttack=.6;
	else
		distancetoAttack=2.1;
		
	if(Mathf.Abs(transform.position.x - enemiesNear[0].position.x)>distancetoAttack)
		Move();
		
	//else
	//{
	if(onGround&&Mathf.Abs(transform.position.x - enemiesNear[0].position.x)<distancetoAttack)
		{
			//--gameObject.layer=bpLayerz.KARATE;
			attacking=true;
			rb2D.velocity.x=0;
		}
		else
		{
			attacking=false;
		}
	//}	
}

function OnTriggerEnter2D(col:Collider2D)
{
	if((pileDriver&&enemiesNear.Count>0)&&col.gameObject.tag==("Land")&&enemiesNear[0].transform.localScale.y==-1)
	{
		var bloodSquirt = Instantiate(bloodSquirt, Vector2(enemiesNear[0].position.x-1, enemiesNear[0].position.y-.6), Quaternion.identity);
		Destroy(enemiesNear[0].gameObject);
		enemiesNear.RemoveAt(0);
		pileDriver=false;
		oneInUse=false;
		parented=false;
		rb2D.velocity.y=0;
		//rb2D.AddForce(Vector2.up * 350);
		rb2D.velocity.y=4;
	//	rb2D.AddForce(Vector2.right * -85 * transform.localScale.x);
		rb2D.velocity.x=2 * -transform.localScale.x;
	}
}

function PileDriver()
{
	attacking=false;
	oneInUse=true;
	//--gameObject.layer=bpLayerz.IGNORELAYER;
	
	if((onGround)&&Mathf.Abs(transform.position.x - enemiesNear[0].position.x)>1)
		rb2D.velocity.x=4*transform.localScale.x;
		//rb2D.AddForce(Vector2.right * 100 * transform.localScale.x);	
			
	if(Mathf.Abs(transform.position.x - enemiesNear[0].position.x)<.35)
	{	
		rb2D.velocity.x=0;
		if(enemiesNear[0].gameObject.GetComponent(Rigidbody2D)!=null)
			Destroy(enemiesNear[0].gameObject.GetComponent(Rigidbody2D));
		enemiesNear[0].gameObject.GetComponent(MonoBehaviour).enabled=false;
		if(enemiesNear[0].gameObject.GetComponent(AnimateRaptor)!=null)
			enemiesNear[0].gameObject.GetComponent(AnimateRaptor).enabled=false;
		//enemiesNear[0].localScale.x=transform.localScale.x*-1;
		pileDriver=true;
		enemiesNear[0].parent=transform;
		parented=true;
		if(parented)
		{
			enemiesNear[0].tag="NPCKarate";
	//		enemiesNear[0].localScale.x=transform.localScale.x;
			//enemiesNear[0].position.x=transform.position.x-.05*transform.localScale.x;
			//enemiesNear[0].position.y=transform.position.y+.5;
			if(ApplyDamageToParent.inMe&&GameObject.Find("spear(Clone)") != null)
			{
				GameObject.Find("spear(Clone)").transform.parent=null;
				GameObject.Find("spear(Clone)").GetComponent(Rigidbody2D).isKinematic=false;
			}
			//rb2D.AddForce(Vector2.up*500);
			rb2D.velocity.y=10;
			yield WaitForSeconds(1.25);
			rb2D.velocity.y=0;
			enemiesNear[0].transform.localScale.y=-1;
			enemiesNear[0].position.y=transform.position.y+.5;
			//rb2D.AddForce(Vector2.up*-900);
			rb2D.velocity.y=-16;
		}
	}
}

function EnemiesNear()
{
	var enemies = GameObject.FindGameObjectsWithTag ("Enemy");

	for (var enemy in enemies)
	{
		if(!enemiesNear.Contains(enemy.transform.parent))
			if(Vector2.Distance(transform.position,enemy.transform.position)<10)
				if(enemy.transform.parent!=null)
					enemiesNear.Add(enemy.transform.parent);

		if(!enemiesNear.Contains(enemy.transform))
			if(Vector2.Distance(transform.position,enemy.transform.position)<10)
				if(enemy.transform.parent==null)
					enemiesNear.Add(enemy.transform);
		
			for(var i:int = 0; i < enemiesNear.Count; i++)
			{
				if(enemiesNear[i]==null||(enemiesNear[i]!=null&&enemiesNear[i].gameObject.name!="Compy(Clone)"&&enemiesNear[i].GetComponent(MonoBehaviour).enemyHP<=0))
					enemiesNear.RemoveAt(i);
			}

		
		
		//if(enemiesNear.Contains(enemy.transform))
			//if(Vector2.Distance(transform.position,enemy.transform.position)>40)
		//		enemiesNear.Remove(enemy.transform);
	}
}

function RandomNumber()
{
	rand=Random.Range(2,5);
}

function FollowPlayer()
{
	if(GameController.player.transform.position.x-2 > transform.position.x)
		transform.localScale.x = 1;
	else if(GameController.player.transform.position.x < transform.position.x)
		transform.localScale.x = -1;
	
	if(Vector2.Distance(transform.position,GameController.player.transform.position)>2)//&&Vector2.Distance(transform.position,GameController.player.transform.position)<10)
		rb2D.velocity.x = (4 * transform.localScale.x);			
	else if(Vector2.Distance(transform.position,GameController.player.transform.position)>10&&onGround)
	{
	rb2D.velocity.x=0;
	if(!jumped)
	{
		jumped=true;
		//rb2D.AddForce(Vector2.up * 650);
		rb2D.velocity.y=8;
		anim.SetTrigger("Jump");
	}
	yield WaitForSeconds(.6);
	if(!kicked)
	{
		kicked=true;
		anim.SetTrigger("JumpKick");
		//rb2D.AddForce(300 * playerPos);
		rb2D.velocity=(8 * playerPos);
		if(transform.position.x - GameController.player.transform.position.x<3&&!onGround)
		{
			rb2D.velocity.x=0;
			rb2D.velocity.y=0;
			transform.position.y+=.5;
		}
	}
	}
	else	
		rb2D.velocity.x = 0;
}

function WallJump()
{
	
	Debug.DrawRay(Vector2(transform.position.x,transform.position.y),Vector2.right*transform.localScale.x*.5);
	var obstacleHit:RaycastHit2D = Physics2D.Raycast(Vector2(transform.position.x,transform.position.y),Vector2.right*transform.localScale.x,1,mask);
	if(obstacleHit)
	{
		var slopeAngle:float = Vector2.Angle(obstacleHit.normal,obstacleHit.transform.up);
		if(slopeAngle==90)
		{
			if(onGround)
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
	
}