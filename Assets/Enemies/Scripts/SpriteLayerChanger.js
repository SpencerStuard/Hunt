//var nearbyEnemies:NearbyEnemies;
var allChildren;
//var allChildren2;
var done:boolean;
var rand:int;

function Start ()
{
	rand=Random.Range(-20,21);
	allChildren=gameObject.GetComponentsInChildren(SpriteRenderer);
	//nearbyEnemies = GameController.gameController.GetComponent(NearbyEnemies);
}

function Update ()
{
	if(!done)
	{
		for (var child : SpriteRenderer in allChildren) 
		{
			//for(var i:int = 0; i < nearbyEnemies.enemiesNear.Count; i++)
			//	{
					//if(nearbyEnemies.enemiesNear[i]!=null)
						child.sortingOrder+=10*rand;
						done=true;

			//	}
			

		}
	}
}

function Increase()
{
	for (var child : SpriteRenderer in allChildren) 
	{
		child.sortingOrder+=700;
	}
}

function SwitchToEnemy()
{
	for (var child : SpriteRenderer in allChildren) 
	{
		child.sortingLayerName="Enemy";
	}
}