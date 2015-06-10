//var enemy:GameObject;
var fakeEnemy:GameObject;
var number:int;
var num:int;
var spawned:boolean;

function Start()
{
//	spawned=false;
	if(num==1)
		Right();
	else
		Left();
		
	number=Random.Range(1,6);
}

function Update()
{
	if(Time.timeScale > 0)
	{
		if(Mathf.Abs(transform.position.x-GameController.player.transform.position.x)<number&&!spawned)
			DropEnemy();
	}
}

function Left()
{
	iTween.MoveTo(this.gameObject, iTween.Hash("path", iTweenPath.GetPath("TurretL"),"time",2.5, "easeType", "linear"));
}

function Right()
{
	iTween.MoveTo(this.gameObject, iTween.Hash("path", iTweenPath.GetPath("TurretR"),"time",2.5, "easeType", "linear"));
}

function DropEnemy()
{
	fakeEnemy.GetComponent(Rigidbody2D).isKinematic=false;
	fakeEnemy.transform.parent=null;
	yield WaitForSeconds(6);
	Destroy(gameObject);
}