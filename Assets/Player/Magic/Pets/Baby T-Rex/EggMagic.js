var particle:GameObject;
var tRexPrefab:GameObject;
var anim:Animator;
var spawned:boolean;

var rb2D:Rigidbody2D;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	anim=GetComponent(Animator);
}

function OnCollisionEnter2D(col:Collision2D)
{
	transform.rotation.eulerAngles.z=0;
	anim.SetTrigger("crack");
	//var particleClone = Instantiate (particle, transform.position, Quaternion.identity);
	//gameObject.GetComponent(Renderer).enabled=false;
	rb2D.isKinematic=true;
	yield WaitForSeconds(1);
	if(!spawned)
	{
		spawned=true;
		var tRexPrefabClone = Instantiate (tRexPrefab, transform.position, Quaternion.identity);
	}
	//Destroy(gameObject);
}
