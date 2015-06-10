var w:float;
var h:float;

static var X:float;
static var Y:float;

static var aspect:float;

function Awake()
{
	w = Screen.width;
	h = Screen.height;
	X=w/1920.0;
	Y=h/1200.0;
}

function Update()
{
	w = Screen.width;
	h = Screen.height;
	X=w/1920.0;
	Y=h/1200.0;
	
	aspect = w/h;
}