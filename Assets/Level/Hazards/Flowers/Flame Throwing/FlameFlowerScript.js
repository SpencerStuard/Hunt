var fireball:GameObject;
var timeBetweenCast:float;
var timer:float;
var attacked:boolean;

function Start ()
{
	//timeBetweenCast=Random.Range(5,11);
	//timer=0;
}

function Update ()
{
	if(Vector2.Distance(transform.position,GameController.player.transform.position)<2)
	{
		if (GameController.player.transform.position.x < transform.position.x)
			transform.localScale.y=1;
		else
			transform.localScale.y=-1;
			
		if(!attacked)
		{
			attacked=true;
			var fireballClone = Instantiate (fireball, transform.position, Quaternion.Euler(0,0,270));
			fireballClone.transform.parent=transform;
		}
	}
	if(attacked&&Vector2.Distance(transform.position,GameController.player.transform.position)>4)
		attacked=false;
}