var imZoneNumber:int;
var rend:Renderer;

function Start()
{
	rend=GetComponent(Renderer);
}

function Update()
{
	if(ItemsToSave.itemsToSave.zone1LevelsComplete[imZoneNumber-2])
		rend.enabled=false;
	else
		rend.enabled=true;
}
