module.exports = {


    //custom function used to create an object given the key array and value arrays
    createObj(arr1, arr2, arrKeys) {

        arr = [];

        numOfKeys = arrKeys.length;

        if (arguments.length - 1 === numOfKeys && arr1.length === arr2.length) {
            console.log("1")
            
            for (i = 0; i < arr1.length; i++) {
                let obj = {};

                for (let key of arrKeys) {

                    obj[key] = "";
                }

                obj[arrKeys[0]] = arr1[i]
                obj[arrKeys[1]] = arr2[i]
                arr.push(obj);
            }
        } else {
            console.log("num of keys doesn't match number of input arrays")
        }
        return arr;
    }

};