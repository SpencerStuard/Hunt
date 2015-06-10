#pragma strict

var trexController:TRexController;
var bloodFX_New:GameObject;
var bloodFX_1:GameObject;
var bloodFX_2:GameObject;
var bloodFX_3:GameObject;
var jaw:Transform;

function OnTriggerEnter2D (col:Collider2D)
{
	if(col.gameObject.tag=="Player"&&trexController.biting&&!trexController.biteHit)
	{
		
		if(GameController.health.currentHealth > 0)
		{		
			if(GameController.health.currentHealth <= 25)
			{
				SkateboardScript.skateboardScript.Dismount();
				GameController.health.modifyHealth(-25);
				trexController.ChewPlayer();
				if(QuiverScript.usingQuiver)
					GameObject.Find("Quiver").SetActive(false);
			}
			else
			{
				GameController.health.modifyHealth(-25);
				GameController.playerController.SendTakeDamage();
			}
			
			
		}
		else
		{
			trexController.ChewPlayer();
			if(QuiverScript.usingQuiver)
				GameObject.Find("Quiver").SetActive(false);
		}
			
		
		var blood1 = Instantiate(bloodFX_1,Vector3(jaw.position.x+Random.Range(-0.5,0.5),jaw.position.y+Random.Range(-0.3,0.3),0),Quaternion.identity);
		var blood2 = Instantiate(bloodFX_2,Vector3(jaw.position.x+Random.Range(-0.5,0.5),jaw.position.y+Random.Range(-0.3,0.3),0),Quaternion.identity);
		var blood3 = Instantiate(bloodFX_3,Vector3(jaw.position.x+Random.Range(-0.5,0.5),jaw.position.y+Random.Range(-0.3,0.3),0),Quaternion.identity);
		
		//Instantiate(bloodFX_New, GameController.player.transform.position, Quaternion.identity);
		
		
		trexController.biteHit=true;
	}
}