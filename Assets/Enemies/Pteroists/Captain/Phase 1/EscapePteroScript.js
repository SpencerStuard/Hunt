var captain:GameObject;
var fakeEnemy:GameObject;
var pickedUp:boolean;

function Start()
{
	pickedUp=false;
	Escape();
}

function Update()
{
	if(captain!=null&&Vector2.Distance(transform.position,captain.transform.position)<2&&!pickedUp)
	{
		pickedUp=true;
		PickUpEnemy();
	}
}

function Escape()
{
	iTween.MoveTo(this.gameObject, iTween.Hash("path", iTweenPath.GetPath("CaptainEscape"),"time",2.5, "easeType", "linear"));
}

function PickUpEnemy()
{
	//var enemyClone=Instantiate(enemy,Vector3(transform.position.x,transform.position.y-.5,0),Quaternion.identity);
	//enemyClone.GetComponent(Animator).SetTrigger("jump");
	Destroy(captain);
	fakeEnemy.SetActive(true);
	yield WaitForSeconds(6);
	Destroy(gameObject);
}