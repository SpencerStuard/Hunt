var dialogueScript:DialogueScript;

function Update()
{
	gameObject.GetComponent(GUITexture).enabled=dialogueScript.talking;
}

/*
function OnGUI()
{
	GUI.matrix = Matrix4x4.TRS (Vector3(0, 0, 0), Quaternion.identity, Vector3 (ScreenSize.X, ScreenSize.Y, 1));
	if(diaglogueScript.talking)
		GUI.DrawTexture(Rect(0, 0, 1920, 1200), diaglogueScript.bgTexture);
	
}*/