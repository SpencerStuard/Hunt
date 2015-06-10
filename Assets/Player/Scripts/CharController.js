//var jumpSounds:AudioClip[];
//var jumpSounds2:AudioClip[];
//var chuteSounds:AudioClip[];

//directions
static var facingLeft:boolean=false;
static var facingRight:boolean=false;
static var runningForward:boolean;
static var runningBackwards:boolean;

//Movement
private var jumpForce=250;
private var moveForce=50.0;
static var maxSpeed=3.3;
static var runTimer:float=0;

var flip:boolean;

//horizontal and vertical
static var h:int;
static var v:int;

//ground time
var groundTimer:float;

//air time;
var inairTime:float;

static var onGround:boolean=false;
static var crouching:boolean;

//Weapon Arcs
var rockArc:Transform;
var spearArc:Transform;

//animation
var anim:Animator;
var atPeak:boolean;
var x:int; //for forwards/backwards

//Character Statuses
var ledgeGrab:boolean;
var grabTimer:float;
var platformGrab:boolean;
static var grabbingOn:boolean;
static var shimmy:boolean;
var climbingUp:boolean;
private var falling:boolean;
var grabbingRope:boolean;
static var swimming:boolean;
var waterTop:boolean;
static var punching:boolean;
var punch2:boolean;
var pushing:boolean;
static var knockedDown:boolean;
var knocked:boolean;
var knockTime:float;

//Fire
static var firePressed:boolean;
static var triggerDown:boolean;
var beingPressed:boolean;

//Magic
static var magicPressed:boolean;
static var magicTriggerDown:boolean;
var magicBeingPressed:boolean;

//unarmed
var unarmed:Unarmed;

//Jumping
var isJumping:boolean;
var isDoubleJumping:boolean;
var alreadyJumped:boolean;
private var alreadyDoubleJumped:boolean;
var actuallyJumping:boolean;

//rolling
var rollingLeft:boolean;
var rollingRight:boolean;
//var rollingForward:boolean;
//var rollingBackwards:boolean;
static var rolling:boolean;
private var rollTimer:float=0;
var lastRoll:float=0;

//cover
static var inCover:boolean;

//linecast checks
var mask:LayerMask;
var mask2:LayerMask;
var waterMask:LayerMask;
var slopemask:LayerMask;

//linecasts
var linecastHolder:GameObject[];
static var passableOverHead:boolean=false;
static var aboveHead:boolean=false;
var inWater:boolean;
private var canSeeOver:boolean=false;
private var seeOverEnabled:boolean=true;
private var inFrontHead:boolean=false;
private var inFrontHeadEnabled:boolean=true;
static var inBack:boolean=false;
static var inFront:boolean=false;
static var boxinFront:boolean=false;
static var ropeInFront:boolean;
var canRoll:boolean;

//Colliders
var boxColl:BoxCollider2D;
var circleColl:CircleCollider2D;

//Taking Damage
static var takingDamage:boolean;
var bowArm1:GameObject;
var bowArm2:GameObject;
var slingArm1:GameObject;
var slingArm2:GameObject;

var idleTimer:float;
var carlton:boolean;
static var idling:boolean;

var swordWeapon:GameObject;

var runCloud:GameObject;
var alreadyPoof:boolean;
var landCloud:GameObject;
var stompPoof:boolean;

//Parachute Item
var parachutePants:SpriteRenderer;
var usingChute:boolean;

//Hang Glider Item
var upTimer:float;

//EZ Bronze Item
static var usingEZBronze:boolean;

var skateAccelerate:boolean;
var hideBoardTrick:boolean;

//slope
var t:float;
var wheelMat:PhysicsMaterial2D;
static var sliding:boolean;
var slidingJump:boolean;
var slideSpeed:int;

//skate slope
var oldVelocity:Vector2;
var oldAngle:float;
//var keptVeloc:boolean;

static var onBelt:boolean;
static var conveyorSpeed:int;

static var inputFrozen:boolean;
var freezePlayer:boolean;
var freezePlayer2:boolean;

//normal test
var myForward:Vector3;
var surfaceNormal:Vector3;
var slopeAngle:float;

var thrown:boolean;

var startUp:boolean;
var endGame:boolean;

var stickDown:boolean;

var rb2D:Rigidbody2D;

//for autoskate mode
static var deltaPosition:float;
var maxForward:float;
var maxBackward:float;
var autoskateSpeed:float;
var autoskateBaseSpeed:float;
var autoskateMaxSpeed:float;
var inPit:boolean;

function Awake()
{
	rockArc = GameObject.Find("RockWeapon").transform;
	spearArc = GameObject.Find("SpearWeapon").transform;
	
	unarmed = GameObject.Find("Unarmed").GetComponent(Unarmed);
	
	bowArm1 = GameObject.Find("Left Arm");
	bowArm2 = GameObject.Find("Right Arm");
	slingArm1 = GameObject.Find("arm_whole_left");
	slingArm2 = GameObject.Find("sling_right_arm");
	
	swordWeapon = GameObject.Find("SwordWeapon");
	
	parachutePants = GameObject.Find("parachutePantsSprite").GetComponent(Renderer);
}



function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	boxColl = GetComponent(BoxCollider2D);
	circleColl = GetComponent(CircleCollider2D);
	swimming=false;
	runningForward=false;
	runningBackwards=false;
	crouching=false;
	//atPeak=false;
	ledgeGrab=false;
	shimmy=false;
	platformGrab=false;
	climbingUp=false;
	falling=false;
	isJumping=false;
	isDoubleJumping=false;
	alreadyDoubleJumped=false;
	alreadyJumped=false;
	rollingLeft=false;
	rollingRight=false;
	rollTimer=0;
	lastRoll=0;
	NewRockWeapon.throwingRock=false;
	Unarmed.attackingUnarmed=false;
	NewSpear.throwingSpear=false;
	NewRockWeapon.digging=false;
	BowScript.shootingBow=false;
	SlingScript.shootingSling=false;
	takingDamage=false;
	BlinkOnDamage.invulnerable=false;
	firePressed=false;
	pushing=false;
	inCover=false;
	BowScript.justFired=false;
	SwordWeapon.attackingSword=false;
	Unarmed.flyingKick=false;
	usingChute=false;
	HangGliderScript.usingGlider=false;
	SkateboardScript.usingSkateboard=false;
	knocked=false;
	knockedDown=false;
	thrown=false;
	DialogueScript.talking=false;
	ExitLevelScript.endGUI=false;
	layer=bpLayerz.PLAYER;
	rb2D.isKinematic=false;
	usingEZBronze=false;
	BloodLustScript.usingBloodLust=false;
	HasteScript.magicSpeed=0;
	punching=false;
	transform.localScale.x=1;
	if(Application.loadedLevelName!="Dojo"&&Application.loadedLevelName!="Jungle - Truck Defense")
		startUp=true;
	endGame=false;
	facingRight=true;
	actuallyJumping=false;
	deltaPosition=0;
	maxForward=1f;
	maxBackward=4.5f;
	autoskateBaseSpeed=10f;
	inPit=false;
	inputFrozen=false;
	grabbingRope=false;
	punching=false;
	NewSpear.spearMelee=false;
	MagicScript.casting=false;
	freezePlayer=false;
	freezePlayer2=false;
	rb2D.collisionDetectionMode = CollisionDetectionMode2D.Continuous;
}

