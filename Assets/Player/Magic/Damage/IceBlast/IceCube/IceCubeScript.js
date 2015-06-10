var enemyController:MonoBehaviour;
var frozenTimer:float;
var waitBeforeMelt:float;
var amountFrozen:float;
var oldVelocity:float;
var currentVelocity:float;
var iceSplosion:GameObject;
var alphaColor:float;

function Start()
{
	enemyController=transform.parent.GetComponent(MonoBehaviour);
	transform.localScale.x=0;
	transform.localScale.y=0;
	InvokeRepeating("OldVelocity",.3,.3);
	frozenTimer=.001;
	//alphaColor = GetComponent(SpriteRenderer).color.a;
}

function Update()
{
	currentVelocity=transform.parent.gameObject.GetComponent(Rigidbody2D).velocity.y;
//percentage of frozen the guy is. 1 = frozen solid, 1 to 1.5 just grows ice block
	amountFrozen = Mathf.Round(amountFrozen * 100) / 100;
	amountFrozen=Mathf.Clamp(amountFrozen,0,1.5);

//sets the frozen timer **(to be used in thawing later)**
	if(waitBeforeMelt>0)
		waitBeforeMelt-=Time.deltaTime;
	if(waitBeforeMelt<.1&&frozenTimer>0)
	{
		frozenTimer-=Time.deltaTime;
		amountFrozen=frozenTimer/10;
	}
	
	//if(frozenTimer<0)
		//Destroy(gameObject);

//grows the block up to scale of 1
	transform.localScale.x=(amountFrozen/3);
	transform.localScale.y=transform.localScale.x;

//slows enemy down
	enemyController.modSpeed=1-(amountFrozen/3)*2;

//changes ice to walkable land if he's 1 or > frozen
	if(enemyController.frozen)
		gameObject.layer=bpLayerz.LAND;
	else
		gameObject.layer=bpLayerz.ENEMY;
		
	if(frozenTimer<=0)
		Melt();
}

function OldVelocity()
{
	//yield WaitForSeconds(1);
	oldVelocity=transform.parent.gameObject.GetComponent(Rigidbody2D).velocity.y;
	//return;
}

function OnCollisionEnter2D(col:Collision2D)
{
	if(col.gameObject.tag==("Land")&&oldVelocity<-4&&transform.localScale.x==0.5)
		Shatter();
}

function Shatter()
{
	var iceSplosionClone = Instantiate(iceSplosion, transform.position, Quaternion.identity);
	Destroy(transform.parent.gameObject);
}

function IceGrow(x:float)
{
	amountFrozen+=x;
	if(frozenTimer<15)
		frozenTimer+=x*10;
	waitBeforeMelt=6;
}

function Melt()
{
	enemyController.isCubed=false;
	//enemyController.frozen=false;
	//transform.localScale.x=0;
	enemyController.modSpeed=1;
	//transform.parent.gameObject.GetComponent(Rigidbody2D).isKinematic=true;
	
	//enemyController.animateRaptor.inAir=false;
	Destroy(gameObject);
}