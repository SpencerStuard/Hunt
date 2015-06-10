var fireball:GameObject;
var timeBetweenCast:float;
var timer:float;

function Start ()
{
	timeBetweenCast=Random.Range(5,11);
	timer=0;
}

function Update ()
{
	if(timer<timeBetweenCast)
		timer+=Time.deltaTime;
	if(Vector2.Distance(transform.position,GameController.player.transform.position)<8)
	{
		if (GameController.player.transform.position.x < transform.position.x)
			transform.localScale.y=1;
		else
			transform.localScale.y=-1;
			
		if(timer>=timeBetweenCast)
		{
			timer=0;
			var fireballClone = Instantiate (fireball, transform.position, Quaternion.identity);
			fireballClone.GetComponent(Rigidbody2D).velocity = (transform.right * 10 *-transform.localScale.x);
		}
	}
}