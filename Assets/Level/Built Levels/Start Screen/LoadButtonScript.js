var loadGUI:boolean;
var pauseTexture:Texture2D;
var loadTextStyle = new GUIStyle();

function Start()
{
	loadGUI=false;
}

function OnMouseDown()
{
	if (loadGUI)
		loadGUI=false;
	else
		loadGUI=true;
}

function OnGUI()
{
	if(loadGUI)
	{
		GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), pauseTexture);
		GUI.Label(new Rect(ScreenSize.X*835, ScreenSize.Y*300,ScreenSize.X*250,ScreenSize.Y*50), "Load Game", loadTextStyle);
		//Slot 1
		if(File.Exists(ItemsToSave.itemsToSave.path +"/"+ "savedata.sav"))
		{
			if (GUI.Button(Rect(Screen.width/3,Screen.height/3,ScreenSize.X*250,ScreenSize.Y*50),"Load Slot 1"))
			{
				ItemsToSave.itemsToSave.saveNum=1;
				ItemsToSave.itemsToSave.LoadData();
				
				Application.LoadLevel("Map");		
			}
		}
		else
			if (GUI.Button(Rect(Screen.width/3,Screen.height/3,ScreenSize.X*250,ScreenSize.Y*50),"Create Slot 1"))
			{
				ItemsToSave.itemsToSave.saveNum=1;
				ItemsToSave.itemsToSave.SaveToFile();
				
				Application.LoadLevel("Map");		
			}
		//Slot 2
		if(File.Exists(ItemsToSave.itemsToSave.path +"/"+ "savedata2.sav"))
		{
			if (GUI.Button(Rect(Screen.width/3,Screen.height/3+75,ScreenSize.X*250,ScreenSize.Y*50),"Load Slot 2"))
			{
				ItemsToSave.itemsToSave.saveNum=2;
				ItemsToSave.itemsToSave.LoadData();
				
				Application.LoadLevel("Map");		
			}
		}
		else
			if (GUI.Button(Rect(Screen.width/3,Screen.height/3+75,ScreenSize.X*250,ScreenSize.Y*50),"Create Slot 2"))
			{
				ItemsToSave.itemsToSave.saveNum=2;
				ItemsToSave.itemsToSave.SaveToFile();
				
				Application.LoadLevel("Map");		
			}
		//Slot 3
		if(File.Exists(ItemsToSave.itemsToSave.path +"/"+ "savedata3.sav"))
		{
			if (GUI.Button(Rect(Screen.width/3,Screen.height/3+150,ScreenSize.X*250,ScreenSize.Y*50),"Load Slot 3"))
			{
				ItemsToSave.itemsToSave.saveNum=3;
				ItemsToSave.itemsToSave.LoadData();
				
				Application.LoadLevel("Map");
			}
		}
		else
			if (GUI.Button(Rect(Screen.width/3,Screen.height/3+150,ScreenSize.X*250,ScreenSize.Y*50),"Create Slot 3"))
			{
				ItemsToSave.itemsToSave.saveNum=3;
				ItemsToSave.itemsToSave.SaveToFile();
				
				Application.LoadLevel("Map");			
			}
		//Slot 4
		if(File.Exists(ItemsToSave.itemsToSave.path +"/"+ "savedata4.sav"))
		{
			if (GUI.Button(Rect(Screen.width/3,Screen.height/3+225,ScreenSize.X*250,ScreenSize.Y*50),"Load Slot 4"))
			{
				ItemsToSave.itemsToSave.saveNum=4;
				ItemsToSave.itemsToSave.LoadData();
				
				Application.LoadLevel("Map");				
			}
		}
		else
			if (GUI.Button(Rect(Screen.width/3,Screen.height/3+225,ScreenSize.X*250,ScreenSize.Y*50),"Create Slot 4"))
			{
				ItemsToSave.itemsToSave.saveNum=4;
				ItemsToSave.itemsToSave.SaveToFile();
				
				Application.LoadLevel("Map");				
			}
		//Slot 5
		if(File.Exists(ItemsToSave.itemsToSave.path +"/"+ "savedata5.sav"))
		{
			if (GUI.Button(Rect(Screen.width/3,Screen.height/3+300,ScreenSize.X*250,ScreenSize.Y*50),"Load Slot 5"))
			{
				ItemsToSave.itemsToSave.saveNum=5;
				ItemsToSave.itemsToSave.LoadData();
				Application.LoadLevel("Map");				
			}
		}
		else
			if (GUI.Button(Rect(Screen.width/3,Screen.height/3+300,ScreenSize.X*250,ScreenSize.Y*50),"Create Slot 5"))
			{
				ItemsToSave.itemsToSave.saveNum=5;
				ItemsToSave.itemsToSave.SaveToFile();
				Application.LoadLevel("Map");				
			}
	}
}