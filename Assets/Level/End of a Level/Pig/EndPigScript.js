var rb:Rigidbody2D;
var enemyHP:int;
private var modSpeed:int=1;
var meat:GameObject;
var dead:boolean;
var splosion:GameObject;
var anim:Animator;
var standing:boolean;
var seenPlayer:boolean;

function Start()
{
	anim=GetComponent(Animator);
	rb=GetComponent(Rigidbody2D);
	enemyHP=1;
	InvokeRepeating("Flip",0,6);
	InvokeRepeating("Standing",0,3);
}

function TakeDamage(damage:float)
{
		enemyHP-=1;
		if(enemyHP<=0&&!dead)
		{
			dead=true;
			enemyHP=0;
			SpawnMeat();
		}
}

function Update()
{
	if(!standing)
		rb.velocity.x=-transform.localScale.x*3;
	anim.SetBool("standing",standing);
	
	if(dead)
		if(GameObject.Find("spear(Clone)") != null)		//Finds if the spear is inside of this enemy.
		{
			GameObject.Find("spear(Clone)").transform.parent=null; //Unparent it so it falls to the ground to be picked up.
		}
}

function Flip()
{
	transform.localScale.x*=-1;
}

function Standing()
{
	rb.velocity.x=0;
	if(!standing)
		standing=true;
	else
		standing=false;
	//transform.localScale.x*=-1;
}


function SpawnMeat()
{
	Instantiate(splosion,transform.position,Quaternion.identity);
	var meatClone=Instantiate(meat,transform.position,Quaternion.identity);
	meatClone.GetComponent(Rigidbody2D).velocity.y=Random.Range(.5,6);
	meatClone.GetComponent(Rigidbody2D).velocity.x=Random.Range(0,4);
	//if(Random.Range(0,2)>0)
	//{
	//	meatClone.rigidbody2D.velocity.y*=-1;
	//}
	if(Random.Range(0,2)>0)
		meatClone.GetComponent(Rigidbody2D).velocity.x*=-1;
	if(Random.Range(0,2)>0)	
		meatClone.GetComponent(Rigidbody2D).AddTorque(5);
	yield WaitForEndOfFrame;
	Destroy(gameObject);
}

function BlinkOnDamage()
{

}

function Stun()
{

}

function Alerted()
{

}