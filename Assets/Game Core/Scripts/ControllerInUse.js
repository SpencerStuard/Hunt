static var controllerInUse:boolean;

function Update ()
{
	if(((CharController.h||CharController.v)!=0)||(Input.GetAxis("Controller Magic")!=0)||(Input.GetAxis("Controller Attack")!=0)||(Input.GetAxis("RThumbStickLeftRight")!=0)||(Input.GetAxis("RThumbStickUpDown")!=0)||(Input.GetAxis("DPadUpDown")!=0)||(Input.GetAxis("DPadLeftRight")!=0)||(Input.GetKey ("joystick button 0"))||(Input.GetKey ("joystick button 1"))||(Input.GetKey ("joystick button 2"))||(Input.GetKey ("joystick button 3"))||(Input.GetKey ("joystick button 4"))||(Input.GetKey ("joystick button 5"))||(Input.GetKey ("joystick button 6"))||(Input.GetKey ("joystick button 7"))||(Input.GetKey ("joystick button 8"))||(Input.GetKey ("joystick button 9")))
		controllerInUse=true;
	else
		controllerInUse=false;
}