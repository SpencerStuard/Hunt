var tileMap:tk2dTileMap;

function Start()
{
	tileMap.Build ();
}

/*
function DestroyBlock (x:int,y:int)
{
	tileMap.SetTile (x, y, 0, -1);
	tileMap.Build ();
}

function AddToBlock (x:int,y:int)
{
	tileMap.SetTile (x, y, 4, 25);
	tileMap.Build ();
}

function PaintBlock (x:int,y:int)
{
	var chrisColor:Color = Color32(255, 0, 0, 255);

	tileMap.ColorChannel.SetColor (x, y, chrisColor);
	//tileMap.ColorChannel.SetColor (x-1, y, chrisColor);
	//tileMap.ColorChannel.SetColor (x+1, y, chrisColor);
	tileMap.Build ();
}

function LightBlocks (x:int,y:int)
{
	var light:Color = Color32(255, 255, 255, 255);

	tileMap.ColorChannel.SetColor (x, y, light);
	tileMap.ColorChannel.SetColor (x, y-1, light);
	tileMap.ColorChannel.SetColor (x-1, y, light);
	tileMap.ColorChannel.SetColor (x-1, y-1, light);
	//tileMap.ColorChannel.SetColor (x-2, y, light);
	//tileMap.ColorChannel.SetColor (x-3, y, light);
	tileMap.ColorChannel.SetColor (x+1, y, light);
	tileMap.ColorChannel.SetColor (x+1, y-1, light);
	//tileMap.ColorChannel.SetColor (x+2, y, light);
	//tileMap.ColorChannel.SetColor (x+3, y, light);
	tileMap.Build ();
}

function DarkenBlocks (x:int,y:int)
{
	Debug.Log("gfd");
	var light:Color = Color32(0, 0, 0, 255);

	tileMap.ColorChannel.SetColor (x-2, y, light);
	tileMap.ColorChannel.SetColor (x-2, y-1, light);
	tileMap.ColorChannel.SetColor (x-3, y-1, light);
	tileMap.ColorChannel.SetColor (x+2, y, light);
	tileMap.ColorChannel.SetColor (x+2, y-1, light);
	tileMap.ColorChannel.SetColor (x+3, y-1, light);

	tileMap.Build ();
}

function OnCollisionStay2D(col:Collision2D)
{
	if(col.gameObject.tag=="Player"&&TorchScript.usingTorch)
	{
		var tileIDs:int = tileMap.GetTileIdAtPosition(col.transform.position, 0);
		if (tileIDs < 0)
		{
			var collisionPoints:Vector3;
			collisionPoints = col.contacts[0].point;
			collisionPoints.z=0;
			var xxs:int;
			var yys:int;
			tileMap.GetTileAtPosition(collisionPoints, xxs, yys);
			yield WaitForEndOfFrame;
			LightBlocks(xxs,yys);
		}
	}
}

function OnCollisionExit2D(col:Collision2D)
{
	if(col.gameObject.tag=="Player"&&TorchScript.usingTorch)
	{
		var tileIDs:int = tileMap.GetTileIdAtPosition(col.transform.position, 0);
		if (tileIDs < 0)
		{
			Debug.Log("fgfd");
			var collisionPoints:Vector3;
			collisionPoints = col.contacts[0].point;
			collisionPoints.z=0;
			var xxs:int;
			var yys:int;
			tileMap.GetTileAtPosition(collisionPoints, xxs, yys);
			//yield WaitForEndOfFrame;
			DarkenBlocks(xxs,yys);
		}
	}
}


function OnCollisionEnter2D(col:Collision2D)
{
	if(col.gameObject.tag=="PlayerMagic"&&col.gameObject.name=="Fireball(Clone)")
	{
		var tileID:int = tileMap.GetTileIdAtPosition(col.transform.position, 0);
		if (tileID < 0)
		{
			var collisionPoint:Vector3;
			collisionPoint = col.contacts[0].point;
			//collisionPoint.y -=.5;
			//collisionPoint.x -=.5;
			collisionPoint.z=0;
			var xx:int;
			var yy:int;
			tileMap.GetTileAtPosition(collisionPoint, xx, yy);
			yield WaitForEndOfFrame;
			AddToBlock(xx,yy);
		}
	}
}

function OnParticleCollision(col:GameObject)
{
	if(col.tag=="Rope")
	{
		var tileID:int = tileMap.GetTileIdAtPosition(col.transform.position, 0);
		if (tileID < 0)
		{
			var xx:int;
			var yy:int;
			tileMap.GetTileAtPosition(col.transform.position, xx, yy);
			yield WaitForEndOfFrame;
			PaintBlock(xx,yy);
		}
	}
}
*/