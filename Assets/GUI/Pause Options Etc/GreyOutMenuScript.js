var greyOut:Texture2D;

function OnGUI()
{
	GUI.depth = 10;
	
	if(StartMenuScript.inAMenu)
		GUI.DrawTexture(Rect(0, 0, 1920, 1200), greyOut);
}