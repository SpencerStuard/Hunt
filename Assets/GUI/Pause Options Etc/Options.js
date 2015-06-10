//var sounds:AudioClip[];
static var menu:boolean=false;
static var arcTrajectory:boolean=false;
static var hpBars:boolean=true;
static var usingController:boolean;
static var showHUD:boolean=true;
var bgTextures:Texture2D[];
var textureArray:Texture2D[];
var arrowArray:Texture2D[];
var tickBoxArray:Texture2D[];
var tickBoxStyle:GUIStyle;
var barArray:Texture2D[];
var barStyle:GUIStyle;
var barStyle2:GUIStyle;
var buttonArray:Texture2D[];
var buttonStyle:GUIStyle;
var buttonStyle2:GUIStyle[];
var optionsTextStyle = new GUIStyle();

static var optionsScript:Options;

var buttonTextures:Texture2D[];

//Audio
static var sfxVolume : float = 1.0;
private var sfxVolumePercent:int;
var musicVolume : float = 1.0;
var musicSource:AudioSource;
private var musicVolumePercent:int;


//Different Menus
var mainMenu:boolean;
var controlsMenu:boolean;
var gameMenu:boolean;
var audioMenu:boolean;
var videoMenu:boolean;

//Controller
var selected:int;
var toggleUpDown:boolean;
var toggleUpDown2:boolean;
var toggleLeftRight:boolean;
var toggleLeftRight2:boolean;
var accept:boolean;
var cancel:boolean;
var defaults:boolean;
var sfxVol:float;
var musVol:float;

//Video
var resolutions:Resolution[];
var res:int;
var windowed:boolean;
//var vSync:boolean;
var resX:float; //for saving the resolution 
var resY:float;

var loaded:boolean;
var oldSelected:int;

//Boolean toggle noises
var oldArc:boolean;
var oldHPBars:boolean;
var oldHud:boolean;
var oldController:boolean;
var oldwindowed:boolean;

var guiSFX:AudioSource;

var sms:StartMenuScript;

var controller:Texture2D;
var kbmouse:Texture2D;
var contI:int;

function Awake()
{
	optionsScript=GetComponent(Options);
	musicSource = Camera.main.GetComponent(AudioSource);
	//if(Application.loadedLevel>0)
		guiSFX = gameObject.Find("GUI").GetComponent(AudioSource);
	//musicVolume=1;
	musVol=1;
}

function Start()
{
	if(Application.loadedLevel>0)
		sms=GameObject.Find("StartMenu").GetComponent(StartMenuScript);
	oldwindowed=windowed;
	oldArc=arcTrajectory;
	oldHud=showHUD;
	oldController=usingController;
	oldHPBars=hpBars;
	selected=1;
	contI=0;
	resolutions = Screen.resolutions;
	mainMenu=true;
	if(!Screen.fullScreen)
		windowed=true;
	else
		windowed=false;
		
	for(var i:int = 0; i < resolutions.Length; i++)
	{
		if(resolutions[i].width==Screen.width && resolutions[i].height == Screen.height)
			res=i;
	}
	
}

