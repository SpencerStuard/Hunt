var offSet = Vector3(0,0,1);

var spriteRenderer1:SpriteRenderer;
var spriteRenderer2:SpriteRenderer;

var waypointArray:Transform[];
var percentsPerSecond:float = 0.02;
var currentPathPercent:float = 0.0;

var thumbstickpercentage:float;

var cam:Camera;

var guiCrosshair:GUICrosshair;

function Start()
{
	cam=GetComponent(Camera).main;
	if(Application.loadedLevel > 2)
	{
		waypointArray[0]=GameObject.Find("waypoint1").transform;
		waypointArray[1]=GameObject.Find("waypoint2").transform;
		waypointArray[2]=GameObject.Find("waypoint3").transform;
		waypointArray[3]=GameObject.Find("waypoint4").transform;
		guiCrosshair=GetComponent(GUICrosshair);
	}
	
	spriteRenderer=GetComponent(SpriteRenderer);
}

function LateUpdate()
{
		currentPathPercent = Mathf.Clamp(currentPathPercent,0.004,0.996);
		
		if(Application.loadedLevel>0)
			UseController();
		
	//	if(!Options.usingController)
	//	{
			//GetComponent(Renderer).enabled=true;
	//	}
		thumbstickpercentage=(Input.GetAxis("RThumbStickUpDown")+1)/2;
		
		if(Input.GetAxis("RThumbStickUpDown")==0)
		{
			thumbstickpercentage=0.36;
		}
//}    

//function FixedUpdate ()
//{
	if(!Options.usingController||Application.loadedLevel<2)
	{
		transform.position = cam.ScreenToWorldPoint(Input.mousePosition)+cam.main.transform.TransformDirection(offSet);
	}
		
}


/*function OnDrawGizmos()
{
	 iTween.DrawPath(waypointArray);
}*/


function UseController()
{
	if(Options.usingController&&Application.loadedLevel>2)
	{
		currentPathPercent=thumbstickpercentage;
		iTween.PutOnPath(gameObject, waypointArray, currentPathPercent);
		
		//GetComponent(Renderer).enabled=false;
	}
}

function Update()
{
	if(Input.GetKeyDown(KeyCode.L)&&spriteRenderer1.enabled)
	{
		spriteRenderer1.enabled=false;
		spriteRenderer2.enabled=false;
	}
	else if(Input.GetKeyDown(KeyCode.L)&&!spriteRenderer1.enabled)
	{
		spriteRenderer1.enabled=true;
		spriteRenderer2.enabled=true;
	}
		
	if(StartMenuScript.inAMenu||ExitLevelScript.endGUI)
	{
		guiCrosshair.enabled=true;
		spriteRenderer1.enabled=false;	
		spriteRenderer2.enabled=false;	
	}
	else
	{
		guiCrosshair.enabled=false;
		spriteRenderer1.enabled=true;	
		spriteRenderer2.enabled=true;	
	}
}
