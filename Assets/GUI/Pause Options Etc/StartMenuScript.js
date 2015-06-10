//var sounds:AudioClip[];
static var startMenu:boolean;
var howToPlay:boolean;
var howToPlayBG:Texture2D;
var howToPlayCards:Texture2D[];
var howI:int;
var saveQuitMap:boolean;
var saveQuitGame:boolean;
static var inAMenu:boolean;
var textureArray:Texture2D[];
var pauseTexture:Texture2D;
var howToPlayTexture:Texture2D;
var textStyle = new GUIStyle();

var buttonStyle:GUIStyle;
var buttonStyleSelected:GUIStyle;
var buttonStyle2:GUIStyle[];

//Controller
var selected:int;	//start menu
var selected2:int; //save and quit menu
var toggleUpDown:boolean;
var toggleUpDown2:boolean;
var toggleLeftRight:boolean;
var toggleLeftRight2:boolean;
var accept:boolean;
var cancel:boolean;
static var okToClose:boolean;
//static var closeFunc:boolean;
var time:float;
var guiSFX:AudioSource;
var loading:boolean;

var blackOutBG:Texture2D;

function Start ()
{
	howI=0;
	loading=false;
	closeFunc=false;
	startMenu=false;
	selected=1;
	selected2=0;
	guiSFX = gameObject.Find("GUI").GetComponent(AudioSource);
}

function Update () 
{
	time+=Time.fixedDeltaTime;
	if(!Health.playerIsDead)
		OpenStartMenu();
	SelectNumber();
	ToggleBooleans();
	if(Options.menu||startMenu||saveQuitMap||saveQuitGame||howToPlay)
		inAMenu=true;
	else
		inAMenu=false;
		
	//Time.fixedDeltaTime=Time.deltaTime;
	//Time.fixedDeltaTime=Time.timeScale * 0.02;
}


function OpenStartMenu()
{
	if(Application.loadedLevel > 0)
	{
		if(Input.GetButtonDown("Pause")&&!inAMenu)
		{
			WeaponLoadout.weaponLoadoutMenu=false;
			if(Options.usingController)
			{
				selected=1;
				selected2=1;
			}
			else
			{
				//selected=0;
				selected2=0;
			}
			Time.timeScale=0;
			//Time.fixedDeltaTime=0;
			startMenu=true;
			Fabric.EventManager.Instance.PostEvent("UI/Cancel", gameObject);
			okToClose=false;
		}
		else if(Input.GetButtonDown("Pause")&&(howToPlay||saveQuitGame||saveQuitMap))
		{
			WeaponLoadout.weaponLoadoutMenu=false;
			howToPlay=false;
			saveQuitGame=false;
			saveQuitMap=false;
			startMenu=true;
			Fabric.EventManager.Instance.PostEvent("UI/Cancel", gameObject);
		}
	}
	if(okToClose&&cancel&&startMenu)
	{
			selected=1;
			Time.timeScale=1;
			//Time.fixedDeltaTime=0.02;
			startMenu=false;
			okToClose=false;
	}
}


function SelectNumber()
{
	if(startMenu)
	{
		if((Input.GetButtonDown("Down")||Input.GetAxis("DPadUpDown")<0||Input.GetAxis("LThumbstick Up/Down")<0)&&selected<5&&!toggleUpDown&&!toggleUpDown2)
		{
			toggleUpDown=true;
			toggleUpDown2=true;
			selected++;
			Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);
		}
		if((Input.GetButtonDown("Up")||Input.GetAxis("DPadUpDown")>0||Input.GetAxis("LThumbstick Up/Down")>0)&&selected>1&&!toggleUpDown&&!toggleUpDown2)
		{
			toggleUpDown=true;
			toggleUpDown2=true;
			selected--;
			Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);
		}
	}
	
	
	if(saveQuitMap||saveQuitGame)
	{
		if((Input.GetButtonDown("Down")||Input.GetAxis("DPadUpDown")<0||Input.GetAxis("LThumbstick Up/Down")<0)&&selected2<2&&!toggleUpDown&&!toggleUpDown2)
		{
			toggleUpDown=true;
			toggleUpDown2=true;
			selected2++;
			Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);
		}
		if((Input.GetButtonDown("Up")||Input.GetAxis("DPadUpDown")>0||Input.GetAxis("LThumbstick Up/Down")>0)&&selected2>1&&!toggleUpDown&&!toggleUpDown2)
		{
			toggleUpDown=true;
			toggleUpDown2=true;
			selected2--;
			Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);
		}
	}
	if(howToPlay)
	{
		if((Input.GetButtonDown("Right")||Input.GetAxis("DPadLeftRight")>0||Input.GetAxis("LThumbstick Left/Right")>0)&&!toggleLeftRight&&!toggleLeftRight2)
		{
			toggleLeftRight=true;
			toggleLeftRight2=true;
			howI++;
			if(howI>=howToPlayCards.Length)
				howI=0;
			Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);
		}
		if((Input.GetButtonDown("Left")||Input.GetAxis("DPadLeftRight")<0||Input.GetAxis("LThumbstick Left/Right")<0)&&!toggleLeftRight&&!toggleLeftRight2)
		{
			toggleLeftRight=true;
			toggleLeftRight2=true;
			howI--;
			if(howI<0)
				howI=howToPlayCards.Length-1;
			Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);
		}
	}
}

