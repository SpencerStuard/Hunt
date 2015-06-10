import System.Collections.Generic;

var enemiesNear = new List.<Transform>();


function Update ()
{
var enemies = GameObject.FindGameObjectsWithTag ("Enemy");

for (var enemy in enemies)
	{
	/*	if(!enemiesNear.Contains(enemy.transform.parent))
		{
			if(Vector2.Distance(GameController.player.transform.position,enemy.transform.position)<15&&enemy.transform.parent!=null)
			{
				enemiesNear.Add(enemy.transform.parent);
			}
		}*/
		if(!enemiesNear.Contains(enemy.transform))
		{
			if(Vector2.Distance(GameController.player.transform.position,enemy.transform.position)<15&&enemy.transform.parent==null)
			{
				enemiesNear.Add(enemy.transform);
			}
		}
		
		if(enemiesNear.Contains(enemy.transform))
		{
			if(Vector2.Distance(GameController.player.transform.position,enemy.transform.position)>15)
			{
				enemiesNear.Remove(enemy.transform);
			}
		}
	
	}
		for(var i:int = 0; i < enemiesNear.Count; i++)
			{
				if(enemiesNear[i]==null)
					enemiesNear.RemoveAt(i);
			}
		if(enemiesNear.Count==1&&enemiesNear[0].gameObject.tag=="Player")
			enemiesNear.RemoveAt(0);
}

function AlertEnemiesNearBy()
{
	for (var i:int;i<enemiesNear.Count;i++)
	{
		//if(enemiesNear[i].gameObject.GetComponent(MonoBehaviour).inRange)
		//{
			enemiesNear[i].gameObject.GetComponent(MonoBehaviour).seenPlayer=true;
			enemiesNear[i].gameObject.GetComponent(MonoBehaviour).Alerted();
			RaptorSuitController.popItOff=true;
			//if(RaptorSuitController.usingRaptorSuit)
			//	GameController.player.SendMessage("PopOff");
		//}
	}
}

function LostPlayer()
{
	var enemies = GameObject.FindGameObjectsWithTag ("Enemy");
	for (var enemy in enemies)
	{
		enemy.SendMessage("LostPlayer",SendMessageOptions.DontRequireReceiver);
	}
}