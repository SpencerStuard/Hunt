var canTakeCover:boolean=false;
static var inDuckCover:boolean=false;
var toggleIn:boolean;
var toggleOut:boolean;
//var charController:CharController;

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
	
	if(inDuckCover)
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
	if(canTakeCover&&!inDuckCover&&CharController.v==-1&&!toggleOut)
	{
		rend.sortingLayerName="Player";
		rend.sortingOrder=50;
		toggleIn=true;
		inDuckCover=true;
	}
	if(inDuckCover&&CharController.v==-1&&!toggleIn)
	{
		toggleOut=true;
		inDuckCover=false;
		rend.sortingLayerName="BG 5";
		rend.sortingOrder=0;
		//iTween.Stop();
	}
}
