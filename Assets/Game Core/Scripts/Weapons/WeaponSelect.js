import System.Collections.Generic;
//var rockArc:GameObject; //Rock Arc Holder
//var spearArc:GameObject; //Spear Arc Holder
//var slingArc:GameObject;
//var bowArc:GameObject;
//var quiver:GameObject;

var arcHolder:GameObject[];

//var arrayWeapons:GameObject[];
var arrayWeaponScripts:MonoBehaviour[];
var lastWeapon:int;
var firstWeapon:int;
static var attacking:boolean;

var weaponLoadout:WeaponLoadout;
var loadoutGUI:WeaponLoadoutGUI;

//var weaponsArray = new Array();
var weaponsArray:List.<GameObject>;
//var weaponsScriptArray = new Array();

var unarmed:GameObject;
var rock:GameObject;
var spear:GameObject;
var sword:GameObject;
var bow:GameObject;
var sling:GameObject;

var weapons:GameObject[];

//assign the variables to pass to GUI
static var currentAmmo:int;
static var wepName:String;
static var currentWeapon:int;

var inDojo:boolean;
var weaponsArmed:boolean;

var i:int;

//assign damage per weapon for other scripts to reference
//static var wepDmg:float;
static var force:float;

function Awake()
{
if(Application.loadedLevel !=0)
{
	arcHolder[0]=GameObject.Find("RockArc");
	arcHolder[1]=GameObject.Find("SpearArc");
	arcHolder[2]=GameObject.Find("SlingArc");
	arcHolder[3]=GameObject.Find("BowArc");
	//quiver=GameObject.Find("Quiver");
	
		
	weapons[0] = GameObject.Find("Unarmed");
	weapons[1] = GameObject.Find("RockWeapon");
	weapons[2] = GameObject.Find("SpearWeapon");
	weapons[3] = GameObject.Find("SlingWepNew");
	//weapons[3] = GameObject.Find("SlingParent");
	weapons[4] = GameObject.Find("BowWeapon");
	weapons[5] = GameObject.Find("SwordWeapon");
	/*weapons[6] = GameObject.Find("DinoBites");
	weapons[7] = GameObject.Find("Quiver");
	weapons[8] = GameObject.Find("SkateboardSpawner");
	
	weapons[10] = GameObject.Find("Torch");
	weapons[11] = GameObject.Find("Flippers");
	weapons[12] = GameObject.Find("Snorkel");
	weapons[13] = GameObject.Find("ParachutePants");*/
	
	
	weaponLoadout=GameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout);
	loadoutGUI=GameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI);

}
	weaponsArray[0]=weapons[0];
	arrayWeaponScripts[0]=arrayWeaponScripts[0];
}


function Start()
{
	AddWeaponsToArray();
	weaponsArray[0].SetActive(true);
  	weapons[1].SetActive(false);
  	weapons[2].SetActive(false);
  	weapons[3].SetActive(false);
  	weapons[4].SetActive(false);
  	weapons[5].SetActive(false);
	arcHolder[0].SetActive(false);
	arcHolder[1].SetActive(false);
	arcHolder[2].SetActive(false);
	arcHolder[3].SetActive(false);
//	quiver.SetActive(false);
	i = 0;
	lastWeapon=3;
	firstWeapon=0;
	weaponsArmed=true;
	//EnableItems();
	if(Application.loadedLevelName=="Dojo")
	{
		i=0;
		inDojo=true;
	}
}

function AddWeaponsToArray()
{
	if(loadoutGUI.cat1SelectedPrev!=21) //if you get an error here with new levels, add the scene to the build.
	{
		weaponsArray[1]=weapons[loadoutGUI.cat1SelectedPrev];
		//if(loadoutGUI.cat1SelectedPrev!=3)
			arrayWeaponScripts[1]=weaponsArray[1].GetComponent(MonoBehaviour);
		//else
		//	arrayWeaponScripts[1]=GameObject.Find("SlingWeapon").GetComponent(MonoBehaviour);
	}
	else
	{	
		weaponsArray[1]=weapons[0];
		arrayWeaponScripts[1]=arrayWeaponScripts[0];
	}
	if(loadoutGUI.cat2SelectedPrev!=21)
	{
		weaponsArray[2]=weapons[loadoutGUI.cat2SelectedPrev];	
		//if(loadoutGUI.cat2SelectedPrev!=2)
			arrayWeaponScripts[2]=weaponsArray[2].GetComponent(MonoBehaviour);
		//else
		//	arrayWeaponScripts[2]=GameObject.Find("SlingWeapon").GetComponent(MonoBehaviour);
	}
	else
	{	
		weaponsArray[2]=weapons[0];
		arrayWeaponScripts[2]=arrayWeaponScripts[0];
	}
	
	if(loadoutGUI.cat3SelectedPrev!=21)
	{
		weaponsArray[3]=weapons[loadoutGUI.cat3SelectedPrev];
		//if(loadoutGUI.cat3SelectedPrev!=3)
			arrayWeaponScripts[3]=weaponsArray[3].GetComponent(MonoBehaviour);
		//else
		//	arrayWeaponScripts[3]=GameObject.Find("SlingWeapon").GetComponent(MonoBehaviour);
	}
	else
	{	
		weaponsArray[3]=weapons[0];
		arrayWeaponScripts[3]=arrayWeaponScripts[0];
	}
}

