var col:BoxCollider2D;
var magazines:Sprite[];


function Start () 
{
	GetComponent(SpriteRenderer).sprite = magazines[Random.Range(0,magazines.Length)];
	yield WaitForSeconds(1);
	col.enabled=true;
}