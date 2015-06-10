var hitEnemy:boolean;
//var arrowHit:ArrowHit;

function OnTriggerEnter2D(col:Collider2D)
{
	if (col.gameObject.tag == ("Enemy"))
	{
		if(!hitEnemy)
		{
			if(col.transform.parent!=null)
			{
				col.transform.parent.gameObject.GetComponent(RaptorController).SendMessage ("TakeDamage", WeaponSelect.wepDmg);
				hitEnemy=true;
			}
		}
	}
	Destroy(transform.parent.gameObject,5);
}