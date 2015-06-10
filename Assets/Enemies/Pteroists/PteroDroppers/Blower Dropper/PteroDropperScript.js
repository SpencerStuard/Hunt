var enemy:GameObject;
var fakeEnemy:GameObject;
var number:float;
var spawned:boolean;
var xPos:float;

var spawnDistance:float;

function Start()
{
	spawned=false;
	number=Random.Range(.1,2.9);
	if(transform.localScale.x==-1)
		Right();
	else
		Left();
	xPos=-82.5;
	//yield WaitForSeconds(1.5);
	//DropEnemy();
	
}

function Update()
{
	if(Time.timeScale > 0)
	{
		spawnDistance=Mathf.Abs(transform.position.x-xPos);
		//if(System.Math.Round(transform.position.x,2)==xPos) //new method to drop anywhere on the truck top
		if(spawnDistance<number&&!spawned)
		{
			spawned=true;
			DropEnemy();
		}
	}
}

function Left()
{
	iTween.MoveTo(this.gameObject, iTween.Hash("path", iTweenPath.GetPath("L"),"time",2.5, "easeType", "linear"));
}

function Right()
{
	iTween.MoveTo(this.gameObject, iTween.Hash("path", iTweenPath.GetPath("R"),"time",2.5, "easeType", "linear"));
}

function DropEnemy()
{
	var enemyClone=Instantiate(enemy,Vector3(transform.position.x,transform.position.y-.5,0),Quaternion.identity);
	enemyClone.GetComponent(Animator).SetTrigger("jump");
	enemyClone.transform.localScale.x=transform.localScale.x;
	fakeEnemy.SetActive(false);
	yield WaitForSeconds(2.5);
	Destroy(gameObject);
}