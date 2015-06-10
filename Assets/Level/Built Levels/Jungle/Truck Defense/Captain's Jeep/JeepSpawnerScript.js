var enemy:GameObject;
var fakePassenger:GameObject;

function SpawnEnemy()
{
	fakePassenger.SetActive(false);
	var enemyClone=Instantiate(enemy,transform.position,Quaternion.identity);
	enemyClone.transform.localScale.x=transform.localScale.x;
}