//status
static var moving: boolean;
static var atLevel: boolean;
static var currentNodeID: int;
var currentNode: MapNode;

//parameters
var speed: float;

//collections
var nodes: MapNode[];
var platforms;

//resources
var player: GameObject;

function Start()
{
	if(Application.loadedLevel==1)
	{
		//connect to every level platform
		platforms = GameObject.FindGameObjectsWithTag("MapNode");
		nodes = new MapNode[platforms.Length];
		for (var i: int = 0; i < platforms.Length; i++)
		{
			nodes[i] = platforms[i].GetComponent(MapNode);
		}
		
		//find the current level platform
		for (var node: MapNode in nodes)
		{
			if(node.id == currentNodeID)
			{
				currentNode = node;
				break;
			}
		}
		
		//put the player on the map
		Debug.Log(currentNodeID);
		player.transform.position = currentNode.target.position;
		atLevel = currentNode.isLevel;
	}
}

function Update()
{
	if(Application.loadedLevel==1)
	{
		//get input
		if(Input.GetButtonDown("Up")||Input.GetAxis("DPadUpDown")>0||Input.GetAxis("LThumbstick Up/Down")>0)
		{
			Walk("Up");
		}
			
		if(Input.GetButtonDown("Right")||Input.GetAxis("DPadUpDown")>0||Input.GetAxis("LThumbstick Up/Down")>0)
		{
			Walk("Right");
		}
		
		if(Input.GetButtonDown("Down")||Input.GetAxis("DPadUpDown")>0||Input.GetAxis("LThumbstick Up/Down")>0)
		{
			Walk("Down");
		}
		
		if(Input.GetButtonDown("Left")||Input.GetAxis("DPadUpDown")>0||Input.GetAxis("LThumbstick Up/Down")>0)
		{
			Walk("Left");
		}

		//set animations
		if(player.activeSelf)
		{
			GameController.anim.SetBool("moving",moving);
		}
	}
}

function Walk(dir: String)
{
	if(!moving)
	{
		var dest: MapNode;
		var facing: int;
	
		//get destination node
		if(dir == "Up")
		{
			dest = currentNode.upConnection;
			facing = 0;
		}
		if(dir == "Right")
		{
			dest = currentNode.rightConnection;
			facing = 1;
		}
		if(dir == "Down")
		{
			dest = currentNode.downConnection;
			facing = 0;
		}
		if(dir == "Left")
		{
			dest = currentNode.leftConnection;
			facing = -1;
		}
		
		//abort if destination doesn't exist or is locked
		if(dest == null)
		{
			return;
		}
		
		if(dest.isLevel && dest.id > 0)
		{
			if(!ItemsToSave.itemsToSave.zone1LevelsComplete[dest.id - 1])
			{
				return;
			}
		}
		
		//orient and move
		if(facing != 0)
		{
			player.transform.localScale.x = facing;
		}
			
		iTween.MoveTo(player, iTween.Hash("position", dest.target.position, "time", speed, "easeType", "linear"));
		Moving();

		//update map position
		currentNode = dest;
		currentNodeID = dest.id;
		atLevel = dest.isLevel;
		Debug.Log(currentNodeID);
	}
}

//animation coroutine
function Moving()
{
	moving=true;
	yield WaitForSeconds(speed);
	moving=false;
}

