function Update()
{
	iTween.MoveBy(gameObject, iTween.Hash("name", "Vertical", "y", 2, "easeType", "linear", "loopType", "pingPong"));
}