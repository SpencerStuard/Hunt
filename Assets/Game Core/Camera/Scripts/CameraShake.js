function Shake(x:float,y:float,z:float,t:float)
{
	iTween.ShakeRotation(gameObject,iTween.Hash("x",x,"y",y,"z",z,"time",t));
}