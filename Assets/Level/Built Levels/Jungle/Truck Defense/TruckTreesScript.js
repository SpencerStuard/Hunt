var x1:float;
var x2:float;

function Start()
{
	x1=Random.Range(-208.01,-98.99);
	x2=Random.Range(-65.01,165.99);
}

function Update()
{
	transform.position.x-=12*Time.deltaTime;
	if(transform.position.x<=x1)
	{
		transform.position.x=x2;
		x2=Random.Range(-65.01,165.99);
	}
}