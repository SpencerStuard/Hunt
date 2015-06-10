var pachyController:PachyController;
var feared:boolean=true;

var rb2D:Rigidbody2D;

function Start () 
{
	pachyController=transform.parent.GetComponent(MonoBehaviour);
}

function Update ()
{
	if(pachyController.ramming)
		gameObject.layer=bpLayerz.ENEMY;
	else
		gameObject.layer=bpLayerz.ENEMYLIMB;
}

function OnCollisionEnter2D(col:Collision2D)
{
	if(Mathf.Abs(pachyController.prevXVeloc)>5.5)
	{
		if(col.gameObject.tag=="Player")//&&!pachyController.frozen&&pachyController.charging)
		{
			NewSpear.spearMelee=false;
			MagicScript.casting=false;
			GameController.playerController.punching=false;
			GameController.playerController.freezePlayer2=false;
			GameController.playerrb2D.isKinematic=false;
			col.gameObject.SendMessage("KnockBack",Vector2(-transform.parent.transform.localScale.x*1400,200));
			GameController.anim.SetTrigger("thrown");
			GameController.playerController.thrown=true;
			GameController.playerController.groundTimer=0;
			GameController.health.modifyHealth(-pachyController.damage);
			transform.parent.GetComponent(Rigidbody2D).velocity.x*=.2;
			GameController.playerController.SendTakeDamage();
		}
		else if(col.gameObject.tag=="PushableCrate")
			col.gameObject.SendMessage("Explode");
		else if(col.gameObject.tag=="Land")
		{
			GameController.shakeCam.Shake(.5,.5,.5,.5); //x,y,z,time
			pachyController.Stun(4);
		}
	}
}

function Electrocute(x:float)
{

}

function TakeDamage()
{

}

function Fear()
{

}
