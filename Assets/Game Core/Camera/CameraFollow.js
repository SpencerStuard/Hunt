var player:Transform;
var xPos:float;
var yPos:float;
var timeDown:float;
//var panDown:boolean;
var folX:boolean;
var folY:boolean;

var timeUp:float;
//var panUp:boolean;

var panDir:int;

function Awake()
{
	player=GameObject.Find("Player").transform;
	folX=true;
	folY=true;
}

function Update()
{
	if(RaptorSuitController.usingRaptorSuit)
		player=GameObject.Find("Raptor Suit(Clone)").transform;
	else if(!RaptorSuitController.usingRaptorSuit&&!GameController.playerController.freezePlayer)
		player=GameController.player.transform;

	if(panDir==0)
	{
		if(folX)
			transform.position.x=player.position.x+xPos;
		if(folY)
			transform.position.y=player.position.y+yPos;
	}
	else
		if(folX&&folY)
			transform.position = Vector3.Lerp(transform.position,Vector3(player.position.x,player.position.y+panDir,-10),Time.deltaTime*2);
		else if(!folX)
			transform.position = Vector3.Lerp(transform.position,Vector3(transform.position.x,player.position.y+panDir,-10),Time.deltaTime*2);


		
	if(GameController.playerController.crouching&&CharController.onGround&&!GameController.playerController.grabbingOn&&!SkateboardScript.usingSkateboard)
		timeDown+=Time.deltaTime;
	else
		timeDown=0;
		
	if((!GameController.playerController.grabbingOn&&!GameController.playerController.swimming&&!SkateboardScript.usingSkateboard)&&(Input.GetButton("Up")||Input.GetAxis("LThumbstick Up/Down")>0)&&!GameController.playerController.runningForward&&!GameController.playerController.runningBackwards)
		timeUp+=Time.deltaTime;
	else
		timeUp=0;
	
	if(timeDown>=1.5)
		panDir=-1.3;	
	else if(timeUp>=1.5)
		panDir=3;
	else
		panDir=0;
		
	/*if(panUp)
		panDir=2.5;
	if(panDown)
		panDir=-2;
	if(!panUp&&!panDown)
		panDir=0;*/
}

function SetFollow(val : boolean)
{
	this.enabled=val;
}