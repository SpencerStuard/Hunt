static var player:GameObject;
static var playerController:CharController;
static var crosshair:GameObject;
static var health:Health;
var healthObject:GameObject;
static var gameController:GameObject;
static var weaponSelect:WeaponSelect;
static var gameControllerScript:GameController;

static var savedItems:ItemsToSave;
static var anim:Animator;
static var skateVelocity:float;

var SkateSpawnerScript2:SkateboardSpawnerScript;
static var SkateSpawnerScript:SkateboardSpawnerScript;

static var shakeCam:CameraShake;

static var stats:Stats;

static var shadowHolder:Transform;
static var dustHolder:Transform;

static var eggHeld:int;
static var autoSkateMode:boolean;

var realPlayer:GameObject;
var raptorPlayer:GameObject;

//level scripts
var levelScript:MonoBehaviour;

var musicDelay:float;

static var playerrb2D:Rigidbody2D;


function Awake()
{
	Application.targetFrameRate = 60;


	if(GameObject.Find("Level")!=null)
		levelScript=GameObject.Find("Level").GetComponent(MonoBehaviour);
	player = GameObject.Find("Player");
	playerrb2D = player.GetComponent(Rigidbody2D);
	anim=GameObject.Find("Player").GetComponent(Animator);
	gameController=this.gameObject;
	gameControllerScript=GetComponent(GameController);
	realPlayer = player;
	healthObject = GameObject.Find("Health");
	crosshair = GameObject.Find("Crosshair");
	playerController = player.GetComponent(CharController);
	health = healthObject.GetComponent(Health);
	savedItems = GameObject.Find("Save Manager").GetComponent(ItemsToSave);
	weaponSelect = GetComponent(WeaponSelect);
	SkateSpawnerScript=SkateSpawnerScript2;
	shakeCam=GameObject.Find("Main Camera").GetComponent(CameraShake);
	stats=gameObject.GetComponent(Stats);
	shadowHolder=GameObject.Find("ShadowHolder").transform;
	dustHolder=GameObject.Find("DustCloudHolder").transform;

	
	Physics2D.IgnoreLayerCollision(bpLayerz.PROJECTILE, bpLayerz.PROJECTILE);
	Physics2D.IgnoreLayerCollision(bpLayerz.PROJECTILE, bpLayerz.PLAYER);
	Physics2D.IgnoreLayerCollision(bpLayerz.IGNORELAYER, bpLayerz.PLAYER);
	Physics2D.IgnoreLayerCollision(bpLayerz.IGNORELAYER, bpLayerz.ENEMY);
	Physics2D.IgnoreLayerCollision(bpLayerz.IGNORELAYER, bpLayerz.ENEMYLIMB);
	Physics2D.IgnoreLayerCollision(bpLayerz.IGNORELAYER, bpLayerz.PROJECTILE);
	Physics2D.IgnoreLayerCollision(bpLayerz.IGNORELAYER, bpLayerz.IGNORELAYER);
	Physics2D.IgnoreLayerCollision(bpLayerz.IGNORELAYER, bpLayerz.MELEE);
	Physics2D.IgnoreLayerCollision(bpLayerz.IGNORELAYER, bpLayerz.KARATE);
	Physics2D.IgnoreLayerCollision(bpLayerz.PLAYER, bpLayerz.MELEE);
	Physics2D.IgnoreLayerCollision(bpLayerz.PLAYER, bpLayerz.KARATE);
	Physics2D.IgnoreLayerCollision(bpLayerz.STUCKINENEMY, bpLayerz.PLAYER);
	Physics2D.IgnoreLayerCollision(bpLayerz.STUCKINENEMY, bpLayerz.ENEMYLIMB);
	Physics2D.IgnoreLayerCollision(bpLayerz.STUCKINENEMY, bpLayerz.PROJECTILE);
	
	Physics2D.IgnoreLayerCollision(bpLayerz.STUCKINENEMY, bpLayerz.LAND);
	Physics2D.IgnoreLayerCollision(bpLayerz.PLAYER, bpLayerz.PASSABLELAND);
	Physics2D.IgnoreLayerCollision(bpLayerz.PLAYERINVULN, bpLayerz.ENEMYLIMB);
	Physics2D.IgnoreLayerCollision(bpLayerz.PLAYERINVULN, bpLayerz.PLAYER);
	Physics2D.IgnoreLayerCollision(bpLayerz.PLAYERINVULN, bpLayerz.PROJECTILE);
	Physics2D.IgnoreLayerCollision(bpLayerz.PLAYERINVULN, bpLayerz.IGNORELAYER);
	Physics2D.IgnoreLayerCollision(bpLayerz.PLAYERINVULN, bpLayerz.MELEE);
	
	Physics2D.IgnoreLayerCollision(bpLayerz.PASSABLEPROJECTILES, bpLayerz.ENEMYLIMB);
	Physics2D.IgnoreLayerCollision(bpLayerz.ENEMYLIMB, bpLayerz.PLAYER);
	Physics2D.IgnoreLayerCollision(bpLayerz.ENEMYLIMB, bpLayerz.ENEMYLIMB);
	Physics2D.IgnoreLayerCollision(bpLayerz.ENEMYLIMB, bpLayerz.ENEMY);
	Physics2D.IgnoreLayerCollision(bpLayerz.ENEMYLIMB, bpLayerz.LAND);
	//Screen.showCursor = false;
	
	Physics2D.IgnoreLayerCollision(bpLayerz.WATERCOLLIDER, bpLayerz.PROJECTILE);
	Physics2D.IgnoreLayerCollision(bpLayerz.WATERCOLLIDER, bpLayerz.IGNORELAYER);
	Physics2D.IgnoreLayerCollision(bpLayerz.ROPE, bpLayerz.ENEMYPROJECTILE);
	
	Physics2D.IgnoreLayerCollision(bpLayerz.ENEMYPROJECTILE, bpLayerz.PROJECTILE);
	Physics2D.IgnoreLayerCollision(bpLayerz.ENEMYPROJECTILE, bpLayerz.IGNORELAYER);
	Physics2D.IgnoreLayerCollision(bpLayerz.ENEMYPROJECTILE, bpLayerz.ENEMY);
	Physics2D.IgnoreLayerCollision(bpLayerz.ENEMYPROJECTILE, bpLayerz.ENEMYLIMB);
	Physics2D.IgnoreLayerCollision(bpLayerz.ENEMYPROJECTILE, bpLayerz.ENEMYPROJECTILE);
	
	Physics2D.IgnoreLayerCollision(bpLayerz.PASSABLEPROJECTILES, bpLayerz.PROJECTILE);
	
	Physics2D.IgnoreLayerCollision(bpLayerz.PLAYERPET, bpLayerz.LAND);
}

