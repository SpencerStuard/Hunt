var loadout:WeaponLoadoutGUI;
var magic:MagicScript;
var wepInfo : WeaponSelect;
var ammoStyle:GUIStyle;
var ammoStyle1:GUIStyle;
var ammoStyle2:GUIStyle;
var ammoStyle3:GUIStyle;
var ammoStyle4:GUIStyle;
var selectedStyle:GUIStyle;
var wepBG:Texture2D;
var magicBG:Texture2D;

var health:Health;
static var pY:int;

var hudTexture:Texture2D;

function Awake()
{
	wepInfo=GameObject.Find("GameController").GetComponent(WeaponSelect);
	if(Application.loadedLevel > 1)
		magic=GameObject.Find("_Magic").GetComponent(MagicScript);
	health=GameObject.Find("Health").GetComponent(Health);
}

function Update()
{
	if(ScreenSize.aspect<1.289) //5:4 or 1.25
		pY=225;
	else if(ScreenSize.aspect>1.29&&ScreenSize.aspect<1.44) //4:3 or 1.333
		pY=205;
	else if (ScreenSize.aspect>1.46&&ScreenSize.aspect<1.55) //3:2 or 1.5
		pY=155;
	else if (ScreenSize.aspect>1.56&&ScreenSize.aspect<1.65) //5:3 or 1.6 / 16:10
		pY=125;
	else if (ScreenSize.aspect>1.65&&ScreenSize.aspect<1.7) //15:9 or 1.666
		pY=145;
	else if (ScreenSize.aspect>1.7)
		pY=75;
	
}