function Update()
{
	if(Time.timeScale > 0)
	{
	 if(!StartMenuScript.inAMenu)
	 {
	 	ColliderSize();
	 	PressingFire();
	 	if(Options.usingController)
		 	PressingMagic();
		if(!(freezePlayer||freezePlayer2||endGame||inputFrozen))
			Animations();
		LineCasts();
		if(!inputFrozen)
			Controls();
		if(!inCover&&!Health.playerIsDead&&!startUp&&!endGame)
		{
			if(!WeaponSelect.attacking&&!takingDamage&&!swimming)
				if(!inputFrozen)
					Roll();
			if(!knockedDown&&!knocked&&!freezePlayer2)
				if(!GameController.autoSkateMode&&!inputFrozen)
					Jumping();
				else if(!inputFrozen)
					AutoSkateJumping();
			if(onGround&&!HangGliderScript.usingGlider)
			{
				Crouch();
				if(WeaponSelect.wepName!="Polevaulting Spear")
				{
					NewSpear.poleVaulting=false;
					NewSpear.poleVaulting2=false;
					anim.SetBool("poleVaulting2",false);
				}
			}
			
		}
	    LedgeGrab();
	    if(ledgeGrab)
	    	grabTimer+=Time.deltaTime;
	    else
	    	grabTimer=0;
	    if(!HangGliderScript.usingGlider&&!sliding&&!(freezePlayer||freezePlayer2)&&!thrown&&!Health.playerIsDead&&!IceBlastScript.castingIce&&!unarmed.flyingKick&&!startUp&&!endGame)//&&!MagicScript.casting)
	    	if(!inputFrozen&&!knockedDown)
		    	FaceCursor();
	    //WallRubGravity();
	    Falling();
	    ArcPosition();
	    if(h==0&&onGround&&!crouching&&!takingDamage&&!SkateboardScript.usingSkateboard&&!sliding&&!onBelt&&!knockedDown&&!knocked)
	    	StopSliding();
	    InCover();
	    Idle();
	    if(swimming)
	    {
	    	Buoyancy();
	    	circleColl.enabled=true;	
	    }
	    else
	    	circleColl.enabled=false;	

		if(waterTop)
	    	WaterTop();
	    	
	    if(!SkateboardScript.usingSkateboard&&!swimming)
	    {
	    	rb2D.mass=1;
	    	rb2D.gravityScale=1;
	    }
	    else if(SkateboardScript.usingSkateboard)
	    {
	    	rb2D.mass=.7;
	    	//rb2D.gravityScale=.1;
	    }
	  }
	  
	  	if(boxinFront&&Input.GetButton("Interact"))//runningForward&&
	  		pushing=true;
	  	else
	  		pushing=false;
	  		
		if(ParachuteScript.usingParachutePants&&!HangGliderScript.usingGlider&&!SkateboardScript.usingSkateboard&&!startUp&&!endGame)
			ParachutePants();
		if(SkateboardScript.usingSkateboard&&usingChute)
			SkateParachutePantsFix();
		
		if(usingEZBronze)
			EZBronze();
		if(SkateboardScript.usingSkateboard&&!GameController.autoSkateMode)
		{
				SkateGravity();
		}
		else if(GameController.autoSkateMode)
		{
			if(!inputFrozen)
			{
				AutoSkate();
				AutoSkateGravity();
			}
		}
			
		if(!HangGliderScript.usingGlider&&!(freezePlayer||freezePlayer2))
			AlignWithNormal();
		
		if(!rolling&&!Unarmed.flyingKick&&!MagicScript.casting&&!sliding&&!(freezePlayer||freezePlayer2)&&!knocked&&!Health.playerIsDead&&!knockedDown&&!inCover&&!startUp&&!endGame)
		{
			if(!GameController.autoSkateMode)
			{
				Run();
			}
		}
			
		MaxSpeeds();
		
		if(!knocked&&knockedDown)
			knockTime+=Time.deltaTime;
		else if(knockTime>.5)
			knockTime=0;
		if(!knocked&&knockedDown&&knockTime>=.5)
			knockedDown=false;
		
		if(thrown&&groundTimer>.55)
			thrown=false;
		
		if(transform.localScale.x<0)
			transform.localScale.x=-1;
		if(transform.localScale.x>0)
			transform.localScale.x=1;
			
		if(knockedDown&&!SkateboardScript.usingSkateboard)
			StopRoll();
	}
}


function FixedUpdate()
{
	if(stickDown&&!onGround&&!isJumping&&!isDoubleJumping&&rb2D.velocity.y>0)
		rb2D.AddForce(-Vector2.up*20*Mathf.Abs(rb2D.velocity.x));
	if(!sliding&&slopeAngle>0&&!SkateboardScript.usingSkateboard)
	{
		if(h!=0&&lastRoll<.1||h==1&&surfaceNormal.x>0||h==-1&&surfaceNormal.x<0)
			rb2D.AddForce(-surfaceNormal*30*Mathf.Abs(rb2D.velocity.x));
		if (h==0)
			rb2D.AddForce(-surfaceNormal*30);
		if(rolling||lastRoll<.1)
			rb2D.AddForce(-Vector2.up*60);
	}
	if(HangGliderScript.usingGlider)
		HangGlider();
	//if(knockedDown&&!onGround)
	//	transform.position.y-= 5.5 * Time.deltaTime;
		
	if(!inCover)
			RunForwardOrBack();
	if(!Health.playerIsDead)
		RunTimer();
	if(rollingLeft||rollingRight)
		Rolling();
	
}


function Animations()
{
//movement
	if(runningForward&&v!=-1&&!inFront)
		anim.SetFloat("hSpeed",5);
	else if(runningBackwards&&v!=-1)
		anim.SetFloat("hSpeed",-5);
	else
		anim.SetFloat("hSpeed",0);

	anim.SetInteger("h",h);

	anim.SetBool("Pushing",pushing);
	anim.SetFloat("vSpeed",rb2D.velocity.y);

//controls
	anim.SetInteger("v",v);

//character states
	anim.SetBool("onGround", onGround);
	anim.SetFloat("groundTimer",groundTimer);
	anim.SetBool("rolling", rolling);
	anim.SetBool("climbing", climbingUp);
	anim.SetBool("hanging", ledgeGrab);
	anim.SetBool("hanging2", platformGrab);
	anim.SetBool("grabbingRope", grabbingRope);
	anim.SetBool("shimmy", shimmy);

	anim.SetBool("jumping", isJumping);
	anim.SetBool("double_jump", isDoubleJumping);
	
	anim.SetBool("digging", NewRockWeapon.digging);
	
	anim.SetBool("swimming",swimming);

//weapons
	if((WeaponSelect.wepName=="Throwing Spear"&&NewSpear.ammoCount==1))//||WeaponSelect.wepName=="Stabbing Spear"&&NewSpear.ammoCount==1)
		anim.SetBool("usingSpear", true);
	else
		anim.SetBool("usingSpear", false);
	anim.SetBool("throwingSpear", NewSpear.throwingSpear);	
//	anim.SetBool("poleVaulting", NewSpear.startPoleVaultAnim);	

	anim.SetBool("attackingUnarmed", Unarmed.attackingUnarmed);
	anim.SetBool("punching", punching);
	anim.SetBool("throw_standing_rock", NewRockWeapon.throwingRock);
	
//Knockback
	//anim.SetBool("KnockDown", takingDamage);
	
//Skateboard
	anim.SetBool("usingSkateboard",SkateboardScript.usingSkateboard);
	
	anim.SetFloat("StandingIdle",idleTimer);
	
	anim.SetBool("sliding",sliding);
	anim.SetBool("slidingJump",slidingJump);
	
	anim.SetFloat("inAirTime",inairTime);
}

