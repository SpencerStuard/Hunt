var col:CircleCollider2D;
var splash:GameObject;

function Start () 
{
	yield WaitForSeconds(1);
	col.enabled=true;
}

function OnTriggerEnter2D(c:Collider2D)
{
	var splashClone = Instantiate(splash,transform.position,Quaternion.identity);
	Destroy(gameObject);
}