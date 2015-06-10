var rb2D:Rigidbody2D;
var ran:boolean;

function Start()
{
	rb2D = GetComponent(Rigidbody2D);
	if(!ran)
		rb2D.AddTorque(200);
	else
	{
		rb2D.AddTorque(200*Random.Range(-2,2));
		rb2D.velocity.x=Random.Range(-18,-12);
		rb2D.velocity.y=Random.Range(-7,7);
	}
}

//function FixedUpdate ()
//{
//	rb2D.AddTorque(8);
//}