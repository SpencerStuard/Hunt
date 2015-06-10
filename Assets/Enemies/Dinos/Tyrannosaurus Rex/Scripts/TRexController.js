#pragma strict
//parameters
var followDistance:float;
var biteDistance:float;
var verticalOffset:float;
var animationSpeed:float;
var biteSpeed:float;
var chewSpeed:float;
var appearTime:float;
var normalTime:float;
var shakeAmount:float;
var raycastHeight:float;

//status
static var pursuing:boolean;
static var initChase:boolean;
var onScreen:boolean;
var biting:boolean;
var biteHit:boolean;
var roaring:boolean;
var roared:boolean;
var appearing:boolean;
var hitGround:boolean;
var chewing:boolean;

//internal
var pursuitPosition:Vector3;
var lastPosition:Vector3;
var cachedOffset:float;
var appearLerp:float;
var lastNormal:Vector3;
var tempOffset:Vector3;
var appearDistance:float;
var mask:LayerMask;
var constructedInterpolator:boolean;
var normalInterpolator:NormalInterpolator;

//resources
var mainCamera:Transform;
var cameraTarget:Transform;
var stompFX:GameObject;
var bloodFX_New:GameObject;
var anim:Animator;
var rb2d:Rigidbody2D;
var stompPositionL:Transform;
var stompPositionR:Transform;
var bitePosition:Transform;
var eatPlayer:EatPlayerMovement;
var cameraFollow:CameraFollow;
var backgroundParallax:BackgroundParallax[];

function Start ()
{
	anim=gameObject.GetComponent(Animator);
	rb2d=gameObject.GetComponent(Rigidbody2D);
	mainCamera=GameObject.Find("Main Camera").transform;
	
	constructedInterpolator=false;
	
	pursuing=true;
	initChase=true;
	hitGround=true;
	biteHit=false;
	chewing=false;
	roaring=false;
	roared=false;
	
	InitChase();
	Appear();
}

function InitChase()
{
	yield WaitForSeconds(2);
	initChase=false;
}

function Update ()
{
	if(Time.timeScale > 0)
	{
		//get raycast position
		pursuitPosition = Vector3(GameController.player.transform.position.x - followDistance - GameController.playerController.deltaPosition,
									GameController.player.transform.position.y + raycastHeight, 0);
		
		//raycast and update transform
		if(pursuing)
		{
			var hit: RaycastHit2D = Physics2D.Raycast(pursuitPosition, -Vector2.up, 60, mask);
			//Debug.DrawRay(pursuitPosition, -Vector2.up, Color.red);
			//Debug.DrawRay(hit.point, normalInterpolator.GetNormal()*verticalOffset, Color.blue);
			
			if(hit)
			{
				if(!constructedInterpolator)
				{
					normalInterpolator = new NormalInterpolator(normalTime, Vector3(hit.normal.x, hit.normal.y, 0));
					constructedInterpolator=true;
					lastNormal = hit.normal;
				}
			
				if(!roaring)
				{
					tempOffset=(normalInterpolator.GetNormal()*verticalOffset);
					lastPosition=Vector3(hit.point.x, hit.point.y , 0) + tempOffset;
					transform.position=lastPosition;
				}
				
				if(lastNormal!=hit.normal)
				{
					normalInterpolator.Interpolate(hit.normal);
				}
				
				roared=false;
				hitGround = true;
			}
			else
			{
				if(!roaring&&!roared)
				{
					roaring=true;
					roared=true;
					onScreen=false;
					Roar();
				}
			
				hitGround = false;
			}
			
			normalInterpolator.GetUpdate(Time.deltaTime);
			transform.up = normalInterpolator.GetNormal();
			lastNormal = normalInterpolator.GetRefNormal();
		}
		
		//walk in from the left side of the screen, set animator playback speed
		if(appearing)
		{
			var vecOffset:Vector3;
			vecOffset =  (Quaternion.AngleAxis(90, Vector3.forward) * (-normalInterpolator.GetNormal())) * (5 - cachedOffset);
		
			if(appearLerp < appearTime)
			{
				appearLerp += Time.deltaTime;
				transform.position=Vector3.Lerp(Vector3(lastPosition.x - vecOffset.x, lastPosition.y - vecOffset.y, 0),
													lastPosition, appearLerp/appearTime);
			}
			else
			{
				appearing=false;
				appearLerp=0;
			}
			
			if(!chewing)
			{
				anim.speed = animationSpeed * 1.5;//((appearDistance + GameController.playerController.autoskateBaseSpeed * appearTime)/GameController.playerController.autoskateBaseSpeed * appearTime);
			}
			else
			{
				anim.speed = animationSpeed;
			}
		}
		else
		{
			anim.speed = animationSpeed;	
		}
		
		//try to bite
		if(!biting&&!roaring&&!chewing)
		{
			anim.SetBool("Standing", !pursuing);
			anim.SetBool("Walking", pursuing);
		
			if(GameController.player.transform.position.x - transform.position.x < biteDistance)
			{
				if(!GameController.playerController.inPit)
				{
					Bite();
				}
			}
		}
	}
}