function ToggleBooleans()
{
	if(Input.GetAxis("DPadUpDown")==0)
		toggleUpDown=false;
	
	if(Input.GetAxis("DPadLeftRight")==0)
		toggleLeftRight=false;
	
	if(Input.GetAxis("LThumbstick Up/Down")==0)
		toggleUpDown2=false;

	if(Input.GetAxis("LThumbstick Left/Right")==0)
		toggleLeftRight2=false;
	
	if(Input.GetButtonDown("GUIAccept"))
		accept=true;
	if(Input.GetButtonUp("GUIAccept"))
		accept=false;
	
	if(Input.GetKeyDown("joystick button 1")||Input.GetButtonDown("Pause"))
		cancel=true;

	if(Input.GetKeyUp("joystick button 1")||Input.GetButtonUp("Pause"))
	{
		cancel=false;
		if(!Options.menu)
			OKToClose();
	}
}

function OnGUI()
{
	GUI.matrix = Matrix4x4.TRS (Vector3(0f, 0f, 0f), Quaternion.identity, Vector3 (ScreenSize.X, ScreenSize.Y, 1f));
	
	if(startMenu)
	{
		GUI.DrawTexture(Rect(0, 0, 1920, 1200), pauseTexture);
//		GUI.Label(Rect(835, 100,250,50), "PAUSED", textStyle);
		
	//Resume
		if(selected==1)
		{
			if(GUI.Button(Rect(893, 480, 134, 40), GUIContent(textureArray[0]),buttonStyle2[0])||accept)
			{
				selected=0;
				Time.timeScale=1;
			//Time.fixedDeltaTime=0.02;
				startMenu=false;
				okToClose=false;
				OKToClose();
			}
		}
		else
		{
			if(GUI.Button(Rect(893, 480, 134, 40), GUIContent(""),buttonStyle2[0]))
			{
				Time.timeScale=1;
			//Time.fixedDeltaTime=0.02;
				startMenu=false;
				okToClose=false;
			}
		}
		
	//Options
		if(selected==2)
		{
			if(GUI.Button(Rect(885.5, 560, 149, 45), GUIContent(textureArray[2]),buttonStyle2[1])||accept)
			{
				Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
				selected=2;
				startMenu=false;
				Options.optionsScript.accept=false;
				//ItemsToSave.itemsToSave.SaveToFile();
				//Options.mainMenu=true;
				Options.menu=true;
				okToClose=false;
				
			}
		}
		else
		{
			if(GUI.Button(Rect(885.5, 560, 149, 45), GUIContent(""),buttonStyle2[1]))
			{
				Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
				startMenu=false;
				//ItemsToSave.itemsToSave.SaveToFile();
				Options.menu=true;
				okToClose=false;
			}
		}
		
	//How to Play
		if(selected==3)
		{
			if(GUI.Button(Rect(839.5, 640, 241, 44), GUIContent(textureArray[4]),buttonStyle2[2])||accept)
			{
				Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
				selected=3;
				startMenu=false;
				howToPlay=true;
				okToClose=false;
			}
		}
		else
		{
			if(GUI.Button(Rect(839.5, 640, 241, 44), GUIContent(""),buttonStyle2[2]))
			{
				Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
				startMenu=false;
				howToPlay=true;
				okToClose=false;
			}
		}
		
		//Exit Level
		if(selected==4)
		{
			if(GUI.Button(Rect(865, 720, 190, 42), GUIContent(textureArray[6]),buttonStyle2[3])||accept)
			{
				Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
				selected=4;
				selected2=2;
				accept=false;
				startMenu=false;
				saveQuitMap=true;
				okToClose=false;
			}
		}
		else
		{
			if(GUI.Button(Rect(865, 720, 190, 42), GUIContent(""),buttonStyle2[3]))
			{
				Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
				startMenu=false;
				saveQuitMap=true;
				okToClose=false;
			}
		}
		
		//Exit Game
		if(selected==5)
		{
			if(GUI.Button(Rect(862.5, 800, 195, 39), GUIContent(textureArray[8]),buttonStyle2[4])||accept)
			{
				Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
				selected=5;
				selected2=2;
				accept=false;
				startMenu=false;
				saveQuitGame=true;
				okToClose=false;
			}
		}
		else
		{
			if(GUI.Button(Rect(862.5, 800, 195, 39), GUIContent(""),buttonStyle2[4]))
			{
				Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
				startMenu=false;
				saveQuitGame=true;
				okToClose=false;
			}
		}
	}
//How to Play
	if(howToPlay)
	{
		GUI.DrawTexture(Rect(0, 0, 1920, 1200), howToPlayBG);
		GUI.DrawTexture(Rect(0, 0, 1920, 1200), howToPlayCards[howI]);
		//GUI.Label(Rect(835, 350,250,50), "How Do You Play?", textStyle);
		//GUI.Label(Rect(835, 425,250,250), "Find Dinosaur.\n Kill Dinosaur.\n Eat Dino-Bites.", textStyle);
	
		
	
	//Back
		if (GUI.Button(Rect(370.5,1075,89,37), "", buttonStyle2[5])||GUI.Button(Rect(260.5,1054.5,90,90),textureArray[14],buttonStyle)||cancel)
		{
			howToPlay=false;
			startMenu=true;
			Fabric.EventManager.Instance.PostEvent("UI/Cancel", gameObject);
			selected=3;
			selected2=0;
			//OKToClose();
		}
	//Right
		if(GUI.Button(Rect(1830,600,90,90),textureArray[19],buttonStyle))
		{
			Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);
			howI++;
			if(howI>=howToPlayCards.Length)
				howI=0;
		}
	//Left
		if(GUI.Button(Rect(130,600,90,90),textureArray[20],buttonStyle))
		{
			Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);
			howI--;
			if(howI<0)
				howI=howToPlayCards.Length-1;
		}
	//Select
	 		//GUI.Button(Rect(1340.5,1075,107,42),"",buttonStyle2[6]);
	 		//GUI.Button(Rect(1230.5,1054.5,90,90),textureArray[15],buttonStyle);	
	}
	
