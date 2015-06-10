function Update()
{
	iTween.MoveBy(gameObject, iTween.Hash("x", 6, "easeType", "linear", "loopType", "pingPong", "speed", 3));
}