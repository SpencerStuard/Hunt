var anim:Animator;
var masterScript:MonoBehaviour;

function Start()
{
	anim=GetComponent(Animator);
	//transform.position.x=transform.parent.gameObject.GetComponent(Renderer).bounds.size.x/4;
	if(!masterScript.fisherman)
		transform.position = Camera.main.ScreenToWorldPoint (Vector3 (Screen.width/1.25,Screen.height/3,1));
	else
		transform.position = Camera.main.ScreenToWorldPoint (Vector3 (Screen.width*.25,Screen.height/3,1));
}

function Update () 
{
	anim.SetBool("talking",masterScript.textIsScrolling);
}
