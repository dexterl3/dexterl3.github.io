// create quad tree

function.quadTree(){
	//this.
}


function.TBParkingInfo(streetName,restrictions,parkType,startHour,startDay,endHour,endDay){

    this.streetName = streetName;
    this.restrictions = restrictions;
    this.parkType = parkType; // will tell if paid parking/RPZ/what the restriction is
    
    this.startHour = startHour;
    this.endHour = endHour;
    this.startDay = startDay;
    this.endDay = endDay;

    this.streetName = function(){  
            return this.streetName;  
     };  
     this.restrictions = function(){  
            return this.restrictions;  
     };  
     this.parkType = function(){  
            return this.parkType;  
     };  

    this.startHour = function(){  
            return this.startHour;  
     };  
    this.endHour = function(){  
            return this.endHour;  
     };  
    this.startDay = function(){  
            return this.startDay;  
     };  
    this.endDay = function(){  
            return this.endDay;  
     };  
    //return all
}