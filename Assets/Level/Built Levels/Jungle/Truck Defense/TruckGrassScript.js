function Update()
{
	transform.position.x-=12*Time.deltaTime;
	if(transform.position.x<=-101.2)
		transform.position.x=-80.75;
}