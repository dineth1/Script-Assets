//Terrain to clone
//This will eventually become an array so that random platforms can be chosen to instantiate
public var firstPlatform : GameObject;

//The player's position will be required to determine when to spawn and destroy
public var player : Transform;

//When player's z position exceeds this point a clone platform will be generated
private var spawnNext : GameObject;

//When player's z position exceeds this point athe current platform will be destroyed (important to put this a little ahead of the final position of the platform)
private var destroyCurrent : GameObject;

//Seeing as a greater than condition will give the rise to multiple true conditions, we need a state
var isSpawned : boolean;
 
//May need this
public var spawnDistance : float;

//Array to hold potential angles about the y-axis
//var angles=[-90,0,90];

//Array to hold potential objects to be instantiated
public var terrainObjects : GameObject[];

//The platform that was alst created is stored as a gameobject so we can do stuff with it
private var currPlatform : GameObject;
private var prevPlatform : GameObject;
private var nextPlatform : GameObject;

var Rst:GUITexture;

//Much cleaner when instantiated in awake
function Awake() {
	//var rotation = Quaternion.identity;
	// Assign a rotation 30 degrees around the y axis
	//rotation.eulerAngles = Vector3(-90, 90, 0);


	Debug.Log("In Awake");

	currPlatform = Instantiate(firstPlatform, Vector3 (0,0,0),   Quaternion.Euler(-90, 0, 0));// as GameObject;
	isSpawned = false;

} 
 
function Start() {
Rst = GameObject.FindWithTag('Rst').guiTexture;
}
 
function Update() {

 for (var touch:Touch in Input.touches){
		if (touch.phase == TouchPhase.Stationary && Rst.HitTest(touch.position)){
			Application.LoadLevel("Main");
			}
	}


	destroyCurrent = GameObject.FindWithTag ("DestroyPoint");
	spawnNext = GameObject.FindWithTag ("SpawnPoint");


	//Debug.Log("IN UPDATE: player.transform.position.z: " + player.transform.position.z + " spawnNext.transform.position.z: " + spawnNext.transform.position.z + "isSpawned: " + isSpawned);
    //If the player has passed the spawnNext position, then spawn a terrain ahead (spawned position will have to be one terrain length long)
    if (player.transform.position.x < spawnNext.transform.position.x){
         Debug.Log("spawn");
          
            //Call instantiate only if there hasn't been a spawn yet
          if (!isSpawned){
          	InstantiatePlatform();
          }
    }
   
    //If the player has passed the DestroyCurrent point, then destroy the current platform
    if(player.transform.position.x < destroyCurrent.transform.position.x) {
    
     Debug.Log("destroy");
       //Destroy object 
      // Debug.Log("IN DESTROY: player.transform.position.z: " + player.transform.position.z +" destroyCurrent.transform.position: " + destroyCurrent.transform.position.z);
       Destroy(prevPlatform);
 	   isSpawned = false;
    }
}


function InstantiatePlatform() {

	var randIndex = Mathf.Floor(Random.Range(0, 3.001));

	//var randomRotation = Quaternion.Euler(0,angles[indexAngle],0);

	//var rotation = Quaternion.identity;
	// Assign a rotation 90 degrees around the y and x axis
	//rotation.eulerAngles = Vector3(-90, 90, 0);

//	if( terrainObjects[randIndex].name == "RightTurnNew" ){
//		Debug.Log("RIGHT TURN COMING UP!");	
//	}

	prevPlatform = currPlatform;
	currPlatform = Instantiate(terrainObjects[randIndex], new Vector3(destroyCurrent.transform.position.x,destroyCurrent.transform.position.y, destroyCurrent.transform.position.z), Quaternion.Euler(-90, 0, 0));
	//nextPlatform = Instantiate(terrainObjects[1], new Vector3(0,0,destroyCurrent.transform.position.z + 400), rotation);
    isSpawned = true;
}