var imLevelNumber:int;
var imZoneNumber:int;

var rend:Renderer;

function Start()
{
	rend=GetComponent(Renderer);
}

function OnMouseDown()
{
	if(imZoneNumber==1)
		gameObject.Find("Save Manager").SendMessage("SetTrue1", imLevelNumber);
	
	else if(imZoneNumber==2)
		gameObject.Find("Save Manager").SendMessage("SetTrue2", imLevelNumber);
	
	else if(imZoneNumber==3)
		gameObject.Find("Save Manager").SendMessage("SetTrue3", imLevelNumber);
	
	else if(imZoneNumber==4)
		gameObject.Find("Save Manager").SendMessage("SetTrue4", imLevelNumber);
}

function FixedUpdate()
{
	if(imZoneNumber==1)
	{
		if(ItemsToSave.itemsToSave.zone1LevelsComplete[imLevelNumber])
		{
			rend.enabled=false;
		}
		else
		{
			rend.enabled=true;
		}
	}
	
	else if(imZoneNumber==2)
	{
		if(ItemsToSave.itemsToSave.zone2LevelsComplete[imLevelNumber])
		{
			rend.enabled=false;
		}
		else
		{
			rend.enabled=true;
		}
	}
	
	else if(imZoneNumber==3)
	{
		if(ItemsToSave.itemsToSave.zone3LevelsComplete[imLevelNumber])
		{
			rend.enabled=false;
		}
		else
		{
			rend.enabled=true;
		}
	}
	
	else if(imZoneNumber==4)
	{
		if(ItemsToSave.itemsToSave.zone4LevelsComplete[imLevelNumber])
		{
			rend.enabled=false;
		}
		else
		{
			rend.enabled=true;
		}
	}
}
