var masterScript:MonoBehaviour;
var player:boolean;
var smoke:GameObject[];
var fire:GameObject[];
var flight:GameObject[];

function Update ()
{
	//if(player)
	//{
		if(masterScript.playerWin==0)
		{	
			smoke[0].SetActive(false);
			fire[0].SetActive(false);
			flight[0].SetActive(false);
			smoke[1].SetActive(false);
			fire[1].SetActive(false);
			flight[1].SetActive(false);
		}
		else if(masterScript.playerWin==1)
		{	
			smoke[0].SetActive(true);
			fire[0].SetActive(true);
			flight[0].SetActive(true);
		}
		else if(masterScript.playerWin==2)
		{	
			smoke[0].SetActive(true);
			fire[0].SetActive(true);
			flight[0].SetActive(true);
			smoke[1].SetActive(true);
			fire[1].SetActive(true);
			flight[1].SetActive(true);
		}	
//}
	//else if(!player)
	//{
		if(masterScript.karateWin==0)
		{	
			smoke[2].SetActive(false);
			fire[2].SetActive(false);
			flight[2].SetActive(false);
			smoke[3].SetActive(false);
			fire[3].SetActive(false);
			flight[3].SetActive(false);
		}
		else if(masterScript.karateWin==1)
		{	
			smoke[2].SetActive(true);
			fire[2].SetActive(true);
			flight[2].SetActive(true);
		}
		else if(masterScript.karateWin==2)
		{	
			smoke[3].SetActive(true);
			fire[3].SetActive(true);
			flight[3].SetActive(true);
		}	
	//}
}