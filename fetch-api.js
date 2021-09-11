function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
function render_local(){
    readTextFile("../data_city/data.json", function(text){
        var data = JSON.parse(text);
    
        data.forEach(element => {
            // console.log(element.Name);
            document.getElementById("city").innerHTML += `<option value="`+element.Id+`" onclick = "render_district('`+element.Id+`')">`+element.Name+`</option>`
        });
        return;
      });
}

function render_district(selection_value){
    document.getElementById("district").innerHTML = `<option value="00">"Nhấn Chọn Quận/Huyện"</option>`;
    document.getElementById("district").value = selection_value;
    let id = document.getElementById("city").value;
    readTextFile("../data_city/data.json", function(text){
        var data = JSON.parse(text);
    
        data.forEach(element => {
            if(element.Id == id)
            {
                element.Districts.forEach((district)=>{
                    document.getElementById("district").innerHTML += `<option value="`+district.Id+`">`+district.Name+`</option>`;
                });
                document.getElementById("district").value = selection_value;
                return;
            }
        });
        return;
      });
}

function render_ward(selection_ward){
    document.getElementById("ward").innerHTML =`<option value="00">"Nhấn Chọn Phường/Xã"</option>`;
    document.getElementById("ward").value = selection_ward;
    let id_city = document.getElementById("city").value;
    let id = document.getElementById("district").value;

    console.log("city",id_city,"dis",id);
    readTextFile("../data_city/data.json", function(text){
        var data = JSON.parse(text);
    
        data.forEach(element => {
            if(element.Id == id_city)
            {
                element.Districts.forEach((district)=>{
                    if(district.Id == id)
                    {
                        district.Wards.forEach((ward)=>{
                            document.getElementById("ward").innerHTML += `<option value="`+ward.Id+`">`+ward.Name+`</option>`;
                        });
                        document.getElementById("ward").value = selection_ward;
                        return
                    }
                    
                });
            }
        });
      });
}

function search_local(city,district,ward)
{
    let city_id,district_id,ward_id;
    readTextFile("../data_city/data.json", function(text){
        var data = JSON.parse(text);
        data.forEach(element => {
            if(element.Name.includes(city))
            {
                city_id = element.Id;
                element.Districts.forEach((district_temp)=>{
                    if(district_temp.Name.includes(district))
                    {
                        district_id = district_temp.Id;
                        district_temp.Wards.forEach((ward_temp)=>{
                            if(ward_temp.Name.includes(ward))
                            {
                                ward_id = ward_temp.Id;
                                console.log("city",city_id,"dis",district_id,"wa",ward_id);
                                document.getElementById("city").value = city_id;
                                render_district(district_id);
                                setTimeout(function(){ render_ward(ward_id); }, 100);
                                
                                return;
                            }
                        })
                    }
                })
            }
        });
      });
}