function LineCasts()
{
//onGround
	//Debug.DrawLine(transform.position, Vector2(transform.position.x,transform.position.y-.7), Color.red);
	Debug.DrawLine(linecastHolder[lineCasts.GROUND1].transform.position, linecastHolder[lineCasts.GROUND2].transform.position, Color.red);
	//Debug.DrawLine(linecastHolder[21].transform.position, linecastHolder[22].transform.position, Color.red);
	//if (Physics2D.Linecast (linecastHolder[lineCasts.GROUND1].transform.position, linecastHolder[lineCasts.GROUND2].transform.position, mask)&&!swimming)
	/*var hitGround:RaycastHit2D = Physics2D.Raycast(transform.position, -Vector2.up,.7,mask);
	if(hitGround&&!swimming)*/
	if ((Physics2D.Linecast(linecastHolder[lineCasts.GROUND1].transform.position, linecastHolder[lineCasts.GROUND2].transform.position, mask)||Physics2D.Linecast(linecastHolder[21].transform.position, linecastHolder[22].transform.position, mask))&&!swimming)
	{
		//Debug.Log("test");
		if(startUp)
		{
			startUp=false;
			if(Application.loadedLevelName!="Dojo"&&Application.loadedLevelName!="Jungle - Truck Defense")
				Camera.main.GetComponent(CameraFollow).enabled=true;	
		}
		onGround=true;
		groundTimer+=Time.deltaTime;
		alreadyDoubleJumped=false;
		if(Unarmed.stomping&&!stompPoof)
		{
			stompPoof=true;
			unarmed.Poof();
			yield WaitForSeconds(.35);
			Unarmed.stomping=false;
			stompPoof=false;
		}
		Unarmed.canStomp=true;
		if(alreadyJumped)//&&rb2D.velocity.y==0)
			alreadyJumped=false;
		inairTime=0;
	}
	else
	{
		alreadyJumped=true;
		onGround=false;
		groundTimer=0;
		inairTime+=Time.deltaTime;
		GameController.stats.inairTime+=Time.deltaTime;
	}
	//if(onGround&&alreadyJumped)
    
//aboveHead
    //Debug.DrawLine(transform.position, linecastHolder[lineCasts.HEAD].transform.position, Color.white);
	if (Physics2D.Linecast (transform.position, linecastHolder[lineCasts.HEAD].transform.position, mask))
		aboveHead=true;
	else
		aboveHead=false;
	
	//Debug.DrawLine(linecastHolder[9].transform.position, linecastHolder[lineCasts.FRONTOVER].transform.position, Color.white);	
	if (Physics2D.Linecast (linecastHolder[9].transform.position, linecastHolder[lineCasts.FRONTOVER].transform.position, waterMask))
		inWater=true;
	else
		inWater=false;
	
//passableOverHead
	//Debug.DrawLine(transform.position, linecastHolder[lineCasts.PASSHEAD].transform.position, Color.red);
	//Debug.DrawLine(linecastHolder[lineCasts.PASSSIDE1A].transform.position, linecastHolder[lineCasts.PASSSIDE1B].transform.position, Color.red);
	//Debug.DrawLine(linecastHolder[lineCasts.PASSSIDE2A].transform.position, linecastHolder[lineCasts.PASSSIDE2B].transform.position, Color.red);
	if (Physics2D.Linecast (transform.position, linecastHolder[lineCasts.PASSHEAD].transform.position, mask) ||
		Physics2D.Linecast (linecastHolder[lineCasts.PASSSIDE1A].transform.position, linecastHolder[lineCasts.PASSSIDE1B].transform.position, mask) ||
		Physics2D.Linecast (linecastHolder[lineCasts.PASSSIDE2A].transform.position, linecastHolder[lineCasts.PASSSIDE2B].transform.position, mask) ||
		crouching&&Input.GetButtonDown("Jump"))
	{
		passableOverHead=true;
	}
	else if(!crouching)
	{
		passableOverHead=false;
	}

//back
    //Debug.DrawLine(linecastHolder[lineCasts.FEET1].transform.position, linecastHolder[lineCasts.BACK].transform.position, Color.green);
	if (Physics2D.Linecast (linecastHolder[lineCasts.FEET1].transform.position, linecastHolder[lineCasts.BACK].transform.position, mask))
		inBack=true;
    else
		inBack=false;

//In Front
    //Debug.DrawLine(linecastHolder[lineCasts.HEAD].transform.position, linecastHolder[lineCasts.FRONT1].transform.position, Color.yellow);
    //Debug.DrawLine(linecastHolder[lineCasts.FEET2].transform.position, linecastHolder[lineCasts.FRONT2].transform.position, Color.yellow);
	if (Physics2D.Linecast (linecastHolder[lineCasts.FEET2].transform.position, linecastHolder[lineCasts.FRONT2].transform.position, mask))
    	inFront=true;
	else
    	inFront=false;
    	
    if (Physics2D.Linecast (linecastHolder[lineCasts.FEET2].transform.position, linecastHolder[15].transform.position, mask))
    	boxinFront=true;
	else
    	boxinFront=false;
    	
    if (Physics2D.Linecast (linecastHolder[lineCasts.FEET2].transform.position, linecastHolder[lineCasts.FRONT2].transform.position, mask2))
    	ropeInFront=true;
	else
    	ropeInFront=false;
    
    
    if (Physics2D.Linecast (linecastHolder[lineCasts.HEAD].transform.position, linecastHolder[lineCasts.FRONT1].transform.position, mask) && inFrontHeadEnabled)
		inFrontHead=true;
    else
		inFrontHead=false;
 
//inFrontSeeOver
    //Debug.DrawLine(linecastHolder[lineCasts.SEEOVER].transform.position, linecastHolder[lineCasts.FRONTOVER].transform.position, Color.magenta);
	if (!Physics2D.Linecast (linecastHolder[lineCasts.HEAD].transform.position, linecastHolder[lineCasts.FRONTOVER].transform.position, mask) && seeOverEnabled)
	{
		canSeeOver=true;
	} 
    else
    {
		canSeeOver=false;
    }
    
    //Debug.DrawLine(linecastHolder[15].transform.position, linecastHolder[16].transform.position, Color.red);
    if(slopeAngle>0||(!Physics2D.Linecast(linecastHolder[15].transform.position, linecastHolder[16].transform.position,mask)&&!SkateboardScript.usingSkateboard))
    	canRoll=true;
    else
   		canRoll=false;
}

function Controls()
{
	if(Input.GetButton("Left")||Input.GetAxis("LThumbstick Left/Right")<0)
		h=-1;
	else if(Input.GetButton("Right")||Input.GetAxis("LThumbstick Left/Right")>0)
		h=1;
	else
		h=0;
	
	//this is causing a ledge grab bug	
	//if((facingLeft && inFront && h==-1||facingRight && inBack && h==-1 || facingRight && inFront && h==1 || facingLeft && inBack && h==1)&&slopeAngle==0)
 	//	h=0;
	
	if(Input.GetButton("Up")||Input.GetAxis("LThumbstick Up/Down")>0)
		v=1;
	else if(Input.GetButton("Down")||Input.GetAxis("LThumbstick Up/Down")<0)
		v=-1;
	else
		v=0;
}

function Crouch()
{
	if(v<0&&!slidingJump&&!sliding&&onGround)
	{
		crouching=true;
		h=0;
	}
	else
		crouching=false;
}

function Roll()
{
	if(groundTimer>0.2&&canRoll)
	{
		if(onGround&&lastRoll>0.25 && (Input.GetKeyDown("q") || onGround&&lastRoll>.25 && (Input.GetKeyDown("joystick button 1")) && h==-1))
				rollingLeft=true;
				
		if(onGround&&lastRoll>0.25 && (Input.GetKeyDown("e") || onGround&&lastRoll>.25 && (Input.GetKeyDown("joystick button 1")) && h==1))
				rollingRight=true;
	}
	if(rollingLeft||rollingRight)
	{
		rollTimer+=Time.deltaTime;
		
		lastRoll=0;
	}
	else if(!rolling)
	{
		rollTimer=0;
	}
	if(rollTimer>.4&&!aboveHead)
	{
		rollingLeft=false;
		rollingRight=false;
		//iTween.Stop();
	}
	if(rollingLeft||rollingRight)
	{
		//var x:int;
		if((rollingLeft&&transform.localScale.x==1)||rollingRight&&transform.localScale.x==-1) //rolling backwards
			x=5;
		else
			x=-5;
		rolling=true;
		anim.SetFloat("hSpeed",x);
		anim.SetInteger("v",-1);
	}
	else
	{
		rolling=false;
	}

	lastRoll+=Time.deltaTime;
	lastRoll=Mathf.Clamp(lastRoll,0,1.2);
	
	//if(rolling&&(inBack||inFront))
	if(rolling&&!canRoll)
		rollTimer=.5;
}

