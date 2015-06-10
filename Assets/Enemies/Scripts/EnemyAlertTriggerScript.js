var enemyToTrigger:GameObject;
var used:boolean;

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player"&&!used)
	{
		used=true;
		enemyToTrigger.SendMessage("SeenPlayer");
	}
	gameObject.SetActive(false);
}