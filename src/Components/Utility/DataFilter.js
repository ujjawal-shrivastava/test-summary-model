
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
    for(var i=0;i<filt_arr.length;i++)
    {
        if(filt_arr[i]===''){
            filt_arr.splice(i,1);
        }
    }
    return JSON.stringify(ConvertToObject(filt_arr));
}

module.exports={
    FilterText
}