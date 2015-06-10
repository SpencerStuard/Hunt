var blood:GameObject;

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player")
	{
		var bloodClone=Instantiate(blood,GameController.player.transform.position,Quaternion.identity);
		if(SkateboardScript.usingSkateboard)
    		SkateboardScript.skateboardScript.Dismount();
		GameController.health.modifyHealth(-5);
		Unarmed.stomping=false;
		GameController.playerController.SendTakeDamage();
		GameController.player.transform.position=Vector2(-82,98);
	}
	if(col.gameObject.tag=="Enemy")
	{
		var bloodClone2=Instantiate(blood,col.gameObject.transform.position,Quaternion.identity);
		col.gameObject.GetComponent(MonoBehaviour).enemyHP=0;
		col.gameObject.GetComponent(MonoBehaviour).flyOff=true;
	}
}