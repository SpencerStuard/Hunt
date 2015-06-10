var speech:String[];
var speech2:String[];
var speech3:String[];
var talkTextGUI:GUIText;
var sounds:AudioClip[];
static var talking:boolean;
var currentLine:int;
private var textIsScrolling:boolean;
var textScrollSpeed:int;
var bgTexture:Texture2D;
var background:Texture2D;
var npc:GameObject;
var parentScript:MonoBehaviour;
var testStyle:GUIStyle;
var portrait:GameObject;
var bgGUI:GameObject;


//Initialize after npc is spawned
var init:boolean;

//If it's another npc other than the karate master.
var fisherman:boolean;


function Start () 
{
	currentLine=0;
	if(fisherman)
	{	
		yield WaitForSeconds(2);
		npc=GameObject.Find("Fisherman(Clone)");
		parentScript=npc.GetComponent(MonoBehaviour);
		init=true;
	}
	else
		init=true;
}

function Update () 
{
	if(init)
	{
		if(!parentScript.talkedTo)
			Talk();
		else if (parentScript.talkedTo&&parentScript.talkedTo2)
			Talk2();
		else if (parentScript.talkedTo&&parentScript.talkedTo3)
			Talk3();
		portrait.SetActive(talking);
		bgGUI.SetActive(talking);
	}
}

function OnGUI()
{
	GUI.matrix = Matrix4x4.TRS (Vector3(0f, 0f, 1f), Quaternion.identity, Vector3 (ScreenSize.X, ScreenSize.Y, 1f));
	GUI.depth = 10;
	if(talking)
	{
		GUI.DrawTexture(Rect(150, 900, 1620, 300), bgTexture);
		//GUI.DrawTexture(Rect(0, 0, 1920, 1200), background);
		GUI.Label (Rect (190, 950,1500,300), talkTextGUI.text, testStyle);
	}
}


function Talk()
{
	if(Vector2.Distance(npc.transform.position,GameController.player.transform.position)<3&&Input.GetButtonDown("Interact")&&!talking)
	{
		talking=true;
		GameController.playerController.freezePlayer=true;
		StartScrolling();
		//talkTextGUI.text = speech[currentLine];
		yield WaitForEndOfFrame;
	}
	else if(Vector2.Distance(npc.transform.position,GameController.player.transform.position)>3&&talking)
	{
			talking=false;
			GameController.playerController.freezePlayer=false;
			currentLine=0;
			talkTextGUI.text="";
	}
	
	if(talking)
		
			
		if(Input.GetButtonDown("Interact"))
		{
			if(textIsScrolling)
			{
				talkTextGUI.text = speech[currentLine];
				textIsScrolling=false;
			}
			else
			{
				if(currentLine < speech.Length -1)
				{
						currentLine++;
						//talkTextGUI.text = speech[currentLine];
						StartScrolling();
				}
				else
				{
					//AudioSource.PlayClipAtPoint(sounds[0], transform.position, Options.sfxVolume);
					parentScript.talkedTo=true;
					currentLine=0;
					talkTextGUI.text="";
					talking=false;
					GameController.playerController.freezePlayer=false;
				}
			}
		}
}


function StartScrolling()
{
	if(!textIsScrolling)
	{
		textIsScrolling=true;
		//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], transform.position, Options.sfxVolume);	
		Fabric.EventManager.Instance.PostEvent("VO/Gibberish/Speech", gameObject);

	}
	var startLine:int = currentLine;
	var displayText:String = "";
	
	for(var i:int=0;i<speech[currentLine].Length;i++)
	{
		if(textIsScrolling&&currentLine==startLine)
		{
			displayText +=speech[currentLine][i];
			talkTextGUI.text = displayText;
			yield WaitForSeconds(.05);
		}
		else
			return;
	}
	textIsScrolling=false;
}