//Back to Map
	if(saveQuitMap)
	{
		GUI.DrawTexture(Rect(0, 0, 1920, 1200), pauseTexture);
		GUI.Label(Rect(731, 480,458,98),textureArray[16] , textStyle);
		GUI.Label(Rect(711.5, 798,497,60), textureArray[18], textStyle);
	
	//Yes
		if(selected2==1)
		{
			if(GUI.Button(Rect(927, 628, 66, 36), GUIContent(textureArray[10]),buttonStyle2[7])||accept)
			{
				saveQuitMap=false;
				Time.timeScale=1;
			//Time.fixedDeltaTime=0.02;
				LoadIt(1);
			}
		}
		else
		{
			if(GUI.Button(Rect(927, 628, 66, 36), GUIContent(""), buttonStyle2[7]))
			{
				saveQuitMap=false;
				Time.timeScale=1;
			//Time.fixedDeltaTime=0.02;
				LoadIt(1);
			}
		}	
	//No
		if(selected2==2)
		{
			if(GUI.Button(Rect(929.5, 698, 63, 36), GUIContent(textureArray[12]),buttonStyle2[8])||accept)
			{
				accept=false;
				selected2=0;
				selected=1;
				saveQuitMap=false;
				startMenu=true;
			}
		}
		else
		{
			if(GUI.Button(Rect(929.5, 698, 63, 36), GUIContent(""),buttonStyle2[8]))
			{
				saveQuitMap=false;
				startMenu=true;
				selected=0;
			}
		}
		//Back
		if (GUI.Button(Rect(370.5,1075,89,37), "", buttonStyle2[5])||GUI.Button(Rect(260.5,1054.5,90,90),textureArray[14],buttonStyle)||cancel)
		{
			selected=4;
			selected2=0;
			saveQuitMap=false;
			startMenu=true;
			Fabric.EventManager.Instance.PostEvent("UI/Cancel", gameObject);
			OKToClose();
		}
		//Select
	 		GUI.Button(Rect(1340.5,1075,107,42),"",buttonStyle2[6]);
	 		GUI.Button(Rect(1230.5,1054.5,90,90),textureArray[15],buttonStyle);
	}
