function OnTriggerEnter2D(col:Collider2D)
{
	if(col.gameObject.tag=="Enemy"&&col.gameObject.GetComponent(Rigidbody2D)!=null)
	{
		col.gameObject.GetComponent(Rigidbody2D).velocity.x=0;
		col.gameObject.SendMessage ("Stun",4);
	//	Debug.Log("assgf");
//	 	col.gameObject.SendMessage("BlinkOnDamage");
		//enabled=false;
	}
	
}