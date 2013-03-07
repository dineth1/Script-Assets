#pragma strict




function Start () {




}

function Update () {


	
 if (Input.GetTouch(0).phase==TouchPhase.Stationary) {
	print("touched");
	//transform.position.y=transform.position.y+.3;
	rigidbody.AddRelativeTorque(0,.3,0);
	}


	
}

