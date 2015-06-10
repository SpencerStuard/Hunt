var venom:GameObject;
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
			transform.localScale.x=1;
		else
			transform.localScale.x=-1;
			
		if(timer>=timeBetweenCast)
		{
			timer=0;
			var venomClone = Instantiate (venom, transform.position, venom.transform.rotation);
			venomClone.transform.position.z = 0;
			//venomClone.transform.parent = transform;
			if(transform.localScale.x==1)
				venomClone.transform.rotation.eulerAngles.y = 270;
			else
				venomClone.transform.rotation.eulerAngles.y = 90;
		}
	}
}