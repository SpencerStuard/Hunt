var waypointArray:Transform[];
var mask:LayerMask;
var conveyorSpeed:float;
var leftSide:Transform;
var rightSide:Transform;


function FixedUpdate ()
{
    //var hit:RaycastHit2D=Physics2D.Linecast(Vector2(GetComponent(Renderer).bounds.min.x-.01,GetComponent(Renderer).bounds.max.y+.05), Vector2(GetComponent(Renderer).bounds.max.x+.01,GetComponent(Renderer).bounds.max.y+.05),mask);
    Debug.DrawLine(leftSide.position,rightSide.position);
    var hits:RaycastHit2D[]=Physics2D.LinecastAll(leftSide.position,rightSide.position,mask);
    for (var hit:RaycastHit2D in hits)
    {
       	hit.collider.gameObject.transform.position.x+=-conveyorSpeed*Time.deltaTime*transform.localScale.x; 
    }
		
}
