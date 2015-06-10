var canTakeCover:boolean=false;
static var inStandCover:boolean=false;
var toggleIn:boolean;
var toggleOut:boolean;

var rend:Renderer;

function Start()
{
	rend=GetComponent(Renderer);
}

function Update()
{
	CanTakeCover();
	TakeCover();
	if(CharController.v==0)
	{
		toggleIn=false;
		toggleOut=false;
	}
	
	if(inStandCover)
		GameController.player.SendMessage("StopRoll");
}

function CanTakeCover()
{
	if(Vector2.Distance(GameController.player.transform.position,transform.position)<1)
		canTakeCover=true;
	else 
		canTakeCover=false;
}

function TakeCover()
{
	if(canTakeCover&&!inStandCover&&CharController.v==1&&!toggleOut)
	{
		toggleIn=true;
		inStandCover=true;
		rend.sortingLayerName="Player";
		rend.sortingOrder=50;
	}
	if(inStandCover&&CharController.v==1&&!toggleIn)
	{
		toggleOut=true;
		inStandCover=false;
		rend.sortingLayerName="BG 5";
		rend.sortingOrder=0;
	}


}
