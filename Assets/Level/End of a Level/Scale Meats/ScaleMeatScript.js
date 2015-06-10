function Start()
{
	transform.eulerAngles.z=Random.Range(0,360);
	GetComponent(Renderer).sortingOrder=(Random.Range(9,99));
}