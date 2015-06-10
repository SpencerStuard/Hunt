var crosshair:Texture2D;

function OnGUI()
{
	GUI.depth=-999;
	//GUI.matrix = Matrix4x4.TRS (Vector3(0f, 0f, 0f), Quaternion.identity, Vector3 (ScreenSize.X, ScreenSize.Y, 1f));
	GUI.Label(Rect (Input.mousePosition.x, Screen.height - Input.mousePosition.y, 64, 64), crosshair);
}