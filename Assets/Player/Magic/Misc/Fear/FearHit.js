var fear:GameObject;
var hit:boolean;
var coll:CircleCollider2D;

var particleSys:ParticleSystem;

function Start()
{
	//particleSys = GetComponent(ParticleSystem);
	//particleSys.GetComponent(Renderer).sortingLayerName = "Effects";
	coll=GetComponent(CircleCollider2D);
}

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Enemy"&&!hit)
	{
		//hit=true;
		if(!col.gameObject.GetComponent(MonoBehaviour).feared)
		{
			col.gameObject.GetComponent(MonoBehaviour).Fear();
			var fearClone=Instantiate(fear,col.transform.position,Quaternion.identity);
			fearClone.transform.parent=col.transform;
		}
	}
	yield WaitForSeconds(.1);
	coll.enabled=false;
}

function Update()
{
	Destroy(gameObject,6);
}
