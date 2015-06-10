var enemyArray:GameObject[];

var meatTruck:GameObject;

function Start()
{
	
	meatTruck = gameObject.Find("Meat Truck");

	yield WaitForSeconds(28);
	{
		AirDrop1();
	}
	yield WaitForSeconds(87);
	{
		AirDrop2();
	}
}

function AirDrop1()
{
	meatTruck.SendMessage("EnemyAlert",0);	
	yield WaitForSeconds(2);
	enemyArray[0].SendMessage("Spawn");

	yield WaitForSeconds(17);
	enemyArray[1].SendMessage("Spawn");
	
	yield WaitForSeconds(23);
	enemyArray[2].SendMessage("Spawn");
	
	yield WaitForSeconds(30);
	enemyArray[5].SendMessage("Spawn");	//meat burglar
		
	yield WaitForSeconds(38);
	enemyArray[3].SendMessage("Spawn");
	
	yield WaitForSeconds(48);
	meatTruck.SendMessage("EnemyAlert",0);	
	yield WaitForSeconds(2);
	enemyArray[4].SendMessage("Spawn");
}


function AirDrop2()
{
	enemyArray[4].SendMessage("Spawn");
	
	yield WaitForSeconds(10);
	enemyArray[1].SendMessage("Spawn");
	
	yield WaitForSeconds(19);
	meatTruck.SendMessage("EnemyAlert",0);	
	yield WaitForSeconds(1);
	enemyArray[2].SendMessage("Spawn");
	
	yield WaitForSeconds(25);
	enemyArray[3].SendMessage("Spawn");
	enemyArray[5].SendMessage("Spawn");	//meat burglar
	
	yield WaitForSeconds(40);
	meatTruck.SendMessage("EnemyAlert",0);	
	yield WaitForSeconds(1);
	enemyArray[0].SendMessage("Spawn");
}