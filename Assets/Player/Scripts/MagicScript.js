//toggle booleans
var toggleUpDown:boolean;
var toggleLeftRight:boolean;

//are you casting?
static var casting:boolean;

var magicScriptArray:MonoBehaviour[];

var magic:MonoBehaviour[];
static var MagicItemZRotation:float;
//static var castSounds:AudioClip[];
//var tempCastSounds:AudioClip[];

var magicSelected:int;
var magicArmed:boolean;

var loadoutGUI:WeaponLoadoutGUI;

function Awake()
{
	loadoutGUI=GameObject.Find("Weapon Loadout").GetComponent(WeaponLoadoutGUI);
}

function Start()
{	
	magicArmed = true;

	magic[0]=magicScriptArray[loadoutGUI.cat4SelectedPrev]; //change to [cat4Select]
	magic[1]=magicScriptArray[loadoutGUI.cat5SelectedPrev]; //change to [cat5Select]
	magic[2]=magicScriptArray[loadoutGUI.cat6SelectedPrev]; //change to [cat6Select]
	magic[3]=magicScriptArray[loadoutGUI.cat7SelectedPrev]; //change to [cat7Select]
	//castSounds = new AudioClip[tempCastSounds.length];
	//for (var i:int; i<tempCastSounds.length; i++)
	//	castSounds[i]=tempCastSounds[i];
}

function Update()
{
	MagicItemZRotation=transform.eulerAngles.z;
	ToggleBooleans();
	if(!StartMenuScript.inAMenu)
		MagicButtons();
		
	if(magicArmed)
	{
		if(!WeaponSelect.attacking&&!CharController.takingDamage&&!Unarmed.flyingKick&&!StartMenuScript.inAMenu&&!CharController.inCover&&!CharController.rolling&&!CharController.grabbingOn&&!HangGliderScript.usingGlider&&!GameController.playerController.freezePlayer&&!GameController.playerController.freezePlayer2&&!Health.playerIsDead&&!GameController.playerController.usingChute&&Application.loadedLevelName!="Dojo"&&!GameController.playerController.endGame)
		{
			if(magic[magicSelected].charges>0||magic[magicSelected].charges==-92)
			{
				if(!magic[magicSelected].needsCharge&&(CharController.magicTriggerDown||Input.GetButtonDown("Magic")))
					magic[magicSelected].UseMagic();
				else if(magic[magicSelected].needsCharge&&(CharController.magicPressed||Input.GetButton("Magic")))
					magic[magicSelected].ChargeMagic();
			}
		}
	
		if(magic[magicSelected].inUse&&!GameController.playerController.knocked)
			casting=true;
		else
			casting=false;
	}
}

function ToggleBooleans()
{
	if(Input.GetAxis("DPadUpDown")==0)
		toggleUpDown=false;
	
	if(Input.GetAxis("DPadLeftRight")==0)
		toggleLeftRight=false;
}

function MagicButtons()
{
	if(!GameController.autoSkateMode)
	{
		if((Input.GetKeyDown("1")||Input.GetAxis("DPadUpDown")>0)&&!toggleUpDown)
		{
			toggleUpDown=true;
			magicSelected=0;
		}
		if((Input.GetKeyDown("2")||Input.GetAxis("DPadLeftRight")>0)&&!toggleLeftRight)
		{
			toggleLeftRight=true;
			magicSelected=1;
		}
		if((Input.GetKeyDown("3")||Input.GetAxis("DPadUpDown")<0)&&!toggleUpDown)
		{
			toggleUpDown=true;
			magicSelected=2;
		}
		if((Input.GetKeyDown("4")||Input.GetAxis("DPadLeftRight")<0)&&!toggleLeftRight)
		{
			toggleLeftRight=true;
			magicSelected=3;
		}
	}
}
