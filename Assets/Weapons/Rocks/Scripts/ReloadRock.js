var rock:GameObject;

function Update()
{
	if(transform.childCount == 0 && !NewRockWeapon.throwingRock)
	{
		var nextRock = Instantiate(rock, this.transform.position, transform.rotation);
		nextRock.transform.parent = this.transform;
	}
}