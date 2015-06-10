var explosion:GameObject;

function Start () 
{

}

function Update ()
{
	if(Vector2.Distance(GameController.player.transform.position,transform.position)<1&&Input.GetButtonDown("Interact"))
		Explode();
}

function OnTriggerEnter2D(col:Collider2D)
{
	if(WeaponSelect.attacking&&(col.gameObject.tag=="Unarmed"||col.gameObject.tag=="PlayerWeaponSword"||col.gameObject.tag=="PlayerWeaponSpear"))
		Explode();
}

function OnCollisionEnter2D(col:Collision2D)
{
	if(col.gameObject.tag=="Projectile")
		Explode();
}

function Explode()
{
	var explosionClone=Instantiate(explosion,transform.position,Quaternion.identity);
		Destroy(gameObject);
}