function OnGUI()
{
	GUI.matrix = Matrix4x4.TRS (Vector3(0f, 0f, 0f), Quaternion.identity, Vector3 (ScreenSize.X, ScreenSize.Y, 1));
	GUI.depth = 11;	
	if(Options.showHUD&&!DialogueScript.talking&&!ExitLevelScript.endGUI)
	{
		//GUI.DrawTexture(Rect(0, 0, 728, 237), hudTexture);
//Weapons
		GUI.Label(Rect(409, pY-11, 136, 136), GUIContent(wepBG),loadout.testStyle2);
		if(GameController.weaponSelect.i==0)
			GUI.Label(Rect(420, pY, 114, 114), GUIContent(loadout.weaponTextures[21]),loadout.testStyle2);								//unarmed selected
		else if(GameController.weaponSelect.i==1)
			GUI.Label(Rect(420, pY, 114, 114), GUIContent(loadout.weaponTextures[loadout.cat1SelectedPrev]),loadout.testStyle2);						//Slot 1
		else if(GameController.weaponSelect.i==2)
			GUI.Label(Rect(420, pY, 114, 114), GUIContent(loadout.weaponTextures[loadout.cat2SelectedPrev]),loadout.testStyle2);						//Slot 2
		else if(GameController.weaponSelect.i==3)
			GUI.Label(Rect(420, pY, 114, 114), GUIContent(loadout.weaponTextures[loadout.cat3SelectedPrev]),loadout.testStyle2);						//Slot 3
		if(wepInfo.arrayWeaponScripts[wepInfo.i].ammoCount!=-1)
		{
			GUI.Label (new Rect (420,pY+63,114, 114), "" + wepInfo.arrayWeaponScripts[wepInfo.i].ammoCount, ammoStyle1);
			GUI.Label (new Rect (420,pY+63,114, 114), "" + wepInfo.arrayWeaponScripts[wepInfo.i].ammoCount, ammoStyle2);
			GUI.Label (new Rect (420,pY+63,114, 114), "" + wepInfo.arrayWeaponScripts[wepInfo.i].ammoCount, ammoStyle3);
			GUI.Label (new Rect (420,pY+63,114, 114), "" + wepInfo.arrayWeaponScripts[wepInfo.i].ammoCount, ammoStyle4);
			GUI.Label (new Rect (420,pY+63,114, 114), "" + wepInfo.arrayWeaponScripts[wepInfo.i].ammoCount, ammoStyle);					//weapon ammo count
		}
		/*	
		if(GameController.weaponSelect.i==1)
			GUI.Label(Rect(482, pY, 57, 57), GUIContent(loadout.weaponTextures[loadout.cat1SelectedPrev]),selectedStyle);			//weapon 1 selected
		else
			GUI.Label(Rect(482, pY, 57, 57), GUIContent(loadout.weaponTextures[loadout.cat1SelectedPrev]),loadout.testStyle2);		//weapon 1 not selected
		if(wepInfo.arrayWeaponScripts[1].ammoCount!=-1)																			
			GUI.Label (new Rect (513.5,pY+38,57, 57), "" + wepInfo.arrayWeaponScripts[1].ammoCount, ammoStyle);					//weapon 1 ammo count
		
		if(GameController.weaponSelect.i==2)
			GUI.Label(Rect(554, pY, 57, 57), GUIContent(loadout.weaponTextures[loadout.cat2SelectedPrev]),selectedStyle);			//weapon 2 selected
		else
			GUI.Label(Rect(554, pY, 57, 57), GUIContent(loadout.weaponTextures[loadout.cat2SelectedPrev]),loadout.testStyle2);		//weapon 2 not selected
		if(wepInfo.arrayWeaponScripts[2].ammoCount!=-1)																			
			GUI.Label (new Rect (585.5,pY+38,57, 57), "" + wepInfo.arrayWeaponScripts[2].ammoCount, ammoStyle);					//weapon 2 ammo count
		
		if(GameController.weaponSelect.i==3)
			GUI.Label(Rect(626, pY, 57, 57), GUIContent(loadout.weaponTextures[loadout.cat3SelectedPrev]),selectedStyle);			//weapon 3 selected
		else
			GUI.Label(Rect(626, pY, 57, 57), GUIContent(loadout.weaponTextures[loadout.cat3SelectedPrev]),loadout.testStyle2);		//weapon 3 not selected
		if(wepInfo.arrayWeaponScripts[3].ammoCount!=-1)																			
			GUI.Label (new Rect (657.5,pY+38,57, 57), "" + wepInfo.arrayWeaponScripts[3].ammoCount, ammoStyle);					//weapon 3 ammo count
		*/
//Magic
		GUI.Label(Rect(558, pY-11, 136, 136), GUIContent(magicBG),loadout.testStyle2);
		if(!magic.magicArmed)
		{
			GUI.Label(Rect(569, pY, 114, 114), GUIContent(loadout.magicTextures[21]),loadout.testStyle2);
		}
		else
		{
			if(magic.magicSelected==0)
				GUI.Label(Rect(569, pY, 114, 114), GUIContent(loadout.magicTextures[loadout.cat4SelectedPrev]),loadout.testStyle2);		//magic 1 not selected
			if(magic.magicSelected==1)
				GUI.Label(Rect(569, pY, 114, 114), GUIContent(loadout.magicTextures[loadout.cat5SelectedPrev]),loadout.testStyle2);		//magic 1 not selected
			if(magic.magicSelected==2)
				GUI.Label(Rect(569, pY, 114, 114), GUIContent(loadout.magicTextures[loadout.cat6SelectedPrev]),loadout.testStyle2);		//magic 1 not selected
			if(magic.magicSelected==3)
				GUI.Label(Rect(569, pY, 114, 114), GUIContent(loadout.magicTextures[loadout.cat7SelectedPrev]),loadout.testStyle2);		//magic 1 not selected
	
				//Ammo Count
			if(magic.magic[magic.magicSelected].charges>=0)
			{
				GUI.Label (new Rect (569, pY+63,114, 114), "" + magic.magic[magic.magicSelected].charges, ammoStyle1);
				GUI.Label (new Rect (569, pY+63,114, 114), "" + magic.magic[magic.magicSelected].charges, ammoStyle2);
				GUI.Label (new Rect (569, pY+63,114, 114), "" + magic.magic[magic.magicSelected].charges, ammoStyle3);
				GUI.Label (new Rect (569, pY+63,114, 114), "" + magic.magic[magic.magicSelected].charges, ammoStyle4);
				GUI.Label (new Rect (569, pY+63,114, 114), "" + magic.magic[magic.magicSelected].charges, ammoStyle);
			}	
		}
		
		/*
		if(magic.magicSelected==1)
			GUI.Label(Rect(482, pY+80, 57, 57), GUIContent(loadout.magicTextures[loadout.cat5SelectedPrev]),selectedStyle);			//magic 2 selected
		else
			GUI.Label(Rect(482, pY+80, 57, 57), GUIContent(loadout.magicTextures[loadout.cat5SelectedPrev]),loadout.testStyle2);		//magic 2 not selected
		GUI.Label (new Rect (513.5,pY+111,57, 57), "" + magic.magic[1].charges, ammoStyle);
		
		if(magic.magicSelected==2)
			GUI.Label(Rect(554, pY+80, 57, 57), GUIContent(loadout.magicTextures[loadout.cat6SelectedPrev]),selectedStyle);			//magic 3 selected
		else
			GUI.Label(Rect(554, pY+80, 57, 57), GUIContent(loadout.magicTextures[loadout.cat6SelectedPrev]),loadout.testStyle2);		//magic 3 not selected
		GUI.Label (new Rect (585.5,pY+111,57, 57), "" + magic.magic[2].charges, ammoStyle);
		
		if(magic.magicSelected==3)
			GUI.Label(Rect(626, pY+80, 57, 57), GUIContent(loadout.magicTextures[loadout.cat7SelectedPrev]),selectedStyle);			//magic 4 selected
		else
			GUI.Label(Rect(626, pY+80, 57, 57), GUIContent(loadout.magicTextures[loadout.cat7SelectedPrev]),loadout.testStyle2);		//magic 4 not selected
		GUI.Label (new Rect (657.5,pY+111,57, 57), "" + magic.magic[3].charges, ammoStyle);*/
	}
}