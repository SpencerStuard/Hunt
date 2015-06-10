var toggleUpDown:boolean;
var selected:int;
var startButtons:Texture2D[];
var buttonTextures:Texture2D[];
var buttonStyle2:GUIStyle[];
var accept:boolean;
var startX:int;
var startX1:int;
var startX2:float;
static var inStart:boolean;
var cheevos:boolean;
var bgTextures:Texture2D[];
var toolTipStyle:GUIStyle;
var cancel:boolean;

var startScreen:Texture2D;
var logo:Texture2D;

var scale:float;

function Start ()
{
	inStart=true;
	cheevos=false;
	if(File.Exists(ItemsToSave.itemsToSave.path +"/"+ "savedata.sav"))
	{
		buttonTextures[0]=startButtons[2];
		buttonTextures[1]=startButtons[3];
		startX=1;
		startX1=159;
		startX2=1480.5;
	}
	else
	{
		buttonTextures[0]=startButtons[0];
		buttonTextures[1]=startButtons[1];
		startX=0;
		startX1=100;
		startX2=1530;
	}
	selected=1;
}

function Update () 
{
	if(inStart)
		SelectNumber();
	ToggleBooleans();
	
	if(cheevos&&Input.GetButtonDown("Pause"))
	{
		cheevos=false;
		inStartMenu=true;
	}
}

function SelectNumber()
{
		if((Input.GetButtonDown("Down")||Input.GetAxis("DPadUpDown")<0||Input.GetAxis("LThumbstick Up/Down")<0)&&selected<4&&!toggleUpDown)
		{
			toggleUpDown=true;
			selected++;
			Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);
		}
		if((Input.GetButtonDown("Up")||Input.GetAxis("DPadUpDown")>0||Input.GetAxis("LThumbstick Up/Down")>0)&&selected>1&&!toggleUpDown)
		{
			toggleUpDown=true;
			selected--;
			Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);
		}
}

function ToggleBooleans()
{
	if(Input.GetAxis("DPadUpDown")==0)
		toggleUpDown=false;
	
	if(Input.GetButtonDown("GUIAccept"))
	{
		accept=true;
		Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);	
	}
	if(Input.GetButtonUp("GUIAccept"))
		accept=false;
	
	if(Input.GetKeyDown("joystick button 1"))
	{
		cancel=true;
		Fabric.EventManager.Instance.PostEvent("UI/Cancel", gameObject);		
	}

	if(Input.GetKeyUp("joystick button 1"))
		cancel=false;
}

function OnGUI()
{	
	GUI.matrix = Matrix4x4.TRS (Vector3(0f, 0f, 0f), Quaternion.identity, Vector3 (ScreenSize.X, ScreenSize.Y, 1));
	GUI.Label (Rect (0, 0,1920,1200), startScreen);
	GUI.Label (Rect (0, 0,1920,1200), logo);
	if(inStart)
	{
		if(selected==1)	//Start or Continue
		{
			if(GUI.Button(Rect(startX2, 650, startX1*1.5, 38*1.5), GUIContent(buttonTextures[1]),buttonStyle2[startX])||accept)
			{
				ItemsToSave.itemsToSave.SaveToFile();
				Application.LoadLevel(1);
			}
		}
		else
		{
			if(GUI.Button(Rect(startX2, 650, startX1*1.5, 38*1.5), GUIContent(""),buttonStyle2[startX]))
			{
				ItemsToSave.itemsToSave.SaveToFile();
				Application.LoadLevel(1);
			}
		}
		if(selected==2) //Options
		{
			if(GUI.Button(Rect(1490, 730, 149*1.5, 45*1.5), GUIContent(buttonTextures[4]),buttonStyle2[2])||accept)
			{
				inStart=false;
				Options.menu=true;
				Options.optionsScript.accept=false;
				selected=1;
			}
		}
		else
		{
			if(GUI.Button(Rect(1490, 730, 149*1.5, 45*1.5), GUIContent(""),buttonStyle2[2]))
			{
				inStart=false;
				Options.menu=true;
				selected=0;
			}
		}
		
		if(selected==3) //Achievements
		{
			if(GUI.Button(Rect(1422, 810, 236*1.5, 41*1.5), GUIContent(buttonTextures[6]),buttonStyle2[3])||accept)
			{
				inStart=false;
				cheevos=true;
				selected=0;
			}
		}
		else
		{
			if(GUI.Button(Rect(1422, 810, 236*1.5, 41*1.5), GUIContent(""),buttonStyle2[3]))
			{
				inStart=false;
				cheevos=true;
				selected=0;
			}
		}
		
		if(selected==4) //Quit
		{
			if(GUI.Button(Rect(1534, 890, 82*1.5, 37*1.5), GUIContent(buttonTextures[12]),buttonStyle2[6])||accept)
			{
				Application.Quit();
			}
		}
		else
		{
			if(GUI.Button(Rect(1534, 890, 82*1.5, 37*1.5), GUIContent(""),buttonStyle2[6]))
			{
				Application.Quit();
			}
		}
	}
	
	if(cheevos)
	{
		//DEMO_SWITCH
		GUI.DrawTexture(new Rect(555.5, 481, 809,238), bgTextures[1]);
		/*
		GUI.DrawTexture(new Rect(0, 0, 1920,1200), bgTextures[0]);
		if(ItemsToSave.itemsToSave.achievements[0])
			GUI.Button(Rect(730, 450, 114, 114), GUIContent(buttonTextures[8], "Achievement 1 - UNLOCKED"),buttonStyle2[4]);
		else
			GUI.Button(Rect(730, 450, 114, 114), GUIContent(buttonTextures[9], "Achievement 1 - LOCKED"),buttonStyle2[4]);
		*/
		//DEMO_SWITCH_END
		
		//Back
		if (GUI.Button(Rect(370.5,1075,89,37),"",buttonStyle2[5])||GUI.Button(Rect(260.5,1054.5,90,90),buttonTextures[10],buttonStyle2[4])||cancel)
		{
			if(Application.loadedLevel==0)
				IntroMenuScript.inStart=true;
			if(Options.usingController) selected=1; else selected=0;
			cheevos=false;
			startMenu=true;
			//guiSFX.PlayOneShot(sounds[2], Options.sfxVolume);
		}
	}
	
	//GUI Tooltip
	if (GUI.tooltip != "")
		GUI.Label (Rect (Input.mousePosition.x, Screen.height-Input.mousePosition.y,380,860), GUI.tooltip, toolTipStyle);
}