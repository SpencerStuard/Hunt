var mask:LayerMask;
var xSize:float;
var newXSize:float;
var newYSize:float;
var ySize:float;
var shadow:GameObject;
var spawned:boolean;
var shadowClone:GameObject;
var scaleBool:boolean;
var reduceBy:float;
var yAdjust:float;
var parent:MonoBehaviour;
var startColor:Color;
var player:boolean;
var pig:boolean;
var puerta:boolean;
var rend:Renderer;
var shadowRend:Renderer;

function Start ()
{
	rend=GetComponent(Renderer);

	if(!pig)
	{
		xSize=rend.bounds.size.x;
		ySize=rend.bounds.size.y;
	}
	if(pig)
	{
		xSize=.65;
		ySize=.65;
	}
	if(puerta)
		reduceBy=.5;
	if(reduceBy==0)
		reduceBy=1;
	parent=transform.parent.GetComponent(MonoBehaviour);
	startColor=rend.material.color;
}

function Update ()
{
	var hit: RaycastHit2D = Physics2D.Raycast(transform.position, -Vector2.up,Mathf.Infinity,mask);
	if(hit)
	{
		if(!spawned)
		{
			spawned=true;
			shadowClone=Instantiate(shadow,hit.point,Quaternion.identity);
			shadowClone.GetComponent(MonoBehaviour).parent=gameObject;
			shadowClone.transform.eulerAngles.z=0;
			shadowClone.transform.localScale.x*=xSize*reduceBy;
			newXSize=shadowClone.transform.localScale.x;
			shadowClone.transform.localScale.y*=ySize*reduceBy;
			newYSize=shadowClone.transform.localScale.y;
			//shadowClone.transform.parent=transform.parent;
			shadowRend=shadowClone.GetComponent(Renderer);
		}
		
		var slopeAngle:float = Vector2.Angle(hit.normal,hit.transform.up);
		if(slopeAngle>20&&slopeAngle<65)
			yAdjust=.125;
		else
			yAdjust=0;
		//else
		shadowClone.transform.parent=GameController.shadowHolder;
		shadowClone.transform.position=Vector2(hit.point.x,hit.point.y+yAdjust);
		if(player)
		{
			if(GameController.playerController.sliding||SkateboardScript.usingSkateboard)
			{
				shadowClone.transform.up=hit.normal; //to align them to the surface
				if(SkateboardScript.usingSkateboard)
				{
					if(shadowClone.transform.eulerAngles.z>300&&shadowClone.transform.eulerAngles.z<360)
					{
						shadowClone.transform.position.x-=.4;
						shadowClone.transform.position.y+=.26;
					}
					if(shadowClone.transform.eulerAngles.z>20&&shadowClone.transform.eulerAngles.z<65)
					{
						shadowClone.transform.position.x+=.4;
						shadowClone.transform.position.y+=.26;
					}
				}
			}	
			else
				shadowClone.transform.eulerAngles.z=0;
			if(!GameController.playerController.swimming)
				shadowRend.enabled=true;
			else
				shadowRend.enabled=false;
		}
		
		if(scaleBool)
		{
			var scaleSize:float;
			scaleSize = (transform.position.y-hit.point.y)/5;
			scaleSize=Mathf.Clamp(scaleSize,0,10);
			shadowClone.transform.localScale.x=newXSize*(1-scaleSize);
			shadowClone.transform.localScale.x=Mathf.Clamp(shadowClone.transform.localScale.x,0,newXSize);
			shadowClone.transform.localScale.y=newYSize*(1-scaleSize);
			shadowClone.transform.localScale.y=Mathf.Clamp(shadowClone.transform.localScale.y,0,newXSize);
		}
	}
	else
	{
		spawned=false;
		Destroy(shadowClone);
	}
}

function HideShadow()
{
	spawned=false;
	Destroy(shadowClone);
}