function Rolling()
{
	rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,maxSpeed*-1.5,maxSpeed*1.5);
	
	if(!onGround&&!isJumping)
		if(rollingLeft)
			rb2D.AddForce(Vector2.right * moveForce * 5);
		else if(rollingRight)
			rb2D.AddForce(-Vector2.right * moveForce * 5);
	
	if(!onGround&&isJumping)
	{
		rb2D.velocity.x=0;
		rollingLeft=false;
		rollingRight=false;
	}
	
	
	if(rollingLeft)
		rb2D.velocity.x=-10;
		//rb2D.AddForce(Vector2.right * moveForce * -10);
	
	if(rollingRight)
		rb2D.velocity.x=10;
		//rb2D.AddForce(Vector2.right * moveForce * 10);
}

function StopRoll()
{
	rollTimer=.5;
	rb2D.velocity.x=0;
}

function LedgeGrab()
{
	if(!onGround && inFrontHead && canSeeOver)
	{
		ledgeGrab=true;
		h=0;
	}
	else
		ledgeGrab=false;
	
	//passableGrab
	/*if(!onGround && inFrontHead && passableOverHead && falling)
		platformGrab=true;
	else
		platformGrab=false;*/
	
	if(((ledgeGrab||platformGrab)&&v==-1)||grabTimer>3)
	{
		seeOverEnabled=false;
		inFrontHeadEnabled=false;
		yield WaitForSeconds(.5);
		seeOverEnabled=true;
		inFrontHeadEnabled=true;
	}
	
	if ((ledgeGrab||platformGrab)&&(v==1||(Input.GetButton("Right")||Input.GetAxis("LThumbstick Left/Right")>0)&&facingRight||(Input.GetButton("Left")||Input.GetAxis("LThumbstick Left/Right")<0&&facingLeft))&&!climbingUp)
	{
		rb2D.velocity.y=0;
		ClimbUp();
		climbingUp=true;
		yield WaitForSeconds(.85);
		climbingUp=false;
	}

	if(ledgeGrab||platformGrab||climbingUp||grabbingRope||(punching&&!SkateboardScript.usingSkateboard)||(NewSpear.spearMelee&&!SkateboardScript.usingSkateboard)||(SwordWeapon.attackingSword&&!SkateboardScript.usingSkateboard)||(MagicScript.casting&&onGround&&!SkateboardScript.usingSkateboard)||(freezePlayer||freezePlayer2))//||takingDamage)
	{
		rb2D.velocity.x=0;
		rb2D.isKinematic=true;
		StopRoll();
		if(!takingDamage&&!onGround)
			grabbingOn=true;
	}
	else if(GameController.health.playerIsDead)
	{
		if(GameController.autoSkateMode)
		{
			rb2D.velocity.x=0;
			rb2D.isKinematic=true;
		}
		else
		{
			DeadTurnKinematic();
		}
	}
	else
	{
		rb2D.isKinematic=false;
		grabbingOn=false;
	}
	//if(knockedDown)
	//	rb2D.velocity=Vector2(0,-9.81*Time.deltaTime);
	
	/*if(platformGrab&&h!=0)
	{
		transform.position.x=transform.position.x+h*.025;
		shimmy=true;
	}
	else
		shimmy=false;*/
	
}

function ClimbUp()
{
		if(facingRight)
		{
			iTween.MoveBy(gameObject, iTween.Hash("name", "Climb", "y", .413207, "easeType", "easeInOutQuad", "time", .7));
			iTween.MoveBy(gameObject, iTween.Hash("name", "Climb", "x", 0.38246, "y", .65, "easeType", "linear", "delay", .5, "time", .3));
		}
		if(facingLeft)
		{
			iTween.MoveBy(gameObject, iTween.Hash("name", "Climb", "y", .413207, "easeType", "easeInOutQuad", "time", .7));
			iTween.MoveBy(gameObject, iTween.Hash("name", "Climb", "x", -0.38246, "y", .65, "easeType", "linear", "delay", .5, "time", .3));
		}
}

function FaceCursor()
{
	if(!ledgeGrab&&!rollingLeft&&!rollingRight&&!climbingUp&&!Options.usingController)
	{
		if (GameController.crosshair.transform.position.x < transform.position.x)
		{
			transform.localScale.x= -1;
			facingLeft=true;
			facingRight=false;
		}
		else
		{
			transform.localScale.x= 1;
			facingLeft=false;
			facingRight=true;
		}
	}
	
	if(!ledgeGrab&&!rollingLeft&&!rollingRight&&!climbingUp&&Options.usingController)
	{
		if(Input.GetAxis("RThumbStickLeftRight")<0)
		{	
			transform.localScale.x= -1;
			facingLeft=true;
			facingRight=false;
		}
		if(Input.GetAxis("RThumbStickLeftRight")>0)
		{
			transform.localScale.x= 1;
			facingLeft=false;
			facingRight=true;
		}
	}


	if((facingLeft != flip))
	{
		flip=facingLeft;
		//FlipRope();
	}
	
	var PunchAngle:float;
	if(GameController.crosshair.transform.position.y > transform.position.y+1.5)
		PunchAngle=2;
	if(GameController.crosshair.transform.position.y > transform.position.y+.5&&(GameController.crosshair.transform.position.y < transform.position.y+1.5))
		PunchAngle=1;
	else if((GameController.crosshair.transform.position.y > transform.position.y+.5)&&(GameController.crosshair.transform.position.y < transform.position.y-.5))
		PunchAngle=0;
	else if(GameController.crosshair.transform.position.y < transform.position.y-.2)
		PunchAngle=-1;
	anim.SetFloat("PunchAngle", PunchAngle);
}
/*
function FlipRope()
{
	if(grabbingRope)
		transform.position.x=transform.position.x-(.6*transform.localScale.x);
}
*/
function WallRubGravity()
{
    if(!onGround && inFront && h!=0&&!passableOverHead || !onGround && inBack && h!=0&&!passableOverHead)
		rb2D.gravityScale=3;
	else
		rb2D.gravityScale=1.15;
}

function Falling()
{
	if(rb2D.velocity.y<0)
	{
		falling=true;
	}
	else if (!platformGrab)
	{
		falling=false;
	}
}


function ArcPosition()
{
	rockArc.position.y=transform.position.y+.25;
	spearArc.position.y=transform.position.y+.25;
	
	if(facingRight)
	{
		rockArc.position.x=transform.position.x+.25;
		spearArc.position.x=transform.position.x+.25;
	}
	else
	{
		rockArc.position.x=transform.position.x-.25;
		spearArc.position.x=transform.position.x-.25;
	}
}

