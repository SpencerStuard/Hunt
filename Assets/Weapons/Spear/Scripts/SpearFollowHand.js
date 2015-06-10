var hand:Transform;

function Awake ()
{
	hand=GameObject.Find("/Player/left_hand").transform;
}

function Update ()
{
	transform.position.x=hand.transform.position.x;
	transform.position.y=hand.transform.position.y;
}