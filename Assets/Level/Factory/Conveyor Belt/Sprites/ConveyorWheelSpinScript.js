//var spinSpeed:float;
var conveyorScript:ConveyorBeltScript;

function Start()
{
	conveyorScript=transform.parent.GetComponent(ConveyorBeltScript);
}

function Update ()
{
	transform.eulerAngles.z+=conveyorScript.conveyorSpeed*Time.deltaTime*30;
}