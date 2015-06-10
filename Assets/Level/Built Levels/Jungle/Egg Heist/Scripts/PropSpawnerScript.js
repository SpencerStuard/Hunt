var enemy1:GameObject;
var enemy2:GameObject;

function Start ()
{

}

function SpawnRandom()
{
	var randomDice : int;
	randomDice = Random.Range(0,2);
	
	if(randomDice == 0)
	{
	var enemyClone=Instantiate(enemy1,transform.position,Quaternion.identity);
	enemyClone.transform.localScale.x=transform.localScale.x;
	}
	else if(randomDice == 1)
	{
	var enemyClone1=Instantiate(enemy2,transform.position,Quaternion.identity);
	enemyClone1.transform.localScale.x=transform.localScale.x;
	}
}