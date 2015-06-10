function OnMouseDown()
{
	ItemsToSave.itemsToSave.SaveToFile();
	Application.LoadLevel("Map");
}