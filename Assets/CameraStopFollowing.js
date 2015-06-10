function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player")
		Camera.main.SendMessage("SetFollow", false);
}

function OnTriggerExit2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player")
		Camera.main.SendMessage("SetFollow", true);
}