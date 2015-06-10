var talkedTo:boolean;
var talkedTo2:boolean;
var talkedTo3:boolean;

//Give the player meat
var gaveMeat:boolean;
var meat:GameObject;

function Start ()
{

}

function Update ()
{
	if(talkedTo&&!gaveMeat)
		GiveMeat();
}

function GiveMeat()
{
	gaveMeat=true;
	var meatClone=Instantiate(meat,Vector2(transform.position.x-.25,transform.position.y),Quaternion.identity);
	meatClone.GetComponent(Rigidbody2D).velocity.x=3.5;
	meatClone.GetComponent(Rigidbody2D).velocity.y=5;
	meatClone.GetComponent(Rigidbody2D).AddTorque(-5);
	yield WaitForSeconds(2);
	talkedTo2=true;
}