#pragma strict

var planeVel = Vector3(-50,0,0);
//var joyButton : Joystick;
var speed : float = 0.1; 
var hitNoise : AudioClip;
var followTerrain : boolean;
var diff:float;



function Awake () {

//	joyButton =  GameObject.Find("Single Joystick").GetComponent(Joystick);
}

function Start() {

	//Local Coords
	rigidbody.velocity = transform.TransformDirection(planeVel);

	//Global coords
	//rigidbody.velocity= planeVel;

}
function Update () {

	CalcSpeed();

//	if (Input.touchCount >= 1){ //&& Input.GetTouch(0).phase == TouchPhase.Moved) {
         //Get movement of the finger since last frame
//        var touchDeltaPosition:Vector2 = Input.GetTouch(0).deltaPosition;
//       	rigidbody.AddRelativeTorque(-3*touchDeltaPosition.y,0,0);
//       	}else{
    	//rigidbody.AddRelativeTorque(1,0,0);
//    }
    	
    //hitInfo stores what the raycast has hit
    var hitInfo : RaycastHit;
    var hitInfoAhead : RaycastHit;
    
    
    //transform.position.y=transform.position.y-.1;
	//rigidbody.AddRelativeTorque(0,-.01,0);
    
   // var secondcastorigin:float=transform.position.x-5.0;
    
    //Cast a ray to the right and store in hitinfo
    Physics.Raycast (transform.position, Vector3(0,0,1), hitInfo, Mathf.Infinity);
    Physics.Raycast (Vector3(transform.position.x-2,transform.position.y,transform.position.z), Vector3(0,0,1), hitInfoAhead, Mathf.Infinity);
    //set the plane's x pos and use offset	
    
    diff=hitInfoAhead.point.z-hitInfo.point.z;
    transform.position.z = hitInfo.point.z - 13;

    
    Debug.DrawRay(transform.position, Vector3(0,0,1)*50, Color.red);
    Debug.DrawRay(Vector3(transform.position.x-2,transform.position.y,transform.position.z), Vector3(0,0,1)*50, Color.green);
    
    if (diff >= 0.001){
    transform.rotation.x=transform.rotation.x+(.02*(hitInfoAhead.point.z-hitInfo.point.z));
    
    }
    
    else if (diff <= -0.001){
    transform.rotation.x=transform.rotation.x-(.02*(hitInfo.point.z-hitInfoAhead.point.z));
   
    }
    
    else if (diff >= -0.001 && diff < 0.001){
    print('straight');
    transform.rotation.x=-0.707;
    }
    
    
    //transform.rotation.x=-.707;
    
    
    
    

    
    //else if ( (hitInfoAhead.point.z <= (hitInfo.point.z+.001) ||  (hitInfoAhead.point.z <= (hitInfo.point.z-.001)){
    
    //}
    
   
    
   // if (hitInfo.point.z <=  hitInfoAhead.point.z){
   // print(hitInfo.point.z -  hitInfoAhead.point.z);
  //  transform.rotation.x=transform.rotation.x-(.001*(hitInfoAhead.point.z-hitInfo.point.z));
  //  }
    
    	
}



function CalcSpeed(){
	//Speed reduces with increasing altitude, required to put the +1 to avoid inf speed
	rigidbody.velocity = transform.TransformDirection(planeVel)/(0.05*rigidbody.position.y+1);
}

function OnCollisionEnter(){
	audio.PlayOneShot(hitNoise);
}
