var enemy:GameObject;
var manualSpawner:boolean;

function Start ()
{
	if(!manualSpawner)
	{
		var enemyClone=Instantiate(enemy,transform.position,Quaternion.identity);
		enemyClone.transform.localScale.x=transform.localScale.x;
	}
}

function Spawn()
{
	var enemyClone=Instantiate(enemy,transform.position,Quaternion.identity);
	enemyClone.transform.localScale.x=transform.localScale.x;
}