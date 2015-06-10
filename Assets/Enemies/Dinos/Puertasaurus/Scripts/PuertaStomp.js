var stomp:boolean;
var mask:LayerMask;
var stompDust:GameObject;
var stompSpot1:Transform;
var stompSpot2:Transform;

function Start ()
{
	stomp=false;
}

function Update ()
{
	Debug.DrawLine(stompSpot1.position, stompSpot2.position);
    if(Physics2D.Linecast(stompSpot1.position, stompSpot2.position,mask)&&!stomp)
	{
		stomp=true;
		var stompClone=Instantiate(stompDust,Vector2(((stompSpot1.position.x+stompSpot2.position.x)/2),stompSpot2.position.y),Quaternion.identity);
		if(Vector2.Distance(transform.position,GameController.player.transform.position)<10)
			GameController.shakeCam.Shake(1,1,1,.25);
	}
	if(!Physics2D.Linecast(stompSpot1.position, stompSpot2.position,mask))
		stomp=false;
		
}