function Update()
{
	if(!StartMenuScript.inAMenu)
  	{
		//SwitchWeapons();
		CurrentWeapon();
		if(!attacking&&!weaponLoadout.weaponLoadoutMenu&&!GameController.playerController.usingEZBronze&&!RaptorSuitController.usingRaptorSuit&&!inDojo&&!Health.playerIsDead&&!GameController.playerController.usingChute&&!GameController.playerController.startUp&&!GameController.playerController.endGame)
			WeaponSelect();
		ArcToggle();
		CheckIfAttacking();
	}
	currentWeapon=i+1;
	
	if(!GameController.playerController.usingEZBronze)
		SwitchToSpear();
	
	
}

function CurrentWeapon()
{
	wepName=arrayWeaponScripts[i].weaponName;
	if(arrayWeaponScripts[i].ammoCount!=null)
		currentAmmo=arrayWeaponScripts[i].ammoCount;
	
	if(arrayWeaponScripts[i].force!=null)
		force=arrayWeaponScripts[i].force;
}

function WeaponSelect()
{
	if(weaponsArmed)
	{
		if (i>0&&(Input.GetButtonDown("PreviousWeapon")||Input.GetAxis("Mouse ScrollWheel") < 0))
			PrevWeapon();

		if(i < weaponsArray.Count - 1&&(Input.GetButtonDown("NextWeapon")||Input.GetAxis("Mouse ScrollWheel") > 0))
			NextWeapon();
		
		if(currentWeapon==1&&(Input.GetButtonDown("PreviousWeapon")||Input.GetAxis("Mouse ScrollWheel") < 0))
			LastWeapon();
		
		if(currentWeapon==weaponsArray.Count&&(Input.GetButtonDown("NextWeapon")||Input.GetAxis("Mouse ScrollWheel") > 0))
			FirstWeapon();
	}
}

function PrevWeapon()
{

	//if(weaponsArray[i-1].name != weaponsArray[i].name)
	if(!arrayWeaponScripts[i-1].passive&&weaponsArray[i-1].name != weaponsArray[i].name)
 	{
 	//Debug.Log("prev 1");
 		weaponsArray[i-1].transform.position=Vector2(GameController.player.transform.position.x,GameController.player.transform.position.y-.2);
		weaponsArray[i-1].SetActive(true);
		weaponsArray[i].SetActive(false);
		i--;
	}
	else if(i>1&&!arrayWeaponScripts[i-2].passive&&weaponsArray[i-2].name != weaponsArray[i].name)
	{
	//Debug.Log("prev 2");
		weaponsArray[i-2].transform.position=Vector2(GameController.player.transform.position.x,GameController.player.transform.position.y-.2);
		weaponsArray[i-2].SetActive(true);
		weaponsArray[i].SetActive(false);
		i-=2;
	}
	else
	{
		//Debug.Log("going to first from prev");
		FirstWeapon();
		
	}
	
}

function NextWeapon()
{
	//if(weaponsArray[i+1].name != weaponsArray[i].name)
	if(weaponsArray[i+1].name != "Unarmed")
	{
		if(!arrayWeaponScripts[i+1].passive&&weaponsArray[i+1].name != weaponsArray[i].name)
	 	{
	 		//Debug.Log("next 1");
	 		weaponsArray[i+1].transform.position=Vector2(GameController.player.transform.position.x,GameController.player.transform.position.y-.2);
	 		weaponsArray[i+1].SetActive(true);
			weaponsArray[i].SetActive(false);	
	 		i++;
	 	}
		else if((i+2<4)&&!arrayWeaponScripts[i+2].passive&&weaponsArray[i+2].name != weaponsArray[i].name)
		{
			//Debug.Log("next 2");
			weaponsArray[i+2].transform.position=Vector2(GameController.player.transform.position.x,GameController.player.transform.position.y-.2);
			weaponsArray[i+2].SetActive(true);
			weaponsArray[i].SetActive(false);
			i+=2;
		}
		else if((i+3<4)&&!arrayWeaponScripts[i+3].passive&&weaponsArray[i+3].name != weaponsArray[i].name)
		{
	//		//Debug.Log("next 3");
			weaponsArray[i+3].transform.position=Vector2(GameController.player.transform.position.x,GameController.player.transform.position.y-.2);
			weaponsArray[i+3].SetActive(true);
			weaponsArray[i].SetActive(false);
			i+=3;
		}
	//	else if(i+3>4)
	//		FirstWeapon();
		else
		{
			//Debug.Log("going to first");
			FirstWeapon();
		}
	}
	else
		FirstWeapon();
		
}

