var weaponLoadout:WeaponLoadout;
var bgTexture:Texture2D;
var loadoutTextStyle = new GUIStyle();
var weaponTextures:Texture2D[];
var magicTextures:Texture2D[];
//var weaponStyle = new GUIStyle();
var acceptChangeStyle = new GUIStyle();
var toolTipStyle = new GUIStyle();
var testStyle:GUIStyle;
var testStyle1:GUIStyle;
var testStyle2:GUIStyle;
var testStyle3:GUIStyle;
var testStyle7:GUIStyle;
var testStyle8:GUIStyle;
//var selected:Texture2D;
var catSelected:int;
var poolSelected:int;

var cat1Selected:int;
var cat2Selected:int;
var cat3Selected:int;
var cat4Selected:int;
var cat5Selected:int;
var cat6Selected:int;
var cat7Selected:int;

var poolSelect:boolean;
var catSelect:boolean;

var toggleLeftRight:boolean;
var toggleUpDown:boolean;
var toggleLeftRight2:boolean;
var toggleUpDown2:boolean;

//var rowLength:int;

var cat1SelectedPrev:int;
var cat2SelectedPrev:int;
var cat3SelectedPrev:int;
var cat4SelectedPrev:int;
var cat5SelectedPrev:int;
var cat6SelectedPrev:int;
var cat7SelectedPrev:int;

var recentCatSelected:int;

var guiNameWeps:String[];
var guiNameMagic:String[];

var aButton:Texture2D;
var aButtonText:Texture2D;
var aButtonStyle:GUIStyle;
var bButton:Texture2D;
var bButtonText:Texture2D;
var bButtonStyle:GUIStyle;
var buttonStyle:GUIStyle;

var i:int;

function Awake()
{
	weaponLoadout=GameObject.Find("Weapon Loadout").GetComponent(WeaponLoadout);
}

function Start()
{
	//ItemsToSave.itemsToSave.LoadData();
	poolSelected=1;
	cat1Selected=cat1SelectedPrev;
	cat2Selected=cat2SelectedPrev;
	cat3Selected=cat3SelectedPrev;
	cat4Selected=cat4SelectedPrev;
	cat5Selected=cat5SelectedPrev;
	cat6Selected=cat6SelectedPrev;
	cat7Selected=cat7SelectedPrev;
	poolSelect=true;
	catSelect=false;
	//rowLength=5;
	//i=0;
}

function Update()
{
	GuiCatToolTip();
	ToggleBooleans();
	CategorySelection();
	EnterPool();

	
		
//move up/down through category selection
	if(!catSelect&&weaponLoadout.weaponLoadoutMenu)
	{	
		if(cat1Selected!=0)
			cat1SelectedPrev=cat1Selected;
		if(cat2Selected!=0)
			cat2SelectedPrev=cat2Selected;
		if(cat3Selected!=0)
			cat3SelectedPrev=cat3Selected;
		if(cat4Selected>-1)
			cat4SelectedPrev=cat4Selected;
		if(cat5Selected>-1)
			cat5SelectedPrev=cat5Selected;
		if(cat6Selected>-1)
			cat6SelectedPrev=cat6Selected;
		if(cat7Selected>-1)
			cat7SelectedPrev=cat7Selected;

		if((Input.GetButtonDown("Down")||Input.GetAxis("DPadUpDown")<0||Input.GetAxis("LThumbstick Up/Down")<0)&&poolSelected<7&&!toggleUpDown&&!toggleUpDown2)
		{
			toggleUpDown=true;
			toggleUpDown2=true;
			poolSelected++;
		}
		if((Input.GetButtonDown("Up")||Input.GetAxis("DPadUpDown")>0||Input.GetAxis("LThumbstick Up/Down")>0)&&poolSelected>1&&!toggleUpDown&&!toggleUpDown2)
		{
			toggleUpDown=true;
			toggleUpDown2=true;
			poolSelected--;
		}
	}
	
	WeaponTrueFalse();
	MagicTrueFalse();
	
	if(catSelect&&weaponLoadout.weaponLoadoutMenu)
	{
		if(catSelected==1)
			Category1();
		else if(catSelected==2)
			Category2();
	}
	
	//if(Input.GetButtonDown("Attack"))
	//	MouseUpdate();
}

function GuiCatToolTip()
{
	//if(cat1Selected!=cat1SelectedPrev)
	if(poolSelected==1)
		recentCatSelected=cat1Selected;
	if(poolSelected==2)
		recentCatSelected=cat2Selected;
	if(poolSelected==3)
		recentCatSelected=cat3Selected;
	if(poolSelected==4)
		recentCatSelected=cat4Selected;
	if(poolSelected==5)
		recentCatSelected=cat5Selected;
	if(poolSelected==6)
		recentCatSelected=cat6Selected;
	if(poolSelected==7)
		recentCatSelected=cat7Selected;
}

function CategorySelection()
{
//Category Selection (1 = weapon/items, 2 = magic)	
	if(poolSelected==1||poolSelected==2||poolSelected==3)
		catSelected=1;
	else
		catSelected=2;
}

function EnterPool()
{
//enter that pool's category to select	
	if(Input.GetButtonDown("GUIAccept")&&!catSelect)
	{	
		catSelect=true;
		if(poolSelected==1)
		{
			if(cat1Selected>0)
			{
				cat1SelectedPrev=cat1Selected;
				i=cat1Selected;
			}
			else if(GameController.savedItems.weaponsUnlocked[0]&&(cat2Selected!=1&&cat3Selected!=1))
					i=1;
				else if(GameController.savedItems.weaponsUnlocked[1]&&(cat2Selected!=2&&cat3Selected!=2))
					i=2;
				else if(GameController.savedItems.weaponsUnlocked[2]&&(cat2Selected!=3&&cat3Selected!=3))
					i=3;
				else if(GameController.savedItems.weaponsUnlocked[3]&&(cat2Selected!=4&&cat3Selected!=4))
					i=4;
				else if(GameController.savedItems.weaponsUnlocked[4]&&(cat2Selected!=5&&cat3Selected!=5))
					i=5;
				else if(GameController.savedItems.weaponsUnlocked[5]&&(cat2Selected!=6&&cat3Selected!=6))
					i=6;
				else if(GameController.savedItems.weaponsUnlocked[6]&&(cat2Selected!=7&&cat3Selected!=7))
					i=7;
				else if(GameController.savedItems.weaponsUnlocked[7]&&(cat2Selected!=8&&cat3Selected!=8))
					i=8;
				else if(GameController.savedItems.weaponsUnlocked[8]&&(cat2Selected!=9&&cat3Selected!=9))
					i=9;
				else if(GameController.savedItems.weaponsUnlocked[9]&&(cat2Selected!=10&&cat3Selected!=10))
					i=10;
				else if(GameController.savedItems.weaponsUnlocked[10]&&(cat2Selected!=11&&cat3Selected!=11))
					i=11;
				else if(GameController.savedItems.weaponsUnlocked[11]&&(cat2Selected!=12&&cat3Selected!=12))
					i=12;
				else if(GameController.savedItems.weaponsUnlocked[12]&&(cat2Selected!=13&&cat3Selected!=13))
					i=13;
				else if(GameController.savedItems.weaponsUnlocked[13]&&(cat2Selected!=14&&cat3Selected!=14))
					i=14;
				else if(GameController.savedItems.weaponsUnlocked[14]&&(cat2Selected!=15&&cat3Selected!=15))
					i=15;
				else if(GameController.savedItems.weaponsUnlocked[15]&&(cat2Selected!=16&&cat3Selected!=16))
					i=16;
			/*	else if(GameController.savedItems.weaponsUnlocked[16]&&(cat2Selected!=17&&cat3Selected!=17))
					i=17;
				else if(GameController.savedItems.weaponsUnlocked[17]&&(cat2Selected!=18&&cat3Selected!=18))
					i=18;
				else if(GameController.savedItems.weaponsUnlocked[18]&&(cat2Selected!=19&&cat3Selected!=19))
					i=19;
				else if(GameController.savedItems.weaponsUnlocked[19]&&(cat2Selected!=20&&cat3Selected!=20))
					i=20;*/
				else
					i=21;
		}
		if(poolSelected==2)
		{
			if(cat2Selected>0)
			{
				cat2SelectedPrev=cat2Selected;
				i=cat2Selected;
			}
			else if(GameController.savedItems.weaponsUnlocked[0]&&(cat1Selected!=1&&cat3Selected!=1))
					i=1;
				else if(GameController.savedItems.weaponsUnlocked[1]&&(cat1Selected!=2&&cat3Selected!=2))
					i=2;
				else if(GameController.savedItems.weaponsUnlocked[2]&&(cat1Selected!=3&&cat3Selected!=3))
					i=3;
				else if(GameController.savedItems.weaponsUnlocked[3]&&(cat1Selected!=4&&cat3Selected!=4))
					i=4;
				else if(GameController.savedItems.weaponsUnlocked[4]&&(cat1Selected!=5&&cat3Selected!=5))
					i=5;
				else if(GameController.savedItems.weaponsUnlocked[5]&&(cat1Selected!=6&&cat3Selected!=6))
					i=6;
				else if(GameController.savedItems.weaponsUnlocked[6]&&(cat1Selected!=7&&cat3Selected!=7))
					i=7;
				else if(GameController.savedItems.weaponsUnlocked[7]&&(cat1Selected!=8&&cat3Selected!=8))
					i=8;
				else if(GameController.savedItems.weaponsUnlocked[8]&&(cat1Selected!=9&&cat3Selected!=9))
					i=9;
				else if(GameController.savedItems.weaponsUnlocked[9]&&(cat1Selected!=10&&cat3Selected!=10))
					i=10;
				else if(GameController.savedItems.weaponsUnlocked[10]&&(cat1Selected!=11&&cat3Selected!=11))
					i=11;
				else if(GameController.savedItems.weaponsUnlocked[11]&&(cat1Selected!=12&&cat3Selected!=12))
					i=12;
				else if(GameController.savedItems.weaponsUnlocked[12]&&(cat1Selected!=13&&cat3Selected!=13))
					i=13;
				else if(GameController.savedItems.weaponsUnlocked[13]&&(cat1Selected!=14&&cat3Selected!=14))
					i=14;
				else if(GameController.savedItems.weaponsUnlocked[14]&&(cat1Selected!=15&&cat3Selected!=15))
					i=15;
				else if(GameController.savedItems.weaponsUnlocked[15]&&(cat1Selected!=16&&cat3Selected!=16))
					i=16;
				/*else if(GameController.savedItems.weaponsUnlocked[16]&&(cat1Selected!=17&&cat3Selected!=17))
					i=17;
				else if(GameController.savedItems.weaponsUnlocked[17]&&(cat1Selected!=18&&cat3Selected!=18))
					i=18;
				else if(GameController.savedItems.weaponsUnlocked[18]&&(cat1Selected!=19&&cat3Selected!=19))
					i=19;
				else if(GameController.savedItems.weaponsUnlocked[19]&&(cat1Selected!=20&&cat3Selected!=20))
					i=20;*/
				else
					i=21;
		}
		if(poolSelected==3)
		{
			if(cat3Selected>0)
			{
				cat3SelectedPrev=cat3Selected;
				i=cat3Selected;
			}
			else if(GameController.savedItems.weaponsUnlocked[0]&&(cat1Selected!=1&&cat2Selected!=1))
					i=1;
				else if(GameController.savedItems.weaponsUnlocked[1]&&(cat1Selected!=2&&cat2Selected!=2))
					i=2;
				else if(GameController.savedItems.weaponsUnlocked[2]&&(cat1Selected!=3&&cat2Selected!=3))
					i=3;
				else if(GameController.savedItems.weaponsUnlocked[3]&&(cat1Selected!=4&&cat2Selected!=4))
					i=4;
				else if(GameController.savedItems.weaponsUnlocked[4]&&(cat1Selected!=5&&cat2Selected!=5))
					i=5;
				else if(GameController.savedItems.weaponsUnlocked[5]&&(cat1Selected!=6&&cat2Selected!=6))
					i=6;
				else if(GameController.savedItems.weaponsUnlocked[6]&&(cat1Selected!=7&&cat2Selected!=7))
					i=7;
				else if(GameController.savedItems.weaponsUnlocked[7]&&(cat1Selected!=8&&cat2Selected!=8))
					i=8;
				else if(GameController.savedItems.weaponsUnlocked[8]&&(cat1Selected!=9&&cat2Selected!=9))
					i=9;
				else if(GameController.savedItems.weaponsUnlocked[9]&&(cat1Selected!=10&&cat2Selected!=10))
					i=10;
				else if(GameController.savedItems.weaponsUnlocked[10]&&(cat1Selected!=11&&cat2Selected!=11))
					i=11;
				else if(GameController.savedItems.weaponsUnlocked[11]&&(cat1Selected!=12&&cat2Selected!=12))
					i=12;
				else if(GameController.savedItems.weaponsUnlocked[12]&&(cat1Selected!=13&&cat2Selected!=13))
					i=13;
				else if(GameController.savedItems.weaponsUnlocked[13]&&(cat1Selected!=14&&cat2Selected!=14))
					i=14;
				else if(GameController.savedItems.weaponsUnlocked[14]&&(cat1Selected!=15&&cat2Selected!=15))
					i=15;
				else if(GameController.savedItems.weaponsUnlocked[15]&&(cat1Selected!=16&&cat2Selected!=16))
					i=16;
				/*else if(GameController.savedItems.weaponsUnlocked[16]&&(cat1Selected!=17&&cat2Selected!=17))
					i=17;
				else if(GameController.savedItems.weaponsUnlocked[17]&&(cat1Selected!=18&&cat2Selected!=18))
					i=18;
				else if(GameController.savedItems.weaponsUnlocked[18]&&(cat1Selected!=19&&cat2Selected!=19))
					i=19;
				else if(GameController.savedItems.weaponsUnlocked[19]&&(cat1Selected!=20&&cat2Selected!=20))
					i=20;*/
				else
					i=21;
		}
		
	//magic pool 1
		if(poolSelected==4)
		{
			if(cat4Selected>-1)
			{
				cat4SelectedPrev=cat4Selected;
				i=cat4Selected;
			}
			else if(GameController.savedItems.magicUnlocked[0]&&(cat5Selected!=0&&cat6Selected!=0&&cat7Selected!=0))
					i=1;
				else if(GameController.savedItems.magicUnlocked[1]&&(cat5Selected!=1&&cat6Selected!=1&&cat7Selected!=1))
					i=2;
				else if(GameController.savedItems.magicUnlocked[2]&&(cat5Selected!=2&&cat6Selected!=2&&cat7Selected!=2))
					i=3;
				else if(GameController.savedItems.magicUnlocked[3]&&(cat5Selected!=3&&cat6Selected!=3&&cat7Selected!=3))
					i=4;
				else if(GameController.savedItems.magicUnlocked[4]&&(cat5Selected!=4&&cat6Selected!=4&&cat7Selected!=4))
					i=5;
				else if(GameController.savedItems.magicUnlocked[5]&&(cat5Selected!=5&&cat6Selected!=5&&cat7Selected!=5))
					i=6;
				else if(GameController.savedItems.magicUnlocked[6]&&(cat5Selected!=6&&cat6Selected!=6&&cat7Selected!=6))
					i=7;
				else if(GameController.savedItems.magicUnlocked[7]&&(cat5Selected!=7&&cat6Selected!=7&&cat7Selected!=7))
					i=8;
				else if(GameController.savedItems.magicUnlocked[8]&&(cat5Selected!=8&&cat6Selected!=8&&cat7Selected!=8))
					i=9;
				else if(GameController.savedItems.magicUnlocked[9]&&(cat5Selected!=9&&cat6Selected!=9&&cat7Selected!=9))
					i=10;
				else if(GameController.savedItems.magicUnlocked[10]&&(cat5Selected!=10&&cat6Selected!=10&&cat7Selected!=10))
					i=11;
				else if(GameController.savedItems.magicUnlocked[11]&&(cat5Selected!=11&&cat6Selected!=11&&cat7Selected!=11))
					i=12;
				else if(GameController.savedItems.magicUnlocked[12]&&(cat5Selected!=12&&cat6Selected!=12&&cat7Selected!=12))
					i=13;
				else if(GameController.savedItems.magicUnlocked[13]&&(cat5Selected!=13&&cat6Selected!=13&&cat7Selected!=13))
					i=14;
				else if(GameController.savedItems.magicUnlocked[14]&&(cat5Selected!=14&&cat6Selected!=14&&cat7Selected!=14))
					i=15;
				else if(GameController.savedItems.magicUnlocked[15]&&(cat5Selected!=15&&cat6Selected!=15&&cat7Selected!=15))
					i=16;

/*				else if(GameController.savedItems.magicUnlocked[16]&&(cat5Selected!=17&&cat6Selected!=17))
					i=17;
				else if(GameController.savedItems.magicUnlocked[17]&&(cat5Selected!=18&&cat6Selected!=18))
					i=18;
				else if(GameController.savedItems.magicUnlocked[18]&&(cat5Selected!=19&&cat6Selected!=19))
					i=19;
				else if(GameController.savedItems.magicUnlocked[19]&&(cat5Selected!=20&&cat6Selected!=20))
					i=20;
*/
				else
					i=21;
		}
	//magic pool 2
		if(poolSelected==5)
		{
			if(cat5Selected>-1)
			{
				cat5SelectedPrev=cat5Selected;
				i=cat5Selected;
			}
			else if(GameController.savedItems.magicUnlocked[0]&&(cat4Selected!=0&&cat6Selected!=0&&cat7Selected!=0))
					i=1;
				else if(GameController.savedItems.magicUnlocked[1]&&(cat4Selected!=1&&cat6Selected!=1&&cat7Selected!=1))
					i=2;
				else if(GameController.savedItems.magicUnlocked[2]&&(cat4Selected!=2&&cat6Selected!=2&&cat7Selected!=2))
					i=3;
				else if(GameController.savedItems.magicUnlocked[3]&&(cat4Selected!=3&&cat6Selected!=3&&cat7Selected!=3))
					i=4;
				else if(GameController.savedItems.magicUnlocked[4]&&(cat4Selected!=4&&cat6Selected!=4&&cat7Selected!=4))
					i=5;
				else if(GameController.savedItems.magicUnlocked[5]&&(cat4Selected!=5&&cat6Selected!=5&&cat7Selected!=5))
					i=6;
				else if(GameController.savedItems.magicUnlocked[6]&&(cat4Selected!=6&&cat6Selected!=6&&cat7Selected!=6))
					i=7;
				else if(GameController.savedItems.magicUnlocked[7]&&(cat4Selected!=7&&cat6Selected!=7&&cat7Selected!=7))
					i=8;
				else if(GameController.savedItems.magicUnlocked[8]&&(cat4Selected!=8&&cat6Selected!=8&&cat7Selected!=8))
					i=9;
				else if(GameController.savedItems.magicUnlocked[9]&&(cat4Selected!=9&&cat6Selected!=9&&cat7Selected!=9))
					i=10;
				else if(GameController.savedItems.magicUnlocked[10]&&(cat4Selected!=10&&cat6Selected!=10&&cat7Selected!=10))
					i=11;
				else if(GameController.savedItems.magicUnlocked[11]&&(cat4Selected!=11&&cat6Selected!=11&&cat7Selected!=11))
					i=12;
				else if(GameController.savedItems.magicUnlocked[12]&&(cat4Selected!=12&&cat6Selected!=12&&cat7Selected!=12))
					i=13;
				else if(GameController.savedItems.magicUnlocked[13]&&(cat4Selected!=13&&cat6Selected!=13&&cat7Selected!=13))
					i=14;
				else if(GameController.savedItems.magicUnlocked[14]&&(cat4Selected!=14&&cat6Selected!=14&&cat7Selected!=14))
					i=15;
				else if(GameController.savedItems.magicUnlocked[15]&&(cat4Selected!=15&&cat6Selected!=15&&cat7Selected!=15))
					i=16;

/*				else if(GameController.savedItems.magicUnlocked[16]&&(cat4Selected!=17&&cat6Selected!=17))
					i=17;
				else if(GameController.savedItems.magicUnlocked[17]&&(cat4Selected!=18&&cat6Selected!=18))
					i=18;
				else if(GameController.savedItems.magicUnlocked[18]&&(cat4Selected!=19&&cat6Selected!=19))
					i=19;
				else if(GameController.savedItems.magicUnlocked[19]&&(cat4Selected!=20&&cat6Selected!=20))
					i=20;
*/
				else
					i=21;
		}
		
	//magic pool 3
		if(poolSelected==6)
		{
			if(cat6Selected>-1)
			{
				cat6SelectedPrev=cat6Selected;
				i=cat6Selected;
			}
			else if(GameController.savedItems.magicUnlocked[0]&&(cat4Selected!=0&&cat5Selected!=0&&cat7Selected!=0))
					i=1;
				else if(GameController.savedItems.magicUnlocked[1]&&(cat4Selected!=1&&cat5Selected!=1&&cat7Selected!=1))
					i=2;
				else if(GameController.savedItems.magicUnlocked[2]&&(cat4Selected!=2&&cat5Selected!=2&&cat7Selected!=2))
					i=3;
				else if(GameController.savedItems.magicUnlocked[3]&&(cat4Selected!=3&&cat5Selected!=3&&cat7Selected!=3))
					i=4;
				else if(GameController.savedItems.magicUnlocked[4]&&(cat4Selected!=4&&cat5Selected!=4&&cat7Selected!=4))
					i=5;
				else if(GameController.savedItems.magicUnlocked[5]&&(cat4Selected!=5&&cat5Selected!=5&&cat7Selected!=5))
					i=6;
				else if(GameController.savedItems.magicUnlocked[6]&&(cat4Selected!=6&&cat5Selected!=6&&cat7Selected!=6))
					i=7;
				else if(GameController.savedItems.magicUnlocked[7]&&(cat4Selected!=7&&cat5Selected!=7&&cat7Selected!=7))
					i=8;
				else if(GameController.savedItems.magicUnlocked[8]&&(cat4Selected!=8&&cat5Selected!=8&&cat7Selected!=8))
					i=9;
				else if(GameController.savedItems.magicUnlocked[9]&&(cat4Selected!=9&&cat5Selected!=9&&cat7Selected!=9))
					i=10;
				else if(GameController.savedItems.magicUnlocked[10]&&(cat4Selected!=10&&cat5Selected!=10&&cat7Selected!=10))
					i=11;
				else if(GameController.savedItems.magicUnlocked[11]&&(cat4Selected!=11&&cat5Selected!=11&&cat7Selected!=11))
					i=12;
				else if(GameController.savedItems.magicUnlocked[12]&&(cat4Selected!=12&&cat5Selected!=12&&cat7Selected!=12))
					i=13;
				else if(GameController.savedItems.magicUnlocked[13]&&(cat4Selected!=13&&cat5Selected!=13&&cat7Selected!=13))
					i=14;
				else if(GameController.savedItems.magicUnlocked[14]&&(cat4Selected!=14&&cat5Selected!=14&&cat7Selected!=14))
					i=15;
				else if(GameController.savedItems.magicUnlocked[15]&&(cat4Selected!=15&&cat5Selected!=15&&cat7Selected!=15))
					i=16;
				else
					i=21;
		}
		
		//magic pool 4
		if(poolSelected==7)
		{
			if(cat7Selected>-1)
			{
				cat7SelectedPrev=cat7Selected;
				i=cat7Selected;
			}
			else if(GameController.savedItems.magicUnlocked[0]&&(cat4Selected!=0&&cat5Selected!=0&&cat6Selected!=0))
					i=1;
				else if(GameController.savedItems.magicUnlocked[1]&&(cat4Selected!=1&&cat5Selected!=1&&cat6Selected!=1))
					i=2;
				else if(GameController.savedItems.magicUnlocked[2]&&(cat4Selected!=2&&cat5Selected!=2&&cat6Selected!=2))
					i=3;
				else if(GameController.savedItems.magicUnlocked[3]&&(cat4Selected!=3&&cat5Selected!=3&&cat6Selected!=3))
					i=4;
				else if(GameController.savedItems.magicUnlocked[4]&&(cat4Selected!=4&&cat5Selected!=4&&cat6Selected!=4))
					i=5;
				else if(GameController.savedItems.magicUnlocked[5]&&(cat4Selected!=5&&cat5Selected!=5&&cat6Selected!=5))
					i=6;
				else if(GameController.savedItems.magicUnlocked[6]&&(cat4Selected!=6&&cat5Selected!=6&&cat6Selected!=6))
					i=7;
				else if(GameController.savedItems.magicUnlocked[7]&&(cat4Selected!=7&&cat5Selected!=7&&cat6Selected!=7))
					i=8;
				else if(GameController.savedItems.magicUnlocked[8]&&(cat4Selected!=8&&cat5Selected!=8&&cat6Selected!=8))
					i=9;
				else if(GameController.savedItems.magicUnlocked[9]&&(cat4Selected!=9&&cat5Selected!=9&&cat6Selected!=9))
					i=10;
				else if(GameController.savedItems.magicUnlocked[10]&&(cat4Selected!=10&&cat5Selected!=10&&cat6Selected!=10))
					i=11;
				else if(GameController.savedItems.magicUnlocked[11]&&(cat4Selected!=11&&cat5Selected!=11&&cat6Selected!=11))
					i=12;
				else if(GameController.savedItems.magicUnlocked[12]&&(cat4Selected!=12&&cat5Selected!=12&&cat6Selected!=12))
					i=13;
				else if(GameController.savedItems.magicUnlocked[13]&&(cat4Selected!=13&&cat5Selected!=13&&cat6Selected!=13))
					i=14;
				else if(GameController.savedItems.magicUnlocked[14]&&(cat4Selected!=14&&cat5Selected!=14&&cat6Selected!=14))
					i=15;
				else if(GameController.savedItems.magicUnlocked[15]&&(cat4Selected!=15&&cat5Selected!=15&&cat6Selected!=15))
					i=16;
				else
					i=21;
		}
	
		
	}
	else if(catSelect&&Input.GetButtonDown("GUIAccept"))
	{
		if(poolSelected==1)
			cat1SelectedPrev=cat1Selected;
		if(poolSelected==2)	
			cat2SelectedPrev=cat2Selected;
		if(poolSelected==3)	
			cat3SelectedPrev=cat3Selected;
		if(poolSelected==4)	
			cat4SelectedPrev=cat4Selected;
		if(poolSelected==5)	
			cat5SelectedPrev=cat5Selected;
		if(poolSelected==6)	
			cat6SelectedPrev=cat6Selected;
		if(poolSelected==7)	
			cat7SelectedPrev=cat7Selected;
		
		catSelect=false;
	}
	
	else if(Input.GetKeyDown("joystick button 1")&&catSelect)
	{
		//ItemsToSave.itemsToSave.LoadLoadoutData();
		catSelect=false;
		cat1Selected=cat1SelectedPrev;
		cat2Selected=cat2SelectedPrev;
		cat3Selected=cat3SelectedPrev;
		//magic
		cat4Selected=cat4SelectedPrev;
		cat5Selected=cat5SelectedPrev;
		cat6Selected=cat6SelectedPrev;
		cat7Selected=cat7SelectedPrev;
	}
	else if(Input.GetKeyDown("joystick button 1")&&!catSelect)
	{
		if(weaponLoadout.weaponLoadoutMenu)
		{
			ItemsToSave.itemsToSave.SaveToFile();
			weaponLoadout.weaponLoadoutMenu=false;
		}
	}
}