function Update () 
{
	if(menu)
	{
		if(arcTrajectory != oldArc)
		{
			oldArc = arcTrajectory;
			//Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
			Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
		}
		if(hpBars != oldHPBars)
		{
			oldHPBars = hpBars;
			//Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
			Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
		}
		if(usingController != oldController)
		{
			oldController = usingController;
			//Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
			Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
		}
		if(windowed != oldwindowed)
		{
			oldwindowed = windowed;
			//Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
			Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
		}
		if(showHUD != oldHud)
		{
			oldHud = showHUD;
			//Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
			Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
		}	
	}
		
	if (mainMenu&&Application.loadedLevel==0&&(Input.GetButtonDown("Pause")||Input.GetKeyDown("joystick button 1")))
		Close();
	
	//if(res < 0)
	//	res=resolutions.Length-1;
	//if(res>=resolutions.Length)
	//	res=0;
	
	if(sfxVol!=sfxVolume)
		sfxVol=sfxVolume;
	if(musVol!=musicVolume)
		musVol=musicVolume;
	SelectNumber();
	ToggleBooleans();
	sfxVolumePercent = (sfxVolume/1) * 200;
	musicVolumePercent = (musicVolume/1) * 200;
	
	//Fabric SFX Volume Control
	Fabric.EventManager.Instance.PostEvent("SFX/VolumeControl", Fabric.EventAction.SetVolume, sfxVolume);
	//Fabric Music Volume Control
	Fabric.EventManager.Instance.PostEvent("Music/VolumeControl", Fabric.EventAction.SetVolume, musicVolume);
	
	if(!Health.playerIsDead&&Application.loadedLevel>0)
	{
		if((Input.GetKeyDown("joystick button 1")||Input.GetButtonDown("Pause"))&&(controlsMenu||gameMenu||audioMenu||videoMenu)&&!mainMenu&&StartMenuScript.startMenu)
		{
			selected=oldSelected;
			controlsMenu=false;
			gameMenu=false;
			audioMenu=false;
			videoMenu=false;
			mainMenu=true;
			//if(menu)
			//	Fabric.EventManager.Instance.PostEvent("UI/Cancel", gameObject);
		}
		else if((Input.GetKeyDown("joystick button 1")||Input.GetButtonDown("Pause"))&&mainMenu)
		{
			if(usingController) selected=1; else selected=0;
			if(menu)
			{
				Fabric.EventManager.Instance.PostEvent("UI/Cancel", gameObject);
				menu=false;
				StartMenuScript.startMenu=true;
				sms.OKToClose();
				//sms.closeFunc=true;
			}
			
			
			
		}
	}	
	//Debug.Log(System.Array.IndexOf(resolutions,resolutions[res].width ));
	//Debug.Log(Resolution);
	//if(vSync)
	//	QualitySettings.vSyncCount = 1;
	//else
	//	QualitySettings.vSyncCount = 0;

	resX = resolutions[res].width;
	resY = resolutions[res].height;
}

