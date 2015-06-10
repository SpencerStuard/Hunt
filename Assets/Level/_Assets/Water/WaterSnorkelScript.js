function Update()
{
	if(SnorkelScript.usingSnorkel)
		{
			gameObject.layer=bpLayerz.IGNORELAYER;
			this.enabled=false;
		}
	//else
		//gameObject.layer=0;
}