function Jumping()
{
	if(Input.GetButtonDown("Jump")&&onGround&&!crouching&&!takingDamage&&!sliding&&groundTimer>.1&&!SwordWeapon.attackingSword&&!Unarmed.attackingUnarmed)
	{
		//AudioSource.PlayClipAtPoint(jumpSounds[Random.Range(0,4)], transform.position, Options.sfxVolume);
		
		// Audio - Jump
		Fabric.EventManager.Instance.PostEvent("SFX/Player/Jump", gameObject);
		
		if(SkateboardScript.usingSkateboard)
			rb2D.velocity.y=11;
		else
			rb2D.velocity.y=6;
		isJumping=true;
		actuallyJumping=true;
		yield WaitForSeconds(.33);
		isJumping=false;
	}
	if(Input.GetButtonDown("Jump")&&sliding)
	{
		//AudioSource.PlayClipAtPoint(jumpSounds2[Random.Range(0,4)], transform.position, Options.sfxVolume);
		
		// Audio - Jump
		Fabric.EventManager.Instance.PostEvent("SFX/Player/Jump", gameObject);
		
		//rb2D.AddForce(new Vector2(0, jumpForce+50));
		//rb2D.velocity.x*=2;
		rb2D.velocity.y=6;
		slidingJump=true;
		isJumping=true;
		yield WaitForSeconds(.33);
		isJumping=false;
	}
	
	if(alreadyJumped&&!onGround&&!alreadyDoubleJumped&&Input.GetButtonDown("Jump")&&!HangGliderScript.usingGlider&&!Unarmed.alreadyFlyingKicked&&!SwordWeapon.attackingSword&&!Unarmed.attackingUnarmed&&!grabbingOn)
	{
		//AudioSource.PlayClipAtPoint(jumpSounds[Random.Range(4,jumpSounds.Length)], transform.position, Options.sfxVolume);
		
		// Audio - Double Jump
		Fabric.EventManager.Instance.PostEvent("SFX/Player/DoubleJump", gameObject);
		if(SkateboardScript.usingSkateboard)
			rb2D.velocity.y=7;
		else
			rb2D.velocity.y=6;
		alreadyDoubleJumped=true;
		//animation
		isDoubleJumping=true;
		yield WaitForSeconds(.2833);
		isDoubleJumping=false;
	}
}

function AutoSkateJumping()
{
	if(!inPit)
	{
		if(!actuallyJumping&&Input.GetButtonDown("Jump")&&!crouching&&!takingDamage&&!Unarmed.attackingUnarmed)
		{
			//AudioSource.PlayClipAtPoint(jumpSounds[Random.Range(0,4)], transform.position, Options.sfxVolume);
			
			// Audio - Jump
			Fabric.EventManager.Instance.PostEvent("SFX/Player/Jump", gameObject);
			
			if(SkateboardScript.usingSkateboard)
				rb2D.velocity.y=11;
			else
				rb2D.velocity.y=6;
			isJumping=true;
			actuallyJumping=true;
			yield WaitForSeconds(.33);
			isJumping=false;
		}
		
		if(actuallyJumping&&!onGround&&!alreadyDoubleJumped&&Input.GetButtonDown("Jump")&&!Unarmed.attackingUnarmed)
		{
			//AudioSource.PlayClipAtPoint(jumpSounds[Random.Range(4,jumpSounds.Length)], transform.position, Options.sfxVolume);
			
			// Audio - Double Jump
			Fabric.EventManager.Instance.PostEvent("SFX/Player/DoubleJump", gameObject);
			if(SkateboardScript.usingSkateboard)
				rb2D.velocity.y=7;
			else
				rb2D.velocity.y=6;
			alreadyDoubleJumped=true;
			//animation
			isDoubleJumping=true;
			yield WaitForSeconds(.2833);
			isDoubleJumping=false;
		}
	}
}

function Pit()
{
	inPit=true;
}

function StopSliding()
{
	rb2D.velocity=Vector2(0,rb2D.velocity.y);
}

function PressingFire()
{
	if(Input.GetAxis("Controller Attack")>0)
	{
    	firePressed=true;
    }
    else
    {
    	firePressed=false;
    	beingPressed=false;
    }
    	
	if(firePressed&&!beingPressed)
	{
		triggerDown=true;
		beingPressed=true;
		yield WaitForEndOfFrame;
		triggerDown=false;
	}
}

function PressingMagic()
{
		if(Input.GetAxis("Controller Magic")>0)
	{
    	magicPressed=true;
    }
    else
    {
    	magicPressed=false;
    	magicBeingPressed=false;
    }
    	
	if(magicPressed&&!magicBeingPressed)
	{
		magicTriggerDown=true;
		magicBeingPressed=true;
		yield WaitForEndOfFrame;
		magicTriggerDown=false;
	}
}

function DeadTurnKinematic()
{
	
	while(!onGround)
	{
		yield;
	}
	StopRoll();
	rb2D.velocity.x=0;
	rb2D.isKinematic=true;
	
}

function AutoSkate()
{
	if(!GameController.health.playerIsDead)
	{
		if(deltaPosition<maxForward&&deltaPosition>-maxBackward)
		{
			autoskateSpeed = autoskateBaseSpeed + h;
		}
		else if(deltaPosition>-maxBackward)
		{
			if(h <= 0)
			{
				autoskateSpeed = autoskateBaseSpeed + h;
			}
			else
			{
				autoskateSpeed = autoskateBaseSpeed;
			}
		}
		else
		{
			if(h >= 0)
			{
				autoskateSpeed = autoskateBaseSpeed + h;
			}
			else
			{
				autoskateSpeed = autoskateBaseSpeed;
			}
		}
		rb2D.AddForce(transform.right * 10);
		rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,-10,autoskateSpeed);
	}
		
	if((h>0||(h>=0&&(rb2D.velocity.x<autoskateSpeed)))&&onGround)
	{
		if(facingRight)
		{
			anim.SetBool("skatePush 0", true);
		}
	}
	else
	{
		anim.SetBool("skatePush 0", false);
	}
	
	if(!TRexController.initChase)
	{
		if(!Health.playerIsDead)
		{
			deltaPosition -= (autoskateBaseSpeed - rb2D.velocity.x) * Time.deltaTime;
		}
		else
		{
			deltaPosition -= autoskateBaseSpeed * Time.deltaTime;
		}
		
		deltaPosition = Mathf.Clamp(deltaPosition, -maxBackward, maxForward);
	}
}

function Run() //old broken hang glider?
{
	if(/*!Unarmed.flyingKick&&*/!SkateboardScript.usingSkateboard&&!usingChute&&!HangGliderScript.usingGlider&&!sliding&&!NewSpear.poleVaulting) //skateboard velocity
	{	
		if(!swimming&&!takingDamage)
			rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,-maxSpeed,maxSpeed);
		rb2D.velocity.x=(maxSpeed * h);
		
		//rb2D.AddForce(Vector2.right * h * moveForce);
	}
	else if(SkateboardScript.usingSkateboard&&!usingChute&&!HangGliderScript.usingGlider&&!sliding&&!NewSpear.poleVaulting)
	{	
		if(!SkateboardScript.boosting&&!crouching)
			rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,-10,10);
		else if(!SkateboardScript.boosting&&crouching)
			rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,-15,15);
		if(runningForward&&rb2D.velocity.x!=0)
			rb2D.AddForce(transform.right * h);
		//rb2D.AddForce(Vector2.up * -10 * h);
	}
	else if(usingChute&&!sliding&&!NewSpear.poleVaulting)
	{
		rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,-6,6);
		rb2D.AddForce(Vector2.right * h * 5);		
	}
	else if(HangGliderScript.usingGlider&&!sliding&&!NewSpear.poleVaulting)
	{
		rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,-15,15);
		rb2D.velocity.y = Mathf.Clamp(rb2D.velocity.y,-14,8);
	}
	else if(NewSpear.poleVaulting)
		rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,-8,8);
	/*
	else if(onGround&&sliding&&h==0)
		rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,-6,6);
	else if(onGround&&sliding&&h!=0)
		rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,-10,10);	*/
		
		//maxSpeed=6+(h*2*transform.localScale.x);
		/*if(transform.localScale.x==1&&h==1)
			rb2D.AddForce(Vector2.right * 10);
		else if(transform.localScale.x==1&&h==-1&&rb2D.velocity.x>.5)
			rb2D.AddForce(Vector2.right * -2);
		else if(transform.localScale.x==-1&&h==-1)
			rb2D.AddForce(Vector2.right * -10);	
	}	

	*/
}




