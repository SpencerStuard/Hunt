var weaponName:String="Torch";
var right_hand:Transform;
//var passive:boolean;
var ammoCount:int=-1;
static var usingTorch:boolean;

function Start ()
{
//	sortingLayerName = "Effects";
}

function Update ()
{
//	if(gameObject.SetActive)
//		usingTorch=true;
//	else
//		usingTorch=false;
	transform.position.x=right_hand.position.x;
	transform.position.y=right_hand.position.y+.55;
	//transform.eulerAngles.z=-right_hand.eulerAngles.z;

}