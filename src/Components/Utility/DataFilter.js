
const ConvertToObject=(data)=>{
    var data_object={};
    for(var i=0;i<data.length;i++)
    {
        if(typeof data_object[i] == undefined || data_object[i] == null){
            data_object[i]=data[i];
        }
    }
    return data_object;
}

const FilterText=(text)=>{
    if(!text.trim()&&text.length===0){
        return null;
    }
    const filt_arr=text.split('\n');
    var result='';
    for(var i=0;i<filt_arr.length;i++)
    {
        if(i===filt_arr.length-1){
            result+=filt_arr[i];
            break;
        }result+=filt_arr[i]+' ';
    }
    return {
        data_string:result,
        data_json:JSON.stringify(ConvertToObject(filt_arr))
    };
}

module.exports={
    FilterText
}