function MaxSpeeds() //old broken hangglider
{
	/*if(slidingJump)
		slideSpeed=4;
	else
		slideSpeed=0;*/
		
	if(NewSpear.poleVaulting&&!usingChute)
		maxSpeed=9*NewSpear.vaultMultiplier;
	else if(usingChute)
		maxSpeed=5;
	
	if(!crouching&&!NewSpear.poleVaulting)
		maxSpeed=4.3+HasteScript.magicSpeed+slideSpeed+conveyorSpeed;
	
	if(onGround&&crouching&&!sliding||rb2D.isKinematic)
		maxSpeed=0;
}

function ColliderSize()
{
	//if(!unarmed.stomping)
	//{
		if(!sliding)
		{
			if((crouching||rolling||idling)&&!Health.playerIsDead)
			{
				boxColl.size = Vector2(.4,0.6);
				boxColl.offset = Vector2(0,-.13);
			}
			else if((!rolling||!crouching||!idling)&&!Health.playerIsDead)
			{
				boxColl.size = Vector2(.4,1.1);
				boxColl.offset = Vector2(0,0.13);
			}
			else if(Health.playerIsDead)
			{
				boxColl.size = Vector2(.4,.2);
				boxColl.offset = Vector2(0,-.35);
			}
		}
		else
		{
			boxColl.size = Vector2(1.1,.6);
			boxColl.offset = Vector2(0,0.13);
		}
	//}
	//else
	//{
		//boxColl.size = Vector2(.4,1.1);
		//boxColl.center = Vector2(0,.4);
	//}
}


function RunTimer()
{
	if(runningForward&&!NewSpear.poleVaulting&&onGround&&rb2D.isKinematic==false&&!slidingJump)
		runTimer+=Time.deltaTime;
	else if (!NewSpear.poleVaulting&&h==0)
	{
		runTimer=0;
		alreadyPoof=false;	
	}

	if((runTimer>0&&runTimer<.95)&&!SkateboardScript.usingSkateboard&&onGround&&!alreadyPoof)
	{
		var runCloudClone = Instantiate(runCloud, Vector3(transform.position.x/*-.3*transform.localScale.x*/,transform.position.y-.45,0), runCloud.transform.rotation);
		runCloudClone.transform.parent=GameController.dustHolder;
		yield WaitForSeconds(.95);
		alreadyPoof=true;
	}
}


function RunForwardOrBack()
{
	if(facingLeft&&h==-1||facingRight&&h==1)
		{
			runningForward=true;
			runningBackwards=false;
		}
	else if(facingLeft&&h==1||facingRight&&h==-1)
		{
			runningForward=false;
			runningBackwards=true;
		}
	else
		{
			runningForward=false;
			runningBackwards=false;
		}
}


function AtPeak()
{
	atPeak=true;
}
//function NotAtPeak()
//{
//	atPeak=false;
//}

enum lineCasts
{
	FEET1,
	FEET2,
	GROUND1,
	GROUND2,
	BACK,
	FRONT1,
	FRONT2,
	FRONTOVER,
	HEAD,
	SEEOVER,
	PASSHEAD,
	PASSSIDE1A,
	PASSSIDE1B,
	PASSSIDE2A,
	PASSSIDE2B,
};

function SendTakeDamage()
{
	if(!BlinkOnDamage.invulnerable&&!Health.playerIsDead)
	{
		idleTimer=0;
		gameObject.BroadcastMessage ("TakeDamage");
		slingArm1.SendMessage ("TakeDamage",SendMessageOptions.DontRequireReceiver);
		slingArm2.SendMessage ("TakeDamage",SendMessageOptions.DontRequireReceiver);
		bowArm1.SendMessage ("TakeDamage",SendMessageOptions.DontRequireReceiver);
		bowArm2.SendMessage ("TakeDamage",SendMessageOptions.DontRequireReceiver);
		if(!knocked)
		{
			if(onGround)
				anim.SetTrigger("hit2");
			knockedDown=true;
			knockTime=0;
		}
		
		//KnockBack();
	}
}

function Flinch()
{
	if(!Health.playerIsDead)
	{
		idleTimer=0;
		gameObject.BroadcastMessage ("TakeDamageCosmetic");
		slingArm1.SendMessage ("TakeDamageCosmetic",SendMessageOptions.DontRequireReceiver);
		slingArm2.SendMessage ("TakeDamageCosmetic",SendMessageOptions.DontRequireReceiver);
		bowArm1.SendMessage ("TakeDamageCosmetic",SendMessageOptions.DontRequireReceiver);
		bowArm2.SendMessage ("TakeDamageCosmetic",SendMessageOptions.DontRequireReceiver);
		if(!knocked)
		{
			if(onGround)
				anim.SetTrigger("hit2");
		}
	}
}

function KnockBack(x:Vector2)
{
	knocked=true;
	StopRoll();
	takingDamage=true;
	//anim.SetTrigger("hit2");
	rb2D.AddForce(x);
	yield WaitForSeconds(.2);
	if(!onGround)
		yield WaitForSeconds(1);
	else
		yield WaitForSeconds(.3);
	takingDamage=false;		
	knocked=false;
}

function KnockDown()
{
	knocked=true;
	anim.SetTrigger("KnockDown");
	knockedDown=true;
	yield WaitForSeconds(0.75);
	knockedDown=false;
	knocked=false;
}



function InCover()
{
	if(TakeCover.inStandCover||TakeCoverCrouch.inDuckCover)
		inCover=true;
	else
		inCover=false;
}

function StartPunch()
{
	punching=true;
}

function EndPunch()
{
	punching=false;
}

function EndPunchOne()
{
	unarmed.punchOneFinished=true;
	unarmed.unarmedComboNum=1;
}

function EndPunchTwo()
{
	unarmed.punchTwoFinished=true;
	unarmed.unarmedComboNum=2;
}

function EndPunchThree()
{
	unarmed.whenAttacked=1.6;
	Unarmed.attackingUnarmed=false;
	//yield WaitForSeconds(.1);
	unarmed.kicking=false;
	//unarmed.unarmedComboNum=0;
}

function GrabbingRope(x:boolean)
{
		grabbingRope=x;
		//Debug.Log(grabbingRope);
}

function RopeJump()
{
	jumping=true;
	rb2D.velocity.y=5;
}

function Idle()
{
	if(!Input.anyKey&&!ControllerInUse.controllerInUse&&!Input.GetAxis("Mouse ScrollWheel")&&!(freezePlayer||freezePlayer2)&&!thrown&&!takingDamage)
		idleTimer+=Time.deltaTime;
	else
	{
		idleTimer=-.01;
		carlton=false;
	}
		
	if(idleTimer>20&&!carlton&&!grabbingOn)
		idleTimer=-25;
	
	if(idleTimer>15)
	{
		if(!idling)
			anim.SetInteger("randomNumber",Random.Range(0,2));
		idling=true;
	}
	else
		idling=false;
	
}

function PoleVaultAnim(x:int)
{
	if(x==1)
		NewSpear.startPoleVaultAnim=false;
	if(x==2)
		NewSpear.poleVaulting=true;
}

function attackingSword(xx:int)
{
	if(WeaponSelect.wepName=="Unarmed")
		Unarmed.attackingUnarmed=false;
	else
		swordWeapon.SendMessage("HideOrShow",xx);
}

