#pragma strict

var cutsceneOver:boolean;

function OnTriggerEnter2D(col:Collider2D)
{
	if(cutsceneOver==false)
	{
		if(col.gameObject.tag=="Player")
		{
			var eggScript : EggScript;
			eggScript = col.GetComponentInChildren(EggScript);
			if(eggScript != null)
			{
				eggScript.StopRunning();
				GameController.playerController.freezePlayer=false;
			}
			cutsceneOver = true;
		}
		else if(col.gameObject.tag=="PropEnemy")
		{
			col.GetComponentInChildren(ShadowTestScript).HideShadow();
			Destroy(col.gameObject);
		}
	}
}