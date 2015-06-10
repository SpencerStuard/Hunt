//resources
var moveToZones: MoveToZones;
var target: Transform;
var spRenderer:SpriteRenderer;
var selected:Sprite;
var unselected:Sprite;

//parameters
var isLevel: boolean;
var id: int;
var upConnection: MapNode;
var rightConnection: MapNode;
var downConnection: MapNode;
var leftConnection: MapNode;

function Start()
{
	moveToZones = GameObject.Find("PathForPlayer").GetComponent(MoveToZones);
	spRenderer = GetComponent(SpriteRenderer);
}

function Update()
{
	if(!MoveToZones.moving)
	{
		if(MoveToZones.currentNodeID==id)
		{
			spRenderer.sprite=selected;
		}
		else
		{
			spRenderer.sprite=unselected;
		}
	}
}