var effect:GameObject;
var triggered:boolean;

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Player")
	{
		gameObject.SetActive(false);
		if(!triggered)
		{
			triggered=true;
			var effectClone=Instantiate(effect,transform.position,Quaternion.identity);	
		}
			
	}
}