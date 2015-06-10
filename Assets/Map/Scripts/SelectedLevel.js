var selected:Sprite;
var unselected:Sprite;
var imLevelNumber:int;
var spRenderer:SpriteRenderer;

function Update()
{
	if(MoveToZones.currentPathPercent==imLevelNumber-1&&!MoveToZones.moving)
		spRenderer.sprite=selected;
	else
		spRenderer.sprite=unselected;
}