function OnCollisionEnter2D(col:Collision2D)
{
	unarmed.flyingKick=false;
	
	if(col.gameObject.tag=="Land"&&!isJumping)
	{
		actuallyJumping=false;
		SkateboardScript.alreadyJumpAnim=false;
		
	}
	
	if(knocked&&col.gameObject.tag=="Land"&&groundTimer>.05)
	{
		var contact:ContactPoint2D=col.contacts[0];
		var landCloudClone=Instantiate(landCloud,contact.point,Quaternion.identity);
		landCloudClone.transform.localScale.x=transform.localScale.x*.3;
		Destroy(landCloudClone,.2);
	}
}

function Buoyancy()
{
	rollingLeft=false;
	rollingRight=false;
	if(h==0&&rb2D.velocity.x>0&&transform.localScale.x==1)
		rb2D.velocity.x-=.1;
	else if(h==0&&rb2D.velocity.x<0&&transform.localScale.x==-1)
		rb2D.velocity.x+=.1;
	if(v==0&&rb2D.velocity.y<0)
		rb2D.velocity.y*=.8;
		
	if(Input.GetButtonDown("Jump"))
		rb2D.AddForce(Vector2(0, 150));
	if(v>0)
		rb2D.AddForce(new Vector2(0, 10));

	if(v<0)
		rb2D.AddForce(new Vector2(0, -10));
	
	if(!FlipperScript.usingFlippers)
	{
		if(transform.localScale.x==1)
			rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,-.1,1.5); //was 2
		else
			rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,-1.5,.1); //was -2
			
		rb2D.velocity.y = Mathf.Clamp(rb2D.velocity.y,-2,1); //was -2.5,1.5
	}
	else
	{
		if(transform.localScale.x==1)
			rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,0,2); //was 4
		else
			rb2D.velocity.x = Mathf.Clamp(rb2D.velocity.x,-2,0); //was -4
			
		rb2D.velocity.y = Mathf.Clamp(rb2D.velocity.y,-2,3.5); //was -5, 20
	}

//	if(!FlipperScript.usingFlippers)		
//		rb2D.velocity.y = Mathf.Clamp(rb2D.velocity.y,-2,1); //was -2.5,1.5
//	else
//		rb2D.velocity.y = Mathf.Clamp(rb2D.velocity.y,-2,3.5); //was -5, 20
	rb2D.gravityScale=.2;
	rb2D.mass=3;
}

function WaterTop()
{
	if(Input.GetButtonDown("Jump"))
		rb2D.velocity.y=3;
}

function SkateGravity()
{
	var skateGravAmount = 2.5;
//var duckMod:int;
//	Debug.Log(rb2D.velocity.x);
	//Debug.Log(duckMod);
	
/*	if((transform.eulerAngles.z>315&&transform.eulerAngles.z<342)&&transform.localScale.x==1&&!SkateboardScript.outofSkateZone)
		rb2D.AddForce(transform.right * (5));
	else if((transform.eulerAngles.z>18&&transform.eulerAngles.z<45)&&transform.localScale.x==-1&&!SkateboardScript.outofSkateZone)
		rb2D.AddForce(transform.right * (-5));
*/
	if((transform.eulerAngles.z>315&&transform.eulerAngles.z<342)&&transform.localScale.x==1&&!SkateboardScript.outofSkateZone)
			rb2D.gravityScale=skateGravAmount;
	else if((transform.eulerAngles.z>315&&transform.eulerAngles.z<342)&&transform.localScale.x==-1&&!SkateboardScript.outofSkateZone)
	{
		rb2D.velocity=oldVelocity;
		rb2D.gravityScale=.1;
	}
	else if((transform.eulerAngles.z>18&&transform.eulerAngles.z<45)&&transform.localScale.x==-1&&!SkateboardScript.outofSkateZone)
			rb2D.gravityScale=skateGravAmount;
			
	else if((transform.eulerAngles.z>18&&transform.eulerAngles.z<45)&&transform.localScale.x==1&&!SkateboardScript.outofSkateZone)
	{
		rb2D.velocity=oldVelocity;
		rb2D.gravityScale=.1;
	}
	else if(transform.eulerAngles.z==0&&!SkateboardScript.outofSkateZone)	
	{
		rb2D.gravityScale=1.6;
		OldVelocity();
	}
}

function AutoSkateGravity()
{
	var skateGravAmount = 2.5;
//var duckMod:int;
//	Debug.Log(rb2D.velocity.x);
	//Debug.Log(duckMod);
	
/*	if((transform.eulerAngles.z>315&&transform.eulerAngles.z<342)&&transform.localScale.x==1&&!SkateboardScript.outofSkateZone)
		rb2D.AddForce(transform.right * (5));
	else if((transform.eulerAngles.z>18&&transform.eulerAngles.z<45)&&transform.localScale.x==-1&&!SkateboardScript.outofSkateZone)
		rb2D.AddForce(transform.right * (-5));
*/
	if((transform.eulerAngles.z>315&&transform.eulerAngles.z<342)&&!SkateboardScript.outofSkateZone)
			rb2D.gravityScale=skateGravAmount;
	else if((transform.eulerAngles.z>18&&transform.eulerAngles.z<45)&&!SkateboardScript.outofSkateZone)
	{
		rb2D.velocity=oldVelocity;
		rb2D.gravityScale=.1;
	}
	else if(transform.eulerAngles.z==0&&!SkateboardScript.outofSkateZone)	
	{
		rb2D.gravityScale=1.6;
		OldVelocity();
	}
}

function SkateForce()
{
/*	if(transform.eulerAngles.z>315&&transform.eulerAngles.z<342)
		rb2D.AddForce(transform.right * 200 * transform.localScale.x);
	else if(transform.eulerAngles.z>18&&transform.eulerAngles.z<45)
		rb2D.AddForce(transform.right * 150 * transform.localScale.x);
	else*/
	//Debug.Log(GameController.autoSkateMode);
	if(!GameController.autoSkateMode)
	{
		rb2D.velocity.x+=(7*transform.localScale.x);
	}
		//rb2D.AddForce(Vector2.right * 200 * transform.localScale.x);
}

function ParachutePants()
{
	if(!onGround&&!isDoubleJumping&&Input.GetButton("Jump")&&rb2D.velocity.y<0&&!swimming&&!Unarmed.flyingKick&&!BlinkOnDamage.invulnerable&&!knocked&&!thrown)
	{	
		parachutePants.transform.position.x=transform.position.x-.05*transform.localScale.x;
		parachutePants.transform.position.y=transform.position.y+1.1;
		parachutePants.transform.localScale.x=transform.localScale.x;
		if(!usingChute)
			//AudioSource.PlayClipAtPoint(chuteSounds[Random.Range(0,4)], transform.position, Options.sfxVolume);
			
			// Audio - Parachute
			Fabric.EventManager.Instance.PostEvent("SFX/Vehicles/Parachute/PullOut", gameObject);
		
		usingChute=true;
		anim.SetTrigger("parachutePants");
		parachutePants.GetComponent(Renderer).enabled=true;
		rb2D.velocity.y*=.7;
		if(rb2D.velocity.x>3&&transform.localScale.x==1)
			rb2D.velocity.x-=.02;
		else if(rb2D.velocity.x<-3&&transform.localScale.x==-1)
			rb2D.velocity.x+=.02;
		
	}
	else
	{
		parachutePants.GetComponent(Renderer).enabled=false;		
		if(usingChute)
			//AudioSource.PlayClipAtPoint(chuteSounds[Random.Range(4,chuteSounds.Length)], transform.position, Options.sfxVolume);
			
			// Audio - Parachute
			Fabric.EventManager.Instance.PostEvent("SFX/Vehicles/Parachute/PullOut", gameObject);
			
		usingChute=false;
	}
}