function Talk2()
{
	if(Vector2.Distance(npc.transform.position,GameController.player.transform.position)<3&&Input.GetButtonDown("Interact")&&!talking)
	{
		talking=true;
		GameController.playerController.freezePlayer=true;
		StartScrolling2();
		//talkTextGUI.text = speech2[currentLine];
		yield WaitForEndOfFrame;
	}
	else if(Vector2.Distance(npc.transform.position,GameController.player.transform.position)>3&&talking)
	{
			talking=false;
			GameController.playerController.freezePlayer=false;
			currentLine=0;
			talkTextGUI.text="";
	}
	
	if(talking)
		
			
		if(Input.GetButtonDown("Interact"))
		{
			if(textIsScrolling)
			{
				talkTextGUI.text = speech2[currentLine];
				textIsScrolling=false;
			}
			else
			{
				if(currentLine < speech2.Length -1)
				{
						currentLine++;
						//talkTextGUI.text = speech2[currentLine];
						StartScrolling2();
				}
				else
				{
					//AudioSource.PlayClipAtPoint(sounds[0], transform.position, Options.sfxVolume);
					//parentScript.talkedTo=true;
					currentLine=0;
					talkTextGUI.text="";
					talking=false;
					GameController.playerController.freezePlayer=false;
					if(fisherman)
					{
						parentScript.talkedTo2=false;
						parentScript.talkedTo3=true;
					}
				}
			}
		}
}


function StartScrolling2()
{
	if(!textIsScrolling)
	{
		textIsScrolling=true;
		Fabric.EventManager.Instance.PostEvent("VO/Gibberish/Speech", gameObject);
	}
	var startLine:int = currentLine;
	var displayText:String = "";
	
	for(var i:int=0;i<speech2[currentLine].Length;i++)
	{
		if(textIsScrolling&&currentLine==startLine)
		{
			displayText +=speech2[currentLine][i];
			talkTextGUI.text = displayText;
			yield WaitForSeconds(.05);
		}
		else
			return;
	}
	textIsScrolling=false;
}

function Talk3()
{
	if(Vector2.Distance(npc.transform.position,GameController.player.transform.position)<3&&Input.GetButtonDown("Interact")&&!talking)
	{
		talking=true;
		GameController.playerController.freezePlayer=true;
		StartScrolling3();
		//talkTextGUI.text = speech3[currentLine];
		yield WaitForEndOfFrame;
	}
	else if(Vector2.Distance(npc.transform.position,GameController.player.transform.position)>3&&talking)
	{
			talking=false;
			GameController.playerController.freezePlayer=false;
			currentLine=0;
			talkTextGUI.text="";
	}
	
	if(talking)
		
			
		if(Input.GetButtonDown("Interact"))
		{
			if(textIsScrolling)
			{
				talkTextGUI.text = speech3[currentLine];
				textIsScrolling=false;
			}
			else
			{
				if(currentLine < speech3.Length -1)
				{
						currentLine++;
						//talkTextGUI.text = speech3[currentLine];
						StartScrolling3();
				}
				else
				{
					//AudioSource.PlayClipAtPoint(sounds[0], transform.position, Options.sfxVolume);
					//parentScript.talkedTo=true;
					if(!fisherman)
						parentScript.Restart();
					currentLine=0;
					talkTextGUI.text="";
					talking=false;
					GameController.playerController.freezePlayer=false;
				}
			}
		}
}


function StartScrolling3()
{
	if(!textIsScrolling)
	{
		textIsScrolling=true;
		if(!fisherman)
			Fabric.EventManager.Instance.PostEvent("VO/Gibberish/Speech", gameObject);
		else
			Fabric.EventManager.Instance.PostEvent("VO/Gibberish/Angry", gameObject);
	}

	textIsScrolling=true;
	var startLine:int = currentLine;
	var displayText:String = "";
	
	for(var i:int=0;i<speech3[currentLine].Length;i++)
	{
		if(textIsScrolling&&currentLine==startLine)
		{
			displayText +=speech3[currentLine][i];
			talkTextGUI.text = displayText;
			yield WaitForSeconds(.05);
		}
		else
			return;
	}
	textIsScrolling=false;
}