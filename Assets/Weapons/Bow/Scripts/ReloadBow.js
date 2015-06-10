var bowScript:BowScript;
var touchedQuiver:boolean;
var nearestZAngle:int;

function Update ()
{
	DrawBack();
	NearestAngle();

	if(bowScript.justFired)
		Quiver();
	else
		touchedQuiver=false;
	
	//AdjustAngle();
}

function DrawBack()
{
	transform.localPosition.x = Mathf.Clamp(transform.localPosition.x,-.45,-.15);
	if(bowScript.drawTimer!=0)
	{
		transform.localPosition.x-=0.001875;
	}
	else
	{
		transform.localPosition.x=-0.15;
	}
}

function NearestAngle()
{
	nearestZAngle = Mathf.Round(transform.eulerAngles.z);
	if(((nearestZAngle==230||nearestZAngle>230)&&!touchedQuiver&&GameController.player.transform.localScale.x==1)||((nearestZAngle==130||nearestZAngle<130)&&!touchedQuiver&&GameController.player.transform.localScale.x==-1))
		touchedQuiver=true;
}

function Quiver()
{		
	if(GameController.player.transform.localScale.x==1)
	{
		while(nearestZAngle<230&&!touchedQuiver)
			{
				transform.eulerAngles.z+=13;
				yield WaitForSeconds(.025);
			}
		while(transform.localEulerAngles.z>90&&touchedQuiver)
			{
				transform.eulerAngles.z-=13;
				yield WaitForSeconds(.025);
			}
	}
	else
	{
		while(nearestZAngle>130&&!touchedQuiver)
			{
				transform.eulerAngles.z-=13;
				yield WaitForSeconds(.025);
			}
		while((transform.localEulerAngles.z<90||transform.localEulerAngles.z>190)&&touchedQuiver)
		{
			transform.localEulerAngles.z+=13;
			yield WaitForSeconds(.025);
		}
	}
	yield WaitForSeconds(.25);
	transform.localEulerAngles.z=90;
}

function AdjustAngle()
{
	if(bowScript.drawTime!=0&&!bowScript.justFired)
		transform.localEulerAngles.z=90;
}