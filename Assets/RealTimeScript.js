public static class RealTimeScript
{
	public function WaitForRealSeconds(time:float): IEnumerator
	{
		var start:float = Time.realtimeSinceStartup;
		while (Time.realtimeSinceStartup < start + time)
		{
			    yield;
		}
	}
}
