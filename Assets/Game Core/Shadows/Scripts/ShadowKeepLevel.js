var parent:GameObject;

function Update ()
{
	//if(!parent.activeSelf)
	if(!parent.activeInHierarchy)
		gameObject.SetActive(false);
		//Destroy(gameObject);
}