function SelectNumber()
{
	if(menu)
	{
		if((Input.GetButtonDown("Down")||Input.GetAxis("DPadUpDown")<0||Input.GetAxis("LThumbstick Up/Down")<0)&&!toggleUpDown&&!toggleUpDown2)
		{
			toggleUpDown=true;
			toggleUpDown2=true;
			if(mainMenu&&selected<4)
			{
				selected++;
				Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);	
			}
			else if(gameMenu&&selected<5)
			{
				selected++;
				Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);	
			}
			else if(audioMenu&&selected<3)
			{
				selected++;
				Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);	
			}
			else if(videoMenu&&selected<3)
			{
				selected++;
				Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);	
			}
			
		}
		if((Input.GetButtonDown("Up")||Input.GetAxis("DPadUpDown")>0||Input.GetAxis("LThumbstick Up/Down")>0)&&selected>1&&!toggleUpDown&&!toggleUpDown2)
		{
			Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);	
			toggleUpDown=true;
			toggleUpDown2=true;
			selected--;
		}
		
		if((Input.GetButtonDown("Right")||Input.GetAxis("DPadLeftRight")>0||Input.GetAxis("LThumbstick Left/Right")>0)&&!toggleLeftRight&&!toggleLeftRight2)
		{
			toggleLeftRight=true;
			toggleLeftRight2=true;
			if(audioMenu&&selected==1&&sfxVol<1)
			{	
				sfxVol+=.05;
				Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);	
			}

			if(audioMenu&&selected==2&&musVol<1)
			{
				musVol+=.05;
				Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);	
			}
			
			if(videoMenu&&selected==1)
			{
				res++;
				if(res>=resolutions.Length)
					res=0;
				Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);	
			}
			/* //music selection
			if(audioMenu&&selected==3)
			{
				mus++;
				if(mus>=musicScript.music.Length)
					mus=0;
				musicSource.clip=musicScript.music[mus];
				musicSource.Play();
				Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);	
			}
			*/
			if(controlsMenu)
			{
				if(contI==1)
				{
					contI=0;
					Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);
				}
				else
				{
					contI=1;
					Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);
				}
			}
		}
		if((Input.GetButtonDown("Left")||Input.GetAxis("DPadLeftRight")<0||Input.GetAxis("LThumbstick Left/Right")<0)&&!toggleLeftRight&&!toggleLeftRight2)
		{
			toggleLeftRight=true;
			toggleLeftRight2=true;
			if(audioMenu&&selected==1&&sfxVol>0)
			{
				sfxVol-=.05;
				Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);	
			}
			if(audioMenu&&selected==2&&musVol>0)
			{
				musVol-=.05;
				Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);	
			}
			
			if(videoMenu&&selected==1)
			{
				res--;
				if(res < 0)
					res=resolutions.Length-1;
				Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);	
			}
			/* //music selection
			if(audioMenu&&selected==3)
			{
				mus--;
				if(mus < 0)
					mus=musicScript.music.Length-1;
				musicSource.clip=musicScript.music[mus];
				musicSource.Play();
				Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);	
			} */
			if(controlsMenu)
			{
				if(contI==0)
				{
					contI=1;
					Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);	
				}
				else
				{
					contI=0;
					Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);
				}
			}
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
	{
		accept=true;
		//if(menu)
			//Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
	}
	if(Input.GetButtonUp("GUIAccept"))
	{
		accept=false;
		loaded=false;	
	}
	
	if(Input.GetKeyDown("joystick button 1")||Input.GetButtonDown("Pause"))
		cancel=true;

	if(Input.GetKeyUp("joystick button 1")||Input.GetButtonUp("Pause"))
		cancel=false;
	
	if(Input.GetKeyDown("joystick button 3"))
		defaults=true;
	if(Input.GetKeyUp("joystick button 3"))
		defaults=false;
}


