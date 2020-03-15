

//
var name, duration, price, pre_work;

function Course(name, duration, price, pre_work) {
    this.name =name;
    this.duration =duration;
    this.price = price;
    this.pre_work = pre_work
}


Course.prototype.describ =  function() {


}

let course = new Course(name, duration, price, pre_work);



