var splash:GameObject;
var splashSounds : AudioClip[];

function Update()
{
	if(CharController.swimming)
		GameController.stats.underwaterTime+=Time.deltaTime;
}

function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag == ("Player")&&!CharController.swimming)
	{	
		CharController.swimming=true;
		CharController.rolling=false;
		if(col.gameObject.GetComponent(Rigidbody2D).velocity.y<-2)
		{
			var splashClone = Instantiate(splash, Vector2(col.transform.position.x,col.transform.position.y-.5), Quaternion.identity);
			//AudioSource.PlayClipAtPoint(splashSounds[Random.Range(0,splashSounds.length)], transform.position, Options.sfxVolume);
			
			// Audio - Water Splash
			Fabric.EventManager.Instance.PostEvent("SFX/Water/Splash", gameObject);
		}
		col.gameObject.GetComponent(Rigidbody2D).velocity.y*=.1;
	}
	if(col.gameObject.tag == ("Projectile"))
		col.GetComponent(MonoBehaviour).Slow();
	
	if(col.gameObject.tag == ("Enemy"))
		col.GetComponent(MonoBehaviour).TakeDamage(1);
	
}

function OnTriggerExit2D(col:Collider2D)
{
	if(col.gameObject.tag == ("Player"))
	{
		CharController.swimming=false;
		GameController.playerrb2D.gravityScale=1;	
	}
}