function FirstWeapon()
{
	////Debug.Log("first");
	if(weaponsArray[firstWeapon].name != weaponsArray[i].name)
 	{
		//Debug.Log("first 1");
		weaponsArray[firstWeapon].SetActive(true);
		weaponsArray[i].SetActive(false);
		i=firstWeapon;
	}
		else if((i+1<4)&&!arrayWeaponScripts[firstWeapon+1].passive&&weaponsArray[firstWeapon+1].name != weaponsArray[i].name)
	{
		//Debug.Log("first 2");
		weaponsArray[firstWeapon+1].SetActive(true);
		weaponsArray[i].SetActive(false);
		i=firstWeapon+1;
	}
	else if((i+2<4)&&!arrayWeaponScripts[firstWeapon+2].passive&&weaponsArray[firstWeapon+2].name != weaponsArray[i].name)
	{
		//Debug.Log("first 3");
		weaponsArray[firstWeapon+2].SetActive(true);
		weaponsArray[i].SetActive(false);
		i=firstWeapon+2;
	}
	else if((i+3<4)&&!arrayWeaponScripts[firstWeapon+3].passive&&weaponsArray[firstWeapon+3].name != weaponsArray[i].name)
	{
		//Debug.Log("first 4");
		weaponsArray[firstWeapon+3].SetActive(true);
		weaponsArray[i].SetActive(false);
		i=firstWeapon+3;
	}
	else
	{
		//Debug.Log("going to last");
		LastWeapon();	
	}
}

function LastWeapon()
{

	if(!arrayWeaponScripts[lastWeapon].passive&&weaponsArray[lastWeapon].name != weaponsArray[i].name)
 	{
 		//Debug.Log("last 1");
 		weaponsArray[lastWeapon].transform.position=Vector2(GameController.player.transform.position.x,GameController.player.transform.position.y-.2);
		weaponsArray[lastWeapon].SetActive(true);
		weaponsArray[i].SetActive(false);
		i=lastWeapon;
	}
	else if(!arrayWeaponScripts[lastWeapon-1].passive&&weaponsArray[lastWeapon-1].name != weaponsArray[i].name)
	{
		//Debug.Log("last 2");
		weaponsArray[lastWeapon-1].SetActive(true);
		weaponsArray[i].SetActive(false);
		i=lastWeapon-1;
	}
	else if(!arrayWeaponScripts[lastWeapon-2].passive&&weaponsArray[lastWeapon-2].name != weaponsArray[i].name)
	{
		//Debug.Log("last 3");
		weaponsArray[lastWeapon-2].SetActive(true);
		weaponsArray[i].SetActive(false);
		i=lastWeapon-2;
	}
	//else
	//	i=i;
}

function ArcToggle()
{

	if(wepName=="Rocks"&&NewRockWeapon.ammoCount>0&&Options.arcTrajectory)
		arcHolder[0].SetActive(true);
	else
		arcHolder[0].SetActive(false);
	
	if((WeaponSelect.wepName=="Stabbing Spear"&&NewSpear.ammoCount==1||wepName=="Throwing Spear"&&NewSpear.ammoCount==1)&&Options.arcTrajectory)
		arcHolder[1].SetActive(true);
	else
		arcHolder[1].SetActive(false);
	
	if(wepName=="Sling"&&SlingScript.ammoCount>0&&force>0&&Options.arcTrajectory)
		arcHolder[2].SetActive(true);
	else
		arcHolder[2].SetActive(false);
	
	if(wepName=="Bow"&&BowScript.ammoCount>0&&force>0&&Options.arcTrajectory)
		arcHolder[3].SetActive(true);
	else
		arcHolder[3].SetActive(false);
}

function CheckIfAttacking()
{
	if(Unarmed.attackingUnarmed||NewSpear.throwingSpear||NewSpear.spearMelee||NewRockWeapon.throwingRock||(BowScript.shootingBow||BowScript.justFired)||SlingScript.shootingSling||SwordWeapon.attackingSword||Unarmed.flyingKick||HangGliderScript.usingGlider)
		attacking=true;
	else
		attacking=false;
}

enum Weapons
{
	UNARMED,
	ROCK,
	SPEAR,
	SWORD,
	BOW,
	SLING,
}

function SwitchToSpear()
{
	if(NewSpear.switchToUnarmed)
	{
		FirstWeapon();
		NewSpear.switchToUnarmed=false;
	}
	if(wepName=="Unarmed")
	{
		if(weaponsArray.Count > 1&&NewSpear.switchToSpear)
		{
			if(weaponsArray[1].name == "SpearWeapon")
			{
				NewSpear.switchToSpear=false;
				i=1;
				weaponsArray[0].SetActive(false);
				weaponsArray[1].SetActive(true);
				weaponsArray[2].SetActive(false);
				weaponsArray[3].SetActive(false);
			}

			else if(weaponsArray[2].name == "SpearWeapon")
			{
				NewSpear.switchToSpear=false;
				i=2;
				weaponsArray[0].SetActive(false);
				weaponsArray[1].SetActive(false);
				weaponsArray[2].SetActive(true);
				weaponsArray[3].SetActive(false);
			}
			
			else if(weaponsArray[3].name == "SpearWeapon")
			{
				NewSpear.switchToSpear=false;
				i=3;
				weaponsArray[0].SetActive(false);
				weaponsArray[1].SetActive(false);
				weaponsArray[2].SetActive(false);
				weaponsArray[3].SetActive(true);
			}
		}
	}
}