//Exit Game
	if(saveQuitGame)
	{
		GUI.DrawTexture(Rect(0, 0, 1920, 1200), pauseTexture);
		GUI.Label(Rect(731, 480,458,98),textureArray[17] , textStyle);
		GUI.Label(Rect(711.5, 798,497,60), textureArray[18], textStyle);
	
	//Yes
		if(selected2==1)
		{
			if(GUI.Button(Rect(927, 628, 66, 36), GUIContent(textureArray[10]),buttonStyle2[7])||accept)
			{
				saveQuitGame=false;
				Time.timeScale=1;
			//Time.fixedDeltaTime=0.02;
				LoadIt(0);
			}
		}
		else
		{
			if(GUI.Button(Rect(927, 628, 66, 36), GUIContent(""), buttonStyle2[7]))
			{
				saveQuitGame=false;
				Time.timeScale=1;
			//Time.fixedDeltaTime=0.02;
				LoadIt(0);
			}
		}	
	//No
		if(selected2==2)
		{
			if(GUI.Button(Rect(929.5, 698, 63, 36), GUIContent(textureArray[12]),buttonStyle2[8])||accept)
			{
				accept=false;
				selected2=0;
				selected=1;
				saveQuitGame=false;
				startMenu=true;
			}
		}
		else
		{
			if(GUI.Button(Rect(929.5, 698, 63, 36), GUIContent(""),buttonStyle2[8]))
			{
				saveQuitGame=false;
				startMenu=true;
				selected=0;
			}
		}
		
		//Back
		if (GUI.Button(Rect(370.5,1075,89,37), "", buttonStyle2[5])||GUI.Button(Rect(260.5,1054.5,90,90),textureArray[14],buttonStyle)||cancel)
		{
			selected=5;
			selected2=0;
			saveQuitGame=false;
			startMenu=true;
			Fabric.EventManager.Instance.PostEvent("UI/Cancel", gameObject);
			OKToClose();
		}
		//Select
	 		GUI.Button(Rect(1340.5,1075,107,42),"",buttonStyle2[6]);
	 		GUI.Button(Rect(1230.5,1054.5,90,90),textureArray[15],buttonStyle);
	 }
		
	if(loading)
	{
		GUI.depth=0;
		GUI.DrawTexture(Rect(0, 0, 1920, 1200), blackOutBG);
	}
}

function OKToClose()
{
	yield WaitForEndOfFrame;
	yield WaitForEndOfFrame;
	yield WaitForEndOfFrame;
	yield WaitForEndOfFrame;
	yield WaitForEndOfFrame;
	yield WaitForEndOfFrame;
	yield WaitForEndOfFrame;
	yield WaitForEndOfFrame;
	yield WaitForEndOfFrame;
	yield WaitForEndOfFrame;
	yield WaitForEndOfFrame;
	yield WaitForEndOfFrame;
	yield WaitForEndOfFrame;
	yield WaitForEndOfFrame;
	yield WaitForEndOfFrame;
	yield WaitForEndOfFrame;
	yield WaitForEndOfFrame;
	yield WaitForEndOfFrame;
	yield WaitForEndOfFrame;
	yield WaitForEndOfFrame;
	okToClose=true;
}

function LoadIt(x:int)
{
	ItemsToSave.itemsToSave.SaveToFile();
	loading=true;
	yield WaitForSeconds(.4);
	if(x==0)
		Application.LoadLevel("Start Screen");
	else if(x==1)
			Application.LoadLevel("Map - Overworld"); //for Demo
		//if(Application.loadedLevelName=="Jungle - 1"||Application.loadedLevelName=="Jungle - 2")
		//	Application.LoadLevel("Map - Jungle");
		//else	
			//Application.LoadLevel("Map - Overworld");
}