function OnGUI()
{
	GUI.matrix = Matrix4x4.TRS (Vector3(0f, 0f, 0f), Quaternion.identity, Vector3 (ScreenSize.X, ScreenSize.Y, 1f));
	GUI.depth=-10;
	if(menu)
	{
		//overlay
		if(!audioMenu&&!controlsMenu&&!gameMenu&&!videoMenu)
			GUI.DrawTexture(new Rect(0, 0, 1920,1200), bgTextures[0]);
		else if(audioMenu)
			GUI.DrawTexture(new Rect(0, 0, 1920,1200), bgTextures[1]);
	//	else if(controlsMenu)
	//		GUI.DrawTexture(new Rect(0, 0, 1920,1200), bgTextures[2]);
		else if(gameMenu)
			GUI.DrawTexture(new Rect(0, 0, 1920,1200), bgTextures[3]);
		else if(videoMenu)
			GUI.DrawTexture(new Rect(0, 0, 1920,1200), bgTextures[4]);
		//GUI.Label(new Rect(835, 300,250,50), "Options", optionsTextStyle);
		
		
	//Main Options	
		if(mainMenu)
		{
		//Game Menu
		if(selected==1)
		{
			if(GUI.Button(Rect(908, 500, 104, 39), GUIContent(buttonTextures[4]),buttonStyle2[0])||accept)
			{
				accept=false;
				Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
				if(usingController) selected=1; else selected=0;
				oldSelected=1;
				gameMenu=true;
				mainMenu=false;
			}
		}
		else
		{
			if(GUI.Button(Rect(908, 500, 104, 39), GUIContent(""),buttonStyle2[0]))
			{
				if(usingController) selected=1; else selected=0;
				Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
				gameMenu=true;
				mainMenu=false;
			}
		}
		//Controls Menu	
		if(selected==2)
		{
			if(GUI.Button(Rect(876.5, 580, 165, 40), GUIContent(buttonTextures[2]),buttonStyle2[1])||accept)
			{
				Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
				if(usingController) selected=1; else selected=0;
				oldSelected=2;
				controlsMenu=true;
				mainMenu=false;
			}
		}
		else
		{
			if(GUI.Button(Rect(876.5, 580, 165, 40), GUIContent(""),buttonStyle2[1]))
			{
				if(usingController) selected=1; else selected=0;
				Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
				controlsMenu=true;
				mainMenu=false;
			}
		}
		
		//Audio Menu
		if(selected==3)
		{
			if(GUI.Button(Rect(903, 660, 113, 40), GUIContent(buttonTextures[0]),buttonStyle2[2])||accept)
			{
				Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
				oldSelected=3;
				if(usingController) selected=1; else selected=0;
				audioMenu=true;
				mainMenu=false;
			}
		}
		else
		{
			if(GUI.Button(Rect(903, 660, 113, 40), GUIContent(""),buttonStyle2[2]))
			{
				if(usingController) selected=1; else selected=0;
				Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
				audioMenu=true;
				mainMenu=false;
			}
		}
	//Video Menu
		if(selected==4)
		{
			if(GUI.Button(Rect(907.5, 740, 105, 36), GUIContent(buttonTextures[6]),buttonStyle2[3])||accept)
			{
				Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
				oldSelected=4;
				if(usingController) selected=1; else selected=0;
				videoMenu=true;
				mainMenu=false;
			}
		}
		else
		{
			if(GUI.Button(Rect(907.5, 740, 105, 36), GUIContent(""),buttonStyle2[3]))
			{
				if(usingController) selected=1; else selected=0;
				Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
				videoMenu=true;
				mainMenu=false;
			}
		}
		/*//Accept
		if(selected==5)
		{
	 		if (GUI.Button(Rect(980,755,76,76),buttonArray[2],buttonStyle)||accept)
	 		{
	 			if(usingController) selected=1; else selected=0;
				ItemsToSave.itemsToSave.SaveToFile();
				menu=false;
				StartMenuScript.startMenu=true;
			}
		}
		else
		{
	 		if (GUI.Button(Rect(980,755,76,76),buttonArray[3],buttonStyle))
	 		{
	 			if(usingController) selected=1; else selected=0;
				ItemsToSave.itemsToSave.SaveToFile();
				menu=false;
				StartMenuScript.startMenu=true;
			}
		}*/
		
		//Back
			if (GUI.Button(Rect(370.5,1075,89,37),"",buttonStyle2[6])||GUI.Button(Rect(260.5,1054.5,90,90),buttonArray[0],buttonStyle))
			{
				if(Application.loadedLevel==0)
					IntroMenuScript.inStart=true;
				if(usingController) selected=1; else selected=0;
				menu=false;
				StartMenuScript.startMenu=true;
				Fabric.EventManager.Instance.PostEvent("UI/Cancel", gameObject);
			}
		//Select
	 		GUI.Button(Rect(1340.5,1075,107,42),"",buttonStyle2[13]);
	 		GUI.Button(Rect(1230.5,1054.5,90,90),buttonArray[6],buttonStyle);		
		
	}
	//Game Options
		if(gameMenu)
		{
		//trajectory arc
			arcTrajectory = GUI.Toggle(Rect(1060, 500, 58, 49), arcTrajectory, "", tickBoxStyle);
			if(selected==1)
			{
				GUI.Button(new Rect(714, 500, 204, 46), buttonTextures[16], buttonStyle2[9]);
				if(accept)
				{
					//Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
					if(arcTrajectory)
						arcTrajectory=false;
					else
						arcTrajectory=true;
					accept=false;	
				}
			}
			else
				GUI.Button(new Rect(714, 500, 204,46), "", buttonStyle2[9]);
				
		//hp bars		
			hpBars = GUI.Toggle(Rect(1060, 580, 58, 49), hpBars, "", tickBoxStyle);
			if(selected==2)
			{
				if(accept)
				{
					//Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
					if(hpBars)
						hpBars=false;
					else
						hpBars=true;
					accept=false;	
				}
				GUI.Button(new Rect(714, 580,164,40), buttonTextures[18], buttonStyle2[10]);
			}
			else
				GUI.Button(new Rect(714, 580,164,40), "", buttonStyle2[10]);
		//hud		
			showHUD = GUI.Toggle(Rect(1060, 660, 58, 49), showHUD,"", tickBoxStyle);
			if(selected==3)
			{
				GUI.Button(new Rect(714, 660,88,41), buttonTextures[20], buttonStyle2[11]);
				if(accept)
				{
					//Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
					if(showHUD)
						showHUD=false;
					else
						showHUD=true;
					accept=false;	
				}
			}
			else
				GUI.Button(new Rect(714, 660,88,41), "", buttonStyle2[11]);
		//controller	
			usingController = GUI.Toggle(Rect(1060, 740, 58, 49), usingController,"", tickBoxStyle);
			if(selected==4)
			{
				GUI.Button(new Rect(714, 740,196,40), buttonTextures[22], buttonStyle2[12]);
				if(accept)
				{
					//Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
					if(usingController)
						usingController=false;
					else
						usingController=true;
					accept=false;	
				}
			}
			else
				GUI.Button(new Rect(714, 740,196,40), "", buttonStyle2[12]);
				
		//Accept		
			if(selected==5)
			{
				GUI.Button(new Rect(896, 820,128,48), buttonArray[7], buttonStyle2[5]);
				if(accept)
				{
					if(!loaded)
					{
						Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
						loaded=true;
						ItemsToSave.itemsToSave.SaveToFile();
					}
				}
			}
			else
				if(GUI.Button(new Rect(896, 820,128,48), "", buttonStyle2[5]))
				{
					Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
					ItemsToSave.itemsToSave.SaveToFile();
				}
				
			
		//Back
			if (GUI.Button(Rect(370.5,1075,89,37),"",buttonStyle2[6])||GUI.Button(Rect(260.5,1054.5,90,90),buttonArray[0],buttonStyle)||cancel)
			{
				selected=1;
				gameMenu=false;
				mainMenu=true;
				Fabric.EventManager.Instance.PostEvent("UI/Cancel", gameObject);
			}
		//Defaults
			if (GUI.Button(Rect(872.5,1075,175,46),"",buttonStyle2[4])||GUI.Button(Rect(730.5,1054.5,90,90),buttonArray[3],buttonStyle)||defaults)
			{
				arcTrajectory=false;
				hpBars=true;
				showHUD=true;
				usingController=false;
			}
		//Select
	 		GUI.Button(Rect(1340.5,1075,107,42),"",buttonStyle2[13]);
	 		GUI.Button(Rect(1230.5,1054.5,90,90),buttonArray[6],buttonStyle);
		}
	//Controls Menu
		if(controlsMenu)	
		{
			if(contI==0)
				GUI.DrawTexture(new Rect(0, 0, 1920,1200), controller);
			else
				GUI.DrawTexture(new Rect(0, 0, 1920,1200), kbmouse);
			//Back
			if (GUI.Button(Rect(431,95,29,41),arrowArray[0],buttonStyle))
			{
				if(contI==0)
					contI=1;
				else if(contI==1)
					contI=0;
				Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);
			}
			if (GUI.Button(Rect(1486,95,29,41),arrowArray[1],buttonStyle))
			{
				if(contI==1)
					contI=0;
				else if(contI==0)
					contI=1;
				Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);
			}
		//Back
			if (GUI.Button(Rect(370.5,1075,89,37),"",buttonStyle2[6])||GUI.Button(Rect(260.5,1054.5,90,90),buttonArray[0],buttonStyle)||cancel)
			{
				selected=2;
				controlsMenu=false;
				mainMenu=true;
				Fabric.EventManager.Instance.PostEvent("UI/Cancel", gameObject);
			}
		}
		
	//Audio Options
		if(audioMenu)
		{
		//SFX volume
			if(selected==1)
			{
				GUI.Button(new Rect(760, 545,88,39), textureArray[0], buttonStyle2[7]);
				GUI.DrawTexture(new Rect(930, 540, 200, 40), barArray[0], ScaleMode.StretchToFill);
		    	GUI.DrawTexture(new Rect(930, 540, sfxVolumePercent, 60), barArray[1], ScaleMode.StretchToFill);
		    	GUI.DrawTexture(new Rect(930, 540, 200, 60), barArray[2], ScaleMode.StretchToFill);
				GUI.HorizontalSlider (Rect (930, 540, 200, 60), sfxVolume, 0.0, 1.0, barStyle, barStyle2);
				sfxVolume = sfxVol;
	 		}
	 		else
			{
				GUI.Button(new Rect(760, 545,88,39), "", buttonStyle2[7]);
				GUI.DrawTexture(new Rect(930, 540, 200, 40), barArray[0], ScaleMode.StretchToFill);
		    	GUI.DrawTexture(new Rect(930, 540, sfxVolumePercent, 60), barArray[1], ScaleMode.StretchToFill);
		    	GUI.DrawTexture(new Rect(930, 540, 200, 60), barArray[2], ScaleMode.StretchToFill);
				sfxVolume = GUI.HorizontalSlider (Rect (930, 540, 200, 60), sfxVolume, 0.0, 1.0, barStyle, barStyle2);
	 		}
	 	//Music Volume	
	 		if(selected==2)
	 		{
		 		GUI.Button(new Rect(760, 625,112,37), textureArray[2], buttonStyle2[8]);
				GUI.DrawTexture(new Rect(930, 620, 200, 40), barArray[0], ScaleMode.StretchToFill);
		    	GUI.DrawTexture(new Rect(930, 620, musicVolumePercent, 60), barArray[1], ScaleMode.StretchToFill);
		    	GUI.DrawTexture(new Rect(930, 620, 200, 60), barArray[2], ScaleMode.StretchToFill);
				musicVolume = GUI.HorizontalSlider (Rect (930, 620, 200, 60), musicVolume, 0.0, 1.0, barStyle, barStyle2);
				musicVolume = musVol;
		 		musicSource.volume = musicVolume;
	 		}
	 		else
	 		{
		 		GUI.Button(new Rect(760, 625,112,37), "", buttonStyle2[8]);		 //set back to 147 if you can't figure out how to get the slider to overlap the button to change text color
				GUI.DrawTexture(new Rect(930, 620, 200, 40), barArray[0], ScaleMode.StretchToFill);
		    	GUI.DrawTexture(new Rect(930, 620, musicVolumePercent, 60), barArray[1], ScaleMode.StretchToFill);
		    	GUI.DrawTexture(new Rect(930, 620, 200, 60), barArray[2], ScaleMode.StretchToFill);
				musicVolume = GUI.HorizontalSlider (Rect (930, 620, 200, 60), musicVolume, 0.0, 1.0, barStyle, barStyle2);
		 		musicSource.volume = musicVolume;
	 		}
	 /*		
	 	//Music Selection
	 		GUI.Label(new Rect(900, 700,175,41), musicScript.musicName[mus], optionsTextStyle);
			if(selected==3)
			{
	 			//GUI.Label(Rect(714.5,700,277,41), buttonTextures[8],buttonStyle);
	 			GUI.Button(Rect(760,700,29,41),arrowArray[0],buttonStyle);
				GUI.Button(Rect(1211,700,29,41),arrowArray[1],buttonStyle);
	 		}
	 		else
	 		{
	 			//GUI.Label(Rect(714.5,700,277,41), buttonTextures[9],buttonStyle);
	 			if (GUI.Button(Rect(760,700,29,41),arrowArray[0],buttonStyle))
				{
					Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);
					mus--;
					if(mus < 0)
						mus=musicScript.music.Length-1;
					musicSource.clip=musicScript.music[mus];
					musicSource.Play();

				}
				if (GUI.Button(Rect(1211,700,29,41),arrowArray[1],buttonStyle))
				{
					Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);
					mus++;
					if(mus>=musicScript.music.Length)
						mus=0;
					musicSource.clip=musicScript.music[mus];
					musicSource.Play();
				}
	 		}
	 	*/	
	 	//Accept		
			if(selected==3)
			{
				GUI.Button(new Rect(896, 820,128,48), buttonArray[7], buttonStyle2[5]);
				if(accept)
				{
					if(!loaded)
					{
						loaded=true;
						Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
						ItemsToSave.itemsToSave.SaveToFile();
					}
				}
			}
			else
				if(GUI.Button(new Rect(896, 820,128,48), "", buttonStyle2[5]))
				{
					ItemsToSave.itemsToSave.SaveToFile();
					Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
				}
				
			
		//Back
			if (GUI.Button(Rect(370.5,1075,89,37),"",buttonStyle2[6])||GUI.Button(Rect(260.5,1054.5,90,90),buttonArray[0],buttonStyle)||cancel)
			{
				selected=3;
				audioMenu=false;
				mainMenu=true;
				Fabric.EventManager.Instance.PostEvent("UI/Cancel", gameObject);
			}
		//Defaults
			if (GUI.Button(Rect(872.5,1075,175,46),"",buttonStyle2[4])||GUI.Button(Rect(730.5,1054.5,90,90),buttonArray[3],buttonStyle)||defaults)
			{
				sfxVolume=1;
				musicVolume=1;
			}
		//Select
	 		GUI.Button(Rect(1340.5,1075,107,42),"",buttonStyle2[13]);
	 		GUI.Button(Rect(1230.5,1054.5,90,90),buttonArray[6],buttonStyle);

	 	}
	 //Video Options	
	 	if(videoMenu)
		{
		//Resolution
			GUI.Label(new Rect(1032, 535,175,41), "" + resolutions[res].width + " X " + resolutions[res].height, optionsTextStyle);
			if(selected==1)
			{
	 			GUI.Label(Rect(714.5,535,192,40), buttonTextures[8],buttonStyle);
	 			GUI.Button(Rect(1006,535,29,41),arrowArray[0],buttonStyle);
				GUI.Button(Rect(1211,535,29,41),arrowArray[1],buttonStyle);
	 		}
	 		else
	 		{
	 			GUI.Label(Rect(714.5,535,192,40), buttonTextures[9],buttonStyle);
	 			if (GUI.Button(Rect(1006,535,29,41),arrowArray[0],buttonStyle))
				{
					Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);
					res--;
					if(res < 0)
						res=resolutions.Length-1;

				}
				if (GUI.Button(Rect(1211,535,29,41),arrowArray[1],buttonStyle))
				{
					Fabric.EventManager.Instance.PostEvent("UI/Change", gameObject);
					res++;
					if(res>=resolutions.Length)
						res=0;
				}
	 		}
	 	//Windowed
	 	    //GUI.Toggle(Rect(32,176,64,64), this.thirdToggle, "Complete Toggle", this.testGUIskin.customStyles[2]);  
	 		windowed = GUI.Toggle(Rect(1060, 615, 58, 49), windowed, "", tickBoxStyle);
	 		if(selected==2)
			{
				if(accept)
				{
					//Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
					if(windowed)
						windowed=false;
					else
						windowed=true;
					accept=false;
				}
	 			GUI.Label(Rect(714.5,615,184,37), buttonTextures[10],buttonStyle);
	 		}
	 		else
	 		{
	 			GUI.Label(Rect(714.5,615,184,37), buttonTextures[11],buttonStyle);
	 		}
	 	/*//Brightness 	PRO FEATURE
	 		if(selected==3)
			{
	 			GUI.Label(Rect(714.5,695,277,48), buttonTextures[12],buttonStyle);
	 		}
	 		else
	 		{
	 			GUI.Label(Rect(714.5,695,277,48), buttonTextures[13],buttonStyle);
	 		}*/
	 	//VSync
	 		/*vSync = GUI.Toggle(Rect(1060, 695, 58, 49), vSync, "", tickBoxStyle);
	 		if(selected==3)
			{
				if(accept)
				{
					if(vSync)
						vSync=false;
					else
						vSync=true;
					accept=false;
				}
	 			GUI.Label(Rect(714.5,695,139,47), buttonTextures[14],buttonStyle);
	 		}
	 		else
	 		{
	 			GUI.Label(Rect(714.5,695,139,47), buttonTextures[15],buttonStyle);
	 		}*/
			/*
	 		if (GUI.Button(Rect(800,555,100,30),"640 x 480"))
	 			Screen.SetResolution (640, 480, false);

	 		if (GUI.Button(Rect(800,605,100,30),"1024 x 768"))
	 			Screen.SetResolution (1024, 768, false);
	
	 		if (GUI.Button(Rect(800,655,100,30),"1280 x 1024"))
	 			Screen.SetResolution (1280, 1024, false);
	
		 	if (GUI.Button(Rect(800,705,100,30),"1600 x 1200"))
	 			Screen.SetResolution (1600, 1200, false);
	 			 		
	 		if (GUI.Button(Rect(950,555,100,30),"640 x 360"))
	 			Screen.SetResolution (640, 360, false);

	 		if (GUI.Button(Rect(950,605,100,30),"1024 x 576"))
	 			Screen.SetResolution (1024, 576, false);

	 		if (GUI.Button(Rect(950,655,100,30),"1280 x 720"))
	 			Screen.SetResolution (1280, 720, false);

	 		if (GUI.Button(Rect(950,705,100,30),"1600 x 900"))
	 			Screen.SetResolution (1600, 900, false);*/
	 	
	 	//Accept		
			if(selected==3)
			{
				GUI.Button(new Rect(896, 820,128,48), buttonArray[7], buttonStyle2[5]);
				if(accept)
				{
					if(!loaded)
					{
						Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
						loaded=true;
						Screen.SetResolution (resolutions[res].width, resolutions[res].height, !windowed);
						ItemsToSave.itemsToSave.SaveToFile();
					}
				}
			}
			else
				if(GUI.Button(new Rect(896, 820,128,48), "", buttonStyle2[5]))
				{
					Fabric.EventManager.Instance.PostEvent("UI/Select", gameObject);
					Screen.SetResolution (resolutions[res].width, resolutions[res].height, !windowed);
					ItemsToSave.itemsToSave.SaveToFile();
				}
	 	
			
			
		//Back
			if (GUI.Button(Rect(370.5,1075,89,37),"",buttonStyle2[6])||GUI.Button(Rect(260.5,1054.5,90,90),buttonArray[0],buttonStyle)||cancel)
			{
				selected=4;
				videoMenu=false;
				mainMenu=true;
				Fabric.EventManager.Instance.PostEvent("UI/Cancel", gameObject);
			}
		//Defaults
		//	if (GUI.Button(Rect(872.5,1075,175,46),"",buttonStyle2[4])||GUI.Button(Rect(730.5,1054.5,90,90),buttonArray[3],buttonStyle)||defaults)
		//	{
		//		//video defaults go here - if we want any
		//	}
		//Select
	 		GUI.Button(Rect(1340.5,1075,107,42),"",buttonStyle2[13]);
	 		GUI.Button(Rect(1230.5,1054.5,90,90),buttonArray[6],buttonStyle);
	 	}
 	}
}

function Close()
{
	//Debug.Log("close");
	menu=false;
	Fabric.EventManager.Instance.PostEvent("UI/Cancel", gameObject);
	//yield WaitForEndOfFrame;
	IntroMenuScript.inStart=true;
}