function Start()
{
	musicDelay=0;
	SkateboardScript.usingSkateboard=false;
	autoSkateMode=false;
	if(Application.loadedLevel==0)
		healthObject.SetActive(false);
	
	yield WaitForEndOfFrame;
	if(Application.loadedLevelName=="Map - Jungle")
		Fabric.EventManager.Instance.PostEvent("Music/Switch", Fabric.EventAction.SetSwitch, "Jungle_Map_Music", gameObject);
	else if(Application.loadedLevelName=="Village")
		Fabric.EventManager.Instance.PostEvent("Music/Switch", Fabric.EventAction.SetSwitch, "Village_Theme", gameObject);
	else if(Application.loadedLevelName=="Dojo")
		Fabric.EventManager.Instance.PostEvent("Music/Switch", Fabric.EventAction.SetSwitch, "Dojo_Theme", gameObject);
	else if(Application.loadedLevelName=="Jungle - Truck Defense")
	{
		Fabric.EventManager.Instance.PostEvent("Music/Switch", Fabric.EventAction.SetSwitch, "Truck_Defense", gameObject);
		musicDelay=10;
	}
	else if(Application.loadedLevelName=="Jungle - Egg Heist"||Application.loadedLevelName=="Jungle - 1")
			Fabric.EventManager.Instance.PostEvent("Music/Switch", Fabric.EventAction.SetSwitch, "Jungle_Level_Music", gameObject);
	else if(Application.loadedLevelName=="Snow - 2")
		Fabric.EventManager.Instance.PostEvent("Music/Switch", Fabric.EventAction.SetSwitch, "Snow_Theme", gameObject);
	else
		Fabric.EventManager.Instance.PostEvent("Music/Switch", Fabric.EventAction.SetSwitch, "Main_Theme", gameObject);
	
	yield WaitForSeconds(musicDelay);
	Fabric.EventManager.Instance.PostEvent("Music/Switch", gameObject);
}

function Update()
{
	if(SkateboardScript.usingSkateboard)
		skateVelocity=(playerrb2D.velocity.x*player.transform.localScale.x);
	else
		skateVelocity=0;
		
	if(RaptorSuitController.usingRaptorSuit)
	{
		if(!RaptorSuitController.flippedLid)
			player = realPlayer;
		else
			player = raptorPlayer;
	}
	else
		player = realPlayer;
		
//		Debug.Log(player.name);
		
	if(Input.GetKeyDown(KeyCode.P)&&Time.timeScale==1)
		Time.timeScale=0;
	else if(Input.GetKeyDown(KeyCode.P)&&Time.timeScale==0)
		Time.timeScale=1;
	
	if(StartMenuScript.inAMenu||WeaponLoadout.weaponLoadoutMenu||Application.loadedLevel==0)
		Cursor.visible = true;
	else
		Cursor.visible = false;
	
}

enum bpLayerz
{
	LAYER0,
	LAYER1,
	LAYER2,
	LAYER3,
	LAYER4,
	LAYER5,
	LAYER6,
	LAYER7,
	PROJECTILE,
	LAND,
	PLAYER,
	MELEE,
	ENEMY,
	SPEAR,
	COVER,
	ROPE,
	LAYER16,
	IGNORELAYER,
	STUCKINENEMY,
	LAYER19,
	PASSABLEPROJECTILES,
	LAYER21,
	PLAYERINVULN,
	PLAYERPET,
	LAYER24,
	BACKGROUNDS,
	ENEMYPROJECTILE,
	PASSABLELAND,
	LAYER28,
	WATERCOLLIDER,
	KARATE,
	ENEMYLIMB,
};


