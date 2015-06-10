var explo:GameObject;
var exploRaptor:GameObject;
var pause:boolean;
var ran:float;

function Start()
{
	ran=Random.Range(.25,2.5);
}

function Update()
{
	if(!pause&&!StartMenuScript.inAMenu)
		transform.position.x-=.08;
}

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="RunOver")
	{
		var explosion=Instantiate(explo,transform.position,Quaternion.identity);
		var raptorSplosion = Instantiate(exploRaptor,transform.position,Quaternion.identity);
		//yield WaitForSeconds(1);
		Fabric.EventManager.Instance.PostEvent("SFX/HamHit", gameObject);
		gameObject.SetActive(false);
	}
	if(col.gameObject.tag=="RunOver2")
	{
		pause=true;
		yield WaitForSeconds(ran);
		pause=false;
	}
}