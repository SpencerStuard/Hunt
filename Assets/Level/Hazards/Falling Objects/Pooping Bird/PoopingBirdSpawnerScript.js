var poopingBird:GameObject;

function Start () 
{
	InvokeRepeating("SpawnBird",0,10);
}

function SpawnBird () 
{
	if(Vector2.Distance(GameController.player.transform.position,transform.position)>15)
	var poopingBirdClone = Instantiate(poopingBird, transform.position, Quaternion.identity);
}