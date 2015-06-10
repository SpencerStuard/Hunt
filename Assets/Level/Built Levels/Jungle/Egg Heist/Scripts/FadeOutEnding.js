#pragma strict

var blackout:Texture2D;
var speed:float;
var alpha:float;
var depth:float;
var fadingOut:boolean;
var loaded:boolean;

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player")
	{
		fadingOut=true;
	}
}

function Start()
{
	depth=-500;
	speed=0.2;
	alpha=0;
	fadingOut=false;
	loaded=false;
}

function OnGUI()
{
	if(fadingOut)
	{
		if(alpha<1)
		{
			alpha += speed*Time.deltaTime;
			alpha = Mathf.Clamp(alpha, 0f, 1f);
			GUI.color.a = alpha;
			GUI.depth = depth;
		}
		else
		{
			if(!loaded)
			{
				loaded=true;
				Load();
			}
		}
		GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), blackout);
	}
}

function Load()
{
		//unlock skateboard
		ItemsToSave.itemsToSave.weaponsUnlocked[7]=true;
		ItemsToSave.itemsToSave.zone1LevelsComplete[2]=true;
		ItemsToSave.itemsToSave.SaveToFile();
		yield WaitForSeconds(.4);
		Application.LoadLevel("Map - Overworld");
}