//public
function ChewPlayer()
{
	chewing=true;
	anim.speed = chewSpeed;
	anim.SetBool("Standing", false);
	anim.SetBool("Walking", false);
	anim.SetBool("Bite_ground", false);
	anim.SetBool("Chewing", true);
	GameController.player.transform.parent=bitePosition;
	GameController.player.transform.localScale.y=1;
	GameController.player.transform.localScale.x=-1;
	eatPlayer.SetPlayerRotation();
	EatPlayerMovement.eating=true;
	EatPlayerMovement.goingIn=true;
	var blood = Instantiate(bloodFX_New, GameController.player.transform.position, Quaternion.identity);
	blood.transform.parent=GameController.player.transform;
	cameraFollow.enabled=false;
	mainCamera.position.x=cameraTarget.position.x;
	mainCamera.position.y=cameraTarget.position.y;
	for(var i: int=0;i<backgroundParallax.length;i++)
	{
		backgroundParallax[i].enabled=false;
	}
	GameController.autoSkateMode=false;
	//yield;
	//cameraFollow.transform.position=Vector3(bitePosition.position.x,bitePosition.position.y + 1,-10);
	this.enabled=false;
}

function PlayerInPit()
{
	yield WaitForSeconds(1);
	//roaring=false;
	//pursuing=false;
	//biting=false;
}

//coroutines
function Appear()
{
	while(!hitGround)
	{
		yield;
	}
	
	anim.SetBool("Standing", false);
	anim.SetBool("Walking", true);
	
	roaring=false;
	
	
	if(!onScreen)
	{
		cachedOffset = GameController.playerController.deltaPosition;
		onScreen = true;
		appearing = true;
	}
	
	var vecOffset:Vector3;
	vecOffset =  (Quaternion.AngleAxis(90, Vector3.forward) * (-normalInterpolator.GetNormal())) * 5;// (5 - cachedOffset);
	
	appearDistance = vecOffset.magnitude;
}

function Bite()
{
	while(GameController.player.transform.position.x - transform.position.x < biteDistance)
	{
		if(GameController.playerController.inPit)
		{
			break;
		}
		biting=true;
		anim.SetBool("Standing", false);
		anim.SetBool("Walking", false);
		anim.SetBool("Bite_ground", true);
		anim.speed = biteSpeed;
		yield WaitForSeconds(2 / anim.speed);
		biteHit=false;
	}
	anim.SetBool("Bite_ground", false);
	biting=false;
}

function Roar()
{
	Fabric.EventManager.Instance.PostEvent("SFX/Enemies/TRex/Roar", gameObject);
	anim.SetBool("Standing", false);
	anim.SetBool("Walking", false);
	anim.SetBool("Roar", true);
	yield WaitForSeconds(3 / anim.speed);
	anim.SetBool("Roar", false);
	anim.SetBool("Standing", true);
	Appear();
}

//animation events
function LeftStomp()
{
	var cloud = Instantiate(stompFX,Vector3(stompPositionL.position.x, stompPositionL.position.y, -1),Quaternion.identity);
	cloud.SendMessage("Impulse");
	Fabric.EventManager.Instance.PostEvent("SFX/Enemies/TRex/Stomp", stompPositionL.gameObject);
	GameController.shakeCam.Shake(0,0,shakeAmount,.15f);//(shakeAmount,shakeAmount,0,.2f);
}

function RightStomp()
{
	var cloud = Instantiate(stompFX,Vector3(stompPositionR.position.x, stompPositionR.position.y, -1),Quaternion.identity);
	cloud.SendMessage("Impulse");
	Fabric.EventManager.Instance.PostEvent("SFX/Enemies/TRex/Stomp", stompPositionR.gameObject);
	GameController.shakeCam.Shake(0,0,shakeAmount,.15f);//(shakeAmount,shakeAmount,0,.2f);
}

class NormalInterpolator
{
	private var outputNormal: Vector3;
	private var refNormal: Vector3;
	private var interpolating: boolean;
	private var startNormal: Vector3;
	private var endNormal: Vector3;
	private var frac: float;
	private var max: float;
	
	function GetRefNormal()
	{
		return refNormal;
	}
	
	function GetNormal(): Vector3
	{
		return outputNormal;
	}

	function Interpolate(to: Vector3)
	{
		if(interpolating)
		{
			return;
		}
		
		refNormal = to;
		endNormal = ReduceSlope(to);
		interpolating = true;
	}
	
	function GetUpdate(deltaTime: float)
	{
		if(interpolating)
		{
			frac += deltaTime;
			
			if(frac<=max)
			{
				outputNormal = Vector3.Lerp(startNormal, endNormal, frac/max);
			}
			else
			{
				frac = 0;
				outputNormal = endNormal;
				startNormal = endNormal;
				interpolating = false;
			}
		}
	}
	
	function ReduceSlope(vec: Vector3): Vector3
	{
		return (vec + Vector3.up).normalized;
	}
	
	function NormalInterpolator(duration: float, currentNormal: Vector3)
	{
		
		startNormal = currentNormal;
		outputNormal = currentNormal;
		refNormal = currentNormal;
		frac = 0;
		max = duration;
	}
	
	function NormalInterpolator()
	{
		//don't use with default constructor
	}
}