/*
var player:GameObject;
static var currentPathPercent:int;// = 0.0;
//var i:int;
var at:int;
static var moving:boolean;
var waitTimer:float;
var spd:float;
var path:String;

function Start()
{
	if(Application.loadedLevel==1)
	{
		if(currentPathPercent<3)
		{
			path=(currentPathPercent.ToString() + "to" + (currentPathPercent+1).ToString());
		}
		else
		{
			path=(currentPathPercent.ToString() + "to" + (currentPathPercent-1).ToString());
		}
		player.transform.position = iTween.PointOnPath(iTweenPath.GetPath(path), 0f);
		spd=1.25;
	}
	else
		spd=.5;
	//currentPathPercent=0;
}

function Update()
{
	if(Application.loadedLevelName=="Map - Overworld"||Application.loadedLevelName=="Map - Jungle")
		if(player.activeSelf) //changed from .active due to obsolete
			GameController.anim.SetBool("moving",moving);
	
	if(Application.loadedLevel==1)
	{
		if(!WeaponLoadout.weaponLoadoutMenu&&waitTimer==0&&!StartMenuScript.inAMenu)
		{
				//currentPathPercent = Mathf.Clamp(currentPathPercent,0.02, 0.98);
				
			if(Input.GetButtonDown("Up")||Input.GetAxis("DPadUpDown")>0||Input.GetAxis("LThumbstick Up/Down")>0)
			{
						
				if(currentPathPercent==1&&ItemsToSave.itemsToSave.zone1LevelsComplete[currentPathPercent])
				{
					iTween.MoveTo(player, iTween.Hash("path", iTweenPath.GetPath("1to2"),"time",spd, "easeType", "linear", "movetopath", false));
					moving=true;
					currentPathPercent++;
				}
			}
					
			if(Input.GetButtonDown("Right")||Input.GetAxis("DPadLeftRight")>0||Input.GetAxis("LThumbstick Left/Right")>0)
			{	
				player.transform.localScale.x=1;
				if(currentPathPercent==0&&ItemsToSave.itemsToSave.zone1LevelsComplete[currentPathPercent]) //0 to 1
				{
					iTween.MoveTo(player, iTween.Hash("path", iTweenPath.GetPath("0to1"),"time",spd, "easeType", "linear", "movetopath", false));
					currentPathPercent++;
					moving=true;
				}
				
				else if(currentPathPercent==2&&ItemsToSave.itemsToSave.zone1LevelsComplete[currentPathPercent])
				{
					iTween.MoveTo(player, iTween.Hash("path", iTweenPath.GetPath("2to3"),"time",spd, "easeType", "linear", "movetopath", false));
					currentPathPercent++;
					moving=true;
				}
			}
				
			if(Input.GetButtonDown("Down")||Input.GetAxis("DPadUpDown")<0||Input.GetAxis("LThumbstick Up/Down")<0)
			{			
				if(currentPathPercent==2)
				{
					iTween.MoveTo(player, iTween.Hash("path", iTweenPath.GetPath("2to1"),"time",spd, "easeType", "linear", "movetopath", false));
					currentPathPercent--;
					moving=true;
				}
			}
				
			if(Input.GetButtonDown("Left")||Input.GetAxis("DPadLeftRight")<0||Input.GetAxis("LThumbstick Left/Right")<0)
			{	
				player.transform.localScale.x=-1;
				if(currentPathPercent==1) //1 to 0
				{
					iTween.MoveTo(player, iTween.Hash("path", iTweenPath.GetPath("1to0"),"time",spd, "easeType", "linear", "movetopath", false));
					currentPathPercent--;
					moving=true;
				}
				else if(currentPathPercent==3)
				{
					iTween.MoveTo(player, iTween.Hash("path", iTweenPath.GetPath("3to2"),"time",spd, "easeType", "linear", "movetopath", false));
					currentPathPercent--;
					moving=true;
				}
			}
		}
		if(moving)
			waitTimer+=Time.deltaTime;
		if(waitTimer>=spd)
		{
			waitTimer=0;
			moving=false;
		}
	}
	
	if(Application.loadedLevel==1)
	{
		if(!WeaponLoadout.weaponLoadoutMenu&&waitTimer==0&&!StartMenuScript.inAMenu)
		{
				//currentPathPercent = Mathf.Clamp(currentPathPercent,0.02, 0.98);
				
			if(Input.GetButtonDown("Up")||Input.GetAxis("DPadUpDown")>0||Input.GetAxis("LThumbstick Up/Down")>0)
			{
						
				if(currentPathPercent==1)
				{
					iTween.MoveTo(player, iTween.Hash("path", iTweenPath.GetPath("1to2"),"time",spd, "easeType", "linear", "movetopath", false));
					moving=true;
					currentPathPercent++;
				}
			}
					
			if(Input.GetButtonDown("Right")||Input.GetAxis("DPadLeftRight")>0||Input.GetAxis("LThumbstick Left/Right")>0)
			{	
				player.transform.localScale.x=1;
				if(currentPathPercent==0) //0 to 1
				{
					iTween.MoveTo(player, iTween.Hash("path", iTweenPath.GetPath("0to1"),"time",spd, "easeType", "linear", "movetopath", false));
					currentPathPercent++;
					moving=true;
				}
				
				else if(currentPathPercent==2)
				{
					iTween.MoveTo(player, iTween.Hash("path", iTweenPath.GetPath("2to3"),"time",spd, "easeType", "linear", "movetopath", false));
					currentPathPercent++;
					moving=true;
				}
			}
				
			if(Input.GetButtonDown("Down")||Input.GetAxis("DPadUpDown")<0||Input.GetAxis("LThumbstick Up/Down")<0)
			{			
				if(currentPathPercent==2)
				{
					iTween.MoveTo(player, iTween.Hash("path", iTweenPath.GetPath("2to1"),"time",spd, "easeType", "linear", "movetopath", false));
					currentPathPercent--;
					moving=true;
				}
			}
				
			if(Input.GetButtonDown("Left")||Input.GetAxis("DPadLeftRight")<0||Input.GetAxis("LThumbstick Left/Right")<0)
			{	
				player.transform.localScale.x=-1;
				if(currentPathPercent==1) //1 to 0
				{
					iTween.MoveTo(player, iTween.Hash("path", iTweenPath.GetPath("1to0"),"time",spd, "easeType", "linear", "movetopath", false));
					currentPathPercent--;
					moving=true;
				}
				else if(currentPathPercent==3)
				{
					iTween.MoveTo(player, iTween.Hash("path", iTweenPath.GetPath("3to2"),"time",spd, "easeType", "linear", "movetopath", false));
					currentPathPercent--;
					moving=true;
				}
			}
		}
		if(moving)
			waitTimer+=Time.deltaTime;
		if(waitTimer>=spd)
		{
			waitTimer=0;
			moving=false;
		}
	}
	
	if(Application.loadedLevel==2) //Jungle Map
	{
		if(!WeaponLoadout.weaponLoadoutMenu&&waitTimer==0&&!StartMenuScript.inAMenu&&!moving)
		{
				//currentPathPercent = Mathf.Clamp(currentPathPercent,0.02, 0.98);
				
			if(Input.GetButtonDown("Up")||Input.GetAxis("DPadUpDown")>0||Input.GetAxis("LThumbstick Up/Down")>0)
			{
						
			}
					
			if(Input.GetButtonDown("Right")||Input.GetAxis("DPadLeftRight")>0||Input.GetAxis("LThumbstick Left/Right")>0)
			{	
				player.transform.localScale.x=1;
				if(currentPathPercent==0&&ItemsToSave.itemsToSave.zone1LevelsComplete[currentPathPercent])
				{
					moving=true;
					iTween.MoveTo(player, iTween.Hash("path", iTweenPath.GetPath("0to1"),"time",spd, "easeType", "linear", "movetopath", false));
					currentPathPercent++;
				}
				
				else if(currentPathPercent==1&&ItemsToSave.itemsToSave.zone1LevelsComplete[currentPathPercent])
				{
					moving=true;
					iTween.MoveTo(player, iTween.Hash("path", iTweenPath.GetPath("1to2"),"time",spd, "easeType", "linear", "movetopath", false));
					currentPathPercent++;
				}
				
				else if(currentPathPercent==2&&ItemsToSave.itemsToSave.zone1LevelsComplete[currentPathPercent])
				{
					moving=true;
					iTween.MoveTo(player, iTween.Hash("path", iTweenPath.GetPath("2to3"),"time",spd, "easeType", "linear", "movetopath", false));
					currentPathPercent++;
				}
			}
				
			if(Input.GetButtonDown("Down")||Input.GetAxis("DPadUpDown")<0||Input.GetAxis("LThumbstick Up/Down")<0)
			{			
			}
				
			if(Input.GetButtonDown("Left")||Input.GetAxis("DPadLeftRight")<0||Input.GetAxis("LThumbstick Left/Right")<0)
			{	
				player.transform.localScale.x=-1;
				if(currentPathPercent==1)
				{
					moving=true;
					iTween.MoveTo(player, iTween.Hash("path", iTweenPath.GetPath("1to0"),"time",spd, "easeType", "linear", "movetopath", false));
					currentPathPercent--;
				}
				else if(currentPathPercent==2)
				{
					moving=true;
					iTween.MoveTo(player, iTween.Hash("path", iTweenPath.GetPath("2to1"),"time",spd, "easeType", "linear", "movetopath", false));
					currentPathPercent--;
				}
				else if(currentPathPercent==3)
				{
					moving=true;
					iTween.MoveTo(player, iTween.Hash("path", iTweenPath.GetPath("3to2"),"time",spd, "easeType", "linear", "movetopath", false));
					currentPathPercent--;
				}
			}
		}
		if(moving)
			waitTimer+=Time.deltaTime;
		if(waitTimer>=spd)
		{
			waitTimer=0;
			moving=false;
		}
	}
}
*/