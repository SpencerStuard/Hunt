function OnGUI()
{
	if(Options.menu)
	{
		if (GUI.Button(Rect(ScreenSize.X*960,ScreenSize.Y*600,ScreenSize.X*100,ScreenSize.Y*30),"Save"))
			ItemsToSave.itemsToSave.SaveToFile();
		
		if (GUI.Button(Rect(ScreenSize.X*960,ScreenSize.Y*660,ScreenSize.X*100,ScreenSize.Y*30),"Load"))
			ItemsToSave.itemsToSave.LoadData();
	}
}