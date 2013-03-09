#pragma strict


var rot:int;

function Start () {

rot=1;

}


function Update () {
print(rot);
	
rot=0;
	
if (Input.GetTouch(0).phase==TouchPhase.Stationary) {

	print("touched");
	transform.Rotate(0,0,-20*Time.deltaTime, Space.World);
	rot=1;
	}


if(Input.GetTouch(0).phase==TouchPhase.Ended) {
RotateDown();
}



if(rot==0){
	transform.Rotate(0,0,30*Time.deltaTime, Space.World);
}

}


function RotateDown(){

	while(rot==0){
		transform.Rotate(0,0,30*Time.deltaTime, Space.World);
	yield;
	}
	
	}