#pragma strict


var rot:int;

function Start () {

rot=0;

}

function Update () {

	print(transform.rotation.z);
	
 if (Input.GetTouch(0).phase==TouchPhase.Stationary) {
	print("touched");
	//transform.position.y=transform.position.y+.3;
	if (transform.rotation.z>-.005){
	
	rigidbody.AddTorque(0,0,-.1);
	}
	//transform.rotation.z=transform.rotation.z-.001;
	
	}

 if (Input.GetTouch(0).phase==TouchPhase.Ended) {
	rot=transform.rotation.z;

	RotateDown();

	
	}
	
	
//if (EndTouch==1){
//	rigidbody.AddRelativeTorque(0,-3,0);
//	print("fu");
	//}
	
}


function RotateDown(){
	while(transform.rotation.z<=-.02){
	
	rigidbody.AddTorque(0,0,.14);
	//transform.rotation.z=transform.rotation.z+.001;
	yield;
	}
	
	}