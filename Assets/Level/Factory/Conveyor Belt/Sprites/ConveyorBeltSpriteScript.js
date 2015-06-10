//var currentPathPercent:float;
var conveyorScript:ConveyorBeltScript;

function Start()
{
	conveyorScript=transform.parent.parent.GetComponent(ConveyorBeltScript);
	iTween.MoveTo(gameObject, iTween.Hash("path", iTweenPath.GetPath("ConveyorPath"),"time",3, "easeType", "linear","orienttopath", true, "lookahead", .005, "looktime", 0, "axis", "z"));
}

function Update () 
{
	//if(currentPathPercent>=1)
		//currentPathPercent=0;

//	currentPathPercent+=(conveyorScript.conveyorSpeed/13)*Time.deltaTime;//conveyorScript.conveyorSpeed*Time.deltaTime;
	//iTween.MoveTo(gameObject,iTween.Hash("position",iTween.PointOnPath(conveyorScript.waypointArray,currentPathPercent)));
	//iTween.PutOnPath(gameObject, conveyorScript.waypointArray, currentPathPercent);
	//iTween.MoveTo(gameObject, iTween.Hash("path", iTweenPath.GetPath("ConveyorPath"), "orienttopath", true, "time", 1));
	
	
//	transform.localPosition.x=Mathf.Clamp(transform.localPosition.x,-2,2);
//	transform.localPosition.y=Mathf.Clamp(transform.localPosition.y,-.5,.5);
}