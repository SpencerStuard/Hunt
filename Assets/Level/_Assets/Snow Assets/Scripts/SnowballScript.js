var hasPlayer:boolean;
var hit:boolean;
var prevVel:Vector2;
var exploEffect:GameObject;
var test:GameObject;
var snowTrail:GameObject;
var trail:GameObject;
var mask:LayerMask;
var spawned:boolean;
var cam:CameraFollow;
var skate:boolean;

var player:GameObject;

var rb2D:Rigidbody2D;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	cam=Camera.main.GetComponent(CameraFollow);
}

function OnCollisionEnter2D(col:Collision2D)
{
	if(col.gameObject.tag=="Player"&&!hit)
	{
		cam.player=gameObject.transform;
		if(SkateboardScript.usingSkateboard)
		{
			skate=true;
			GameObject.Find("Skateboard(Clone)").GetComponent(MonoBehaviour).enabled=false;
		}
		hit=true;
		gameObject.layer=bpLayerz.IGNORELAYER;
		GameController.playerController.freezePlayer=true;
		GameController.anim.SetTrigger("hit2freeze");
		var contact:ContactPoint2D=col.contacts[0];
		test.transform.position=contact.point;
		//test.transform.position.x-=.2;
		test.transform.position.y+=.2;
		//Debug.Log("fas");
		hasPlayer=true;
		rb2D.velocity=prevVel;
	}
	if(col.gameObject.tag=="Wall")
	{
		if(hasPlayer)
		{
			GameController.anim.SetTrigger("thrown");
			GameController.playerController.onGround=true;
			GameController.playerController.freezePlayer=false;
			GameController.health.modifyHealth(-5);
			player.transform.eulerAngles.x=0;
			player.transform.eulerAngles.y=0;
			player.transform.eulerAngles.z=0;
			if(skate)
				GameObject.Find("Skateboard(Clone)").GetComponent(MonoBehaviour).enabled=true;
			hasPlayer=false;
			cam.player=player.transform;
		}
		Destroy(trail);
		Destroy(gameObject);
		var exploClone=Instantiate(exploEffect,transform.position,Quaternion.identity);
		
		//GameController.playerController.SendTakeDamage();
		
	}
}

function Update()
{
	if(RaptorSuitController.usingRaptorSuit)
		player=GameController.gameControllerScript.raptorPlayer;
	else
			player=GameController.gameControllerScript.realPlayer;

	if(transform.position.x<player.transform.position.x)
		rb2D.isKinematic=false;

	//test.transform.RotateAround (transform.position, Vector3.up, 5 * Time.deltaTime);
	var hit2: RaycastHit2D = Physics2D.Raycast(transform.position, -Vector2.up,5,mask);
	if(hit2)
	{
		if(!spawned)
		{
			spawned=true;
			trail=Instantiate(snowTrail,hit2.point,Quaternion.identity);
		}
		trail.transform.position=hit2.point;
	}
	else
	{
		Destroy(trail);
		spawned=false;
	}
	if(hasPlayer)
	{
		//GameController.player.transform.eulerAngles.y=0;
		GameController.playerController.inairTime=0;
		GameController.playerController.thrown=true;
		//GameController.player.transform.position=transform.position;
		//GameController.player.transform.rotation=transform.rotation;
		//GameController.player.transform.rotation.x=test.transform.rotation.x;  //try making it flip the Y if test.position is > the snowball to avoid feet up thing
		player.transform.eulerAngles.z=test.transform.eulerAngles.z;
		player.transform.position=test.transform.position;
	}
	//else
	//{
	//		GameController.player.transform.eulerAngles.x=0;
	//		GameController.player.transform.eulerAngles.y=0;
	//		GameController.player.transform.eulerAngles.z=0;
	//}
	if(!hit)
		prevVel=rb2D.velocity;
}
