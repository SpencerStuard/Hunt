	//Velocity that the object will be shot at
var velocity:float;
	//Amount of time between each point
var timeBetweenPoints:float=0.01;
	//Max number of points allowed in the trajectory line/Max amount of texture objects allowed
var maxNumberOfPoints:float=100;
		//Object that will be instantiated
var textureObject:GameObject;
	//If the the point of arc number modulo of this variable equals 0 a texture will be placed on that point
var textureObjectDivisor:float=1;
	//The z position that the line/textures will reside on
var zDepth:float;
	//The acceleration of gravity. It is automatically set to the acceleration of the earth's gravity.
	//public Vector2 gravity = new Vector2(0, -Physics.gravity.y);
var gravity:Vector2 = new Vector2(0, -Physics.gravity.y);
	//Layers that will stop the trajectory
var layersToHit:LayerMask;
	//The vertical velocity of the object
private var verticalVelocity:float;
	//The initial horizontal velocity of the object
private var horizontalVelocity:float;
	//The y displacement of the object
private var yDisplacement:float;
	//The x displacement of the object
private var xDisplacement:float;
	//The angle of launch
private var angle:float;
	//Vector point of the next point in the trajectory
private var vector:Vector3;
	//Array of objectTextures
private var objectPoints:GameObject[];
	//Simple integer used for for-loops
private var x:int;
	//Used for time variable in Kinematic equation
private var i:float;

//var spear:GameObject;

//mouse follow
private var mouse_pos:Vector3;
var target:Transform;
private var object_pos:Vector3;
static var mouseAngle:float;
var arcHolder:GameObject;

//crosshair test
var crosshair:Transform;

var hand:Transform;
var cam:Camera;

function Awake()
{
	crosshair=GameObject.Find("Crosshair").transform;
	hand = GameObject.Find("/Player/left_hand").transform;
	target = this.transform;
}

function Start () 
{
	cam=GetComponent(Camera).main;
	if(textureObject != null)
	{			
		if(maxNumberOfPoints >= 0)
			{
				objectPoints = new GameObject[maxNumberOfPoints];
				for(x = 0; x < maxNumberOfPoints; x++)
				{
					objectPoints[x] = Instantiate(textureObject);
					objectPoints[x].transform.parent = arcHolder.transform;
					objectPoints[x].SetActive(false);// = false;
				}
			}
		else
		{
			throw new System.OverflowException("Cannot use a negative number in the 'Max Number Of Points' parameter of the Trajectory Predictor script!");	
		}		
	}
}


function FixedUpdate ()
{
   if(!StartMenuScript.inAMenu&&!CharController.grabbingOn)
   {
		if(!CharController.rolling&&!Health.playerIsDead)
			LookAtMouse();
		else
			transform.rotation.eulerAngles.z=hand.rotation.eulerAngles.z*GameController.player.transform.localScale.x;
			
		if(WeaponSelect.wepName=="Sling")
			velocity=WeaponSelect.force*2;
		else
			velocity=WeaponSelect.force;
		

		angle = this.transform.rotation.eulerAngles.z;
		
		//If there is a texture object set all objects in the objectPoints array to false
		if(textureObject != null)
		{
			for(x = 0; x < maxNumberOfPoints; x++)
			{
				objectPoints[x].SetActive(false);// = false;
			}	
		}
		verticalVelocity = velocity * Mathf.Sin(angle * Mathf.Deg2Rad);
		horizontalVelocity = velocity * Mathf.Cos(angle * Mathf.Deg2Rad);
		//Makes sure that the time between points is not set to 0
		if(timeBetweenPoints != 0)
		{
			//An integer that records what line number is currently being operated on
			lineIndex = 0;
			i = 0;
			vector = this.transform.position;		
			//Makes sure the line Index does not exceed the maxNumberOfPoints
			while(lineIndex < maxNumberOfPoints)
			{
				//Makes sure the current vector point is not intersecting an object with one of the layersToHit layer
				if(Physics.CheckSphere(vector, 0.01f, layersToHit) == false)
				{
					//Iterates I if lineIndex is more than 0 so the
					if(lineIndex > 0)
					{
						i += timeBetweenPoints;
						//Sets the y displacement to the kinematic equation including the vertical velocity component								
						yDisplacement = (verticalVelocity * i + 0.5f * -gravity.y * (i * i))+this.transform.position.y;
						//Sets the x displacement to the kinematic equation including the horizontal velocity component								
						xDisplacement = horizontalVelocity * i + 0.5f * gravity.x * (i * i) + this.transform.position.x;
						//Creats a point using the x and y displacement and the zDepth
						vector = new Vector3(xDisplacement, yDisplacement, zDepth);
					}
					//Makes sure the texture object isn't null
					if(textureObject != null)
					{
							//Checks if lineIndex divided by textureObjectDivisor has a remainder
							if(textureObjectDivisor != 0)
						{
							if(lineIndex % textureObjectDivisor == 0)
							{
								//Turns one of the objectPoints on
								if(!GameController.playerController.freezePlayer2)
									objectPoints[lineIndex].SetActive(true);// = true;
								//Sets the position of the activated to the vector point
								objectPoints[lineIndex].transform.position = vector;
							}
						}
						else
							{
							throw new System.DivideByZeroException("The 'Texture Object Divisor' parameter cannot be 0 in the 'Trajectory Predictor' script");
							}
					}
				//Increments the lineIndex variable by 1
				lineIndex++;
				}
				else
					{
					//Breaks out of the loop if a line point hits something
					break;
					}
			}
		}
   }
}

function LookAtMouse()
{
var crosshairScreenSpace : Vector3 = cam.WorldToScreenPoint (crosshair.position);
		
	mouse_pos = crosshairScreenSpace;
	mouse_pos.z = 0; //The distance between the camera and object
	object_pos = Camera.main.WorldToScreenPoint(target.position);
	mouse_pos.x = mouse_pos.x - object_pos.x;
	mouse_pos.y = mouse_pos.y - object_pos.y;
	
	mouseAngle = Mathf.Atan2(mouse_pos.y, mouse_pos.x) * Mathf.Rad2Deg;
	transform.rotation = Quaternion.Euler(Vector3(0, 0, mouseAngle));
	//transform.localScale.x=GameController.player.transform.localScale.x;
}
