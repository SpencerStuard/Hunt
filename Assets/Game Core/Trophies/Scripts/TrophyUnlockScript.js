function Update()
{
	for (var z:int;z<GameController.savedItems.trophiesUnlocked.length;z++)
	{
		if(GameController.savedItems.trophiesUnlocked[z])
			GameController.savedItems.trophiesFound[z].GetComponent(Renderer).sprite=GameController.savedItems.trophySprites[z+1];
		else
			GameController.savedItems.trophiesFound[z].GetComponent(Renderer).sprite=GameController.savedItems.trophySprites[0];
	}
}
