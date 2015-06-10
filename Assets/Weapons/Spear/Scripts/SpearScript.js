//var sounds:AudioClip[];
var damage:int;
var coll:BoxCollider2D;
var hasHit:boolean;
var hitLoc:Vector2;
var hitTransform:Transform;
var hitAngle:float;
var hitEffects:GameObject[];
var zAngle:float;
var stuck:boolean;
var left:boolean;
var trail:GameObject;

var rb2D:Rigidbody2D;
var rend:Renderer;

var woundEffect:GameObject;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	coll=GetComponent(BoxCollider2D);
	rend=GetComponent(Renderer);
	damage=2;
	stuck=false;
	name="spear(Clone)";
}



function OnCollisionEnter2D(col:Collision2D)
{
	//stuck=true;
	//transform.eulerAngles.z=zAngle;
	if(col.gameObject.tag=="Enemy")
	{
		rend.sortingLayerName="Enemy";
		//AudioSource.PlayClipAtPoint(NewSpear.statSounds[Random.Range(0,NewSpear.statSounds.length)], transform.position, Options.sfxVolume);
		
		// Audio - Impact Enemy
		Fabric.EventManager.Instance.PostEvent("SFX/Weapons/Spear/Impact/Enemy", gameObject);
		
		col.gameObject.SendMessage ("TakeDamage", damage);
		var hitEffectClone = Instantiate(hitEffects[0], transform.position, Quaternion.identity);
		//var hitEffectClone2 = Instantiate(hitEffects[1], col.collider.gameObject.transform.position, Quaternion.identity);
	 	//col.collider.gameObject.SendMessage("BlinkOnDamage");//,SendMessageOptions.DontRequireReceiver);
		
		if(col.gameObject.GetComponent(MonoBehaviour).enemyHP!=null)
		{
			coll.enabled=false;
			rb2D.isKinematic = true;
			transform.parent = col.collider.gameObject.transform;
			//woundEffect.SetActive(true);
			//hitEffectClone2.transform.parent = col.collider.gameObject.transform;
			//woundEffect.transform.parent = col.collider.gameObject.transform;
			transform.localScale.x=1;
			if(left)
			{
				//transform.localScale.x=1;
				if(col.gameObject.transform.localScale.x==-1)
					transform.eulerAngles.y=180;
				transform.position.x-=.125;
			}
			else
			{
				if(col.gameObject.transform.localScale.x==-1)
					transform.eulerAngles.y=180;
				transform.position.x+=.125;
			}
			//transform.eulerAngles.z*=transform.localScale.x;
			hasHit=true;
		}	
	}
	if(col.gameObject.tag=="Land"&&transform.parent==null)
	{
		hasHit=false;
		rb2D.isKinematic=true;
		gameObject.layer=bpLayerz.IGNORELAYER;
	}
	trail.GetComponent(ParticleSystem).enableEmission= false;
}


function Update()
{
	if(!stuck)
		zAngle=transform.eulerAngles.z;
		
	if(rb2D!=null)
		if(rb2D.velocity.y != 0&&!hasHit)
		{
			var angle : float = Mathf.Atan (rb2D.velocity.y/rb2D.velocity.x); // Find angle in radians
			angle *= Mathf.Rad2Deg;
			if(!stuck)
				transform.eulerAngles.z = angle;
		}
	if(hasHit&&transform.parent==null)
	{
		rb2D.isKinematic=false;
		coll.enabled=true;
	}

	if(Vector2.Distance(GameController.player.transform.position,transform.position)<1&&Input.GetButton("Interact")&&!WeaponSelect.attacking&&NewSpear.ammoCount==0)
		PickUpSpear();
		
		
	transform.localScale.y=1;
	if(transform.localScale.x<0)
		transform.localScale.x=-1;
	else
		transform.localScale.x=1;
}

function PickUpSpear()
{
	NewSpear.ammoCount=1;
	NewSpear.switchToSpear=true;
	Destroy(gameObject);
	
	/*if(transform.localScale.x<0)
		transform.localScale.x=-1;
	else
		transform.localScale.x=1;
		
	transform.localScale.y=1;*/
}

function Slow()
{
	rb2D.drag=3;
}
