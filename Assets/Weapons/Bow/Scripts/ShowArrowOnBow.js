var bowScript:BowScript;
var thisArrow:int;
//var drawBack:float;
var rend:Renderer;

function Start()
{
	rend=GetComponent(Renderer);
}

function Update ()
{
	ArrowSelected();
	DrawBack();
	KeepCentered();
}

function ArrowSelected()
{
	if(!bowScript.justFired)
	{
		if(bowScript.arrowSelected==0)
		{
			if(thisArrow==0&&bowScript.regularCount>0)
			rend.enabled=true;
			
			if(thisArrow==1)
			rend.enabled=false;
			
			if(thisArrow==2)
			rend.enabled=false;
		}

		if(bowScript.arrowSelected==1&&bowScript.punchCount>0)
		{
			if(thisArrow==0)
			rend.enabled=false;
			
			if(thisArrow==1)
			rend.enabled=true;
			
			if(thisArrow==2)
			rend.enabled=false;
		}

		if(bowScript.arrowSelected==2&&bowScript.plungerCount>0)
		{
			if(thisArrow==0)
			rend.enabled=false;
			
			if(thisArrow==1)
			rend.enabled=false;
			
			if(thisArrow==2)
			rend.enabled=true;
		}
	}
	
	if(bowScript.justFired||CharController.idling||GameController.playerController.freezePlayer||GameController.playerController.grabbingRope)
	{
		rend.enabled=false;
	}
}

function DrawBack()
{
	transform.localPosition.x = Mathf.Clamp(transform.localPosition.x,.2,.5);
	if(bowScript.drawTimer!=0)
		transform.localPosition.x-=0.001875;
	else
		transform.localPosition.x=0.5;
}

function KeepCentered()
{
	transform.localScale.y=GameController.player.transform.localScale.x;
	
	if(transform.localScale.y==1)
	{	
		if(thisArrow==1)
			transform.localPosition.y=.03;
		
		if(thisArrow==2)
		transform.localPosition.y=0;
	}
	
	if(transform.localScale.y==-1)
	{	
		if(thisArrow==1)
			transform.localPosition.y=-.06;
		
		if(thisArrow==2)
			transform.localPosition.y=-.03;
	}
}