/*function MouseUpdate()
{
	catSelect=false;
}
*/

function ToggleBooleans()
{
	if(Input.GetAxis("DPadUpDown")==0)
		toggleUpDown=false;
	
	if(Input.GetAxis("DPadLeftRight")==0)
		toggleLeftRight=false;
	
	if(Input.GetAxis("LThumbstick Up/Down")==0)
		toggleUpDown2=false;

	if(Input.GetAxis("LThumbstick Left/Right")==0)
		toggleLeftRight2=false;
}

function OnGUI()
{
	GUI.matrix = Matrix4x4.TRS (Vector3(0f, 0f, 0f), Quaternion.identity, Vector3 (ScreenSize.X, ScreenSize.Y, 1f));
	GUI.depth=11;
	
	if(recentCatSelected>0&&catSelected==1)
		GUI.FocusControl(guiNameWeps[recentCatSelected-1]);
	else if(catSelected==2)
		GUI.FocusControl(guiNameMagic[recentCatSelected]);


	if(weaponLoadout.weaponLoadoutMenu)
	{
	//	testStyle.onNormal.background=selected;
	//	testStyle.overflow.left=ScreenSize.X*42;
	//	testStyle.overflow.right=ScreenSize.X*42;
	//	testStyle.overflow.top=ScreenSize.Y*42;
	//	testStyle.overflow.bottom=ScreenSize.Y*42;
	//	testStyle.alignment=TextAnchor.MiddleCenter;
		
		//Gui Background
		//GUI.DrawTexture(Rect(Screen.width/2, Screen.height/2, ScreenSize.X*1404, ScreenSize.Y*1087), guiTexture);
		GUI.DrawTexture(Rect(0, 0, 1920, 1200), bgTexture);
	//Pool
		//Slot 1
		if((poolSelected==1&&catSelect)&&GUI.Button(Rect(355, 170, 114, 114), GUIContent(weaponTextures[cat1SelectedPrev]),testStyle1))
			poolSelected=1;
		else if((poolSelected==1&&!catSelect)&&GUI.Button(Rect(355, 170, 114, 114), GUIContent(weaponTextures[cat1SelectedPrev]),testStyle3))
			poolSelected=1;
		else if((poolSelected!=1)&&GUI.Button(Rect(355, 170, 114, 114), GUIContent(weaponTextures[cat1SelectedPrev]),testStyle2))
			poolSelected=1;
		if(poolSelected!=1)
			GUI.Button(Rect(355, 170, 114, 114), GUIContent(),testStyle7);		
		//Slot 2
		if((poolSelected==2&&catSelect)&&GUI.Button(Rect(355, 297, 114, 114), GUIContent(weaponTextures[cat2SelectedPrev]),testStyle1))
			poolSelected=2;
		else if((poolSelected==2&&!catSelect)&&GUI.Button(Rect(355, 297, 114, 114), GUIContent(weaponTextures[cat2SelectedPrev]),testStyle3))
			poolSelected=2;
		else if((poolSelected!=2)&&GUI.Button(Rect(355, 297, 114, 114), GUIContent(weaponTextures[cat2SelectedPrev]),testStyle2))
			poolSelected=2;
		if(poolSelected!=2)
			GUI.Button(Rect(355, 297, 114, 114), GUIContent(),testStyle7);		
		//Slot 3
		if((poolSelected==3&&catSelect)&&GUI.Button(Rect(355, 424, 114, 114), GUIContent(weaponTextures[cat3SelectedPrev]),testStyle1))
			poolSelected=3;
		else if((poolSelected==3&&!catSelect)&&GUI.Button(Rect(355, 424, 114, 114), GUIContent(weaponTextures[cat3SelectedPrev]),testStyle3))
			poolSelected=3;
		else if((poolSelected!=3)&&GUI.Button(Rect(355, 424, 114, 114), GUIContent(weaponTextures[cat3SelectedPrev]),testStyle2))
			poolSelected=3;
		if(poolSelected!=3)
			GUI.Button(Rect(355, 424, 114, 114), GUIContent(),testStyle7);		
		//Magic 1
		if((poolSelected==4&&catSelect)&&GUI.Button(Rect(355, 551, 114, 114), GUIContent(magicTextures[cat4SelectedPrev]),testStyle1))
			poolSelected=4;
		else if((poolSelected==4&&!catSelect)&&GUI.Button(Rect(355, 551, 114, 114), GUIContent(magicTextures[cat4SelectedPrev]),testStyle3))
			poolSelected=4;
		else if((poolSelected!=4)&&GUI.Button(Rect(355, 551, 114, 114), GUIContent(magicTextures[cat4SelectedPrev]),testStyle2))
			poolSelected=4;
		if(poolSelected!=4)
			GUI.Button(Rect(355, 551, 114, 114), GUIContent(),testStyle7);		
		//Magic 2
		if((poolSelected==5&&catSelect)&&GUI.Button(Rect(355, 678, 114, 114), GUIContent(magicTextures[cat5SelectedPrev]),testStyle1))
			poolSelected=5;
		else if((poolSelected==5&&!catSelect)&&GUI.Button(Rect(355, 678, 114, 114), GUIContent(magicTextures[cat5SelectedPrev]),testStyle3))
			poolSelected=5;
		else if((poolSelected!=5)&&GUI.Button(Rect(355, 678, 114, 114), GUIContent(magicTextures[cat5SelectedPrev]),testStyle2))
			poolSelected=5;
		if(poolSelected!=5)
			GUI.Button(Rect(355, 678, 114, 114), GUIContent(),testStyle7);		
		//Magic 3
		if((poolSelected==6&&catSelect)&&GUI.Button(Rect(355, 805, 114, 114), GUIContent(magicTextures[cat6SelectedPrev]),testStyle1))
			poolSelected=6;
		else if((poolSelected==6&&!catSelect)&&GUI.Button(Rect(355, 805, 114, 114), GUIContent(magicTextures[cat6SelectedPrev]),testStyle3))
			poolSelected=6;
		else if((poolSelected!=6)&&GUI.Button(Rect(355, 805, 114, 114), GUIContent(magicTextures[cat6SelectedPrev]),testStyle2))
			poolSelected=6;
		if(poolSelected!=6)
			GUI.Button(Rect(355, 805, 114, 114), GUIContent(),testStyle7);		
		//Magic 4
		if((poolSelected==7&&catSelect)&&GUI.Button(Rect(355, 932, 114, 114), GUIContent(magicTextures[cat7SelectedPrev]),testStyle1))
			poolSelected=7;
		else if((poolSelected==7&&!catSelect)&&GUI.Button(Rect(355, 932, 114, 114), GUIContent(magicTextures[cat7SelectedPrev]),testStyle3))
			poolSelected=7;
		else if((poolSelected!=7)&&GUI.Button(Rect(355, 932, 114, 114), GUIContent(magicTextures[cat7SelectedPrev]),testStyle2))
			poolSelected=7;
		if(poolSelected!=7)
			GUI.Button(Rect(355, 932, 114, 114), GUIContent(),testStyle7);		
		
//Begin Pool 1
		if(catSelected==1&&poolSelected==1)
		{
	//Pool 1 Line 1
		//wep 1
			if(GameController.savedItems.weaponsUnlocked[0])
			{
				GUI.SetNextControlName ("Rocks");
				if(catSelect&&cat1Selected==1)
				{	
					if(GUI.Button(Rect(496, 170, 114, 114), GUIContent(weaponTextures[1], "Rocks-\n\nPummel your enemies with these easy to find throwing weapons.\n\nYou can often dig them out of the ground should you run out."),testStyle)&&!weaponLoadout.useRocks)
					cat1Selected=1;
				}
				else
				{
					if(GUI.Button(Rect(496, 170, 114, 114), GUIContent(weaponTextures[1], "Rocks-\n\nPummel your enemies with these easy to find throwing weapons.\n\nYou can often dig them out of the ground should you run out."),testStyle2)&&!weaponLoadout.useRocks)
						cat1Selected=1;
					GUI.Button(Rect(496, 170, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(496, 170, 114, 114), GUIContent(), testStyle8);
				
		//wep 2
			if(GameController.savedItems.weaponsUnlocked[1])
			{
				GUI.SetNextControlName ("Spear");
				if(catSelect&&cat1Selected==2)
				{
					if(GUI.Button(Rect(623, 170, 114, 114), GUIContent(weaponTextures[2], "Spear-\n\nA diverse weapon that can either be thrown (and picked back up), used as a stabbing weapon, or even doubles as a PoleVault for gapping large chasms."),testStyle)&&!weaponLoadout.useSpear)
					cat1Selected=2;
				}
					else
				{
					if(GUI.Button(Rect(623, 170, 114, 114), GUIContent(weaponTextures[2], "Spear-\n\nA diverse weapon that can either be thrown (and picked back up), used as a stabbing weapon, or even doubles as a PoleVault for gapping large chasms."),testStyle2)&&!weaponLoadout.useSpear)
						cat1Selected=2;
					GUI.Button(Rect(623, 170, 114, 114), GUIContent(),testStyle7);
				}
						
			}
			else
				GUI.Button(Rect(623, 170, 114, 114), GUIContent(), testStyle8);
		//wep 3
			if(GameController.savedItems.weaponsUnlocked[2])
			{
				GUI.SetNextControlName ("Sling");
				if(catSelect&&cat1Selected==3)
				{
					if(GUI.Button(Rect(750, 170, 114, 114), GUIContent(weaponTextures[3], "Sling-\n\nA traditional Slingshot type projectile weapon that can use different types of ammo."),testStyle)&&!weaponLoadout.useSling)
					cat1Selected=3;
				}
				
				else
				{
					if(GUI.Button(Rect(750, 170, 114, 114), GUIContent(weaponTextures[3], "Sling-\n\nA traditional Slingshot type projectile weapon that can use different types of ammo."),testStyle2)&&!weaponLoadout.useSling)
						cat1Selected=3;
					GUI.Button(Rect(750, 170, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(750, 170, 114, 114), GUIContent(), testStyle8);
		//wep 4
			if(GameController.savedItems.weaponsUnlocked[3])
			{
				
				if(catSelect&&cat1Selected==4)
				{
				GUI.SetNextControlName ("Bow");
					if(GUI.Button(Rect(877, 170, 114, 114), GUIContent(weaponTextures[4], "Bow-\n\nFrom deadly piercing arrows to climbable rope arrows and more, every Hunter should be familiar with this weapon."),testStyle)&&!weaponLoadout.useBow)
						cat1Selected=4;
				}
				else
				{
					if(GUI.Button(Rect(877, 170, 114, 114), GUIContent(weaponTextures[4], "Bow-\n\nFrom deadly piercing arrows to climbable rope arrows and more, every Hunter should be familiar with this weapon."),testStyle2)&&!weaponLoadout.useBow)
						cat1Selected=4;
					GUI.Button(Rect(877, 170, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(877, 170, 114, 114), GUIContent(), testStyle8);
		//wep 5	
			if(GameController.savedItems.weaponsUnlocked[4])
			{	
				GUI.SetNextControlName ("Sword");
				if(catSelect&&cat1Selected==5)
				{	
					if(GUI.Button(Rect(1001, 170, 114, 114), GUIContent(weaponTextures[5], "Sword-\n\nAn absolutely devastating force of destruction that is capable of cleaving several enemies at a time."),testStyle)&&!weaponLoadout.useSword)
						cat1Selected=5;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 170, 114, 114), GUIContent(weaponTextures[5], "Sword-\n\nAn absolutely devastating force of destruction that is capable of cleaving several enemies at a time."),testStyle2)&&!weaponLoadout.useSword)
						cat1Selected=5;
					GUI.Button(Rect(1001, 170, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(1001, 170, 114, 114), GUIContent(), testStyle8);
	//Pool 1 Line 2
		//Item 1	
			if(GameController.savedItems.weaponsUnlocked[5])
			{
				GUI.SetNextControlName ("Item1");
				if(catSelect&&cat1Selected==6)
				{	
					if(GUI.Button(Rect(496, 297, 114, 114), GUIContent(weaponTextures[6], "Dino Bites-\n\nYummm. Your favorite meat-flavored gummy snack.\n\nRestores all health upon use."),testStyle)&&!weaponLoadout.useItem[0])
						cat1Selected=6;
				}
				else
				{	
					if(GUI.Button(Rect(496, 297, 114, 114), GUIContent(weaponTextures[6], "Dino Bites-\n\nYummm. Your favorite meat-flavored gummy snack.\n\nRestores all health upon use."),testStyle2)&&!weaponLoadout.useItem[0])
						cat1Selected=6;
					GUI.Button(Rect(496, 297, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(496, 297, 114, 114), GUIContent(), testStyle8);
		//Item 2
			if(GameController.savedItems.weaponsUnlocked[6])
			{	
				GUI.SetNextControlName ("Item2");
				if(catSelect&&cat1Selected==7)
				{	
					if(GUI.Button(Rect(623, 297, 114, 114), GUIContent(weaponTextures[7], "Quiver-\n\nA hand made quiver to hold your arrows.\n\nDoubles your ammo capacity for all Bow & Arrow ammo types."),testStyle)&&!weaponLoadout.useItem[1])
						cat1Selected=7;
				}
				else
				{	
					if(GUI.Button(Rect(623, 297, 114, 114), GUIContent(weaponTextures[7], "Quiver-\n\nA hand made quiver to hold your arrows.\n\nDoubles your ammo capacity for all Bow & Arrow ammo types."),testStyle2)&&!weaponLoadout.useItem[1])
						cat1Selected=7;
					GUI.Button(Rect(623, 297, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(623, 297, 114, 114), GUIContent(), testStyle8);			
		//Item 3
			if(GameController.savedItems.weaponsUnlocked[7])
			{	
				GUI.SetNextControlName ("Item3");
				if(catSelect&&cat1Selected==8)
				{	
					if(GUI.Button(Rect(750, 297, 114, 114), GUIContent(weaponTextures[8], "Skateboard-\n\nWhether it's slaying in style or a hasty getaway you're after, the Skateboard is a good choice."),testStyle)&&!weaponLoadout.useItem[2])
						cat1Selected=8;
				}
				else
				{	
					if(GUI.Button(Rect(750, 297, 114, 114), GUIContent(weaponTextures[8], "Skateboard-\n\nWhether it's slaying in style or a hasty getaway you're after, the Skateboard is a good choice."),testStyle2)&&!weaponLoadout.useItem[2])
						cat1Selected=8;
					GUI.Button(Rect(750, 297, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(750, 297, 114, 114), GUIContent(), testStyle8);

		//Item 4
			if(GameController.savedItems.weaponsUnlocked[8])
			{	
				GUI.SetNextControlName ("Item4");
				if(catSelect&&cat1Selected==9)
				{	
					if(GUI.Button(Rect(877, 297, 114, 114), GUIContent(weaponTextures[9], "EZ Bronze-\n\nBecome one with your inner Karate Master.\n\nQuad Damage on all unarmed strikes for a limited time."),testStyle)&&!weaponLoadout.useItem[3])
						cat1Selected=9;
				}
				else
				{	
					if(GUI.Button(Rect(877, 297, 114, 114), GUIContent(weaponTextures[9], "EZ Bronze-\n\nBecome one with your inner Karate Master.\n\nQuad Damage on all unarmed strikes for a limited time."),testStyle2)&&!weaponLoadout.useItem[3])
						cat1Selected=9;
					GUI.Button(Rect(877, 297, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(877, 297, 114, 114), GUIContent(), testStyle8);			
		
		//Item 5
			if(GameController.savedItems.weaponsUnlocked[9])
			{	
				GUI.SetNextControlName ("Item5");
				if(catSelect&&cat1Selected==10)
				{	
					if(GUI.Button(Rect(1001, 297, 114, 114), GUIContent(weaponTextures[10], "Torch-\n\nA cave explorer's best friend.\n\nHelps light the way in dark areas so you can see things you may otherwise miss."),testStyle)&&!weaponLoadout.useItem[4])
						cat1Selected=10;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 297, 114, 114), GUIContent(weaponTextures[10], "Torch-\n\nA cave explorer's best friend.\n\nHelps light the way in dark areas so you can see things you may otherwise miss."),testStyle2)&&!weaponLoadout.useItem[4])
						cat1Selected=10;
					GUI.Button(Rect(1001, 297, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(1001, 297, 114, 114), GUIContent(), testStyle8);	
				
	//Pool 1 Line 3
		//Item 6
			if(GameController.savedItems.weaponsUnlocked[10])
			{	
				GUI.SetNextControlName ("Item6");
				if(catSelect&&cat1Selected==11)
				{	
					if(GUI.Button(Rect(496, 424, 114, 114), GUIContent(weaponTextures[11], "Scuba Fins-\n\nStylish AND functional.\n\nGreatly increases your movement speed under water."),testStyle)&&!weaponLoadout.useItem[5])
						cat1Selected=11;
				}
				else
				{	
					if(GUI.Button(Rect(496, 424, 114, 114), GUIContent(weaponTextures[11], "Scuba Fins-\n\nStylish AND functional.\n\nGreatly increases your movement speed under water."),testStyle2)&&!weaponLoadout.useItem[5])
						cat1Selected=11;
					GUI.Button(Rect(496, 424, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(496, 424, 114, 114), GUIContent(), testStyle8);	
		
		//Item 7
			if(GameController.savedItems.weaponsUnlocked[11])
			{	
				GUI.SetNextControlName ("Item7");
				if(catSelect&&cat1Selected==12)
				{	
					if(GUI.Button(Rect(623, 424, 114, 114), GUIContent(weaponTextures[12], "Scuba Mask-\n\nThe latest fashion craze among Hunters. Best when paired with the Scuba Fins.\n\nAllows you to fully dive under water and explore previously unreachable areas."),testStyle)&&!weaponLoadout.useItem[6])
						cat1Selected=12;
				}
				else
				{	
					if(GUI.Button(Rect(623, 424, 114, 114), GUIContent(weaponTextures[12], "Scuba Mask-\n\nThe latest fashion craze among Hunters. Best when paired with the Scuba Fins.\n\nAllows you to fully dive under water and explore previously unreachable areas."),testStyle2)&&!weaponLoadout.useItem[6])
						cat1Selected=12;
					GUI.Button(Rect(623, 424, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(623, 424, 114, 114), GUIContent(), testStyle8);

		//Item 8
			if(GameController.savedItems.weaponsUnlocked[12])
			{	
				GUI.SetNextControlName ("Item8");
				if(catSelect&&cat1Selected==13)
				{	
					if(GUI.Button(Rect(750, 424, 114, 114), GUIContent(weaponTextures[13], "Parachute Pants-\n\nPants that double as a parachute.\n\nEnough said."),testStyle)&&!weaponLoadout.useItem[7])
						cat1Selected=13;
				}
				else
				{	
					if(GUI.Button(Rect(750, 424, 114, 114), GUIContent(weaponTextures[13], "Parachute Pants-\n\nPants that double as a parachute.\n\nEnough said."),testStyle2)&&!weaponLoadout.useItem[7])
						cat1Selected=13;
					GUI.Button(Rect(750, 424, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(750, 424, 114, 114), GUIContent(), testStyle8);

		//Item 9
			if(GameController.savedItems.weaponsUnlocked[13])
			{	
				GUI.SetNextControlName ("Item9");
				if(catSelect&&cat1Selected==14)
				{	
					if(GUI.Button(Rect(877, 424, 114, 114), GUIContent(weaponTextures[14], "Raptor Suit-\n\nTo defeat your enemy you must become like your enemy.\n\nTricks some enemies into thinking you're on their side."),testStyle)&&!weaponLoadout.useItem[8])
						cat1Selected=14;
				}
				else
				{	
					if(GUI.Button(Rect(877, 424, 114, 114), GUIContent(weaponTextures[14], "Raptor Suit-\n\nTo defeat your enemy you must become like your enemy.\n\nTricks some enemies into thinking you're on their side."),testStyle2)&&!weaponLoadout.useItem[8])
						cat1Selected=14;
					GUI.Button(Rect(877, 424, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(877, 424, 114, 114), GUIContent(), testStyle8);
			
	/*	//Item 10
			if(GameController.savedItems.weaponsUnlocked[14])
			{	
				GUI.SetNextControlName ("Item10");
				if(catSelect&&cat1Selected==15)
				{	
					if(GUI.Button(Rect(1001, 424, 114, 114), GUIContent(weaponTextures[15], "Test Tooltip - Item10 -CHANGEME"),testStyle)&&!weaponLoadout.useItem[9])
						cat1Selected=15;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 424, 114, 114), GUIContent(weaponTextures[15], "Test Tooltip - Item10 -CHANGEME"),testStyle2)&&!weaponLoadout.useItem[9])
						cat1Selected=15;
				}
			}
			else
				GUI.Button(Rect(1001, 424, 114, 114), GUIContent(), testStyle8);		
	//Pool 1 Line 4
		//Item 11
			if(GameController.savedItems.weaponsUnlocked[15])
			{	
				GUI.SetNextControlName ("Item11");
				if(catSelect&&cat1Selected==16)
				{	
					if(GUI.Button(Rect(496, 551, 114, 114), GUIContent(weaponTextures[16], "Test Tooltip - Item11 -CHANGEME"),testStyle)&&!weaponLoadout.useItem[10])
						cat1Selected=16;
				}
				else
				{	
					if(GUI.Button(Rect(496, 551, 114, 114), GUIContent(weaponTextures[16], "Test Tooltip - Item11 -CHANGEME"),testStyle2)&&!weaponLoadout.useItem[10])
						cat1Selected=16;
				}
			}
			else
				GUI.Button(Rect(496, 551, 114, 114), GUIContent(), testStyle8);	
		
		//Item 12
			if(GameController.savedItems.weaponsUnlocked[16])
			{	
				GUI.SetNextControlName ("Item12");
				if(catSelect&&cat1Selected==17)
				{	
					if(GUI.Button(Rect(623, 551, 114, 114), GUIContent(weaponTextures[17], "Test Tooltip - Item12 -CHANGEME"),testStyle)&&!weaponLoadout.useItem[11])
						cat1Selected=17;
				}
				else
				{	
					if(GUI.Button(Rect(623, 551, 114, 114), GUIContent(weaponTextures[17], "Test Tooltip - Item12 -CHANGEME"),testStyle2)&&!weaponLoadout.useItem[11])
						cat1Selected=17;
				}
			}
			else
				GUI.Button(Rect(623, 551, 114, 114), GUIContent(), testStyle8);

		//Item 13
			if(GameController.savedItems.weaponsUnlocked[17])
			{	
				GUI.SetNextControlName ("Item13");
				if(catSelect&&cat1Selected==18)
				{	
					if(GUI.Button(Rect(750, 551, 114, 114), GUIContent(weaponTextures[18], "Test Tooltip - Item13 -CHANGEME"),testStyle)&&!weaponLoadout.useItem[12])
						cat1Selected=18;
				}
				else
				{	
					if(GUI.Button(Rect(750, 551, 114, 114), GUIContent(weaponTextures[18], "Test Tooltip - Item13 -CHANGEME"),testStyle2)&&!weaponLoadout.useItem[12])
						cat1Selected=18;
				}
			}
			else
				GUI.Button(Rect(750, 551, 114, 114), GUIContent(), testStyle8);

		//Item 14
			if(GameController.savedItems.weaponsUnlocked[18])
			{	
				GUI.SetNextControlName ("Item14");
				if(catSelect&&cat1Selected==19)
				{	
					if(GUI.Button(Rect(877, 551, 114, 114), GUIContent(weaponTextures[19], "Test Tooltip - Item14 -CHANGEME"),testStyle)&&!weaponLoadout.useItem[13])
						cat1Selected=19;
				}
				else
				{	
					if(GUI.Button(Rect(877, 551, 114, 114), GUIContent(weaponTextures[19], "Test Tooltip - Item14 -CHANGEME"),testStyle2)&&!weaponLoadout.useItem[13])
						cat1Selected=19;
				}
			}
			else
				GUI.Button(Rect(877, 551, 114, 114), GUIContent(), testStyle8);
			
		//Item 15
			if(GameController.savedItems.weaponsUnlocked[19])
			{	
				GUI.SetNextControlName ("Item15");
				if(catSelect&&cat1Selected==20)
				{	
					if(GUI.Button(Rect(1001, 551, 114, 114), GUIContent(weaponTextures[20], "Test Tooltip - Item15 -CHANGEME"),testStyle)&&!weaponLoadout.useItem[14])
						cat1Selected=20;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 551, 114, 114), GUIContent(weaponTextures[20], "Test Tooltip - Item15 -CHANGEME"),testStyle2)&&!weaponLoadout.useItem[14])
						cat1Selected=20;
				}
			}
			else
				GUI.Button(Rect(1001, 551, 114, 114), GUIContent(), testStyle8);		*/
		//Clear Slot
			GUI.SetNextControlName ("Cancel");
			if(catSelect&&cat1Selected==21)
			{
				if(GUI.Button(Rect(1001, 932, 114, 114), GUIContent(weaponTextures[21],"Use Nothing For This Slot."),testStyle))
					cat1Selected=21;
			}
			else
			{
				if(GUI.Button(Rect(1001, 932, 114, 114), GUIContent(weaponTextures[21],"Use Nothing For This Slot."),testStyle2))
					cat1Selected=21;
				GUI.Button(Rect(1001, 932, 114, 114), GUIContent(),testStyle7);		
			}
		}
//end pool 1
		
//Begin Pool 2
		if(catSelected==1&&poolSelected==2)
		{
	//Pool 2 Line 1
		//wep 1
			if(GameController.savedItems.weaponsUnlocked[0])
			{
				GUI.SetNextControlName ("Rocks");
				if(catSelect&&cat2Selected==1)
				{	
					if(GUI.Button(Rect(496, 170, 114, 114), GUIContent(weaponTextures[1], "Rocks-\n\nPummel your enemies with these easy to find throwing weapons. You can often dig them out of the ground should you run out."),testStyle)&&!weaponLoadout.useRocks)
					cat2Selected=1;
				}
				else
				{
					if(GUI.Button(Rect(496, 170, 114, 114), GUIContent(weaponTextures[1], "Rocks-\n\nPummel your enemies with these easy to find throwing weapons. You can often dig them out of the ground should you run out."),testStyle2)&&!weaponLoadout.useRocks)
						cat2Selected=1;
					GUI.Button(Rect(496, 170, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(496, 170, 114, 114), GUIContent(), testStyle8);
		//wep 2
			if(GameController.savedItems.weaponsUnlocked[1])
			{
				GUI.SetNextControlName ("Spear");
				if(catSelect&&cat2Selected==2)
				{
					if(GUI.Button(Rect(623, 170, 114, 114), GUIContent(weaponTextures[2], "Spear-\n\nA diverse weapon that can either be thrown (and picked back up), used as a stabbing weapon, or even doubles as a PoleVault for gapping large chasms."),testStyle)&&!weaponLoadout.useSpear)
					cat2Selected=2;
				}
					else
				{
					if(GUI.Button(Rect(623, 170, 114, 114), GUIContent(weaponTextures[2], "Spear-\n\nA diverse weapon that can either be thrown (and picked back up), used as a stabbing weapon, or even doubles as a PoleVault for gapping large chasms."),testStyle2)&&!weaponLoadout.useSpear)
						cat2Selected=2;
					GUI.Button(Rect(623, 170, 114, 114), GUIContent(),testStyle7);
				}
						
			}
			else
				GUI.Button(Rect(623, 170, 114, 114), GUIContent(), testStyle8);
		//wep 3
			if(GameController.savedItems.weaponsUnlocked[2])
			{
				GUI.SetNextControlName ("Sling");
				if(catSelect&&cat2Selected==3)
				{
					if(GUI.Button(Rect(750, 170, 114, 114), GUIContent(weaponTextures[3], "Sling-\n\nA traditional Slingshot type projectile weapon that can use different types of ammo."),testStyle)&&!weaponLoadout.useSling)
						cat2Selected=3;
				}
				else
				{
					if(GUI.Button(Rect(750, 170, 114, 114), GUIContent(weaponTextures[3], "Sling-\n\nA traditional Slingshot type projectile weapon that can use different types of ammo."),testStyle2)&&!weaponLoadout.useSling)
						cat2Selected=3;			
					GUI.Button(Rect(750, 170, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(750, 170, 114, 114), GUIContent(), testStyle8);
		//wep 4
			if(GameController.savedItems.weaponsUnlocked[3])
			{
				
				if(catSelect&&cat2Selected==4)
				{
				GUI.SetNextControlName ("Bow");
					if(GUI.Button(Rect(877, 170, 114, 114), GUIContent(weaponTextures[4], "Bow-\n\nFrom deadly piercing arrows to climbable rope arrows and more, every Hunter should be familiar with this weapon."),testStyle)&&!weaponLoadout.useBow)
						cat2Selected=4;
				}
				else
				{
					if(GUI.Button(Rect(877, 170, 114, 114), GUIContent(weaponTextures[4], "Bow-\n\nFrom deadly piercing arrows to climbable rope arrows and more, every Hunter should be familiar with this weapon."),testStyle2)&&!weaponLoadout.useBow)
						cat2Selected=4;
					GUI.Button(Rect(877, 170, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(877, 170, 114, 114), GUIContent(), testStyle8);
		//wep 5	
			if(GameController.savedItems.weaponsUnlocked[4])
			{	
				GUI.SetNextControlName ("Sword");
				if(catSelect&&cat2Selected==5)
				{	
					if(GUI.Button(Rect(1001, 170, 114, 114), GUIContent(weaponTextures[5], "Sword-\n\nAn absolutely devastating force of destruction that is capable of cleaving several enemies at a time."),testStyle)&&!weaponLoadout.useSword)
						cat2Selected=5;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 170, 114, 114), GUIContent(weaponTextures[5], "Sword-\n\nAn absolutely devastating force of destruction that is capable of cleaving several enemies at a time."),testStyle2)&&!weaponLoadout.useSword)
						cat2Selected=5;
					GUI.Button(Rect(1001, 170, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(1001, 170, 114, 114), GUIContent(), testStyle8);
	//Pool 2 Line 2
		//Item 1	
			if(GameController.savedItems.weaponsUnlocked[5])
			{
				GUI.SetNextControlName ("Item1");
				if(catSelect&&cat2Selected==6)
				{	
					if(GUI.Button(Rect(496, 297, 114, 114), GUIContent(weaponTextures[6], "Dino Bites-\n\nYummm. Your favorite meat-flavored gummy snack.\n\nRestores all health upon use."),testStyle)&&!weaponLoadout.useItem[0])
						cat2Selected=6;
				}
				else
				{	
					if(GUI.Button(Rect(496, 297, 114, 114), GUIContent(weaponTextures[6], "Dino Bites-\n\nYummm. Your favorite meat-flavored gummy snack.\n\nRestores all health upon use."),testStyle2)&&!weaponLoadout.useItem[0])
						cat2Selected=6;
					GUI.Button(Rect(496, 297, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(496, 297, 114, 114), GUIContent(), testStyle8);
		//Item 2
			if(GameController.savedItems.weaponsUnlocked[6])
			{	
				GUI.SetNextControlName ("Item2");
				if(catSelect&&cat2Selected==7)
				{	
					if(GUI.Button(Rect(623, 297, 114, 114), GUIContent(weaponTextures[7], "Quiver-\n\nA handmade quiver to hold your arrows.\n\nDoubles your ammo capacity for all Bow & Arrow ammo types."),testStyle)&&!weaponLoadout.useItem[1])
						cat2Selected=7;
				}
				else
				{	
					if(GUI.Button(Rect(623, 297, 114, 114), GUIContent(weaponTextures[7], "Quiver-\n\nA handmade quiver to hold your arrows.\n\nDoubles your ammo capacity for all Bow & Arrow ammo types."),testStyle2)&&!weaponLoadout.useItem[1])
						cat2Selected=7;
					GUI.Button(Rect(623, 297, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(623, 297, 114, 114), GUIContent(), testStyle8);			
		//Item 3
			if(GameController.savedItems.weaponsUnlocked[7])
			{	
				GUI.SetNextControlName ("Item3");
				if(catSelect&&cat2Selected==8)
				{	
					if(GUI.Button(Rect(750, 297, 114, 114), GUIContent(weaponTextures[8], "Skateboard-\n\nWhether it's slaying in style or a hasty getaway you're after, the Skateboard is a good choice."),testStyle)&&!weaponLoadout.useItem[2])
						cat2Selected=8;
				}
				else
				{	
					if(GUI.Button(Rect(750, 297, 114, 114), GUIContent(weaponTextures[8], "Skateboard-\n\nWhether it's slaying in style or a hasty getaway you're after, the Skateboard is a good choice."),testStyle2)&&!weaponLoadout.useItem[2])
						cat2Selected=8;
					GUI.Button(Rect(750, 297, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(750, 297, 114, 114), GUIContent(), testStyle8);

		//Item 4
			if(GameController.savedItems.weaponsUnlocked[8])
			{	
				GUI.SetNextControlName ("Item4");
				if(catSelect&&cat2Selected==9)
				{	
					if(GUI.Button(Rect(877, 297, 114, 114), GUIContent(weaponTextures[9], "EZ Bronze-\n\nBecome one with your inner Karate Master.\n\nQuad Damage on all unarmed strikes for a limited time."),testStyle)&&!weaponLoadout.useItem[3])
						cat2Selected=9;
				}
				else
				{	
					if(GUI.Button(Rect(877, 297, 114, 114), GUIContent(weaponTextures[9], "EZ Bronze-\n\nBecome one with your inner Karate Master.\n\nQuad Damage on all unarmed strikes for a limited time."),testStyle2)&&!weaponLoadout.useItem[3])
						cat2Selected=9;
					GUI.Button(Rect(877, 297, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(877, 297, 114, 114), GUIContent(), testStyle8);			
		
		//Item 5
			if(GameController.savedItems.weaponsUnlocked[9])
			{	
				GUI.SetNextControlName ("Item5");
				if(catSelect&&cat2Selected==10)
				{	
					if(GUI.Button(Rect(1001, 297, 114, 114), GUIContent(weaponTextures[10], "Torch-\n\nA cave explorer's best friend.\n\nHelps light the way in dark areas so you can see things you may otherwise miss."),testStyle)&&!weaponLoadout.useItem[4])
						cat2Selected=10;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 297, 114, 114), GUIContent(weaponTextures[10], "Torch-\n\nA cave explorer's best friend.\n\nHelps light the way in dark areas so you can see things you may otherwise miss."),testStyle2)&&!weaponLoadout.useItem[4])
						cat2Selected=10;
					GUI.Button(Rect(1001, 297, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(1001, 297, 114, 114), GUIContent(), testStyle8);	
				
	//Pool 2 Line 3
		//Item 6
			if(GameController.savedItems.weaponsUnlocked[10])
			{	
				GUI.SetNextControlName ("Item6");
				if(catSelect&&cat2Selected==11)
				{	
					if(GUI.Button(Rect(496, 424, 114, 114), GUIContent(weaponTextures[11], "Scuba Fins-\n\nStylish AND functional.\n\nGreatly increases your movement speed under water."),testStyle)&&!weaponLoadout.useItem[5])
						cat2Selected=11;
				}
				else
				{	
					if(GUI.Button(Rect(496, 424, 114, 114), GUIContent(weaponTextures[11], "Scuba Fins-\n\nStylish AND functional.\n\nGreatly increases your movement speed under water."),testStyle2)&&!weaponLoadout.useItem[5])
						cat2Selected=11;
					GUI.Button(Rect(496, 424, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(496, 424, 114, 114), GUIContent(), testStyle8);	
		
		//Item 7
			if(GameController.savedItems.weaponsUnlocked[11])
			{	
				GUI.SetNextControlName ("Item7");
				if(catSelect&&cat2Selected==12)
				{	
					if(GUI.Button(Rect(623, 424, 114, 114), GUIContent(weaponTextures[12], "Scuba Mask-\n\nThe next big fashion craze among the Hunters. Best when paired with the Scuba Fins.\n\nAllows you to fully dive under water and explore previously unreachable areas."),testStyle)&&!weaponLoadout.useItem[6])
						cat2Selected=12;
				}
				else
				{	
					if(GUI.Button(Rect(623, 424, 114, 114), GUIContent(weaponTextures[12], "Scuba Mask-\n\nThe next big fashion craze among the Hunters. Best when paired with the Scuba Fins.\n\nAllows you to fully dive under water and explore previously unreachable areas."),testStyle2)&&!weaponLoadout.useItem[6])
						cat2Selected=12;
					GUI.Button(Rect(623, 424, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(623, 424, 114, 114), GUIContent(), testStyle8);

		//Item 8
			if(GameController.savedItems.weaponsUnlocked[12])
			{	
				GUI.SetNextControlName ("Item8");
				if(catSelect&&cat2Selected==13)
				{	
					if(GUI.Button(Rect(750, 424, 114, 114), GUIContent(weaponTextures[13], "Parachute Pants-\n\nPants that double as a parachute.\n\nEnough said."),testStyle)&&!weaponLoadout.useItem[7])
						cat2Selected=13;
				}
				else
				{	
					if(GUI.Button(Rect(750, 424, 114, 114), GUIContent(weaponTextures[13], "Parachute Pants-\n\nPants that double as a parachute.\n\nEnough said."),testStyle2)&&!weaponLoadout.useItem[7])
						cat2Selected=13;
					GUI.Button(Rect(750, 424, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(750, 424, 114, 114), GUIContent(), testStyle8);

		//Item 9
			if(GameController.savedItems.weaponsUnlocked[13])
			{	
				GUI.SetNextControlName ("Item9");
				if(catSelect&&cat2Selected==14)
				{	
					if(GUI.Button(Rect(877, 424, 114, 114), GUIContent(weaponTextures[14], "Raptor Suit-\n\nTo defeat your enemy you must become like your enemy.\n\nTricks some enemies into thinking you're on their side."),testStyle)&&!weaponLoadout.useItem[8])
						cat2Selected=14;
				}
				else
				{	
					if(GUI.Button(Rect(877, 424, 114, 114), GUIContent(weaponTextures[14], "Raptor Suit-\n\nTo defeat your enemy you must become like your enemy.\n\nTricks some enemies into thinking you're on their side."),testStyle2)&&!weaponLoadout.useItem[8])
						cat2Selected=14;
					GUI.Button(Rect(877, 424, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(877, 424, 114, 114), GUIContent(), testStyle8);
			
	/*	//Item 10
			if(GameController.savedItems.weaponsUnlocked[14])
			{	
				GUI.SetNextControlName ("Item10");
				if(catSelect&&cat2Selected==15)
				{	
					if(GUI.Button(Rect(1001, 424, 114, 114), GUIContent(weaponTextures[15], "Test Tooltip - Item10 -CHANGEME"),testStyle)&&!weaponLoadout.useItem[9])
						cat2Selected=15;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 424, 114, 114), GUIContent(weaponTextures[15]),testStyle2)&&!weaponLoadout.useItem[9])
						cat2Selected=15;
				}
			}
			else
				GUI.Button(Rect(1001, 424, 114, 114), GUIContent(), testStyle8);		
	//Pool 2 Line 4
		//Item 11
			if(GameController.savedItems.weaponsUnlocked[15])
			{	
				GUI.SetNextControlName ("Item11");
				if(catSelect&&cat2Selected==16)
				{	
					if(GUI.Button(Rect(496, 551, 114, 114), GUIContent(weaponTextures[16], "Test Tooltip - Item11 -CHANGEME"),testStyle)&&!weaponLoadout.useItem[10])
						cat2Selected=16;
				}
				else
				{	
					if(GUI.Button(Rect(496, 551, 114, 114), GUIContent(weaponTextures[16]),testStyle2)&&!weaponLoadout.useItem[10])
						cat2Selected=16;
				}
			}
			else
				GUI.Button(Rect(496, 551, 114, 114), GUIContent(), testStyle8);	
		
		//Item 12
			if(GameController.savedItems.weaponsUnlocked[16])
			{	
				GUI.SetNextControlName ("Item12");
				if(catSelect&&cat2Selected==17)
				{	
					if(GUI.Button(Rect(623, 551, 114, 114), GUIContent(weaponTextures[17], "Test Tooltip - Item12 -CHANGEME"),testStyle)&&!weaponLoadout.useItem[11])
						cat2Selected=17;
				}
				else
				{	
					if(GUI.Button(Rect(623, 551, 114, 114), GUIContent(weaponTextures[17]),testStyle2)&&!weaponLoadout.useItem[11])
						cat2Selected=17;
				}
			}
			else
				GUI.Button(Rect(623, 551, 114, 114), GUIContent(), testStyle8);

		//Item 13
			if(GameController.savedItems.weaponsUnlocked[17])
			{	
				GUI.SetNextControlName ("Item13");
				if(catSelect&&cat2Selected==18)
				{	
					if(GUI.Button(Rect(750, 551, 114, 114), GUIContent(weaponTextures[18], "Test Tooltip - Item13 -CHANGEME"),testStyle)&&!weaponLoadout.useItem[12])
						cat2Selected=18;
				}
				else
				{	
					if(GUI.Button(Rect(750, 551, 114, 114), GUIContent(weaponTextures[18]),testStyle2)&&!weaponLoadout.useItem[12])
						cat2Selected=18;
				}
			}
			else
				GUI.Button(Rect(750, 551, 114, 114), GUIContent(), testStyle8);

		//Item 14
			if(GameController.savedItems.weaponsUnlocked[18])
			{	
				GUI.SetNextControlName ("Item14");
				if(catSelect&&cat2Selected==19)
				{	
					if(GUI.Button(Rect(877, 551, 114, 114), GUIContent(weaponTextures[19], "Test Tooltip - Item14 -CHANGEME"),testStyle)&&!weaponLoadout.useItem[13])
						cat2Selected=19;
				}
				else
				{	
					if(GUI.Button(Rect(877, 551, 114, 114), GUIContent(weaponTextures[19]),testStyle2)&&!weaponLoadout.useItem[13])
						cat2Selected=19;
				}
			}
			else
				GUI.Button(Rect(877, 551, 114, 114), GUIContent(), testStyle8);
			
		//Item 15
			if(GameController.savedItems.weaponsUnlocked[19])
			{	
				GUI.SetNextControlName ("Item15");
				if(catSelect&&cat2Selected==20)
				{	
					if(GUI.Button(Rect(1001, 551, 114, 114), GUIContent(weaponTextures[20], "Test Tooltip - Item15 -CHANGEME"),testStyle)&&!weaponLoadout.useItem[14])
						cat2Selected=20;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 551, 114, 114), GUIContent(weaponTextures[20]),testStyle2)&&!weaponLoadout.useItem[14])
						cat2Selected=20;
				}
			}
			else
				GUI.Button(Rect(1001, 551, 114, 114), GUIContent(), testStyle8);		*/
		//Clear Slot
			GUI.SetNextControlName ("Cancel");
			if(catSelect&&cat2Selected==21)
			{
				if(GUI.Button(Rect(1001, 932, 114, 114), GUIContent(weaponTextures[21],"Use Nothing For This Slot."),testStyle))
					cat2Selected=21;
			}
			else
			{
				if(GUI.Button(Rect(1001, 932, 114, 114), GUIContent(weaponTextures[21],"Use Nothing For This Slot."),testStyle2))
					cat2Selected=21;
				GUI.Button(Rect(1001, 932, 114, 114), GUIContent(),testStyle7);		
			}
		}
//end Pool 2
	
	
//Begin Pool 3
		if(catSelected==1&&poolSelected==3)
		{
	//Pool 3 Line 1
		//wep 1
			if(GameController.savedItems.weaponsUnlocked[0])
			{
				GUI.SetNextControlName ("Rocks");
				if(catSelect&&cat3Selected==1)
				{	
					if(GUI.Button(Rect(496, 170, 114, 114), GUIContent(weaponTextures[1], "Rocks-\n\nPummel your enemies with these easy to find throwing weapons. You can often dig them out of the ground should you run out."),testStyle)&&!weaponLoadout.useRocks)
					cat3Selected=1;
				}
				else
				{
					if(GUI.Button(Rect(496, 170, 114, 114), GUIContent(weaponTextures[1], "Rocks-\n\nPummel your enemies with these easy to find throwing weapons. You can often dig them out of the ground should you run out."),testStyle2)&&!weaponLoadout.useRocks)
						cat3Selected=1;
					GUI.Button(Rect(496, 170, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(496, 170, 114, 114), GUIContent(), testStyle8);
		//wep 2
			if(GameController.savedItems.weaponsUnlocked[1])
			{
				GUI.SetNextControlName ("Spear");
				if(catSelect&&cat3Selected==2)
				{
					if(GUI.Button(Rect(623, 170, 114, 114), GUIContent(weaponTextures[2], "Spear-\n\nA diverse weapon that can either be thrown (and picked back up), used as a stabbing weapon, or even doubles as a PoleVault for gapping large chasms"),testStyle)&&!weaponLoadout.useSpear)
					cat3Selected=2;
				}
					else
				{
					if(GUI.Button(Rect(623, 170, 114, 114), GUIContent(weaponTextures[2], "Spear-\n\nA diverse weapon that can either be thrown (and picked back up), used as a stabbing weapon, or even doubles as a PoleVault for gapping large chasms"),testStyle2)&&!weaponLoadout.useSpear)
						cat3Selected=2;
					GUI.Button(Rect(623, 170, 114, 114), GUIContent(),testStyle7);
				}
						
			}
			else
				GUI.Button(Rect(623, 170, 114, 114), GUIContent(), testStyle8);
		//wep 3
			if(GameController.savedItems.weaponsUnlocked[2])
			{
				GUI.SetNextControlName ("Sling");
				if(catSelect&&cat3Selected==3)
				{
					if(GUI.Button(Rect(750, 170, 114, 114), GUIContent(weaponTextures[3], "Sling-\n\nA traditional Slingshot type projectile weapon that can use different types of ammo."),testStyle)&&!weaponLoadout.useSling)
					cat3Selected=3;
				}
				
				else
				{
					if(GUI.Button(Rect(750, 170, 114, 114), GUIContent(weaponTextures[3], "Sling-\n\nA traditional Slingshot type projectile weapon that can use different types of ammo."),testStyle2)&&!weaponLoadout.useSling)
						cat3Selected=3;
					GUI.Button(Rect(750, 170, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(750, 170, 114, 114), GUIContent(), testStyle8);
		//wep 4
			if(GameController.savedItems.weaponsUnlocked[3])
			{
				
				if(catSelect&&cat3Selected==4)
				{
				GUI.SetNextControlName ("Bow");
					if(GUI.Button(Rect(877, 170, 114, 114), GUIContent(weaponTextures[4], "Bow-\n\nFrom deadly piercing arrows to climbable rope arrows and more, every Hunter should be familiar with this weapon."),testStyle)&&!weaponLoadout.useBow)
						cat3Selected=4;
				}
				else
				{
					if(GUI.Button(Rect(877, 170, 114, 114), GUIContent(weaponTextures[4], "Bow-\n\nFrom deadly piercing arrows to climbable rope arrows and more, every Hunter should be familiar with this weapon."),testStyle2)&&!weaponLoadout.useBow)
						cat3Selected=4;
					GUI.Button(Rect(877, 170, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(877, 170, 114, 114), GUIContent(), testStyle8);
		//wep 5	
			if(GameController.savedItems.weaponsUnlocked[4])
			{	
				GUI.SetNextControlName ("Sword");
				if(catSelect&&cat3Selected==5)
				{	
					if(GUI.Button(Rect(1001, 170, 114, 114), GUIContent(weaponTextures[5], "Sword-\n\nAn absolutely devastating force of destruction that is capable of cleaving several enemies at a time."),testStyle)&&!weaponLoadout.useSword)
						cat3Selected=5;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 170, 114, 114), GUIContent(weaponTextures[5], "Sword-\n\nAn absolutely devastating force of destruction that is capable of cleaving several enemies at a time."),testStyle2)&&!weaponLoadout.useSword)
						cat3Selected=5;
					GUI.Button(Rect(1001, 170, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(1001, 170, 114, 114), GUIContent(), testStyle8);
	//Pool 3 Line 2
		//Item 1	
			if(GameController.savedItems.weaponsUnlocked[5])
			{
				GUI.SetNextControlName ("Item1");
				if(catSelect&&cat3Selected==6)
				{	
					if(GUI.Button(Rect(496, 297, 114, 114), GUIContent(weaponTextures[6], "Dino Bites-\n\nYummm. Your favorite meat-flavored gummy snack.\n\nRestores all health upon use."),testStyle)&&!weaponLoadout.useItem[0])
						cat3Selected=6;
				}
				else
				{	
					if(GUI.Button(Rect(496, 297, 114, 114), GUIContent(weaponTextures[6], "Dino Bites-\n\nYummm. Your favorite meat-flavored gummy snack.\n\nRestores all health upon use."),testStyle2)&&!weaponLoadout.useItem[0])
						cat3Selected=6;
					GUI.Button(Rect(496, 297, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(496, 297, 114, 114), GUIContent(), testStyle8);
		//Item 2
			if(GameController.savedItems.weaponsUnlocked[6])
			{	
				GUI.SetNextControlName ("Item2");
				if(catSelect&&cat3Selected==7)
				{	
					if(GUI.Button(Rect(623, 297, 114, 114), GUIContent(weaponTextures[7], "Quiver-\n\nA hand made quiver to hold your arrows.\n\nDoubles your ammo capacity for all Bow & Arrow ammo types."),testStyle)&&!weaponLoadout.useItem[1])
						cat3Selected=7;
				}
				else
				{	
					if(GUI.Button(Rect(623, 297, 114, 114), GUIContent(weaponTextures[7], "Quiver-\n\nA hand made quiver to hold your arrows.\n\nDoubles your ammo capacity for all Bow & Arrow ammo types."),testStyle2)&&!weaponLoadout.useItem[1])
						cat3Selected=7;
					GUI.Button(Rect(623, 297, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(623, 297, 114, 114), GUIContent(), testStyle8);			
		//Item 3
			if(GameController.savedItems.weaponsUnlocked[7])
			{	
				GUI.SetNextControlName ("Item3");
				if(catSelect&&cat3Selected==8)
				{	
					if(GUI.Button(Rect(750, 297, 114, 114), GUIContent(weaponTextures[8], "Skateboard-\n\nWhether it's slaying in style or a hasty getaway you're after, the Skateboard is a good choice."),testStyle)&&!weaponLoadout.useItem[2])
						cat3Selected=8;
				}
				else
				{	
					if(GUI.Button(Rect(750, 297, 114, 114), GUIContent(weaponTextures[8], "Skateboard-\n\nWhether it's slaying in style or a hasty getaway you're after, the Skateboard is a good choice."),testStyle2)&&!weaponLoadout.useItem[2])
						cat3Selected=8;
					GUI.Button(Rect(750, 297, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(750, 297, 114, 114), GUIContent(), testStyle8);

		//Item 4
			if(GameController.savedItems.weaponsUnlocked[8])
			{	
				GUI.SetNextControlName ("Item4");
				if(catSelect&&cat3Selected==9)
				{	
					if(GUI.Button(Rect(877, 297, 114, 114), GUIContent(weaponTextures[9], "EZ Bronze-\n\nBecome one with your inner Karate Master.\n\nQuad Damage on all unarmed strikes for a limited time."),testStyle)&&!weaponLoadout.useItem[3])
						cat3Selected=9;
				}
				else
				{	
					if(GUI.Button(Rect(877, 297, 114, 114), GUIContent(weaponTextures[9], "EZ Bronze-\n\nBecome one with your inner Karate Master.\n\nQuad Damage on all unarmed strikes for a limited time."),testStyle2)&&!weaponLoadout.useItem[3])
						cat3Selected=9;
					GUI.Button(Rect(877, 297, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(877, 297, 114, 114), GUIContent(), testStyle8);			
		
		//Item 5
			if(GameController.savedItems.weaponsUnlocked[9])
			{	
				GUI.SetNextControlName ("Item5");
				if(catSelect&&cat3Selected==10)
				{	
					if(GUI.Button(Rect(1001, 297, 114, 114), GUIContent(weaponTextures[10], "Torch-\n\nA cave explorer's best friend.\n\nHelps light the way in dark areas so you can see things you may otherwise miss."),testStyle)&&!weaponLoadout.useItem[4])
						cat3Selected=10;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 297, 114, 114), GUIContent(weaponTextures[10], "Torch-\n\nA cave explorer's best friend.\n\nHelps light the way in dark areas so you can see things you may otherwise miss."),testStyle2)&&!weaponLoadout.useItem[4])
						cat3Selected=10;
					GUI.Button(Rect(1001, 297, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(1001, 297, 114, 114), GUIContent(), testStyle8);	
				
	//Pool 3 Line 3
		//Item 6
			if(GameController.savedItems.weaponsUnlocked[10])
			{	
				GUI.SetNextControlName ("Item6");
				if(catSelect&&cat3Selected==11)
				{	
					if(GUI.Button(Rect(496, 424, 114, 114), GUIContent(weaponTextures[11], "Scuba Fins-\n\nStylish AND functional.\n\nGreatly increases your movement speed under water."),testStyle)&&!weaponLoadout.useItem[5])
						cat3Selected=11;
				}
				else
				{	
					if(GUI.Button(Rect(496, 424, 114, 114), GUIContent(weaponTextures[11], "Scuba Fins-\n\nStylish AND functional.\n\nGreatly increases your movement speed under water."),testStyle2)&&!weaponLoadout.useItem[5])
						cat3Selected=11;
					GUI.Button(Rect(496, 424, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(496, 424, 114, 114), GUIContent(), testStyle8);	
		
		//Item 7
			if(GameController.savedItems.weaponsUnlocked[11])
			{	
				GUI.SetNextControlName ("Item7");
				if(catSelect&&cat3Selected==12)
				{	
					if(GUI.Button(Rect(623, 424, 114, 114), GUIContent(weaponTextures[12], "Scuba Mask-\n\nThe next big fashion craze among the Hunters. Best when paired with the Scuba Fins.\n\nAllows you to fully dive under water and explore previously unreachable areas."),testStyle)&&!weaponLoadout.useItem[6])
						cat3Selected=12;
				}
				else
				{	
					if(GUI.Button(Rect(623, 424, 114, 114), GUIContent(weaponTextures[12], "Scuba Mask-\n\nThe next big fashion craze among the Hunters. Best when paired with the Scuba Fins.\n\nAllows you to fully dive under water and explore previously unreachable areas."),testStyle2)&&!weaponLoadout.useItem[6])
						cat3Selected=12;
					GUI.Button(Rect(623, 424, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(623, 424, 114, 114), GUIContent(), testStyle8);

		//Item 8
			if(GameController.savedItems.weaponsUnlocked[12])
			{	
				GUI.SetNextControlName ("Item8");
				if(catSelect&&cat3Selected==13)
				{	
					if(GUI.Button(Rect(750, 424, 114, 114), GUIContent(weaponTextures[13], "Parachute Pants-\n\nPants that double as a parachute.\n\nEnough said."),testStyle)&&!weaponLoadout.useItem[7])
						cat3Selected=13;
				}
				else
				{	
					if(GUI.Button(Rect(750, 424, 114, 114), GUIContent(weaponTextures[13], "Parachute Pants-\n\nPants that double as a parachute.\n\nEnough said."),testStyle2)&&!weaponLoadout.useItem[7])
						cat3Selected=13;
					GUI.Button(Rect(750, 424, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(750, 424, 114, 114), GUIContent(), testStyle8);

		//Item 9
			if(GameController.savedItems.weaponsUnlocked[13])
			{	
				GUI.SetNextControlName ("Item9");
				if(catSelect&&cat3Selected==14)
				{	
					if(GUI.Button(Rect(877, 424, 114, 114), GUIContent(weaponTextures[14], "Raptor Suit-\n\nTo defeat your enemy you must become like your enemy.\n\nTricks some enemies into thinking you're on their side."),testStyle)&&!weaponLoadout.useItem[8])
						cat3Selected=14;
				}
				else
				{	
					if(GUI.Button(Rect(877, 424, 114, 114), GUIContent(weaponTextures[14], "Raptor Suit-\n\nTo defeat your enemy you must become like your enemy.\n\nTricks some enemies into thinking you're on their side."),testStyle2)&&!weaponLoadout.useItem[8])
						cat3Selected=14;
					GUI.Button(Rect(877, 424, 114, 114), GUIContent(),testStyle7);
				}
			}
			else
				GUI.Button(Rect(877, 424, 114, 114), GUIContent(), testStyle8);
			
	/*	//Item 10
			if(GameController.savedItems.weaponsUnlocked[14])
			{	
				GUI.SetNextControlName ("Item10");
				if(catSelect&&cat3Selected==15)
				{	
					if(GUI.Button(Rect(1001, 424, 114, 114), GUIContent(weaponTextures[15], "Test Tooltip - Item10 -CHANGEME"),testStyle)&&!weaponLoadout.useItem[9])
						cat3Selected=15;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 424, 114, 114), GUIContent(weaponTextures[15]),testStyle2)&&!weaponLoadout.useItem[9])
						cat3Selected=15;
				}
			}
			else
				GUI.Button(Rect(1001, 424, 114, 114), GUIContent(), testStyle8);		
	//Pool 3 Line 4
		//Item 11
			if(GameController.savedItems.weaponsUnlocked[15])
			{	
				GUI.SetNextControlName ("Item11");
				if(catSelect&&cat3Selected==16)
				{	
					if(GUI.Button(Rect(496, 551, 114, 114), GUIContent(weaponTextures[16], "Test Tooltip - Item11 -CHANGEME"),testStyle)&&!weaponLoadout.useItem[10])
						cat3Selected=16;
				}
				else
				{	
					if(GUI.Button(Rect(496, 551, 114, 114), GUIContent(weaponTextures[16]),testStyle2)&&!weaponLoadout.useItem[10])
						cat3Selected=16;
				}
			}
			else
				GUI.Button(Rect(496, 551, 114, 114), GUIContent(), testStyle8);	
		
		//Item 12
			if(GameController.savedItems.weaponsUnlocked[16])
			{	
				GUI.SetNextControlName ("Item12");
				if(catSelect&&cat3Selected==17)
				{	
					if(GUI.Button(Rect(623, 551, 114, 114), GUIContent(weaponTextures[17], "Test Tooltip - Item12 -CHANGEME"),testStyle)&&!weaponLoadout.useItem[11])
						cat3Selected=17;
				}
				else
				{	
					if(GUI.Button(Rect(623, 551, 114, 114), GUIContent(weaponTextures[17]),testStyle2)&&!weaponLoadout.useItem[11])
						cat3Selected=17;
				}
			}
			else
				GUI.Button(Rect(623, 551, 114, 114), GUIContent(), testStyle8);

		//Item 13
			if(GameController.savedItems.weaponsUnlocked[17])
			{	
				GUI.SetNextControlName ("Item13");
				if(catSelect&&cat3Selected==18)
				{	
					if(GUI.Button(Rect(750, 551, 114, 114), GUIContent(weaponTextures[18], "Test Tooltip - Item13 -CHANGEME"),testStyle)&&!weaponLoadout.useItem[12])
						cat3Selected=18;
				}
				else
				{	
					if(GUI.Button(Rect(750, 551, 114, 114), GUIContent(weaponTextures[18]),testStyle2)&&!weaponLoadout.useItem[12])
						cat3Selected=18;
				}
			}
			else
				GUI.Button(Rect(750, 551, 114, 114), GUIContent(), testStyle8);

		//Item 14
			if(GameController.savedItems.weaponsUnlocked[18])
			{	
				GUI.SetNextControlName ("Item14");
				if(catSelect&&cat3Selected==19)
				{	
					if(GUI.Button(Rect(877, 551, 114, 114), GUIContent(weaponTextures[19], "Test Tooltip - Item14 -CHANGEME"),testStyle)&&!weaponLoadout.useItem[13])
						cat3Selected=19;
				}
				else
				{	
					if(GUI.Button(Rect(877, 551, 114, 114), GUIContent(weaponTextures[19]),testStyle2)&&!weaponLoadout.useItem[13])
						cat3Selected=19;
				}
			}
			else
				GUI.Button(Rect(877, 551, 114, 114), GUIContent(), testStyle8);
			
		//Item 15
			if(GameController.savedItems.weaponsUnlocked[19])
			{	
				GUI.SetNextControlName ("Item15");
				if(catSelect&&cat3Selected==20)
				{	
					if(GUI.Button(Rect(1001, 551, 114, 114), GUIContent(weaponTextures[20], "Test Tooltip - Item15 -CHANGEME"),testStyle)&&!weaponLoadout.useItem[14])
						cat3Selected=20;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 551, 114, 114), GUIContent(weaponTextures[20]),testStyle2)&&!weaponLoadout.useItem[14])
						cat3Selected=20;
				}
			}
			else
				GUI.Button(Rect(1001, 551, 114, 114), GUIContent(), testStyle8);		*/
	//Clear Slot
			GUI.SetNextControlName ("Cancel");
			if(catSelect&&cat3Selected==21)
			{
				if(GUI.Button(Rect(1001, 932, 114, 114), GUIContent(weaponTextures[21],"Use Nothing For This Slot."),testStyle))
					cat3Selected=21;
			}
			else
			{
				if(GUI.Button(Rect(1001, 932, 114, 114), GUIContent(weaponTextures[21],"Use Nothing For This Slot."),testStyle2))
					cat3Selected=21;
				GUI.Button(Rect(1001, 932, 114, 114), GUIContent(),testStyle7);
			}
		}
//end Pool 3

		
		
//Begin Pool 4
		if(catSelected==2&&poolSelected==4)
		{
	//Pool 4 Line 1
		//Magic 1
			if(GameController.savedItems.magicUnlocked[0])
			{
				GUI.SetNextControlName ("magic1");
				if(catSelect&&cat4Selected==0)
				{	
					if(GUI.Button(Rect(496, 170, 114, 114), GUIContent(magicTextures[0], "Haste-\n\nThe hunter’s legs move with less effort allowing them to run like the wind."),testStyle)&&!weaponLoadout.useMagic[0])
					cat4Selected=0;
				}
				else
				{
					if(GUI.Button(Rect(496, 170, 114, 114), GUIContent(magicTextures[0], "Haste-\n\nThe hunter’s legs move with less effort allowing them to run like the wind."),testStyle2)&&!weaponLoadout.useMagic[0])
						cat4Selected=0;
					GUI.Button(Rect(496, 170, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(496, 170, 114, 114), GUIContent(), testStyle8);
		//Magic 2
			if(GameController.savedItems.magicUnlocked[1])
			{
				GUI.SetNextControlName ("magic2");
				if(catSelect&&cat4Selected==1)
				{
					if(GUI.Button(Rect(623, 170, 114, 114), GUIContent(magicTextures[1], "Heal-\n\nCall upon the soothing wind of ancestral healing magic, restoring some health in combat."),testStyle)&&!weaponLoadout.useMagic[1])
					cat4Selected=1;
				}
					else
				{
					if(GUI.Button(Rect(623, 170, 114, 114), GUIContent(magicTextures[1], "Heal-\n\nCall upon the soothing wind of ancestral healing magic, restoring some health in combat."),testStyle2)&&!weaponLoadout.useMagic[1])
						cat4Selected=1;
					GUI.Button(Rect(623, 170, 114, 114), GUIContent(),testStyle7);	
				}
						
			}
			else
				GUI.Button(Rect(623, 170, 114, 114), GUIContent(), testStyle8);
		//Magic 3
			if(GameController.savedItems.magicUnlocked[2])
			{
				GUI.SetNextControlName ("magic3");
				if(catSelect&&cat4Selected==2)
				{
					if(GUI.Button(Rect(750, 170, 114, 114), GUIContent(magicTextures[2], "Shield-\n\nCall upon a guardian spirit to protect you from damage for a short while."),testStyle)&&!weaponLoadout.useMagic[2])
					cat4Selected=2;
				}
				
				else
				{
					if(GUI.Button(Rect(750, 170, 114, 114), GUIContent(magicTextures[2], "Shield-\n\nCall upon a guardian spirit to protect you from damage for a short while."),testStyle2)&&!weaponLoadout.useMagic[2])
						cat4Selected=2;		
					GUI.Button(Rect(750, 170, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(750, 170, 114, 114), GUIContent(), testStyle8);
		//Magic 4
			if(GameController.savedItems.magicUnlocked[3])
			{
				
				if(catSelect&&cat4Selected==3)
				{
				GUI.SetNextControlName ("magic4");
					if(GUI.Button(Rect(877, 170, 114, 114), GUIContent(magicTextures[3], "Bloodlust-\n\nThis warcry feeds off the spirit of battle and seems to allow the hunter to replenish their health from their fallen foes."),testStyle)&&!weaponLoadout.useMagic[3])
						cat4Selected=3;
				}
				else
				{
					if(GUI.Button(Rect(877, 170, 114, 114), GUIContent(magicTextures[3], "Bloodlust-\n\nThis warcry feeds off the spirit of battle and seems to allow the hunter to replenish their health from their fallen foes."),testStyle2)&&!weaponLoadout.useMagic[3])
						cat4Selected=3;
					GUI.Button(Rect(877, 170, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(877, 170, 114, 114), GUIContent(), testStyle8);
		//Magic 5	
			if(GameController.savedItems.magicUnlocked[4])
			{	
				GUI.SetNextControlName ("magic5");
				if(catSelect&&cat4Selected==4)
				{	
					if(GUI.Button(Rect(1001, 170, 114, 114), GUIContent(magicTextures[4], "Rockstorm-\n\nCalls down a flurry of rocks to pummel your opponents from the sky."),testStyle)&&!weaponLoadout.useMagic[4])
						cat4Selected=4;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 170, 114, 114), GUIContent(magicTextures[4], "Rockstorm-\n\nCalls down a flurry of rocks to pummel your opponents from the sky."),testStyle2)&&!weaponLoadout.useMagic[4])
						cat4Selected=4;
					GUI.Button(Rect(1001, 170, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(1001, 170, 114, 114), GUIContent(), testStyle8);
	//Pool 4 Line 2
		//magic 6	
			if(GameController.savedItems.magicUnlocked[5])
			{
				GUI.SetNextControlName ("magic6");
				if(catSelect&&cat4Selected==5)
				{	
					if(GUI.Button(Rect(496, 297, 114, 114), GUIContent(magicTextures[5], "Fireball-\n\nAn explosive shout that summons a firey orb to bring explosive destruction to any in it's path."),testStyle)&&!weaponLoadout.useMagic[5])
						cat4Selected=5;
				}
				else
				{	
					if(GUI.Button(Rect(496, 297, 114, 114), GUIContent(magicTextures[5], "Fireball-\n\nAn explosive shout that summons a firey orb to bring explosive destruction to any in it's path."),testStyle2)&&!weaponLoadout.useMagic[5])
						cat4Selected=5;
					GUI.Button(Rect(496, 297, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(496, 297, 114, 114), GUIContent(), testStyle8);
		//magic 7
			if(GameController.savedItems.magicUnlocked[6])
			{	
				GUI.SetNextControlName ("magic7");
				if(catSelect&&cat4Selected==6)
				{	
					if(GUI.Button(Rect(623, 297, 114, 114), GUIContent(magicTextures[6], "Ice Blast-\n\nFires a beam of ice at your target, slowing them as they turn into a block of ice."),testStyle)&&!weaponLoadout.useMagic[6])
						cat4Selected=6;
				}
				else
				{	
					if(GUI.Button(Rect(623, 297, 114, 114), GUIContent(magicTextures[6], "Ice Blast-\n\nFires a beam of ice at your target, slowing them as they turn into a block of ice."),testStyle2)&&!weaponLoadout.useMagic[6])
						cat4Selected=6;
					GUI.Button(Rect(623, 297, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(623, 297, 114, 114), GUIContent(), testStyle8);			
		//magic 8
			if(GameController.savedItems.magicUnlocked[7])
			{	
				GUI.SetNextControlName ("magic8");
				if(catSelect&&cat4Selected==7)
				{	
					if(GUI.Button(Rect(750, 297, 114, 114), GUIContent(magicTextures[7], "Lightning-\n\nSurrounds the hunter in a ball of pure electricity stunning and damaging everything in the area as it grows larger."),testStyle)&&!weaponLoadout.useMagic[7])
						cat4Selected=7;
				}
				else
				{	
					if(GUI.Button(Rect(750, 297, 114, 114), GUIContent(magicTextures[7], "Lightning-\n\nSurrounds the hunter in a ball of pure electricity stunning and damaging everything in the area as it grows larger."),testStyle2)&&!weaponLoadout.useMagic[7])
						cat4Selected=7;
					GUI.Button(Rect(750, 297, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(750, 297, 114, 114), GUIContent(), testStyle8);

		//magic 9
			if(GameController.savedItems.magicUnlocked[8])
			{	
				GUI.SetNextControlName ("magic9");
				if(catSelect&&cat4Selected==8)
				{	
					if(GUI.Button(Rect(877, 297, 114, 114), GUIContent(magicTextures[8], "Fear-\n\nEnemies will be instilled with sheer terror causing them to flee for their lives while spirits torment their soul."),testStyle)&&!weaponLoadout.useMagic[8])
						cat4Selected=8;
				}
				else
				{	
					if(GUI.Button(Rect(877, 297, 114, 114), GUIContent(magicTextures[8], "Fear-\n\nEnemies will be instilled with sheer terror causing them to flee for their lives while spirits torment their soul."),testStyle2)&&!weaponLoadout.useMagic[8])
						cat4Selected=8;
					GUI.Button(Rect(877, 297, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(877, 297, 114, 114), GUIContent(), testStyle8);			
		
		//magic 10
			if(GameController.savedItems.magicUnlocked[9])
			{	
				GUI.SetNextControlName ("magic10");
				if(catSelect&&cat4Selected==9)
				{	
					if(GUI.Button(Rect(1001, 297, 114, 114), GUIContent(magicTextures[9], "Stun-\n\nA bellowing battlecry amplified by the spirits of a dozen ancestral hunters. Stuns and disorients all caught within it’s deafening range."),testStyle)&&!weaponLoadout.useMagic[9])
						cat4Selected=9;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 297, 114, 114), GUIContent(magicTextures[9], "Stun-\n\nA bellowing battlecry amplified by the spirits of a dozen ancestral hunters. Stuns and disorients all caught within it’s deafening range."),testStyle2)&&!weaponLoadout.useMagic[9])
						cat4Selected=9;
					GUI.Button(Rect(1001, 297, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(1001, 297, 114, 114), GUIContent(), testStyle8);	
				
	//Pool 4 Line 3
		//magic 11
			if(GameController.savedItems.magicUnlocked[10])
			{	
				GUI.SetNextControlName ("magic11");
				if(catSelect&&cat4Selected==10)
				{	
					if(GUI.Button(Rect(496, 424, 114, 114), GUIContent(magicTextures[10], "Summon Pterodactyl-\n\nThis warcry will summon a friendly Pterodactyl to fight by your side for as long as it is willing."),testStyle)&&!weaponLoadout.useMagic[10])
						cat4Selected=10;
				}
				else
				{	
					if(GUI.Button(Rect(496, 424, 114, 114), GUIContent(magicTextures[10], "Summon Pterodactyl-\n\nThis warcry will summon a friendly Pterodactyl to fight by your side for as long as it is willing."),testStyle2)&&!weaponLoadout.useMagic[10])
						cat4Selected=10;
					GUI.Button(Rect(496, 424, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(496, 424, 114, 114), GUIContent(), testStyle8);	
		
		//magic 12
			if(GameController.savedItems.magicUnlocked[11])
			{	
				GUI.SetNextControlName ("magic12");
				if(catSelect&&cat4Selected==11)
				{	
					if(GUI.Button(Rect(623, 424, 114, 114), GUIContent(magicTextures[11], "Summon Karate Master-\n\nGary the Dojo Master handed you a bottle of his favorite EZ-Bronze claiming if you ever need an ally in battle to call upon him with this."),testStyle)&&!weaponLoadout.useMagic[11])
						cat4Selected=11;
				}
				else
				{	
					if(GUI.Button(Rect(623, 424, 114, 114), GUIContent(magicTextures[11], "Summon Karate Master-\n\nGary the Dojo Master handed you a bottle of his favorite EZ-Bronze claiming if you ever need an ally in battle to call upon him with this."),testStyle2)&&!weaponLoadout.useMagic[11])
						cat4Selected=11;
					GUI.Button(Rect(623, 424, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(623, 424, 114, 114), GUIContent(), testStyle8);

		//magic 13
			if(GameController.savedItems.magicUnlocked[12])
			{	
				GUI.SetNextControlName ("magic13");
				if(catSelect&&cat4Selected==12)
				{	
					if(GUI.Button(Rect(750, 424, 114, 114), GUIContent(magicTextures[12], "Summon Triceratops-\n\nSome hunters have earned the trust of this powerful battering ram of an ally to help flatten out the battlefield."),testStyle)&&!weaponLoadout.useMagic[12])
						cat4Selected=12;
				}
				else
				{	
					if(GUI.Button(Rect(750, 424, 114, 114), GUIContent(magicTextures[12], "Summon Triceratops-\n\nSome hunters have earned the trust of this powerful battering ram of an ally to help flatten out the battlefield."),testStyle2)&&!weaponLoadout.useMagic[12])
						cat4Selected=12;
					GUI.Button(Rect(750, 424, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(750, 424, 114, 114), GUIContent(), testStyle8);

		//magic 14
			if(GameController.savedItems.magicUnlocked[13])
			{	
				GUI.SetNextControlName ("magic14");
				if(catSelect&&cat4Selected==13)
				{	
					if(GUI.Button(Rect(877, 424, 114, 114), GUIContent(magicTextures[13], "Summon T-Rex-\n\nVillage Shamans tell of whispers from the wind claiming hunters of legend were able to call upon even the most ferocious of beasts to fight by their side in battle."),testStyle)&&!weaponLoadout.useMagic[13])
						cat4Selected=13;
				}
				else
				{	
					if(GUI.Button(Rect(877, 424, 114, 114), GUIContent(magicTextures[13], "Summon T-Rex-\n\nVillage Shamans tell of whispers from the wind claiming hunters of legend were able to call upon even the most ferocious of beasts to fight by their side in battle."),testStyle2)&&!weaponLoadout.useMagic[13])
						cat4Selected=13;
					GUI.Button(Rect(877, 424, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(877, 424, 114, 114), GUIContent(), testStyle8);
			
		//magic 15
		//	if(GameController.savedItems.magicUnlocked[14])
		//	{	
		//		GUI.SetNextControlName ("magic15");
		//		if(catSelect&&cat4Selected==14)
		//		{	
		//			if(GUI.Button(Rect(1001, 424, 114, 114), GUIContent(magicTextures[14], "Magic 15"),testStyle)&&!weaponLoadout.useMagic[14])
		//				cat4Selected=14;
		//		}
		//		else
		//		{	
		//			if(GUI.Button(Rect(1001, 424, 114, 114), GUIContent(magicTextures[14], "Magic 15"),testStyle2)&&!weaponLoadout.useMagic[14])
		//				cat4Selected=14;
		//		}
		//	}
		//	else
		//		GUI.Button(Rect(1001, 424, 114, 114), GUIContent(), testStyle8); 
	//Pool 4 Line 4
/*		//magic 16
			if(GameController.savedItems.magicUnlocked[15])
			{	
				GUI.SetNextControlName ("magic16");
				if(catSelect&&cat4Selected==15)
				{	
					if(GUI.Button(Rect(496, 551, 114, 114), GUIContent(magicTextures[15], "Magic 16"),testStyle)&&!weaponLoadout.useMagic[15])
						cat4Selected=15;
				}
				else
				{	
					if(GUI.Button(Rect(496, 551, 114, 114), GUIContent(magicTextures[15], "Magic 16"),testStyle2)&&!weaponLoadout.useMagic[15])
						cat4Selected=15;
				}
			}
			else
				GUI.Button(Rect(496, 551, 114, 114), GUIContent(), testStyle8);	
		
		//magic 12
			if(GameController.savedItems.magicUnlocked[16])
			{	
				GUI.SetNextControlName ("magic17");
				if(catSelect&&cat1Selected==17)
				{	
					if(GUI.Button(Rect(623, 551, 114, 114), GUIContent(magicTextures[17], "Test Tooltip - magic12 -CHANGEME"),testStyle)&&!weaponLoadout.useMagic[11])
						cat1Selected=17;
				}
				else
				{	
					if(GUI.Button(Rect(623, 551, 114, 114), GUIContent(magicTextures[17]),testStyle2)&&!weaponLoadout.useMagic[11])
						cat1Selected=17;
				}
			}
			else
				GUI.Button(Rect(623, 551, 114, 114), GUIContent(), testStyle8);

		//magic 13
			if(GameController.savedItems.magicUnlocked[17])
			{	
				GUI.SetNextControlName ("magic18");
				if(catSelect&&cat1Selected==18)
				{	
					if(GUI.Button(Rect(750, 551, 114, 114), GUIContent(magicTextures[18], "Test Tooltip - magic13 -CHANGEME"),testStyle)&&!weaponLoadout.useMagic[12])
						cat1Selected=18;
				}
				else
				{	
					if(GUI.Button(Rect(750, 551, 114, 114), GUIContent(magicTextures[18]),testStyle2)&&!weaponLoadout.useMagic[12])
						cat1Selected=18;
				}
			}
			else
				GUI.Button(Rect(750, 551, 114, 114), GUIContent(), testStyle8);

		//magic 14
			if(GameController.savedItems.magicUnlocked[18])
			{	
				GUI.SetNextControlName ("magic19");
				if(catSelect&&cat1Selected==19)
				{	
					if(GUI.Button(Rect(877, 551, 114, 114), GUIContent(magicTextures[19], "Test Tooltip - magic14 -CHANGEME"),testStyle)&&!weaponLoadout.useMagic[13])
						cat1Selected=19;
				}
				else
				{	
					if(GUI.Button(Rect(877, 551, 114, 114), GUIContent(magicTextures[19]),testStyle2)&&!weaponLoadout.useMagic[13])
						cat1Selected=19;
				}
			}
			else
				GUI.Button(Rect(877, 551, 114, 114), GUIContent(), testStyle8);
			
		//magic 15
			if(GameController.savedItems.magicUnlocked[19])
			{	
				GUI.SetNextControlName ("magic20");
				if(catSelect&&cat1Selected==20)
				{	
					if(GUI.Button(Rect(1001, 551, 114, 114), GUIContent(magicTextures[20], "Test Tooltip - magic15 -CHANGEME"),testStyle)&&!weaponLoadout.useMagic[14])
						cat1Selected=20;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 551, 114, 114), GUIContent(magicTextures[20]),testStyle2)&&!weaponLoadout.useMagic[14])
						cat1Selected=20;
				}
			}
			else
				GUI.Button(Rect(1001, 551, 114, 114), GUIContent(), testStyle8);		*/
			//Clear Slot
			GUI.SetNextControlName ("Cancel");
			if(catSelect&&cat4Selected==21)
			{
				if(GUI.Button(Rect(1001, 932, 114, 114), GUIContent(magicTextures[21],"Use Nothing For This Slot."),testStyle))
					cat4Selected=21;
			}
			else
			{
				if(GUI.Button(Rect(1001, 932, 114, 114), GUIContent(magicTextures[21],"Use Nothing For This Slot."),testStyle2))
					cat4Selected=21;
				GUI.Button(Rect(1001, 932, 114, 114), GUIContent(),testStyle7);			
			}
		}
//end Pool 4
	
	
//Begin Pool 5
		if(catSelected==2&&poolSelected==5)
		{
	//Pool 5 Line 1
		//Magic 1
			if(GameController.savedItems.magicUnlocked[0])
			{
				GUI.SetNextControlName ("magic1");
				if(catSelect&&cat5Selected==0)
				{	
					if(GUI.Button(Rect(496, 170, 114, 114), GUIContent(magicTextures[0], "Haste-\n\nThe hunter’s legs move with less effort allowing them to run like the wind."),testStyle)&&!weaponLoadout.useMagic[0])
					cat5Selected=0;
				}
				else
				{
					if(GUI.Button(Rect(496, 170, 114, 114), GUIContent(magicTextures[0], "Haste-\n\nThe hunter’s legs move with less effort allowing them to run like the wind."),testStyle2)&&!weaponLoadout.useMagic[0])
						cat5Selected=0;
					GUI.Button(Rect(496, 170, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(496, 170, 114, 114), GUIContent(), testStyle8);
		//Magic 2
			if(GameController.savedItems.magicUnlocked[1])
			{
				GUI.SetNextControlName ("magic2");
				if(catSelect&&cat5Selected==1)
				{
					if(GUI.Button(Rect(623, 170, 114, 114), GUIContent(magicTextures[1], "Heal-\n\nCall upon the soothing wind of ancestral healing magic, restoring some health in combat."),testStyle)&&!weaponLoadout.useMagic[1])
					cat5Selected=1;
				}
					else
				{
					if(GUI.Button(Rect(623, 170, 114, 114), GUIContent(magicTextures[1], "Heal-\n\nCall upon the soothing wind of ancestral healing magic, restoring some health in combat."),testStyle2)&&!weaponLoadout.useMagic[1])
						cat5Selected=1;
					GUI.Button(Rect(623, 170, 114, 114), GUIContent(),testStyle7);	
				}
						
			}
			else
				GUI.Button(Rect(623, 170, 114, 114), GUIContent(), testStyle8);
		//Magic 3
			if(GameController.savedItems.magicUnlocked[2])
			{
				GUI.SetNextControlName ("magic3");
				if(catSelect&&cat5Selected==2)
				{
					if(GUI.Button(Rect(750, 170, 114, 114), GUIContent(magicTextures[2], "Shield-\n\nCall upon a guardian spirit to protect you from damage for a short while."),testStyle)&&!weaponLoadout.useMagic[2])
					cat5Selected=2;
				}
				
				else
				{
					if(GUI.Button(Rect(750, 170, 114, 114), GUIContent(magicTextures[2], "Shield-\n\nCall upon a guardian spirit to protect you from damage for a short while."),testStyle2)&&!weaponLoadout.useMagic[2])
						cat5Selected=2;				
					GUI.Button(Rect(750, 170, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(750, 170, 114, 114), GUIContent(), testStyle8);
		//Magic 4
			if(GameController.savedItems.magicUnlocked[3])
			{
				
				if(catSelect&&cat5Selected==3)
				{
				GUI.SetNextControlName ("magic4");
					if(GUI.Button(Rect(877, 170, 114, 114), GUIContent(magicTextures[3], "Bloodlust-\n\nThis warcry feeds off the spirit of battle and seems to allow the hunter to replenish their health from their fallen foes."),testStyle)&&!weaponLoadout.useMagic[3])
						cat5Selected=3;
				}
				else
				{
					if(GUI.Button(Rect(877, 170, 114, 114), GUIContent(magicTextures[3], "Bloodlust-\n\nThis warcry feeds off the spirit of battle and seems to allow the hunter to replenish their health from their fallen foes."),testStyle2)&&!weaponLoadout.useMagic[3])
						cat5Selected=3;
					GUI.Button(Rect(877, 170, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(877, 170, 114, 114), GUIContent(), testStyle8);
		//Magic 5	
			if(GameController.savedItems.magicUnlocked[4])
			{	
				GUI.SetNextControlName ("magic5");
				if(catSelect&&cat5Selected==4)
				{	
					if(GUI.Button(Rect(1001, 170, 114, 114), GUIContent(magicTextures[4], "Rockstorm-\n\nCalls down a flurry of rocks to pummel your opponents from the sky."),testStyle)&&!weaponLoadout.useMagic[4])
						cat5Selected=4;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 170, 114, 114), GUIContent(magicTextures[4], "Rockstorm-\n\nCalls down a flurry of rocks to pummel your opponents from the sky."),testStyle2)&&!weaponLoadout.useMagic[4])
						cat5Selected=4;
					GUI.Button(Rect(1001, 170, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(1001, 170, 114, 114), GUIContent(), testStyle8);
	//Pool 5 Line 2
		//magic 6	
			if(GameController.savedItems.magicUnlocked[5])
			{
				GUI.SetNextControlName ("magic6");
				if(catSelect&&cat5Selected==5)
				{	
					if(GUI.Button(Rect(496, 297, 114, 114), GUIContent(magicTextures[5], "Fireball-\n\nAn explosive shout that summons a firey orb to bring explosive destruction to any in it's path."),testStyle)&&!weaponLoadout.useMagic[5])
						cat5Selected=5;
				}
				else
				{	
					if(GUI.Button(Rect(496, 297, 114, 114), GUIContent(magicTextures[5], "Fireball-\n\nAn explosive shout that summons a firey orb to bring explosive destruction to any in it's path."),testStyle2)&&!weaponLoadout.useMagic[5])
						cat5Selected=5;
					GUI.Button(Rect(496, 297, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(496, 297, 114, 114), GUIContent(), testStyle8);
		//magic 7
			if(GameController.savedItems.magicUnlocked[6])
			{	
				GUI.SetNextControlName ("magic7");
				if(catSelect&&cat5Selected==6)
				{	
					if(GUI.Button(Rect(623, 297, 114, 114), GUIContent(magicTextures[6], "Ice Blast-\n\nFires a beam of ice at your target, slowing them as they turn into a block of ice."),testStyle)&&!weaponLoadout.useMagic[6])
						cat5Selected=6;
				}
				else
				{	
					if(GUI.Button(Rect(623, 297, 114, 114), GUIContent(magicTextures[6], "Ice Blast-\n\nFires a beam of ice at your target, slowing them as they turn into a block of ice."),testStyle2)&&!weaponLoadout.useMagic[6])
						cat5Selected=6;
					GUI.Button(Rect(623, 297, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(623, 297, 114, 114), GUIContent(), testStyle8);			
		//magic 8
			if(GameController.savedItems.magicUnlocked[7])
			{	
				GUI.SetNextControlName ("magic8");
				if(catSelect&&cat5Selected==7)
				{	
					if(GUI.Button(Rect(750, 297, 114, 114), GUIContent(magicTextures[7], "Lightning-\n\nSurrounds the hunter in a ball of pure electricity stunning and damaging everything in the area as it grows larger."),testStyle)&&!weaponLoadout.useMagic[7])
						cat5Selected=7;
				}
				else
				{	
					if(GUI.Button(Rect(750, 297, 114, 114), GUIContent(magicTextures[7], "Lightning-\n\nSurrounds the hunter in a ball of pure electricity stunning and damaging everything in the area as it grows larger."),testStyle2)&&!weaponLoadout.useMagic[7])
						cat5Selected=7;
					GUI.Button(Rect(750, 297, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(750, 297, 114, 114), GUIContent(), testStyle8);

		//magic 9
			if(GameController.savedItems.magicUnlocked[8])
			{	
				GUI.SetNextControlName ("magic9");
				if(catSelect&&cat5Selected==8)
				{	
					if(GUI.Button(Rect(877, 297, 114, 114), GUIContent(magicTextures[8], "Fear-\n\nEnemies will be instilled with sheer terror causing them to flee for their lives while spirits torment their soul."),testStyle)&&!weaponLoadout.useMagic[8])
						cat5Selected=8;
				}
				else
				{	
					if(GUI.Button(Rect(877, 297, 114, 114), GUIContent(magicTextures[8], "Fear-\n\nEnemies will be instilled with sheer terror causing them to flee for their lives while spirits torment their soul."),testStyle2)&&!weaponLoadout.useMagic[8])
						cat5Selected=8;
					GUI.Button(Rect(877, 297, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(877, 297, 114, 114), GUIContent(), testStyle8);			
		
		//magic 10
			if(GameController.savedItems.magicUnlocked[9])
			{	
				GUI.SetNextControlName ("magic10");
				if(catSelect&&cat5Selected==9)
				{	
					if(GUI.Button(Rect(1001, 297, 114, 114), GUIContent(magicTextures[9], "Stun-\n\nA bellowing battlecry amplified by the spirits of a dozen ancestral hunters. Stuns and disorients all caught within it’s deafening range."),testStyle)&&!weaponLoadout.useMagic[9])
						cat5Selected=9;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 297, 114, 114), GUIContent(magicTextures[9], "Stun-\n\nA bellowing battlecry amplified by the spirits of a dozen ancestral hunters. Stuns and disorients all caught within it’s deafening range."),testStyle2)&&!weaponLoadout.useMagic[9])
						cat5Selected=9;
					GUI.Button(Rect(1001, 297, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(1001, 297, 114, 114), GUIContent(), testStyle8);	
				
	//Pool 5 Line 3
		//magic 11
			if(GameController.savedItems.magicUnlocked[10])
			{	
				GUI.SetNextControlName ("magic11");
				if(catSelect&&cat5Selected==10)
				{	
					if(GUI.Button(Rect(496, 424, 114, 114), GUIContent(magicTextures[10], "Summon Pterodactyl-\n\nThis warcry will summon a friendly Pterodactyl to fight by your side for as long as it is willing."),testStyle)&&!weaponLoadout.useMagic[10])
						cat5Selected=10;
				}
				else
				{	
					if(GUI.Button(Rect(496, 424, 114, 114), GUIContent(magicTextures[10], "Summon Pterodactyl-\n\nThis warcry will summon a friendly Pterodactyl to fight by your side for as long as it is willing."),testStyle2)&&!weaponLoadout.useMagic[10])
						cat5Selected=10;
					GUI.Button(Rect(496, 424, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(496, 424, 114, 114), GUIContent(), testStyle8);	
		
		//magic 12
			if(GameController.savedItems.magicUnlocked[11])
			{	
				GUI.SetNextControlName ("magic12");
				if(catSelect&&cat5Selected==11)
				{	
					if(GUI.Button(Rect(623, 424, 114, 114), GUIContent(magicTextures[11], "Summon Karate Master-\n\nGary the Dojo Master handed you a bottle of his favorite EZ-Bronze claiming if you ever need an ally in battle to call upon him with this."),testStyle)&&!weaponLoadout.useMagic[11])
						cat5Selected=11;
				}
				else
				{	
					if(GUI.Button(Rect(623, 424, 114, 114), GUIContent(magicTextures[11], "Summon Karate Master-\n\nGary the Dojo Master handed you a bottle of his favorite EZ-Bronze claiming if you ever need an ally in battle to call upon him with this."),testStyle2)&&!weaponLoadout.useMagic[11])
						cat5Selected=11;
					GUI.Button(Rect(623, 424, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(623, 424, 114, 114), GUIContent(), testStyle8);

		//magic 13
			if(GameController.savedItems.magicUnlocked[12])
			{	
				GUI.SetNextControlName ("magic13");
				if(catSelect&&cat5Selected==12)
				{	
					if(GUI.Button(Rect(750, 424, 114, 114), GUIContent(magicTextures[12], "Summon Triceratops-\n\nSome hunters have earned the trust of this powerful battering ram of an ally to help flatten out the battlefield."),testStyle)&&!weaponLoadout.useMagic[12])
						cat5Selected=12;
				}
				else
				{	
					if(GUI.Button(Rect(750, 424, 114, 114), GUIContent(magicTextures[12], "Summon Triceratops-\n\nSome hunters have earned the trust of this powerful battering ram of an ally to help flatten out the battlefield."),testStyle2)&&!weaponLoadout.useMagic[12])
						cat5Selected=12;
					GUI.Button(Rect(750, 424, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(750, 424, 114, 114), GUIContent(), testStyle8);

		//magic 14
			if(GameController.savedItems.magicUnlocked[13])
			{	
				GUI.SetNextControlName ("magic14");
				if(catSelect&&cat5Selected==13)
				{	
					if(GUI.Button(Rect(877, 424, 114, 114), GUIContent(magicTextures[13], "Summon T-Rex-\n\nVillage Shamans tell of whispers from the wind claiming hunters of legend were able to call upon even the most ferocious of beasts to fight by their side in battle."),testStyle)&&!weaponLoadout.useMagic[13])
						cat5Selected=13;
				}
				else
				{	
					if(GUI.Button(Rect(877, 424, 114, 114), GUIContent(magicTextures[13], "Summon T-Rex-\n\nVillage Shamans tell of whispers from the wind claiming hunters of legend were able to call upon even the most ferocious of beasts to fight by their side in battle."),testStyle2)&&!weaponLoadout.useMagic[13])
						cat5Selected=13;
					GUI.Button(Rect(877, 424, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(877, 424, 114, 114), GUIContent(), testStyle8);
			
		//magic 15
		//	if(GameController.savedItems.magicUnlocked[14])
		//	{	
		//		GUI.SetNextControlName ("magic15");
		//		if(catSelect&&cat5Selected==14)
		//		{	
		//			if(GUI.Button(Rect(1001, 424, 114, 114), GUIContent(magicTextures[14], "Magic 15"),testStyle)&&!weaponLoadout.useMagic[14])
		//				cat5Selected=14;
		//		}
		//		else
		//		{	
		//			if(GUI.Button(Rect(1001, 424, 114, 114), GUIContent(magicTextures[14], "Magic 15"),testStyle2)&&!weaponLoadout.useMagic[14])
		//				cat5Selected=14;
		//		}
		//	}
		//	else
		//		GUI.Button(Rect(1001, 424, 114, 114), GUIContent(), testStyle8);		
	//Pool 5 Line 4
/*		//magic 16
			if(GameController.savedItems.magicUnlocked[15])
			{	
				GUI.SetNextControlName ("magic16");
				if(catSelect&&cat5Selected==15)
				{	
					if(GUI.Button(Rect(496, 551, 114, 114), GUIContent(magicTextures[15], "Magic 16"),testStyle)&&!weaponLoadout.useMagic[15])
						cat5Selected=15;
				}
				else
				{	
					if(GUI.Button(Rect(496, 551, 114, 114), GUIContent(magicTextures[15], "Magic 16"),testStyle2)&&!weaponLoadout.useMagic[15])
						cat5Selected=15;
				}
			}
			else
				GUI.Button(Rect(496, 551, 114, 114), GUIContent(), testStyle8);
*/				
				
		//Clear Slot
			GUI.SetNextControlName ("Cancel");
			if(catSelect&&cat5Selected==21)
			{
				if(GUI.Button(Rect(1001, 932, 114, 114), GUIContent(magicTextures[21],"Use Nothing For This Slot."),testStyle))
					cat5Selected=21;
			}
			else
			{
				if(GUI.Button(Rect(1001, 932, 114, 114), GUIContent(magicTextures[21],"Use Nothing For This Slot."),testStyle2))
					cat5Selected=21;	
				GUI.Button(Rect(1001, 932, 114, 114), GUIContent(),testStyle7);			
			}
				
		}
//end Pool 5

//Begin Pool 6
		if(catSelected==2&&poolSelected==6)
		{
	//Pool 6 Line 1
		//Magic 1
			if(GameController.savedItems.magicUnlocked[0])
			{
				GUI.SetNextControlName ("magic1");
				if(catSelect&&cat6Selected==0)
				{	
					if(GUI.Button(Rect(496, 170, 114, 114), GUIContent(magicTextures[0], "Haste-\n\nThe hunter’s legs move with less effort allowing them to run like the wind."),testStyle)&&!weaponLoadout.useMagic[0])
					cat6Selected=0;
				}
				else
				{
					if(GUI.Button(Rect(496, 170, 114, 114), GUIContent(magicTextures[0], "Haste-\n\nThe hunter’s legs move with less effort allowing them to run like the wind."),testStyle2)&&!weaponLoadout.useMagic[0])
						cat6Selected=0;
					GUI.Button(Rect(496, 170, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(496, 170, 114, 114), GUIContent(), testStyle8);
		//Magic 2
			if(GameController.savedItems.magicUnlocked[1])
			{
				GUI.SetNextControlName ("magic2");
				if(catSelect&&cat6Selected==1)
				{
					if(GUI.Button(Rect(623, 170, 114, 114), GUIContent(magicTextures[1], "Heal-\n\nCall upon the soothing wind of ancestral healing magic, restoring some health in combat."),testStyle)&&!weaponLoadout.useMagic[1])
					cat6Selected=1;
				}
					else
				{
					if(GUI.Button(Rect(623, 170, 114, 114), GUIContent(magicTextures[1], "Heal-\n\nCall upon the soothing wind of ancestral healing magic, restoring some health in combat."),testStyle2)&&!weaponLoadout.useMagic[1])
						cat6Selected=1;
					GUI.Button(Rect(623, 170, 114, 114), GUIContent(),testStyle7);	
				}
						
			}
			else
				GUI.Button(Rect(623, 170, 114, 114), GUIContent(), testStyle8);
		//Magic 3
			if(GameController.savedItems.magicUnlocked[2])
			{
				GUI.SetNextControlName ("magic3");
				if(catSelect&&cat6Selected==2)
				{
					if(GUI.Button(Rect(750, 170, 114, 114), GUIContent(magicTextures[2], "Shield-\n\nCall upon a guardian spirit to protect you from damage for a short while."),testStyle)&&!weaponLoadout.useMagic[2])
					cat6Selected=2;
				}
				
				else
				{
					if(GUI.Button(Rect(750, 170, 114, 114), GUIContent(magicTextures[2], "Shield-\n\nCall upon a guardian spirit to protect you from damage for a short while."),testStyle2)&&!weaponLoadout.useMagic[2])
						cat6Selected=2;
					GUI.Button(Rect(750, 170, 114, 114), GUIContent(),testStyle7);		
				}
			}
			else
				GUI.Button(Rect(750, 170, 114, 114), GUIContent(), testStyle8);
		//Magic 4
			if(GameController.savedItems.magicUnlocked[3])
			{
				
				if(catSelect&&cat6Selected==3)
				{
				GUI.SetNextControlName ("magic4");
					if(GUI.Button(Rect(877, 170, 114, 114), GUIContent(magicTextures[3], "Bloodlust-\n\nThis warcry feeds off the spirit of battle and seems to allow the hunter to replenish their health from their fallen foes."),testStyle)&&!weaponLoadout.useMagic[3])
						cat6Selected=3;
				}
				else
				{
					if(GUI.Button(Rect(877, 170, 114, 114), GUIContent(magicTextures[3], "Bloodlust-\n\nThis warcry feeds off the spirit of battle and seems to allow the hunter to replenish their health from their fallen foes."),testStyle2)&&!weaponLoadout.useMagic[3])
						cat6Selected=3;
					GUI.Button(Rect(877, 170, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(877, 170, 114, 114), GUIContent(), testStyle8);
		//Magic 5	
			if(GameController.savedItems.magicUnlocked[4])
			{	
				GUI.SetNextControlName ("magic5");
				if(catSelect&&cat6Selected==4)
				{	
					if(GUI.Button(Rect(1001, 170, 114, 114), GUIContent(magicTextures[4], "Rockstorm-\n\nCalls down a flurry of rocks to pummel your opponents from the sky."),testStyle)&&!weaponLoadout.useMagic[4])
						cat6Selected=4;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 170, 114, 114), GUIContent(magicTextures[4], "Rockstorm-\n\nCalls down a flurry of rocks to pummel your opponents from the sky."),testStyle2)&&!weaponLoadout.useMagic[4])
						cat6Selected=4;
					GUI.Button(Rect(1001, 170, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(1001, 170, 114, 114), GUIContent(), testStyle8);
	//Pool 6 Line 2
		//magic 6	
			if(GameController.savedItems.magicUnlocked[5])
			{
				GUI.SetNextControlName ("magic6");
				if(catSelect&&cat6Selected==5)
				{	
					if(GUI.Button(Rect(496, 297, 114, 114), GUIContent(magicTextures[5], "Fireball-\n\nAn explosive shout that summons a firey orb to bring explosive destruction to any in it's path."),testStyle)&&!weaponLoadout.useMagic[5])
						cat6Selected=5;
				}
				else
				{	
					if(GUI.Button(Rect(496, 297, 114, 114), GUIContent(magicTextures[5], "Fireball-\n\nAn explosive shout that summons a firey orb to bring explosive destruction to any in it's path."),testStyle2)&&!weaponLoadout.useMagic[5])
						cat6Selected=5;
					GUI.Button(Rect(496, 297, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(496, 297, 114, 114), GUIContent(), testStyle8);
		//magic 7
			if(GameController.savedItems.magicUnlocked[6])
			{	
				GUI.SetNextControlName ("magic7");
				if(catSelect&&cat6Selected==6)
				{	
					if(GUI.Button(Rect(623, 297, 114, 114), GUIContent(magicTextures[6], "Ice Blast-\n\nFires a beam of ice at your target, slowing them as they turn into a block of ice."),testStyle)&&!weaponLoadout.useMagic[6])
						cat6Selected=6;
				}
				else
				{	
					if(GUI.Button(Rect(623, 297, 114, 114), GUIContent(magicTextures[6], "Ice Blast-\n\nFires a beam of ice at your target, slowing them as they turn into a block of ice."),testStyle2)&&!weaponLoadout.useMagic[6])
						cat6Selected=6;
					GUI.Button(Rect(623, 297, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(623, 297, 114, 114), GUIContent(), testStyle8);			
		//magic 8
			if(GameController.savedItems.magicUnlocked[7])
			{	
				GUI.SetNextControlName ("magic8");
				if(catSelect&&cat6Selected==7)
				{	
					if(GUI.Button(Rect(750, 297, 114, 114), GUIContent(magicTextures[7], "Lightning-\n\nSurrounds the hunter in a ball of pure electricity stunning and damaging everything in the area as it grows larger."),testStyle)&&!weaponLoadout.useMagic[7])
						cat6Selected=7;
				}
				else
				{	
					if(GUI.Button(Rect(750, 297, 114, 114), GUIContent(magicTextures[7], "Lightning-\n\nSurrounds the hunter in a ball of pure electricity stunning and damaging everything in the area as it grows larger."),testStyle2)&&!weaponLoadout.useMagic[7])
						cat6Selected=7;
					GUI.Button(Rect(750, 297, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(750, 297, 114, 114), GUIContent(), testStyle8);

		//magic 9
			if(GameController.savedItems.magicUnlocked[8])
			{	
				GUI.SetNextControlName ("magic9");
				if(catSelect&&cat6Selected==8)
				{	
					if(GUI.Button(Rect(877, 297, 114, 114), GUIContent(magicTextures[8], "Fear-\n\nEnemies will be instilled with sheer terror causing them to flee for their lives while spirits torment their soul."),testStyle)&&!weaponLoadout.useMagic[8])
						cat6Selected=8;
				}
				else
				{	
					if(GUI.Button(Rect(877, 297, 114, 114), GUIContent(magicTextures[8], "Fear-\n\nEnemies will be instilled with sheer terror causing them to flee for their lives while spirits torment their soul."),testStyle2)&&!weaponLoadout.useMagic[8])
						cat6Selected=8;
					GUI.Button(Rect(877, 297, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(877, 297, 114, 114), GUIContent(), testStyle8);			
		
		//magic 10
			if(GameController.savedItems.magicUnlocked[9])
			{	
				GUI.SetNextControlName ("magic10");
				if(catSelect&&cat6Selected==9)
				{	
					if(GUI.Button(Rect(1001, 297, 114, 114), GUIContent(magicTextures[9], "Stun-\n\nA bellowing battlecry amplified by the spirits of a dozen ancestral hunters. Stuns and disorients all caught within it’s deafening range."),testStyle)&&!weaponLoadout.useMagic[9])
						cat6Selected=9;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 297, 114, 114), GUIContent(magicTextures[9], "Stun-\n\nA bellowing battlecry amplified by the spirits of a dozen ancestral hunters. Stuns and disorients all caught within it’s deafening range."),testStyle2)&&!weaponLoadout.useMagic[9])
						cat6Selected=9;
					GUI.Button(Rect(1001, 297, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(1001, 297, 114, 114), GUIContent(), testStyle8);	
				
	//Pool 6 Line 3
		//magic 11
			if(GameController.savedItems.magicUnlocked[10])
			{	
				GUI.SetNextControlName ("magic11");
				if(catSelect&&cat6Selected==10)
				{	
					if(GUI.Button(Rect(496, 424, 114, 114), GUIContent(magicTextures[10], "Summon Pterodactyl-\n\nThis warcry will summon a friendly Pterodactyl to fight by your side for as long as it is willing."),testStyle)&&!weaponLoadout.useMagic[10])
						cat6Selected=10;
				}
				else
				{	
					if(GUI.Button(Rect(496, 424, 114, 114), GUIContent(magicTextures[10], "Summon Pterodactyl-\n\nThis warcry will summon a friendly Pterodactyl to fight by your side for as long as it is willing."),testStyle2)&&!weaponLoadout.useMagic[10])
						cat6Selected=10;
					GUI.Button(Rect(496, 424, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(496, 424, 114, 114), GUIContent(), testStyle8);	
		
		//magic 12
			if(GameController.savedItems.magicUnlocked[11])
			{	
				GUI.SetNextControlName ("magic12");
				if(catSelect&&cat6Selected==11)
				{	
					if(GUI.Button(Rect(623, 424, 114, 114), GUIContent(magicTextures[11], "Summon Karate Master-\n\nGary the Dojo Master handed you a bottle of his favorite EZ-Bronze claiming if you ever need an ally in battle to call upon him with this."),testStyle)&&!weaponLoadout.useMagic[11])
						cat6Selected=11;
				}
				else
				{	
					if(GUI.Button(Rect(623, 424, 114, 114), GUIContent(magicTextures[11], "Summon Karate Master-\n\nGary the Dojo Master handed you a bottle of his favorite EZ-Bronze claiming if you ever need an ally in battle to call upon him with this."),testStyle2)&&!weaponLoadout.useMagic[11])
						cat6Selected=11;
					GUI.Button(Rect(623, 424, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(623, 424, 114, 114), GUIContent(), testStyle8);

		//magic 13
			if(GameController.savedItems.magicUnlocked[12])
			{	
				GUI.SetNextControlName ("magic13");
				if(catSelect&&cat6Selected==12)
				{	
					if(GUI.Button(Rect(750, 424, 114, 114), GUIContent(magicTextures[12], "Summon Triceratops-\n\nSome hunters have earned the trust of this powerful battering ram of an ally to help flatten out the battlefield."),testStyle)&&!weaponLoadout.useMagic[12])
						cat6Selected=12;
				}
				else
				{	
					if(GUI.Button(Rect(750, 424, 114, 114), GUIContent(magicTextures[12], "Summon Triceratops-\n\nSome hunters have earned the trust of this powerful battering ram of an ally to help flatten out the battlefield."),testStyle2)&&!weaponLoadout.useMagic[12])
						cat6Selected=12;
					GUI.Button(Rect(750, 424, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(750, 424, 114, 114), GUIContent(), testStyle8);

		//magic 14
			if(GameController.savedItems.magicUnlocked[13])
			{	
				GUI.SetNextControlName ("magic14");
				if(catSelect&&cat6Selected==13)
				{	
					if(GUI.Button(Rect(877, 424, 114, 114), GUIContent(magicTextures[13], "Summon T-Rex-\n\nVillage Shamans tell of whispers from the wind claiming hunters of legend were able to call upon even the most ferocious of beasts to fight by their side in battle."),testStyle)&&!weaponLoadout.useMagic[13])
						cat6Selected=13;
				}
				else
				{	
					if(GUI.Button(Rect(877, 424, 114, 114), GUIContent(magicTextures[13], "Summon T-Rex-\n\nVillage Shamans tell of whispers from the wind claiming hunters of legend were able to call upon even the most ferocious of beasts to fight by their side in battle."),testStyle2)&&!weaponLoadout.useMagic[13])
						cat6Selected=13;
					GUI.Button(Rect(877, 424, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(877, 424, 114, 114), GUIContent(), testStyle8);
			
		//magic 15
		//	if(GameController.savedItems.magicUnlocked[14])
		//	{	
		//		GUI.SetNextControlName ("magic15");
		//		if(catSelect&&cat6Selected==14)
		//		{	
		//			if(GUI.Button(Rect(1001, 424, 114, 114), GUIContent(magicTextures[14], "Magic 15"),testStyle)&&!weaponLoadout.useMagic[14])
		//				cat6Selected=14;
		//		}
		//		else
		//		{	
		//			if(GUI.Button(Rect(1001, 424, 114, 114), GUIContent(magicTextures[14], "Magic 15"),testStyle2)&&!weaponLoadout.useMagic[14])
		//				cat6Selected=14;
		//		}
		//	}
		//	else
		//		GUI.Button(Rect(1001, 424, 114, 114), GUIContent(), testStyle8);		
	//Pool 6 Line 4
/*		//magic 16
			if(GameController.savedItems.magicUnlocked[15])
			{	
				GUI.SetNextControlName ("magic16");
				if(catSelect&&cat6Selected==15)
				{	
					if(GUI.Button(Rect(496, 551, 114, 114), GUIContent(magicTextures[15], "Magic 16"),testStyle)&&!weaponLoadout.useMagic[15])
						cat6Selected=15;
				}
				else
				{	
					if(GUI.Button(Rect(496, 551, 114, 114), GUIContent(magicTextures[15], "Magic 16"),testStyle2)&&!weaponLoadout.useMagic[15])
						cat6Selected=15;
				}
			}
			else
				GUI.Button(Rect(496, 551, 114, 114), GUIContent(), testStyle8);
*/				
		//Clear Slot
			GUI.SetNextControlName ("Cancel");
			if(catSelect&&cat6Selected==21)
			{
				if(GUI.Button(Rect(1001, 932, 114, 114), GUIContent(magicTextures[21],"Use Nothing For This Slot."),testStyle))
					cat6Selected=21;
			}
			else
			{
				if(GUI.Button(Rect(1001, 932, 114, 114), GUIContent(magicTextures[21],"Use Nothing For This Slot."),testStyle2))
					cat6Selected=21;	
				GUI.Button(Rect(1001, 932, 114, 114), GUIContent(),testStyle7);	
			}
				
		}
//end Pool 6



//Begin Pool 7
		if(catSelected==2&&poolSelected==7)
		{
	//Pool 7 Line 1
		//Magic 1
			if(GameController.savedItems.magicUnlocked[0])
			{
				GUI.SetNextControlName ("magic1");
				if(catSelect&&cat7Selected==0)
				{	
					if(GUI.Button(Rect(496, 170, 114, 114), GUIContent(magicTextures[0], "Haste-\n\nThe hunter’s legs move with less effort allowing them to run like the wind."),testStyle)&&!weaponLoadout.useMagic[0])
					cat7Selected=0;
				}
				else
				{
					if(GUI.Button(Rect(496, 170, 114, 114), GUIContent(magicTextures[0], "Haste-\n\nThe hunter’s legs move with less effort allowing them to run like the wind."),testStyle2)&&!weaponLoadout.useMagic[0])
						cat7Selected=0;
					GUI.Button(Rect(496, 170, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(496, 170, 114, 114), GUIContent(), testStyle8);
		//Magic 2
			if(GameController.savedItems.magicUnlocked[1])
			{
				GUI.SetNextControlName ("magic2");
				if(catSelect&&cat7Selected==1)
				{
					if(GUI.Button(Rect(623, 170, 114, 114), GUIContent(magicTextures[1], "Heal-\n\nCall upon the soothing wind of ancestral healing magic, restoring some health in combat."),testStyle)&&!weaponLoadout.useMagic[1])
					cat7Selected=1;
				}
					else
				{
					if(GUI.Button(Rect(623, 170, 114, 114), GUIContent(magicTextures[1], "Heal-\n\nCall upon the soothing wind of ancestral healing magic, restoring some health in combat."),testStyle2)&&!weaponLoadout.useMagic[1])
						cat7Selected=1;
					GUI.Button(Rect(623, 170, 114, 114), GUIContent(),testStyle7);	
				}
						
			}
			else
				GUI.Button(Rect(623, 170, 114, 114), GUIContent(), testStyle8);
		//Magic 3
			if(GameController.savedItems.magicUnlocked[2])
			{
				GUI.SetNextControlName ("magic3");
				if(catSelect&&cat7Selected==2)
				{
					if(GUI.Button(Rect(750, 170, 114, 114), GUIContent(magicTextures[2], "Shield-\n\nCall upon a guardian spirit to protect you from damage for a short while."),testStyle)&&!weaponLoadout.useMagic[2])
					cat7Selected=2;
				}
				
				else
				{
					if(GUI.Button(Rect(750, 170, 114, 114), GUIContent(magicTextures[2], "Shield-\n\nCall upon a guardian spirit to protect you from damage for a short while."),testStyle2)&&!weaponLoadout.useMagic[2])
						cat7Selected=2;				
					GUI.Button(Rect(750, 170, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(750, 170, 114, 114), GUIContent(), testStyle8);
		//Magic 4
			if(GameController.savedItems.magicUnlocked[3])
			{
				
				if(catSelect&&cat7Selected==3)
				{
				GUI.SetNextControlName ("magic4");
					if(GUI.Button(Rect(877, 170, 114, 114), GUIContent(magicTextures[3], "Bloodlust-\n\nThis warcry feeds off the spirit of battle and seems to allow the hunter to replenish their health from their fallen foes."),testStyle)&&!weaponLoadout.useMagic[3])
						cat7Selected=3;
				}
				else
				{
					if(GUI.Button(Rect(877, 170, 114, 114), GUIContent(magicTextures[3], "Bloodlust-\n\nThis warcry feeds off the spirit of battle and seems to allow the hunter to replenish their health from their fallen foes."),testStyle2)&&!weaponLoadout.useMagic[3])
						cat7Selected=3;
					GUI.Button(Rect(877, 170, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(877, 170, 114, 114), GUIContent(), testStyle8);
		//Magic 5	
			if(GameController.savedItems.magicUnlocked[4])
			{	
				GUI.SetNextControlName ("magic5");
				if(catSelect&&cat7Selected==4)
				{	
					if(GUI.Button(Rect(1001, 170, 114, 114), GUIContent(magicTextures[4], "Rockstorm-\n\nCalls down a flurry of rocks to pummel your opponents from the sky."),testStyle)&&!weaponLoadout.useMagic[4])
						cat7Selected=4;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 170, 114, 114), GUIContent(magicTextures[4], "Rockstorm-\n\nCalls down a flurry of rocks to pummel your opponents from the sky."),testStyle2)&&!weaponLoadout.useMagic[4])
						cat7Selected=4;
					GUI.Button(Rect(1001, 170, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(1001, 170, 114, 114), GUIContent(), testStyle8);
	//Pool 7 Line 2
		//magic 6	
			if(GameController.savedItems.magicUnlocked[5])
			{
				GUI.SetNextControlName ("magic6");
				if(catSelect&&cat7Selected==5)
				{	
					if(GUI.Button(Rect(496, 297, 114, 114), GUIContent(magicTextures[5], "Fireball-\n\nAn explosive shout that summons a firey orb to bring explosive destruction to any in it's path."),testStyle)&&!weaponLoadout.useMagic[5])
						cat7Selected=5;
				}
				else
				{	
					if(GUI.Button(Rect(496, 297, 114, 114), GUIContent(magicTextures[5], "Fireball-\n\nAn explosive shout that summons a firey orb to bring explosive destruction to any in it's path."),testStyle2)&&!weaponLoadout.useMagic[5])
						cat7Selected=5;
					GUI.Button(Rect(496, 297, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(496, 297, 114, 114), GUIContent(), testStyle8);
		//magic 7
			if(GameController.savedItems.magicUnlocked[6])
			{	
				GUI.SetNextControlName ("magic7");
				if(catSelect&&cat7Selected==6)
				{	
					if(GUI.Button(Rect(623, 297, 114, 114), GUIContent(magicTextures[6], "Ice Blast-\n\nFires a beam of ice at your target, slowing them as they turn into a block of ice."),testStyle)&&!weaponLoadout.useMagic[6])
						cat7Selected=6;
				}
				else
				{	
					if(GUI.Button(Rect(623, 297, 114, 114), GUIContent(magicTextures[6], "Ice Blast-\n\nFires a beam of ice at your target, slowing them as they turn into a block of ice."),testStyle2)&&!weaponLoadout.useMagic[6])
						cat7Selected=6;
					GUI.Button(Rect(623, 297, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(623, 297, 114, 114), GUIContent(), testStyle8);			
		//magic 8
			if(GameController.savedItems.magicUnlocked[7])
			{	
				GUI.SetNextControlName ("magic8");
				if(catSelect&&cat7Selected==7)
				{	
					if(GUI.Button(Rect(750, 297, 114, 114), GUIContent(magicTextures[7], "Lightning-\n\nSurrounds the hunter in a ball of pure electricity stunning and damaging everything in the area as it grows larger."),testStyle)&&!weaponLoadout.useMagic[7])
						cat7Selected=7;
				}
				else
				{	
					if(GUI.Button(Rect(750, 297, 114, 114), GUIContent(magicTextures[7], "Lightning-\n\nSurrounds the hunter in a ball of pure electricity stunning and damaging everything in the area as it grows larger."),testStyle2)&&!weaponLoadout.useMagic[7])
						cat7Selected=7;
					GUI.Button(Rect(750, 297, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(750, 297, 114, 114), GUIContent(), testStyle8);

		//magic 9
			if(GameController.savedItems.magicUnlocked[8])
			{	
				GUI.SetNextControlName ("magic9");
				if(catSelect&&cat7Selected==8)
				{	
					if(GUI.Button(Rect(877, 297, 114, 114), GUIContent(magicTextures[8], "Fear-\n\nEnemies will be instilled with sheer terror causing them to flee for their lives while spirits torment their soul."),testStyle)&&!weaponLoadout.useMagic[8])
						cat7Selected=8;
				}
				else
				{	
					if(GUI.Button(Rect(877, 297, 114, 114), GUIContent(magicTextures[8], "Fear-\n\nEnemies will be instilled with sheer terror causing them to flee for their lives while spirits torment their soul."),testStyle2)&&!weaponLoadout.useMagic[8])
						cat7Selected=8;
					GUI.Button(Rect(877, 297, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(877, 297, 114, 114), GUIContent(), testStyle8);			
		
		//magic 10
			if(GameController.savedItems.magicUnlocked[9])
			{	
				GUI.SetNextControlName ("magic10");
				if(catSelect&&cat7Selected==9)
				{	
					if(GUI.Button(Rect(1001, 297, 114, 114), GUIContent(magicTextures[9], "Stun-\n\nA bellowing battlecry amplified by the spirits of a dozen ancestral hunters. Stuns and disorients all caught within it’s deafening range."),testStyle)&&!weaponLoadout.useMagic[9])
						cat7Selected=9;
				}
				else
				{	
					if(GUI.Button(Rect(1001, 297, 114, 114), GUIContent(magicTextures[9], "Stun-\n\nA bellowing battlecry amplified by the spirits of a dozen ancestral hunters. Stuns and disorients all caught within it’s deafening range."),testStyle2)&&!weaponLoadout.useMagic[9])
						cat7Selected=9;
					GUI.Button(Rect(1001, 297, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(1001, 297, 114, 114), GUIContent(), testStyle8);	
				
	//Pool 7 Line 3
		//magic 11
			if(GameController.savedItems.magicUnlocked[10])
			{	
				GUI.SetNextControlName ("magic11");
				if(catSelect&&cat7Selected==10)
				{	
					if(GUI.Button(Rect(496, 424, 114, 114), GUIContent(magicTextures[10], "Summon Pterodactyl-\n\nThis warcry will summon a friendly Pterodactyl to fight by your side for as long as it is willing."),testStyle)&&!weaponLoadout.useMagic[10])
						cat7Selected=10;
				}
				else
				{	
					if(GUI.Button(Rect(496, 424, 114, 114), GUIContent(magicTextures[10], "Summon Pterodactyl-\n\nThis warcry will summon a friendly Pterodactyl to fight by your side for as long as it is willing."),testStyle2)&&!weaponLoadout.useMagic[10])
						cat7Selected=10;
					GUI.Button(Rect(496, 424, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(496, 424, 114, 114), GUIContent(), testStyle8);	
		
		//magic 12
			if(GameController.savedItems.magicUnlocked[11])
			{	
				GUI.SetNextControlName ("magic12");
				if(catSelect&&cat7Selected==11)
				{	
					if(GUI.Button(Rect(623, 424, 114, 114), GUIContent(magicTextures[11], "Summon Karate Master-\n\nGary the Dojo Master handed you a bottle of his favorite EZ-Bronze claiming if you ever need an ally in battle to call upon him with this."),testStyle)&&!weaponLoadout.useMagic[11])
						cat7Selected=11;
				}
				else
				{	
					if(GUI.Button(Rect(623, 424, 114, 114), GUIContent(magicTextures[11], "Summon Karate Master-\n\nGary the Dojo Master handed you a bottle of his favorite EZ-Bronze claiming if you ever need an ally in battle to call upon him with this."),testStyle2)&&!weaponLoadout.useMagic[11])
						cat7Selected=11;
					GUI.Button(Rect(623, 424, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(623, 424, 114, 114), GUIContent(), testStyle8);

		//magic 13
			if(GameController.savedItems.magicUnlocked[12])
			{	
				GUI.SetNextControlName ("magic13");
				if(catSelect&&cat7Selected==12)
				{	
					if(GUI.Button(Rect(750, 424, 114, 114), GUIContent(magicTextures[12], "Summon Triceratops-\n\nSome hunters have earned the trust of this powerful battering ram of an ally to help flatten out the battlefield."),testStyle)&&!weaponLoadout.useMagic[12])
						cat7Selected=12;
				}
				else
				{	
					if(GUI.Button(Rect(750, 424, 114, 114), GUIContent(magicTextures[12], "Summon Triceratops-\n\nSome hunters have earned the trust of this powerful battering ram of an ally to help flatten out the battlefield."),testStyle2)&&!weaponLoadout.useMagic[12])
						cat7Selected=12;
					GUI.Button(Rect(750, 424, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(750, 424, 114, 114), GUIContent(), testStyle8);

		//magic 14
			if(GameController.savedItems.magicUnlocked[13])
			{	
				GUI.SetNextControlName ("magic14");
				if(catSelect&&cat7Selected==13)
				{	
					if(GUI.Button(Rect(877, 424, 114, 114), GUIContent(magicTextures[13], "Summon T-Rex-\n\nVillage Shamans tell of whispers from the wind claiming hunters of legend were able to call upon even the most ferocious of beasts to fight by their side in battle."),testStyle)&&!weaponLoadout.useMagic[13])
						cat7Selected=13;
				}
				else
				{	
					if(GUI.Button(Rect(877, 424, 114, 114), GUIContent(magicTextures[13], "Summon T-Rex-\n\nVillage Shamans tell of whispers from the wind claiming hunters of legend were able to call upon even the most ferocious of beasts to fight by their side in battle."),testStyle2)&&!weaponLoadout.useMagic[13])
						cat7Selected=13;
					GUI.Button(Rect(877, 424, 114, 114), GUIContent(),testStyle7);	
				}
			}
			else
				GUI.Button(Rect(877, 424, 114, 114), GUIContent(), testStyle8);
			
		//magic 15
		//	if(GameController.savedItems.magicUnlocked[14])
		//	{	
		//		GUI.SetNextControlName ("magic15");
		//		if(catSelect&&cat7Selected==14)
		//		{	
		//			if(GUI.Button(Rect(1001, 424, 114, 114), GUIContent(magicTextures[14], "Magic 15"),testStyle)&&!weaponLoadout.useMagic[14])
		//				cat7Selected=14;
		//		}
		//		else
		//		{	
		//			if(GUI.Button(Rect(1001, 424, 114, 114), GUIContent(magicTextures[14], "Magic 15"),testStyle2)&&!weaponLoadout.useMagic[14])
		//				cat7Selected=14;
		//		}
		//	}
		//	else
		//		GUI.Button(Rect(1001, 424, 114, 114), GUIContent(), testStyle8);		
	//Pool 7 Line 4
/*		//magic 16
			if(GameController.savedItems.magicUnlocked[15])
			{	
				GUI.SetNextControlName ("magic16");
				if(catSelect&&cat7Selected==15)
				{	
					if(GUI.Button(Rect(496, 551, 114, 114), GUIContent(magicTextures[15], "Magic 16"),testStyle)&&!weaponLoadout.useMagic[15])
						cat7Selected=15;
				}
				else
				{	
					if(GUI.Button(Rect(496, 551, 114, 114), GUIContent(magicTextures[15], "Magic 16"),testStyle2)&&!weaponLoadout.useMagic[15])
						cat7Selected=15;
				}
			}
			else
				GUI.Button(Rect(496, 551, 114, 114), GUIContent(), testStyle8);
*/				
		//Clear Slot
			GUI.SetNextControlName ("Cancel");
			if(catSelect&&cat7Selected==21)
			{
				if(GUI.Button(Rect(1001, 932, 114, 114), GUIContent(magicTextures[21],"Use Nothing For This Slot."),testStyle))
					cat7Selected=21;
			}
			else
			{
				if(GUI.Button(Rect(1001, 932, 114, 114), GUIContent(magicTextures[21],"Use Nothing For This Slot."),testStyle2))
					cat7Selected=21;	
				GUI.Button(Rect(1001, 932, 114, 114), GUIContent(),testStyle7);	
			}
				
		}
//end Pool 7

	}


//GUI Tooltip
	if (GUI.tooltip != "")
		GUI.Label (Rect (1180, 180,380,860), GUI.tooltip, toolTipStyle);
		
		
//Buttons
	if(weaponLoadout.weaponLoadoutMenu)
	{
		GUI.Button(new Rect(1200, 920, 262,52), aButton, buttonStyle);
		GUI.Button(new Rect(1280, 920,130,52), aButtonText, aButtonStyle);
		if(GUI.Button(new Rect(1200, 990, 262,52), bButton, buttonStyle)||((Input.GetKeyDown("joystick button 1")&&!catSelect))||GUI.Button(new Rect(1280, 990,127,50), bButtonText, bButtonStyle)&&weaponLoadout.weaponLoadoutMenu)
		{
			ItemsToSave.itemsToSave.SaveToFile();
			weaponLoadout.weaponLoadoutMenu=false;
		}
	}
}

function MagicTrueFalse()
{
	if(cat4SelectedPrev==0||cat5SelectedPrev==0||cat6SelectedPrev==0||cat7SelectedPrev==0)
		weaponLoadout.useMagic[0]=true;
	else
		weaponLoadout.useMagic[0]=false;
		
	if(cat4SelectedPrev==1||cat5SelectedPrev==1||cat6SelectedPrev==1||cat7SelectedPrev==1)
		weaponLoadout.useMagic[1]=true;
	else
		weaponLoadout.useMagic[1]=false;
		
	if(cat4SelectedPrev==2||cat5SelectedPrev==2||cat6SelectedPrev==2||cat7SelectedPrev==2)
		weaponLoadout.useMagic[2]=true;
	else
		weaponLoadout.useMagic[2]=false;
		
	if(cat4SelectedPrev==3||cat5SelectedPrev==3||cat6SelectedPrev==3||cat7SelectedPrev==3)
		weaponLoadout.useMagic[3]=true;
	else
		weaponLoadout.useMagic[3]=false;
		
	if(cat4SelectedPrev==4||cat5SelectedPrev==4||cat6SelectedPrev==4||cat7SelectedPrev==4)
		weaponLoadout.useMagic[4]=true;
	else
		weaponLoadout.useMagic[4]=false;
		
	if(cat4SelectedPrev==5||cat5SelectedPrev==5||cat6SelectedPrev==5||cat7SelectedPrev==5)
		weaponLoadout.useMagic[5]=true;
	else
		weaponLoadout.useMagic[5]=false;
		
	if(cat4SelectedPrev==6||cat5SelectedPrev==6||cat6SelectedPrev==6||cat7SelectedPrev==6)
		weaponLoadout.useMagic[6]=true;
	else
		weaponLoadout.useMagic[6]=false;
		
	if(cat4SelectedPrev==7||cat5SelectedPrev==7||cat6SelectedPrev==7||cat7SelectedPrev==7)
		weaponLoadout.useMagic[7]=true;
	else
		weaponLoadout.useMagic[7]=false;
		
	if(cat4SelectedPrev==8||cat5SelectedPrev==8||cat6SelectedPrev==8||cat7SelectedPrev==8)
		weaponLoadout.useMagic[8]=true;
	else
		weaponLoadout.useMagic[8]=false;
		
	if(cat4SelectedPrev==9||cat5SelectedPrev==9||cat6SelectedPrev==9||cat7SelectedPrev==9)
		weaponLoadout.useMagic[9]=true;
	else
		weaponLoadout.useMagic[9]=false;
		
	if(cat4SelectedPrev==10||cat5SelectedPrev==10||cat6SelectedPrev==10||cat7SelectedPrev==10)
		weaponLoadout.useMagic[10]=true;
	else
		weaponLoadout.useMagic[10]=false;
		
	if(cat4SelectedPrev==11||cat5SelectedPrev==11||cat6SelectedPrev==11||cat7SelectedPrev==11)
		weaponLoadout.useMagic[11]=true;
	else
		weaponLoadout.useMagic[11]=false;
	
	if(cat4SelectedPrev==12||cat5SelectedPrev==12||cat6SelectedPrev==12||cat7SelectedPrev==12)
		weaponLoadout.useMagic[12]=true;
	else
		weaponLoadout.useMagic[12]=false;	
	
	if(cat4SelectedPrev==13||cat5SelectedPrev==13||cat6SelectedPrev==13||cat7SelectedPrev==13)
		weaponLoadout.useMagic[13]=true;
	else
		weaponLoadout.useMagic[13]=false;
		
	if(cat4SelectedPrev==14||cat5SelectedPrev==14||cat6SelectedPrev==14||cat7SelectedPrev==14)
		weaponLoadout.useMagic[14]=true;
	else
		weaponLoadout.useMagic[14]=false;
	if(cat4SelectedPrev==15||cat5SelectedPrev==15||cat6SelectedPrev==15||cat7SelectedPrev==15)
		weaponLoadout.useMagic[15]=true;
	else
		weaponLoadout.useMagic[15]=false;
}

function WeaponTrueFalse()
{
	if((cat1SelectedPrev==1||cat2SelectedPrev==1||cat3SelectedPrev==1)&&GameController.savedItems.weaponsUnlocked[0])
		weaponLoadout.useRocks = true;
	else
		weaponLoadout.useRocks = false;
		
	if(cat1SelectedPrev==2||cat2SelectedPrev==2||cat3SelectedPrev==2)
		weaponLoadout.useSpear = true;
	else
		weaponLoadout.useSpear = false;
		
	if(cat1SelectedPrev==3||cat2SelectedPrev==3||cat3SelectedPrev==3)
		weaponLoadout.useSling = true;
	else
		weaponLoadout.useSling = false;
		
	if(cat1SelectedPrev==4||cat2SelectedPrev==4||cat3SelectedPrev==4)
		weaponLoadout.useBow = true;
	else
		weaponLoadout.useBow = false;
		
	if(cat1SelectedPrev==5||cat2SelectedPrev==5||cat3SelectedPrev==5)
		weaponLoadout.useSword = true;
	else
		weaponLoadout.useSword = false;
		
	if(cat1SelectedPrev==6||cat2SelectedPrev==6||cat3SelectedPrev==6)
		weaponLoadout.useItem[0] = true;
	else
		weaponLoadout.useItem[0] = false;
		
	if(cat1SelectedPrev==7||cat2SelectedPrev==7||cat3SelectedPrev==7)
		weaponLoadout.useItem[1] = true;
	else
		weaponLoadout.useItem[1] = false;
		
	if(cat1SelectedPrev==8||cat2SelectedPrev==8||cat3SelectedPrev==8)
		weaponLoadout.useItem[2] = true;
	else
		weaponLoadout.useItem[2] = false;
		
	if(cat1SelectedPrev==9||cat2SelectedPrev==9||cat3SelectedPrev==9)
		weaponLoadout.useItem[3] = true;
	else
		weaponLoadout.useItem[3] = false;
	
	if(cat1SelectedPrev==10||cat2SelectedPrev==10||cat3SelectedPrev==10)
		weaponLoadout.useItem[4] = true;
	else
		weaponLoadout.useItem[4] = false;
	
	if(cat1SelectedPrev==11||cat2SelectedPrev==11||cat3SelectedPrev==11)
		weaponLoadout.useItem[5] = true;
	else
		weaponLoadout.useItem[5] = false;
		
	if(cat1SelectedPrev==12||cat2SelectedPrev==12||cat3SelectedPrev==12)
		weaponLoadout.useItem[6] = true;
	else
		weaponLoadout.useItem[6] = false;
	
	if(cat1SelectedPrev==13||cat2SelectedPrev==13||cat3SelectedPrev==13)
		weaponLoadout.useItem[7] = true;
	else
		weaponLoadout.useItem[7] = false;
	
	if(cat1SelectedPrev==14||cat2SelectedPrev==14||cat3SelectedPrev==14)
		weaponLoadout.useItem[8] = true;
	else
		weaponLoadout.useItem[8] = false;
	
	if(cat1SelectedPrev==15||cat2SelectedPrev==15||cat3SelectedPrev==15)
		weaponLoadout.useItem[9] = true;
	else
		weaponLoadout.useItem[9] = false;
		
	if(cat1SelectedPrev==16||cat2SelectedPrev==16||cat3SelectedPrev==16)
		weaponLoadout.useItem[10] = true;
	else
		weaponLoadout.useItem[10] = false;
		
	if(cat1SelectedPrev==17||cat2SelectedPrev==17||cat3SelectedPrev==17)
		weaponLoadout.useItem[11] = true;
	else
		weaponLoadout.useItem[11] = false;
		
	if(cat1SelectedPrev==18||cat2SelectedPrev==18||cat3SelectedPrev==18)
		weaponLoadout.useItem[12] = true;
	else
		weaponLoadout.useItem[12] = false;
		
	if(cat1SelectedPrev==19||cat2SelectedPrev==19||cat3SelectedPrev==19)
		weaponLoadout.useItem[13] = true;
	else
		weaponLoadout.useItem[13] = false;
		
	if(cat1SelectedPrev==20||cat2SelectedPrev==20||cat3SelectedPrev==20)
		weaponLoadout.useItem[14] = true;
	else
		weaponLoadout.useItem[14] = false;
}

function Category1()
{
	//right
	if((i<(GameController.savedItems.weaponsUnlocked.length+1))&&(Input.GetButtonDown("Right")||Input.GetAxis("DPadLeftRight")>0||Input.GetAxis("LThumbstick Left/Right")>0)&&!toggleLeftRight&&!toggleLeftRight2)
	{
		toggleLeftRight=true;
		toggleLeftRight2=true;
		if(i<20)
		{
			if (GameController.savedItems.weaponsUnlocked[i]&&((i+1)!=cat1Selected)&&((i+1)!=cat2Selected)&&((i+1)!=cat3Selected))
				i++;
			else if (GameController.savedItems.weaponsUnlocked[i+1]&&((i+2)!=cat1Selected)&&((i+2)!=cat2Selected)&&((i+2)!=cat3Selected))
				i=i+2;
			else if ((i+3<GameController.savedItems.weaponsUnlocked.length+1)&&GameController.savedItems.weaponsUnlocked[i+2]&&((i+3)!=cat1Selected)&&((i+3)!=cat2Selected)&&((i+3)!=cat3Selected))
				i=i+3;
			else if ((i+4<GameController.savedItems.weaponsUnlocked.length+1)&&GameController.savedItems.weaponsUnlocked[i+3]&&((i+4)!=cat1Selected)&&((i+4)!=cat2Selected)&&((i+4)!=cat3Selected))
				i=i+4;
			else if ((i+5<GameController.savedItems.weaponsUnlocked.length+1)&&GameController.savedItems.weaponsUnlocked[i+4]&&((i+5)!=cat1Selected)&&((i+5)!=cat2Selected)&&((i+5)!=cat3Selected))
				i=i+5;
			else if ((i+6<GameController.savedItems.weaponsUnlocked.length+1)&&GameController.savedItems.weaponsUnlocked[i+5]&&((i+6)!=cat1Selected)&&((i+6)!=cat2Selected)&&((i+6)!=cat3Selected))
				i=i+6;
			else if ((i+7<GameController.savedItems.weaponsUnlocked.length+1)&&GameController.savedItems.weaponsUnlocked[i+6]&&((i+7)!=cat1Selected)&&((i+7)!=cat2Selected)&&((i+7)!=cat3Selected))
				i=i+7;
			else if ((i+8<GameController.savedItems.weaponsUnlocked.length+1)&&GameController.savedItems.weaponsUnlocked[i+7]&&((i+8)!=cat1Selected)&&((i+8)!=cat2Selected)&&((i+8)!=cat3Selected))
				i=i+8;
			else if ((i+9<GameController.savedItems.weaponsUnlocked.length+1)&&GameController.savedItems.weaponsUnlocked[i+8]&&((i+9)!=cat1Selected)&&((i+9)!=cat2Selected)&&((i+9)!=cat3Selected))
				i=i+9;
			else if ((i+10<GameController.savedItems.weaponsUnlocked.length+1)&&GameController.savedItems.weaponsUnlocked[i+9]&&((i+10)!=cat1Selected)&&((i+10)!=cat2Selected)&&((i+10)!=cat3Selected))
				i=i+10;
			else if ((i+11<GameController.savedItems.weaponsUnlocked.length+1)&&GameController.savedItems.weaponsUnlocked[i+10]&&((i+11)!=cat1Selected)&&((i+11)!=cat2Selected)&&((i+11)!=cat3Selected))
				i=i+11;
			else if ((i+12<GameController.savedItems.weaponsUnlocked.length+1)&&GameController.savedItems.weaponsUnlocked[i+11]&&((i+12)!=cat1Selected)&&((i+12)!=cat2Selected)&&((i+12)!=cat3Selected))
				i=i+12;
			else if ((i+13<GameController.savedItems.weaponsUnlocked.length+1)&&GameController.savedItems.weaponsUnlocked[i+12]&&((i+13)!=cat1Selected)&&((i+13)!=cat2Selected)&&((i+13)!=cat3Selected))
				i=i+13;
			else if ((i+14<GameController.savedItems.weaponsUnlocked.length+1)&&GameController.savedItems.weaponsUnlocked[i+13]&&((i+14)!=cat1Selected)&&((i+14)!=cat2Selected)&&((i+14)!=cat3Selected))
				i=i+14;
			else if ((i+15<GameController.savedItems.weaponsUnlocked.length+1)&&GameController.savedItems.weaponsUnlocked[i+14]&&((i+15)!=cat1Selected)&&((i+15)!=cat2Selected)&&((i+15)!=cat3Selected))
				i=i+15;
			else if ((i+16<GameController.savedItems.weaponsUnlocked.length+1)&&GameController.savedItems.weaponsUnlocked[i+15]&&((i+16)!=cat1Selected)&&((i+16)!=cat2Selected)&&((i+16)!=cat3Selected))
				i=i+16;
			else if ((i+17<GameController.savedItems.weaponsUnlocked.length+1)&&GameController.savedItems.weaponsUnlocked[i+16]&&((i+17)!=cat1Selected)&&((i+17)!=cat2Selected)&&((i+17)!=cat3Selected))
				i=i+17;
			else if ((i+18<GameController.savedItems.weaponsUnlocked.length+1)&&GameController.savedItems.weaponsUnlocked[i+17]&&((i+18)!=cat1Selected)&&((i+18)!=cat2Selected)&&((i+18)!=cat3Selected))
				i=i+18;
			else if ((i+19<GameController.savedItems.weaponsUnlocked.length+1)&&GameController.savedItems.weaponsUnlocked[i+18]&&((i+19)!=cat1Selected)&&((i+19)!=cat2Selected)&&((i+19)!=cat3Selected))
				i=i+19;
			else if ((i+20<GameController.savedItems.weaponsUnlocked.length+1)&&GameController.savedItems.weaponsUnlocked[i+19]&&((i+20)!=cat1Selected)&&((i+20)!=cat2Selected)&&((i+20)!=cat3Selected))
				i=i+20;
			else
			i=21;
		}
		else if(i==20)
			i=21;
	}

	//left
	if((Input.GetButtonDown("Left")||Input.GetAxis("DPadLeftRight")<0||Input.GetAxis("LThumbstick Left/Right")<0)&&!toggleLeftRight&&!toggleLeftRight2)
	{
		toggleLeftRight=true;
		toggleLeftRight2=true;
		//if(!GameController.savedItems.weaponsUnlocked[i])
		//		Debug.Log("number"+ i+ " is locked");
		if(i>1)
		{
		
			if (GameController.savedItems.weaponsUnlocked[i-2]&&((i-1)!=cat1Selected)&&((i-1)!=cat2Selected)&&((i-1)!=cat3Selected))
				i--;
			else if ((i-2>0)&&GameController.savedItems.weaponsUnlocked[i-3]&&((i-2)!=cat1Selected)&&((i-2)!=cat2Selected)&&((i-2)!=cat3Selected))
				i=i-2;
			else if ((i-3>0)&&GameController.savedItems.weaponsUnlocked[i-4]&&((i-3)!=cat1Selected)&&((i-3)!=cat2Selected)&&((i-3)!=cat3Selected))
				i=i-3;
			else if ((i-4>0)&&GameController.savedItems.weaponsUnlocked[i-5]&&((i-4)!=cat1Selected)&&((i-4)!=cat2Selected)&&((i-4)!=cat3Selected))
				i=i-4;
			else if ((i-5>0)&&GameController.savedItems.weaponsUnlocked[i-6]&&((i-5)!=cat1Selected)&&((i-5)!=cat2Selected)&&((i-5)!=cat3Selected))
				i=i-5;
			else if ((i-6>0)&&GameController.savedItems.weaponsUnlocked[i-7]&&((i-6)!=cat1Selected)&&((i-6)!=cat2Selected)&&((i-6)!=cat3Selected))
				i=i-6;
			else if ((i-7>0)&&GameController.savedItems.weaponsUnlocked[i-9]&&((i-7)!=cat1Selected)&&((i-7)!=cat2Selected)&&((i-7)!=cat3Selected))
				i=i-7;
			else if ((i-8>0)&&GameController.savedItems.weaponsUnlocked[i-9]&&((i-8)!=cat1Selected)&&((i-8)!=cat2Selected)&&((i-8)!=cat3Selected))
				i=i-8;
			else if ((i-9>0)&&GameController.savedItems.weaponsUnlocked[i-10]&&((i-9)!=cat1Selected)&&((i-9)!=cat2Selected)&&((i-9)!=cat3Selected))
				i=i-9;
			else if ((i-10>0)&&GameController.savedItems.weaponsUnlocked[i-11]&&((i-10)!=cat1Selected)&&((i-10)!=cat2Selected)&&((i-10)!=cat3Selected))
				i=i-10;
			else if ((i-11>0)&&GameController.savedItems.weaponsUnlocked[i-12]&&((i-11)!=cat1Selected)&&((i-11)!=cat2Selected)&&((i-11)!=cat3Selected))
				i=i-11;
			else if ((i-12>0)&&GameController.savedItems.weaponsUnlocked[i-13]&&((i-12)!=cat1Selected)&&((i-12)!=cat2Selected)&&((i-12)!=cat3Selected))
				i=i-12;
			else if ((i-13>0)&&GameController.savedItems.weaponsUnlocked[i-14]&&((i-13)!=cat1Selected)&&((i-13)!=cat2Selected)&&((i-13)!=cat3Selected))
				i=i-13;
			else if ((i-14>0)&&GameController.savedItems.weaponsUnlocked[i-15]&&((i-14)!=cat1Selected)&&((i-14)!=cat2Selected)&&((i-14)!=cat3Selected))
				i=i-14;
			else if ((i-15>0)&&GameController.savedItems.weaponsUnlocked[i-16]&&((i-15)!=cat1Selected)&&((i-15)!=cat2Selected)&&((i-15)!=cat3Selected))
				i=i-15;
			else if ((i-16>0)&&GameController.savedItems.weaponsUnlocked[i-17]&&((i-16)!=cat1Selected)&&((i-16)!=cat2Selected)&&((i-16)!=cat3Selected))
				i=i-16;
			else if ((i-17>0)&&GameController.savedItems.weaponsUnlocked[i-18]&&((i-17)!=cat1Selected)&&((i-17)!=cat2Selected)&&((i-17)!=cat3Selected))
				i=i-17;
			else if ((i-18>0)&&GameController.savedItems.weaponsUnlocked[i-19]&&((i-18)!=cat1Selected)&&((i-18)!=cat2Selected)&&((i-18)!=cat3Selected))
				i=i-18;
			else if ((i-19>0)&&GameController.savedItems.weaponsUnlocked[i-20]&&((i-19)!=cat1Selected)&&((i-19)!=cat2Selected)&&((i-19)!=cat3Selected))
				i=i-19;
			else if ((i-20>0)&&GameController.savedItems.weaponsUnlocked[i-21]&&((i-20)!=cat1Selected)&&((i-20)!=cat2Selected)&&((i-20)!=cat3Selected))
				i=i-20;
			else
			i=21;
		}
		else if(i==1)
			i=21;
	}
	
	
	//up
		if((i<(GameController.savedItems.weaponsUnlocked.length+2))&&(Input.GetButtonDown("Up")||Input.GetAxis("DPadUpDown")>0||Input.GetAxis("LThumbstick Up/Down")>0)&&!toggleUpDown&&!toggleUpDown2)
		{
			toggleUpDown=true;
			toggleUpDown2=true;
		if(i<21)
		{
				if (((i-5)>0)&&GameController.savedItems.weaponsUnlocked[i-6]&&((i-5)!=cat1Selected)&&((i-5)!=cat2Selected)&&((i-5)!=cat3Selected))
					i=i-5;
				else if ((i-11>0)&&GameController.savedItems.weaponsUnlocked[i-11]&&((i-10)!=cat1Selected)&&((i-10)!=cat2Selected)&&((i-10)!=cat3Selected))
					i=i-10;
				else if ((i-16>0)&&GameController.savedItems.weaponsUnlocked[i-16]&&((i-15)!=cat1Selected)&&((i-15)!=cat2Selected)&&((i-15)!=cat3Selected))
					i=i-15;
				else if(GameController.savedItems.weaponsUnlocked[0]&&(cat1Selected!=1&&cat2Selected!=1&&cat3Selected!=1))
						i=1;
		}
		else
			/*if(GameController.savedItems.weaponsUnlocked[19])
				i=20;
			else if(GameController.savedItems.weaponsUnlocked[18]&&cat1Selected!=19&&cat2Selected!=19&&cat3Selected!=19)
				i=19;
			else if(GameController.savedItems.weaponsUnlocked[17]&&cat1Selected!=18&&cat2Selected!=18&&cat3Selected!=18)
				i=18;	
			else if(GameController.savedItems.weaponsUnlocked[16]&&cat1Selected!=17&&cat2Selected!=17&&cat3Selected!=17)
				i=17;
			else if(GameController.savedItems.weaponsUnlocked[15]&&cat1Selected!=16&&cat2Selected!=16&&cat3Selected!=16)
				i=16;	
			else if(GameController.savedItems.weaponsUnlocked[14]&&cat1Selected!=15&&cat2Selected!=15&&cat3Selected!=15)
				i=15;	*/
			/*else*/ if(GameController.savedItems.weaponsUnlocked[13]&&cat1Selected!=14&&cat2Selected!=14&&cat3Selected!=14)
				i=14;	
			else if(GameController.savedItems.weaponsUnlocked[12]&&cat1Selected!=13&&cat2Selected!=13&&cat3Selected!=13)
				i=13;
			else if(GameController.savedItems.weaponsUnlocked[11]&&cat1Selected!=12&&cat2Selected!=12&&cat3Selected!=12)
				i=12;	
			else if(GameController.savedItems.weaponsUnlocked[10]&&cat1Selected!=11&&cat2Selected!=11&&cat3Selected!=11)
				i=11;
			else if(GameController.savedItems.weaponsUnlocked[9]&&cat1Selected!=10&&cat2Selected!=10&&cat3Selected!=10)
				i=10;	
			else if(GameController.savedItems.weaponsUnlocked[8]&&cat1Selected!=9&&cat2Selected!=9&&cat3Selected!=9)
				i=9;
			else if(GameController.savedItems.weaponsUnlocked[7]&&cat1Selected!=8&&cat2Selected!=8&&cat3Selected!=8)
				i=8;	
			else if(GameController.savedItems.weaponsUnlocked[6]&&cat1Selected!=7&&cat2Selected!=7&&cat3Selected!=7)
				i=7;
			else if(GameController.savedItems.weaponsUnlocked[5]&&cat1Selected!=6&&cat2Selected!=6&&cat3Selected!=6)
				i=6;	
			else if(GameController.savedItems.weaponsUnlocked[4]&&cat1Selected!=5&&cat2Selected!=5&&cat3Selected!=5)
				i=5;
			else if(GameController.savedItems.weaponsUnlocked[3]&&cat1Selected!=4&&cat2Selected!=4&&cat3Selected!=4)
				i=4;	
			else if(GameController.savedItems.weaponsUnlocked[2]&&cat1Selected!=3&&cat2Selected!=3&&cat3Selected!=3)
				i=3;
			else if(GameController.savedItems.weaponsUnlocked[1]&&cat1Selected!=2&&cat2Selected!=2&&cat3Selected!=2)
				i=2;	
			else if(GameController.savedItems.weaponsUnlocked[0]&&cat1Selected!=1&&cat2Selected!=1&&cat3Selected!=1)
				i=1;
			else
				i=21;
		}


		
	//down
	if((i<(GameController.savedItems.weaponsUnlocked.length+1))&&(Input.GetButtonDown("Down")||Input.GetAxis("DPadUpDown")<0||Input.GetAxis("LThumbstick Up/Down")<0)&&!toggleUpDown&&!toggleUpDown2)
	{
			toggleUpDown=true;
			toggleUpDown2=true;
		if(i<16)
		{
				if (((i+5)>0)&&GameController.savedItems.weaponsUnlocked[i+4]&&((i+5)!=cat1Selected)&&((i+5)!=cat2Selected)&&((i+5)!=cat3Selected))
					i=i+5;
				else if ((i+11<21)&&GameController.savedItems.weaponsUnlocked[i+9]&&((i+10)!=cat1Selected)&&((i+10)!=cat2Selected)&&((i+10)!=cat3Selected))
					i=i+10;
				else if ((i+16<21)&&GameController.savedItems.weaponsUnlocked[i+14]&&((i+15)!=cat1Selected)&&((i+15)!=cat2Selected)&&((i+15)!=cat3Selected))
					i=i+15;
				else //if(GameController.savedItems.weaponsUnlocked[0])
					i=21;
		}
		else
			i=21;
	}
	if(poolSelected==1)
		cat1Selected=i;
	if(poolSelected==2)
		cat2Selected=i;
	if(poolSelected==3)
		cat3Selected=i;
}

function Category2()
{

//right
	if((i<(GameController.savedItems.magicUnlocked.length+1))&&(Input.GetButtonDown("Right")||Input.GetAxis("DPadLeftRight")>0||Input.GetAxis("LThumbstick Left/Right")>0)&&!toggleLeftRight&&!toggleLeftRight2)
	{
		toggleLeftRight=true;
		toggleLeftRight2=true;
		if(i<14)
		{
			if (GameController.savedItems.magicUnlocked[i+1]&&((i+1)!=cat4Selected)&&((i+1)!=cat5Selected)&&((i+1)!=cat6Selected)&&((i+1)!=cat7Selected))
				i++;
			else if (GameController.savedItems.magicUnlocked[i+2]&&((i+2)!=cat4Selected)&&((i+2)!=cat5Selected)&&((i+2)!=cat6Selected)&&((i+2)!=cat7Selected))
				i=i+2;
			else if ((i+3<GameController.savedItems.magicUnlocked.length+1)&&GameController.savedItems.magicUnlocked[i+3]&&((i+3)!=cat4Selected)&&((i+3)!=cat5Selected)&&((i+3)!=cat6Selected)&&((i+3)!=cat7Selected))
				i=i+3;
			else if ((i+4<GameController.savedItems.magicUnlocked.length+1)&&GameController.savedItems.magicUnlocked[i+4]&&((i+4)!=cat4Selected)&&((i+4)!=cat5Selected)&&((i+4)!=cat6Selected)&&((i+4)!=cat7Selected))
				i=i+4;
			else if ((i+5<GameController.savedItems.magicUnlocked.length+1)&&GameController.savedItems.magicUnlocked[i+5]&&((i+5)!=cat4Selected)&&((i+5)!=cat5Selected)&&((i+5)!=cat6Selected)&&((i+5)!=cat7Selected))
				i=i+5;
			else if ((i+6<GameController.savedItems.magicUnlocked.length+1)&&GameController.savedItems.magicUnlocked[i+6]&&((i+6)!=cat4Selected)&&((i+6)!=cat5Selected)&&((i+6)!=cat6Selected)&&((i+6)!=cat7Selected))
				i=i+6;
			else if ((i+7<GameController.savedItems.magicUnlocked.length+1)&&GameController.savedItems.magicUnlocked[i+7]&&((i+7)!=cat4Selected)&&((i+7)!=cat5Selected)&&((i+7)!=cat6Selected)&&((i+7)!=cat7Selected))
				i=i+7;
			else if ((i+8<GameController.savedItems.magicUnlocked.length+1)&&GameController.savedItems.magicUnlocked[i+8]&&((i+8)!=cat4Selected)&&((i+8)!=cat5Selected)&&((i+8)!=cat6Selected)&&((i+8)!=cat7Selected))
				i=i+8;
			else if ((i+9<GameController.savedItems.magicUnlocked.length+1)&&GameController.savedItems.magicUnlocked[i+9]&&((i+9)!=cat4Selected)&&((i+9)!=cat5Selected)&&((i+9)!=cat6Selected)&&((i+9)!=cat7Selected))
				i=i+9;
			else if ((i+10<GameController.savedItems.magicUnlocked.length+1)&&GameController.savedItems.magicUnlocked[i+10]&&((i+10)!=cat4Selected)&&((i+10)!=cat5Selected)&&((i+10)!=cat6Selected)&&((i+10)!=cat7Selected))
				i=i+10;
			else if ((i+11<GameController.savedItems.magicUnlocked.length+1)&&GameController.savedItems.magicUnlocked[i+11]&&((i+11)!=cat4Selected)&&((i+11)!=cat5Selected)&&((i+11)!=cat6Selected)&&((i+11)!=cat7Selected))
				i=i+11;
			else if ((i+12<GameController.savedItems.magicUnlocked.length+1)&&GameController.savedItems.magicUnlocked[i+12]&&((i+12)!=cat4Selected)&&((i+12)!=cat5Selected)&&((i+12)!=cat6Selected)&&((i+12)!=cat7Selected))
				i=i+12;
			else if ((i+13<GameController.savedItems.magicUnlocked.length+1)&&GameController.savedItems.magicUnlocked[i+13]&&((i+13)!=cat4Selected)&&((i+13)!=cat5Selected)&&((i+13)!=cat6Selected)&&((i+13)!=cat7Selected))
				i=i+13;
			else if ((i+14<GameController.savedItems.magicUnlocked.length+1)&&GameController.savedItems.magicUnlocked[i+14]&&((i+14)!=cat4Selected)&&((i+14)!=cat5Selected)&&((i+14)!=cat6Selected)&&((i+14)!=cat7Selected))
				i=i+14;
			else if ((i+15<GameController.savedItems.magicUnlocked.length+1)&&GameController.savedItems.magicUnlocked[i+15]&&((i+15)!=cat4Selected)&&((i+15)!=cat5Selected)&&((i+15)!=cat6Selected)&&((i+15)!=cat7Selected))
				i=i+15;
			else if ((i+16<GameController.savedItems.magicUnlocked.length+1)&&GameController.savedItems.magicUnlocked[i+16]&&((i+16)!=cat4Selected)&&((i+16)!=cat5Selected)&&((i+16)!=cat6Selected)&&((i+16)!=cat7Selected))
				i=i+16;
			else if ((i+17<GameController.savedItems.magicUnlocked.length+1)&&GameController.savedItems.magicUnlocked[i+17]&&((i+17)!=cat4Selected)&&((i+17)!=cat5Selected)&&((i+17)!=cat6Selected)&&((i+17)!=cat7Selected))
				i=i+17;
			else if ((i+18<GameController.savedItems.magicUnlocked.length+1)&&GameController.savedItems.magicUnlocked[i+18]&&((i+18)!=cat4Selected)&&((i+18)!=cat5Selected)&&((i+18)!=cat6Selected)&&((i+18)!=cat7Selected))
				i=i+18;
			else if ((i+19<GameController.savedItems.magicUnlocked.length+1)&&GameController.savedItems.magicUnlocked[i+19]&&((i+19)!=cat4Selected)&&((i+19)!=cat5Selected)&&((i+19)!=cat6Selected)&&((i+19)!=cat7Selected))
				i=i+19;
			else if ((i+20<GameController.savedItems.magicUnlocked.length+1)&&GameController.savedItems.magicUnlocked[i+20]&&((i+20)!=cat4Selected)&&((i+20)!=cat5Selected)&&((i+20)!=cat6Selected)&&((i+20)!=cat7Selected))
				i=i+20;
			else
			i=21;
		}
		if(i==14)
			i=21;
	}
	
	//left
	if((Input.GetButtonDown("Left")||Input.GetAxis("DPadLeftRight")<0||Input.GetAxis("LThumbstick Left/Right")<0)&&!toggleLeftRight&&!toggleLeftRight2)
	{
		toggleLeftRight=true;
		toggleLeftRight2=true;
		//if(!GameController.savedItems.magicUnlocked[i])
		//		Debug.Log("number"+ i+ " is locked");
		if(i>0)//&&i!=21)
		{
		
			if (GameController.savedItems.magicUnlocked[i-1]&&((i-1)!=cat4Selected)&&((i-1)!=cat5Selected)&&((i-1)!=cat6Selected)&&((i-1)!=cat7Selected))
				i--;
			else if ((i-2>=0)&&GameController.savedItems.magicUnlocked[i-2]&&((i-2)!=cat4Selected)&&((i-2)!=cat5Selected)&&((i-2)!=cat6Selected)&&((i-2)!=cat7Selected))
				i=i-2;
			else if ((i-3>=0)&&GameController.savedItems.magicUnlocked[i-3]&&((i-3)!=cat4Selected)&&((i-3)!=cat5Selected)&&((i-3)!=cat6Selected)&&((i-3)!=cat7Selected))
				i=i-3;
			else if ((i-4>=0)&&GameController.savedItems.magicUnlocked[i-4]&&((i-4)!=cat4Selected)&&((i-4)!=cat5Selected)&&((i-4)!=cat6Selected)&&((i-4)!=cat7Selected))
				i=i-4;
			else if ((i-5>=0)&&GameController.savedItems.magicUnlocked[i-5]&&((i-5)!=cat4Selected)&&((i-5)!=cat5Selected)&&((i-5)!=cat6Selected)&&((i-5)!=cat7Selected))
				i=i-5;
			else if ((i-6>=0)&&GameController.savedItems.magicUnlocked[i-6]&&((i-6)!=cat4Selected)&&((i-6)!=cat5Selected)&&((i-6)!=cat6Selected)&&((i-6)!=cat7Selected))
				i=i-6;
			else if ((i-7>=0)&&GameController.savedItems.magicUnlocked[i-7]&&((i-7)!=cat4Selected)&&((i-7)!=cat5Selected)&&((i-7)!=cat6Selected)&&((i-7)!=cat7Selected))
				i=i-7;
			else if ((i-8>=0)&&GameController.savedItems.magicUnlocked[i-8]&&((i-8)!=cat4Selected)&&((i-8)!=cat5Selected)&&((i-8)!=cat6Selected)&&((i-8)!=cat7Selected))
				i=i-8;
			else if ((i-9>=0)&&GameController.savedItems.magicUnlocked[i-9]&&((i-9)!=cat4Selected)&&((i-9)!=cat5Selected)&&((i-9)!=cat6Selected)&&((i-9)!=cat7Selected))
				i=i-9;
			else if ((i-10>=0)&&GameController.savedItems.magicUnlocked[i-10]&&((i-10)!=cat4Selected)&&((i-10)!=cat5Selected)&&((i-10)!=cat6Selected)&&((i-10)!=cat7Selected))
				i=i-10;
			else if ((i-11>=0)&&GameController.savedItems.magicUnlocked[i-11]&&((i-11)!=cat4Selected)&&((i-11)!=cat5Selected)&&((i-11)!=cat6Selected)&&((i-11)!=cat7Selected))
				i=i-11;
			else if ((i-12>=0)&&GameController.savedItems.magicUnlocked[i-12]&&((i-12)!=cat4Selected)&&((i-12)!=cat5Selected)&&((i-12)!=cat6Selected)&&((i-12)!=cat7Selected))
				i=i-12;
			else if ((i-13>=0)&&GameController.savedItems.magicUnlocked[i-13]&&((i-13)!=cat4Selected)&&((i-13)!=cat5Selected)&&((i-13)!=cat6Selected)&&((i-13)!=cat7Selected))
				i=i-13;
			else if ((i-14>=0)&&GameController.savedItems.magicUnlocked[i-14]&&((i-14)!=cat4Selected)&&((i-14)!=cat5Selected)&&((i-14)!=cat6Selected)&&((i-14)!=cat7Selected))
				i=i-14;
			else if ((i-15>=0)&&GameController.savedItems.magicUnlocked[i-15]&&((i-15)!=cat4Selected)&&((i-15)!=cat5Selected)&&((i-15)!=cat6Selected)&&((i-15)!=cat7Selected))
				i=i-15;
			else if ((i-16>=0)&&GameController.savedItems.magicUnlocked[i-16]&&((i-16)!=cat4Selected)&&((i-16)!=cat5Selected)&&((i-16)!=cat6Selected)&&((i-16)!=cat7Selected))
				i=i-16;
			else if ((i-17>=0)&&GameController.savedItems.magicUnlocked[i-17]&&((i-17)!=cat4Selected)&&((i-17)!=cat5Selected)&&((i-17)!=cat6Selected)&&((i-17)!=cat7Selected))
				i=i-17;
			else if ((i-18>=0)&&GameController.savedItems.magicUnlocked[i-18]&&((i-18)!=cat4Selected)&&((i-18)!=cat5Selected)&&((i-18)!=cat6Selected)&&((i-18)!=cat7Selected))
				i=i-18;
			else if ((i-19>=0)&&GameController.savedItems.magicUnlocked[i-19]&&((i-19)!=cat4Selected)&&((i-19)!=cat5Selected)&&((i-19)!=cat6Selected)&&((i-19)!=cat7Selected))
				i=i-19;
			else if ((i-20>=0)&&GameController.savedItems.magicUnlocked[i-20]&&((i-20)!=cat4Selected)&&((i-20)!=cat5Selected)&&((i-20)!=cat6Selected)&&((i-20)!=cat7Selected))
				i=i-20;
			else
			i=21;
		}
		else if(i==0)
			i=21;
	}
	
	//up
		if((i<(GameController.savedItems.magicUnlocked.length+2))&&(Input.GetButtonDown("Up")||Input.GetAxis("DPadUpDown")>0||Input.GetAxis("LThumbstick Up/Down")>0)&&!toggleUpDown&&!toggleUpDown2)
		{
			toggleUpDown=true;
			toggleUpDown2=true;
		if(i<21)
		{
				if (((i-5)>=0)&&GameController.savedItems.magicUnlocked[i-5]&&((i-5)!=cat4Selected)&&((i-5)!=cat5Selected)&&((i-5)!=cat6Selected)&&((i-5)!=cat7Selected))
					i=i-5;
				else if ((i-10>=0)&&GameController.savedItems.magicUnlocked[i-10]&&((i-10)!=cat4Selected)&&((i-10)!=cat5Selected)&&((i-10)!=cat6Selected)&&((i-10)!=cat7Selected))
					i=i-10;
				else if ((i-15>=0)&&GameController.savedItems.magicUnlocked[i-15]&&((i-15)!=cat4Selected)&&((i-15)!=cat5Selected)&&((i-15)!=cat6Selected)&&((i-15)!=cat7Selected))
					i=i-15;
				else if(GameController.savedItems.magicUnlocked[0]&&(cat4Selected!=0&&cat5Selected!=0&&cat6Selected!=0&&cat7Selected!=0))
					i=0;
				else
					i=21;
		}
		else
			/*if(GameController.savedItems.magicUnlocked[19])
				i=20;
			else if(GameController.savedItems.magicUnlocked[18])
				i=19;
			else if(GameController.savedItems.magicUnlocked[17])
				i=18;	
			else if(GameController.savedItems.magicUnlocked[16])
				i=17;
			else if(GameController.savedItems.magicUnlocked[15])
				i=16;	
			else if(GameController.savedItems.magicUnlocked[15])
				i=15;	
			else */ if(GameController.savedItems.magicUnlocked[13]&&cat4Selected!=13&&cat5Selected!=13&&cat6Selected!=13&&cat7Selected!=13)
				i=13;	
			else if(GameController.savedItems.magicUnlocked[12]&&cat4Selected!=12&&cat5Selected!=12&&cat6Selected!=12&&cat7Selected!=12)
				i=12;
			else if(GameController.savedItems.magicUnlocked[11]&&cat4Selected!=11&&cat5Selected!=11&&cat6Selected!=11&&cat7Selected!=11)
				i=11;	
			else if(GameController.savedItems.magicUnlocked[10]&&cat4Selected!=10&&cat5Selected!=10&&cat6Selected!=10&&cat7Selected!=10)
				i=10;
			else if(GameController.savedItems.magicUnlocked[9]&&cat4Selected!=9&&cat5Selected!=9&&cat6Selected!=9&&cat7Selected!=9)
				i=9;	
			else if(GameController.savedItems.magicUnlocked[8]&&cat4Selected!=8&&cat5Selected!=8&&cat6Selected!=8&&cat7Selected!=8)
				i=8;
			else if(GameController.savedItems.magicUnlocked[7]&&cat4Selected!=7&&cat5Selected!=7&&cat6Selected!=7&&cat7Selected!=7)
				i=7;	
			else if(GameController.savedItems.magicUnlocked[6]&&cat4Selected!=6&&cat5Selected!=6&&cat6Selected!=6&&cat7Selected!=6)
				i=6;
			else if(GameController.savedItems.magicUnlocked[5]&&cat4Selected!=5&&cat5Selected!=5&&cat6Selected!=5&&cat7Selected!=5)
				i=5;	
			else if(GameController.savedItems.magicUnlocked[4]&&cat4Selected!=4&&cat5Selected!=4&&cat6Selected!=4&&cat7Selected!=4)
				i=4;
			else if(GameController.savedItems.magicUnlocked[3]&&cat4Selected!=3&&cat5Selected!=3&&cat6Selected!=3&&cat7Selected!=3)
				i=3;	
			else if(GameController.savedItems.magicUnlocked[2]&&cat4Selected!=2&&cat5Selected!=2&&cat6Selected!=2&&cat7Selected!=2)
				i=2;
			else if(GameController.savedItems.magicUnlocked[1]&&cat4Selected!=1&&cat5Selected!=1&&cat6Selected!=1&&cat7Selected!=1)
				i=1;	
			else if(GameController.savedItems.magicUnlocked[0]&&cat4Selected!=0&&cat5Selected!=0&&cat6Selected!=0&&cat6Selected!=0)
				i=0;
			else
				i=21;
		}


		
	//down
	if((i<(GameController.savedItems.magicUnlocked.length+1))&&(Input.GetButtonDown("Down")||Input.GetAxis("DPadUpDown")<0||Input.GetAxis("LThumbstick Up/Down")<0)&&!toggleUpDown&&!toggleUpDown2)
	{
			toggleUpDown=true;
			toggleUpDown2=true;
		if(i<10)
		{
				if (((i+5)<20)&&GameController.savedItems.magicUnlocked[i+5]&&((i+5)!=cat4Selected)&&((i+5)!=cat5Selected)&&((i+5)!=cat6Selected)&&((i+5)!=cat7Selected))
					i=i+5;
				else if ((i+11<20)&&GameController.savedItems.magicUnlocked[i+10]&&((i+10)!=cat4Selected)&&((i+10)!=cat5Selected)&&((i+10)!=cat6Selected)&&((i+10)!=cat7Selected))
					i=i+10;
				else if ((i+16<20)&&GameController.savedItems.magicUnlocked[i+15]&&((i+15)!=cat4Selected)&&((i+15)!=cat5Selected)&&((i+15)!=cat6Selected)&&((i+15)!=cat7Selected))
					i=i+15;
				else //if(GameController.savedItems.magicUnlocked[0])
					i=21;
		}
		else
			i=21;
	}
	
	if(poolSelected==4)
		cat4Selected=i;
	if(poolSelected==5)
		cat5Selected=i;
	if(poolSelected==6)
		cat6Selected=i;
	if(poolSelected==7)
		cat7Selected=i;
}