function SkateParachutePantsFix()
{
	parachutePants.GetComponent(Renderer).enabled=false;
	usingChute=false;
}

function HangGlider()
{
	if(v==1)
		upTimer+=Time.deltaTime;
	else if(v==0)
		upTimer=0;

	if(rb2D.velocity.y != 0)
	{
		var angle : float = Mathf.Atan (rb2D.velocity.y/rb2D.velocity.x); // Find angle in radians
		angle *= Mathf.Rad2Deg;
		transform.eulerAngles.z = angle;
	}
	if(rb2D.velocity.x!=0)
		rb2D.gravityScale=.5;
	else
		rb2D.gravityScale=1.5;
	
	if(v>0&&upTimer<3)
	{		
		if(rb2D.velocity.x>5.5&&transform.localScale.x==1||rb2D.velocity.x<-5&&transform.localScale.x==-1)
			rb2D.AddForce(Vector2.up * 90);// * -rb2D.velocity.y);
		
		if(rb2D.velocity.x>3&&transform.localScale.x==1||rb2D.velocity.x<-3&&transform.localScale.x==-1)
			rb2D.velocity.x-=(.2*transform.localScale.x);
	}
	else if(v<0)
	{
		rb2D.AddForce(Vector2.up * -5);
		rb2D.velocity.x+=(.4*transform.localScale.x);
	}
	else if(v==0||v>0&&rb2D.velocity.y<1.5)
	{
		if(rb2D.velocity.x>6.2&&transform.localScale.x==1)//||rb2D.velocity.x<6.2&&transform.localScale.x==-1)
			rb2D.velocity.x-=.02;
		else if(rb2D.velocity.x<-5.8&&transform.localScale.x==-1||(rb2D.velocity.x>0&&rb2D.velocity.x<6.2)&&transform.localScale.x==1)
			rb2D.velocity.x+=.02;
		if(rb2D.velocity.y>-1.2&&rb2D.velocity.y<-.08)
			rb2D.velocity.y=Mathf.Clamp(rb2D.velocity.y,-1,-1);
		else if(rb2D.velocity.y<-1.2)
			rb2D.velocity.y+=.5;
	}
}

function EZBronze()
{
	yield WaitForSeconds(60);
	usingEZBronze=false;
}

function AlignWithNormal()
{
	
	var hit: RaycastHit2D = Physics2D.Raycast(Vector2(transform.position.x+.2*transform.localScale.x,transform.position.y), -Vector2.up, 2, mask);
	Debug.DrawRay (Vector2(transform.position.x+.2*transform.localScale.x,transform.position.y), -Vector2.up*2, Color.red);
	
	var hit2: RaycastHit2D = Physics2D.Raycast(Vector2(transform.position.x-.2*transform.localScale.x,transform.position.y), -Vector2.up, 2, mask);
	Debug.DrawRay (Vector2(transform.position.x-.2*transform.localScale.x,transform.position.y), -Vector2.up*2, Color.green);
	
	//var hit2: RaycastHit2D = Physics2D.Raycast(Vector2(transform.position.x+.3,transform.position.y), -Vector2.up,2,mask);
	
	//Debug.DrawRay (Vector2(transform.position.x-.3,transform.position.y), -Vector2.up*2, Color.red);
	
	//var hit3: RaycastHit2D = Physics2D.Raycast(Vector2(transform.position.x-.3,transform.position.y), -Vector2.up,2,mask);
	var usehit1:boolean;
	var usehit2:boolean;
	if(hit&&hit2)
	{
		if(hit.point.y>hit2.point.y)
		{
			usehit1=true;
			usehit2=false;
		}
		else if(hit2.point.y>hit.point.y)
		{
			usehit2=true;
			usehit1=false;	
			/*
			if(!isJumping)
			{
				rb2D.gravityScale=20;
				rb2D.velocity.y = Mathf.Clamp(rb2D.velocity.y,-10,10);
			}
			*/
		}
	}
	else
	{
		usehit1=false;
		usehit2=false;
	}
	//Debug.Log("hit1: " + hit.normal.y);
	//Debug.Log("hit2: " + hit2.normal.y);
	if((hit.normal.y==1&&hit2.normal.y<1&&hit2.normal.y>0)||hit2.normal.y==1&&hit.normal.y<1&&hit.normal.y>0)
		stickDown=true;
	else
		stickDown=false;
		
//	Debug.Log(stickDown);
	
	if(usehit1||usehit2)//&&hit2&&Vector2.Angle(hit2.normal,hit2.transform.up)>0&&hit3&&Vector2.Angle(hit3.normal,hit3.transform.up)>0)
	{
		if(usehit1)
		{
			slopeAngle = Vector2.Angle(hit.normal,hit.transform.up);
			if(onGround&&!isJumping&&!isDoubleJumping)
				surfaceNormal=Vector3.Lerp(surfaceNormal,hit.normal,Time.deltaTime*10);
			else
				surfaceNormal=Vector3(0,0,0);
		}
		else if(usehit2)
		{
			slopeAngle = Vector2.Angle(hit2.normal,hit2.transform.up);
			if(onGround&&!isJumping&&!isDoubleJumping)
				surfaceNormal=Vector3.Lerp(surfaceNormal,hit2.normal,Time.deltaTime*10);
			else
				surfaceNormal=Vector3(0,0,0);
		}
		
		
        //Move Player up or down to compensate for the slope below them
		//if(onGround)
		//{
			//rb2D.velocity.x -= hit.normal.x * .6;
		
		//	transform.position.y -= -hit.normal.x * Mathf.Abs(rb2D.velocity.x*1.25) * Time.deltaTime * (rb2D.velocity.x-hit.normal.x>0?1:-1);
		//}
				
    	if(SkateboardScript.usingSkateboard||sliding)
    		transform.up=Vector3.Lerp(transform.up,hit.normal,Time.deltaTime*10); //working
 
    	if(hit.collider.tag=="Puerta")
    		transform.parent = hit.collider.transform;
    	else
    		transform.parent = null;
    	
    	if(!sliding&&!SkateboardScript.usingSkateboard)
			transform.eulerAngles.z=0;
			//transform.rotation = Quaternion.Euler(0, 0, Mathf.Lerp(transform.rotation.eulerAngles.z, 0, Time.deltaTime* 10));
    		
    		
        
     }
     else
     {
     	surfaceNormal=Vector3(0,0,0);
     	//transform.rotation = Quaternion.Euler(0, 0, Mathf.Lerp(transform.rotation.eulerAngles.z, 0, Time.deltaTime* 10));
     	transform.eulerAngles.z=0;
     	slopeAngle=0;
     }
     	

	if(Input.GetButtonDown("Down")&&hit&&!SkateboardScript.usingSkateboard)
	{
		if(slopeAngle>20&&slopeAngle<65)
		{
			sliding=true;
			boxColl.sharedMaterial=wheelMat;
		}
	}
	
	if(sliding&&(rb2D.velocity.x==0)||Input.GetButtonDown("Jump"))
		{
			boxColl.sharedMaterial=null;
			yield WaitForSeconds(.25);
			sliding=false;
		}
		
	//if(sliding&&transform.localScale.x==1&&h!=0&&rb2D.velocity.x>0)
	//	rb2D.AddForce(Vector2.right * 3.5 * h);

	if(onGround&&rb2D.velocity.y<1)
		slidingJump=false;
}

function HideBoardTrick(x:float)
{
		hideBoardTrick=true;
		yield WaitForSeconds(x);
		hideBoardTrick=false;
}

function StartCarlton()
{
	carlton=true;
}

function EndCarlton()
{
	carlton=false;
}

function OldVelocity()
{
	oldVelocity=rb2D.velocity;
}

function OldAngle()
{
	oldAngle=transform.eulerAngles.z;
}
