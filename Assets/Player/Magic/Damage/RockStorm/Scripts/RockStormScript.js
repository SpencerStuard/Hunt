var sounds:AudioClip[];
var rockStorm:GameObject;
var rockCloud1:GameObject;
var rockCloud2:GameObject;
var rocks:GameObject[];
var randomRockSelect:int;
var i:int;
var needsCharge:boolean;
var inUse:boolean;


//var sounds:AudioClip[];
var particle:GameObject;
var charges:int;

var canCast:boolean; //in a cave?
var mask:LayerMask;

function Start()
{
	needsCharge=false;
	charges=2;
	rockCloud1.SetActive(false);
	rockCloud2.SetActive(false);
}

function ShowEffect()
{
	var particleClone = Instantiate (particle, Vector2(GameController.player.transform.position.x+Random.Range(-3.51,3.51),GameController.player.transform.position.y-Random.Range(0,.51)), particle.transform.rotation);
	yield WaitForSeconds(Random.Range(0,.75));
	var particleClone2 = Instantiate (particle, Vector2(GameController.player.transform.position.x+Random.Range(.5,2),GameController.player.transform.position.y-Random.Range(0,.51)), particle.transform.rotation);
	yield WaitForSeconds(Random.Range(0,.75));
	var particleClone3 = Instantiate (particle, Vector2(GameController.player.transform.position.x+Random.Range(.8,2.5),GameController.player.transform.position.y-Random.Range(0,.51)), particle.transform.rotation);
	yield WaitForSeconds(Random.Range(0,.75));
	var particleClone4 = Instantiate (particle, Vector2(GameController.player.transform.position.x+Random.Range(-3.5,-.5),GameController.player.transform.position.y-Random.Range(0,.51)), particle.transform.rotation);
	//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], Vector2(rockCloud1.transform.position.x,GameController.player.transform.position.y+3), Options.sfxVolume);
	//AudioSource.PlayClipAtPoint(sounds[Random.Range(0,sounds.length)], rockCloud2.transform.position, Options.sfxVolume);
}

function Update()
{
	randomRockSelect = Random.Range(0,rocks.length);
	var hit: RaycastHit2D = Physics2D.Raycast(Vector2(transform.position.x,transform.position.y-7.5), Vector2.up,Mathf.Infinity,mask);
	if(!hit)
		canCast=true;
	else
		canCast=false;
}

function UseMagic()
{
	if(charges>0&&!inUse&&canCast)
	{
		inUse=true;
		GameController.anim.SetTrigger("magicShoutGround");
		//AudioSource.PlayClipAtPoint(MagicScript.castSounds[Random.Range(0,MagicScript.castSounds.length)], GameController.player.transform.position, Options.sfxVolume);
		
		// Audio - Rock Storm Cast
		Fabric.EventManager.Instance.PostEvent("SFX/Magic/RockStorm/Cast", gameObject);
		
		yield WaitForSeconds(.217);
		rockCloud1.SetActive(true);
		rockCloud2.SetActive(true);
		charges--;
		GameController.stats.spellsCast++;
		ShowEffect();
		SummonRocks();
		yield WaitForSeconds(.3);
		inUse=false;
	}
}

function SummonRocks()
{
yield WaitForSeconds(1);
	while(i<150)
	{
		var rock1Clone = Instantiate(rocks[randomRockSelect], rockCloud1.transform.position, rockCloud1.transform.rotation);
		rock1Clone.GetComponent(Rigidbody2D).AddForce(transform.right * rock1Clone.transform.eulerAngles.z * Random.Range(0.5,2)*-1);

		var rock2Clone = Instantiate(rocks[randomRockSelect], rockCloud2.transform.position, rockCloud2.transform.rotation);
		rock2Clone.GetComponent(Rigidbody2D).AddForce(transform.right * rock2Clone.transform.eulerAngles.z * Random.Range(0.5,2));
		yield WaitForSeconds(.05);
		i++;
	}
	if(i>149)
	{
		rockCloud1.SetActive(false);
		rockCloud2.SetActive(false);
		i=0;
	}
}