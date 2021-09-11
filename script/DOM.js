// import {username} from './member.js';
//#region filter
var filter = [
    {
        id : "1",
        id_index : "list-filter-type",
        name : "THEO DANH MỤC",
        list_item : ["Nội thất","Thú cưng","Văn phòng","Quần áo","Mẹ và bé","Điện lạnh","Điện tử","Giải trí","Thời trang"],
        type : 1
    },
    {
        id: "2",
        id_index : "list-filter-vote",
        name : "THEO ĐÁNH GIÁ",
        list_item: [1,2,3,4,5],
        type : 2
    }
    ,{
        id : "3",
        id_index : "list-filter-city",
        name : "THEO THÀNH PHỐ",
        list_item : ["TP.Hồ Chí Minh","Hà Nội","Đà Nẵng","Hải Phòng","Nha Trang"],
        type : 1
    }
    ,{
        id : "4",
        id_index : "list-filter-price",
        name : "THEO GIÁ",
        list_item : ["filter-price-from","filter-price-to"],
        type : 3
    }
];


function render_vote_start(vote_number)
{
    let string_temp = ``;
    vote_number = Math.round(vote_number);
    for(let i = 0; i<5; i++)
    {
        if((i+1) <= vote_number)
        {
            string_temp += `<i class="fas fa-star start"></i>`;
        }
        else{
            string_temp += `<i class="far fa-star start"></i>`;
        }
    }
    return string_temp;
}

function render_filter_type1(name,id,array_list,selection){
    const temp_DOM = document.getElementsByClassName("c-sort-box-filter")[0].innerHTML += `
    <div class="filter-type">
        <div class="filter-title">
            <p>`+name+`</p>
        </div>
        <div class="list-filter" id="`+id+`"></div>
    </div>`;
    let dem = 0;
    for(let item of array_list)
    {
        document.getElementById(id).innerHTML += `
        <div class="item-filter">
                <input type="checkbox" id="`+item+`" class="`+id+`"  onclick="render_product_with_filter()">
                <label for="`+item+`">`+item+`</label>    
        </div>`;
        dem++;
    }

}

function render_filter_type2(name,id,array_list,selection)
{
    const temp_DOM = document.getElementsByClassName("c-sort-box-filter")[0].innerHTML += `
    <div class="filter-type">
        <div class="filter-title">
            <p>`+name+`</p>
        </div>
        <div class="list-filter" id="`+id+`"></div>
    </div>`;
    let dem = 0;
    for(let item of array_list)
    {
        document.getElementById(id).innerHTML += `
        <div class="item-filter">
                <input type="checkbox" id="`+item+`" class="`+id+`"  onclick="render_product_with_filter()">
                <label for="`+item+`">`+render_vote_start(item)+`</label>    
            </div>`;
        dem++;
    }
    
}

function render_filter_type3(name,id,array_list,selection)
{
    const temp_DOM = document.getElementsByClassName("c-sort-box-filter")[0].innerHTML += `
                    <div class="filter-type">
                        <div class="filter-title">
                            <p>`+name+`</p>
                        </div>
                        <div class="list-filter-number" id="`+id+`">
                            <div class="filter-number">    
                                <input type="number" placeholder="₫ TỪ" maxlength="13" id="`+array_list[0]+`">
                                <div class= "line-through">
                                    <div></div>
                                </div>
                                <input type="number" placeholder="₫ ĐẾN" maxlength="13" id="`+array_list[1]+`">
                            </div>
                            <div class="filter-number-submit">
                                <input type="submit" value="Áp dụng" onclick = "render_product_with_filter()">
                            </div>
                        </div>

                    </div>`;
    
}

function render_filter(){
    for(let a of filter)
    {
        if(a.type == 1)
        {
            render_filter_type1(a.name,a.id_index,a.list_item,a.id);
        }else if(a.type == 2)
        {
            render_filter_type2(a.name,a.id_index,a.list_item,a.id);
        }else{
            render_filter_type3(a.name,a.id_index,a.list_item,a.id);
        }
    }
    
}

//#endregion

//#region render product
var list_product = [
    ];

function add_element(element)
{
    list_product.push(element);
}


db.collection("Product").get().then((snapshot) => {
        snapshot.forEach(element => {
            if(element.data().name != undefined)
            {
                add_element(element.data());
            }
        });
        Render_panigation(1,1);
        render_list_product_f(list_product);
    }, (error) => {
        console.log(error);
    });

    var list_shop = [];
db.collection("Shop").get().then((snapshot)=>{
    snapshot.forEach((element)=>{
        let object = {
            id : element.data().id,
            address : element.data().address
        };
        list_shop.push(object);
    });
    
})    

function render_list_product_f(array_list)
{
    document.getElementsByClassName("c-view-product")[0].innerHTML = "";
    let dem = 1;
    for(let product of array_list)
    {
        if(dem <=12)
        render_product(product);
        dem++;
    }
    push_data_user(); 
}

function change_value_toString(price){
    let temp_string = "";
    temp_string += price;
    let change_tostring = "";
    let dem = 1 ;
    for(let i = temp_string.length-1 ; i >= 0;i--)
    {
        if(dem == 3)
        {
           change_tostring+= temp_string[i];
            if(i !=0)
            {
                change_tostring+= ".";
            }
            dem = 1;
        }else{
            change_tostring+= temp_string[i];
            dem ++;
        }
    }
    return change_tostring.split("").reverse().join("") ;
}

function check_discount_percent(discount){
    if(discount != 0)
    {
        return `<div class="discount">-`+discount+`%</div>`;
    }else
    return ``;
}

function render_product(item)
{
    document.getElementsByClassName("c-view-product")[0].innerHTML += `
                    <div class="product" id = "`+item.id+`" onclick ="render_inf_product('`+item.id+`',true)">
                        <div class="product-top">
                            <img src="`+item.picture[0]+`" alt="">
                        </div>
                        <div class="product-bottom">
                            <p>`+item.name+`</p>
                            <div class="vote-start">
                                `+render_vote_start(item.vote)+`
                            </div>
                            <div class="price-product">
                                <p class="value">`+change_value_toString(item.price-(item.price*item.discount_percent)/100)+` ₫</p>
                                `+check_discount_percent(item.discount_percent)+`
                            </div>
                            <div class="add-card">
                                <input type="submit" value="Thêm vào giỏ hàng">
                            </div>
                        </div>
                    </div>`
}

//#endregion

//#region filter_product
var list_render_product = [];
var floag_item = true;
function check_with_type(product,item)
{
    if(product.type.includes(item)){
        return true;
    }
    else
    return false;
}

function check_with_vote(product,item)
{
    let temp = Math.round(product.vote);
    if(temp == item){
        return true;
    }
    else
    return false;
}

function check_with_area(product,item)
{
    for(let shop of list_shop)
    {
        if(shop.id == product.id_shop){
            
            let address = removeAccents(shop.address);
            let item_adress = removeAccents(item);
            console.log(address+item_adress, item_adress.includes(address));
            if(item_adress.includes(address) == true) //test
            {
                return true;
            }
            return false;
        }
    }
    
}

function filter_price(array_list_product,price_from,price_to)
{
    let temp_list_product = [];
    for(let product of array_list_product){
        if(product.price >= price_from && product.price <= price_to){
            temp_list_product.push(product);
        }
    }
    list_render_product = temp_list_product;
}

function render_product_with_price(id_from,id_to){
    let from = document.getElementById(id_from).value;
    let to = document.getElementById(id_to).value;
    if(to != "" && from != "")
    {
        console.log(from,to);
        if( to >= from ){
            document.getElementsByClassName("c-view-product")[0].innerHTML = ``;
            if(list_render_product.length == 0)
            {
                list_render_product = list_product;
            }
            filter_price(list_render_product,from,to);
        }     
        else{
            console.log("Filter khong hop le !!!");
        }
    }
}

function test(temp_filter)
{
    list_render_product = list_product;
    render_product_with_price("filter-price-from","filter-price-to");
    for(let item of temp_filter){
        if(item.array_list_filter.length != 0)
        {
            let temp_list_product = [];
            for(let product of list_render_product){                
                for(let item_filter of item.array_list_filter){//list filter
                    let check_filter = false;
                    switch(item.id){
                        case 1:{
                            check_filter = check_with_type(product,item_filter);
                            break;
                        }
                        case 2:{
                            check_filter = check_with_vote(product,item_filter);
                            break;
                        }
                        case 3:{
                            check_filter = check_with_area(product,item_filter);
                            break;
                        }
                    }
                    if(check_filter == true){
                        temp_list_product.push(product);
                        break;
                    }
                }
                list_render_product = temp_list_product;
            }
        }
    }
    
    render_list_product_f(list_render_product);
}

function render_product_with_filter(){//list-filter-type
    document.getElementsByClassName("c-view-product")[0].innerHTML = ``;
    temp_filter = [];//add filter
    dem = 1 ;
    for(let item_filter of filter)
    {
        let temp_array = document.getElementsByClassName(item_filter.id_index);
        let filter_array = [];
        for(let item_array of temp_array)
        {
            if(item_array.checked == true)
            {
                filter_array.push(item_array.id);
            }
        }
        temp_object_filter = {
            id : dem ,
            name : item_filter.id_index,
            array_list_filter : filter_array
        }
        dem++;
        temp_filter.push(temp_object_filter);
    }
    test(temp_filter);
    Render_panigation(1,1);
}

//#endregion

//#region Sort

function compare_date(date_1,date_2)
{
    if(date_1.date_submitted>date_2.date_submitted)
    return true;
    else
    return false;
}

function sort_increase_price(item_1,item_2)
{
    let temp_1 = item_1.price - (item_1.price*item_1.discount_percent)/100;
    let temp_2 = item_2.price - (item_2.price*item_2.discount_percent)/100;
    if(temp_1 > temp_2)
    return true;
    else
    return false;
}

function sort_decrease_price(item_1,item_2)
{
    let temp_1 = item_1.price - (item_1.price*item_1.discount_percent)/100;
    let temp_2 = item_2.price - (item_2.price*item_2.discount_percent)/100;
    if(temp_1 < temp_2)
    return true;
    else
    return false;
}

function sort_increase_discount(item_1,item_2)
{
    let temp_1 = item_1.discount_percent;
    let temp_2 = item_2.discount_percent;
    if(temp_1 > temp_2)
    return true;
    else
    return false;
}

function sort_decrease_discount(item_1,item_2)
{
    let temp_1 = item_1.discount_percent;
    let temp_2 = item_2.discount_percent;
    if(temp_1 < temp_2)
    return true;
    else
    return false;
}

function sort_increase_amount(item_1,item_2)
{
    let temp_1 = item_1.amount;
    let temp_2 = item_2.amount;
    if(temp_1 > temp_2)
    return true;
    else
    return false;
}

function sort_decrease_amount(item_1,item_2)
{
    let temp_1 = item_1.amount;
    let temp_2 = item_2.amount;
    if(temp_1 < temp_2)
    return true;
    else
    return false;
}

function slection_compare(item_1,item_2)
{
    let temp = document.getElementById("sort-item").value;
    switch (temp){
        case "new" : {
            return compare_date(item_1,item_2);
        }
        case "price-increase" :{
            return sort_increase_price(item_1,item_2);
        }
        case "price-decrease" :{
            return sort_decrease_price(item_1,item_2);
        }
        case "discount-increase":{
            return sort_increase_discount(item_1,item_2);
        }
        case "discount-decrease":{
            return sort_decrease_discount(item_1,item_2);
        }
        case "amount-increase" :{
            return  sort_increase_amount(item_1,item_2);
        }
        case "amount-decrease" :{
            return sort_decrease_amount(item_1,item_2);
        }
    }
}

function buble_sort()
{
    if(list_render_product.length == 0) 
        list_render_product = list_product;

    for (let i = 0; i < list_render_product.length - 1; i++)
    {
        for (let j = 0; j < list_render_product.length - i - 1; j++)
        {
            if (slection_compare(list_render_product[j],list_render_product[j+1])) 
            {
                // swap arr[j+1] và arr[i]
                let temp = list_render_product[j];
                list_render_product[j] = list_render_product[j + 1];
                list_render_product[j + 1] = temp;
            }
        }
    }
    document.getElementsByClassName("c-view-product")[0].innerHTML = ``;
    render_list_product_f(list_render_product);
}

//#endregion

//#region Render_panigation
function Render_panigation(selection,from){
    
    if(list_render_product.length == 0)
    {
        list_render_product = list_product;
    }
    let temp = Math.round(list_render_product.length /12);
    if(list_render_product.length /12 > temp)
    {
        temp++;
    }
    if(temp < from)
    return false;
    document.getElementsByClassName("pagnigation")[0].innerHTML = "";
    let temp_HTML = document.getElementsByClassName("pagnigation")[0];
    temp_HTML.innerHTML +=`<div class="pagnigation-item" onclick="previous_page()">&laquo;</div>`;
    if(from > 1)
    {
        temp_HTML.innerHTML +=`<div class="pagnigation-item" >...</div>`;
    }
    if(from == 0)
    {
        from++;
    }
    for(let i = from ; i<=temp ; i++)
    {
        if( i < (from + 3))
        {
            if(i == selection)
            {
                temp_HTML.innerHTML += `<div class="pagnigation-item" id = "pagnigation-item-active" onclick="change_page('`+i+`')">`+i+`</div>`;
            }
            else{
                temp_HTML.innerHTML += `<div class="pagnigation-item" onclick="change_page('`+i+`')">`+i+`</div>`;
            }


        }else if(i == from + 3)
        {
            temp_HTML.innerHTML +=`<div class="pagnigation-item" onclick="click_change_page()">...</div>`;
            break;
        }
    }
    if((from+3) > temp)
    temp_HTML.innerHTML +=`<div class="pagnigation-item" onclick="next_page(`+(from+(temp-from))+`)">&raquo;</div>`;
    else
    temp_HTML.innerHTML +=`<div class="pagnigation-item" onclick="next_page(`+(from+3)+`)">&raquo;</div>`;
    return true;
}

function render_product_page(from,to)
{
    document.getElementsByClassName("c-view-product")[0].innerHTML = ``;
    let dem = 1 ;
    for(let product of list_render_product)
    {
        if(dem > from && dem <= to)
        {
            render_product(product);
        }
        dem++;
    }
}

function change_page(slection_page)
{
    let temp_array = document.getElementsByClassName("pagnigation-item");
    document.getElementById("pagnigation-item-active").id = "";
    for(let item of temp_array)
    {
        if(item.innerHTML == slection_page)
        {
            item.id = "pagnigation-item-active";
            render_product_page((slection_page-1)*12,(slection_page-1)*12+12);
        }
    }
    
}

function next_page(max_length)
{
    let temp = document.getElementById("pagnigation-item-active").innerHTML;
    let int = new Number (temp) + 1;
    console.log("hello",int);
    if(int < max_length)
    {
        document.getElementById("pagnigation-item-active").id = "";
        let temp_array = document.getElementsByClassName("pagnigation-item");
        for(let item of temp_array)
        {
            if(item.innerHTML == int){
                item.id = "pagnigation-item-active";
            }
        }
        render_product_page((int-1)*12,(int-1)*12+12);
    }
    else if(int == max_length) {
        if(Render_panigation(max_length,max_length))
        render_product_page((int-1)*12,(int-1)*12+12);
    }
}

function previous_page()
{
    let temp = document.getElementById("pagnigation-item-active").innerHTML;
    let int = new Number (temp) - 1;
    if(int > 0)
    {
        Render_panigation(int,int-1);
        let temp_array = document.getElementsByClassName("pagnigation-item");
        for(let item of temp_array)
        {
            if(item.innerHTML == int){
                document.getElementById("pagnigation-item-active").id = "";
                item.id = "pagnigation-item-active";
                render_product_page((int-1)*12,(int-1)*12+12);
                return;
            }
        }
        
        render_product_page((int-1)*12,(int-1)*12+12);
    }
}

//#endregion


//#region render_inf_product
function render_inf_product(item_id,checked)
{
    for(let product of list_product)
    {
        
        if(product.id == item_id)
        {
            render_info_form_product(product,checked);
            document.getElementById("inf-product-c").style.display = "block";
            return;
        }
    }
    
}

function close_inf_product()
{
    document.getElementById("inf-product-c").style.display = "none";
}

function render_list_img(array){
    let temp_string = "";
    for(let item_img of array)
    {
        temp_string += `<img src="`+item_img+`" alt="" onmouseover="change_view_img_info_product('`+item_img+`')">`;
    }
    return temp_string;
}

function render_info_form_product(product, checked){ //true : add incart //false : not add incart
    document.getElementById("inf-product-c").innerHTML = "";
    document.getElementById("inf-product-c").innerHTML +=`<div id="form-info-product">
    <div class="name-info-product">`+product.name+`</div>
    <div class="close-button">
        <i class="far fa-times-circle" onclick="close_inf_product()"></i>
    </div>

    <div class="info-product-f">
        <div class="show_img">
            <div class="img-show-product">
                <img src="`+product.picture[0]+`" alt="" class="img_show_only">
            </div>
            <div class="list-img-show-product">
                
            </div>
        </div>
        <div class="mid-info-roduct">
            <div class="vote_product_info">
                <div class="vote-start-product-info">
                    <div class="point-vote">`+product.vote+`</div>
                    
                </div>
                <div class="amount-vote">
                    3 <p>Đánh Giá</p>
                </div>
            </div>
            <div class="price-product-info-f">
                
                
            </div>

            <div class="card-info-product">
                 
            </div>
        </div>
        <div class="describe-product">
            <div class="describe-product-title">
                THÔNG TIN CHI TIẾT
            </div>
            <div class="list-describe-product">
                <div class="where-production-describe-product describe-product-inf">
                    <p class="title-describe">Sản xuất :</p>
                    <p class="info-describe">`+product.origin+`</p>
                </div>
                <div class="type-product describe-product-inf">
                    <p class="title-describe">Danh mục :</p>
                    <p class="info-describe">`+product.type+`</p>
                </div>
                <div class="area-product describe-product-inf">
                    <p class="title-describe">Khu vực :</p>
                    <p class="info-describe_area"></p>
                </div>
                <div class="status-product describe-product-inf">
                    <p class="title-describe">Tình trạng hàng hóa :</p>
                    <p class="info-describe">`+product.status+`</p>
                </div>
                <div class="date-submmitted-product describe-product-inf">
                    <p class="title-describe">Ngày đăng :</p>
                    <p class="info-describe_time"></p>
                </div>
            </div>
        </div>

        <div class="inform-product">
            <div class="inform-product-title">MÔ TẢ CHI TIẾT SẢN PHẨM</div>
            <div class="inform-product-pag">
                <p>`+product.description+`
                </p>
            </div>
        </div>
        
    </div>
</div>`;

    //render hinh
    if(product.picture.length >4)
    {
        document.getElementsByClassName("list-img-show-product")[0].innerHTML += 
            `<div class="previous-list-show" onclick="previous_img_slide('list-show',0)">
                <
            </div>
            <div class="list-show">    
            </div>
            <div class="next-list-show" onclick="next_img_slide(`+(product.picture.length-4)+`,'list-show',0)">
                >
            </div>` ;
            document.getElementsByClassName("list-show")[0].innerHTML += render_list_img(product.picture);
    }
    else{
        document.getElementsByClassName("list-img-show-product")[0].innerHTML += 
            `<div class="list-show"></div>` ;
            document.getElementsByClassName("list-show")[0].innerHTML += render_list_img(product.picture);
    }
    

    // render vote 
    document.getElementsByClassName("vote-start-product-info")[0].innerHTML += render_vote_start(product.vote);


    //render discount
    let price_discount = product.price-(product.price * product.discount_percent)/100;
    if(product.discount_percent != 0){
        document.getElementsByClassName("price-product-info-f")[0].innerHTML += `
        <div class="price-product-info">`+change_value_toString(product.price)+` ₫</div>
        <div class="price-after-discount"></div>
        <div class="discount-percent-info">GIẢM `+product.discount_percent+`% </div>`;
        //render gia discount
        document.getElementsByClassName("price-after-discount")[0].innerHTML += change_value_toString(price_discount) + "₫";
    }else{
        document.getElementsByClassName("price-product-info-f")[0].innerHTML += `
        <div class="price-after-discount">`+change_value_toString(product.price)+` ₫</div>`;
    }

    //render khu vuc
    for(let shop of list_shop)
    {
        if(shop.id == product.id_shop)
        {
            document.getElementsByClassName("info-describe_area")[0].innerHTML += shop.address;
        }

    };
    document.getElementsByClassName("info-describe_time")[0].innerHTML += change_dateUnix_to_dateUTC(product.date_submitted.seconds);

    if(checked == true)
    {
        if(product.amount > 0)
        {
            document.getElementsByClassName("card-info-product")[0].innerHTML += `
            <div class="amount-product">
                            <label for="amount-add-card" >Số Lượng :</label>
                            <input type="button" name="" id="increase" value="-" class="button-amount" onclick="change_amount('amount-add-card',false,0)">
                            <input type="text" onkeypress='return event.charCode >= 48 && event.charCode <= 57' id="amount-add-card" value="1"></input>
                            <input type="button" name="" id="decrease" value="+" class="button-amount" onclick="change_amount('amount-add-card',true,`+product.amount+`)"> 
                            <p>( Còn `+product.amount+` sản phẩm )</p>
                        </div>
            <input type="submit" id="add-card-product" value="Thêm Vào Giỏ Hàng" onclick = "add_product_incart('`+product.id+`','amount-add-card',`+price_discount+`,'`+product.id_shop+`')">`;//test
        }
        else{
            document.getElementsByClassName("card-info-product")[0].innerHTML += `<div class="amount-product"><p class= "sold-out">Đã bán hết</p></div>`;
        }
    }
    
}

function change_dateUnix_to_dateUTC(time){
    var date = new Date(time * 1000);
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    let year = date.getFullYear();
    return day + "/" + month + "/" + year;
}

//#region render img slide-img
function next_img_slide(dem,class_name,vitri)
{
    let temp = document.getElementsByClassName(class_name)[vitri];
    let a = new Number(temp.style.left.replace("%",""));
    if(a > dem*(-25))
        {
            a -= 25;
        }
    let right_deg = a +"%";
    document.getElementsByClassName(class_name)[vitri].style.left = right_deg;
    var moveAndChangePosition = [
        {
            left : right_deg,
        }
    ]
    temp.animate(moveAndChangePosition,{
        duration : 500,
        fill: 'forwards'
    })
}

function previous_img_slide(nameclass,vitri)
{
    let temp = document.getElementsByClassName(nameclass)[vitri];
    let a = new Number(temp.style.left.replace("%",""));
    if(a < 0)
    {
        a += 25;
    }
    
    let right_deg = a +"%";
    document.getElementsByClassName(nameclass)[vitri].style.left = right_deg;
    var moveAndChangePosition = [
        {
            left : right_deg,
        }
    ]
    temp.animate(moveAndChangePosition,{
        duration : 500,
        fill: 'forwards'
    })
}

//#endregion

//#region render-vote-start
function change_view_img_info_product(link_view)
{
    document.getElementsByClassName("img-show-product")[0].innerHTML = "";
    document.getElementsByClassName("img-show-product")[0].innerHTML += `<img src="`+link_view+`" alt="">`;
}

function render_vote_start_info_product(vote){
    document.getElementsByClassName("vote_product_info")[0].innerHTML += render_vote_start(vote);
}
//#endregion

//#region change-amount

function change_amount(class_name,selection,limit) //true : increase  - false : decrease
{
    let temp = new Number(document.getElementById(class_name).value);
    if(selection)
    {
        if(temp < limit){
        temp ++;
        document.getElementById(class_name).value = temp;
        }
    }
    else{
        if(temp > 1)
         temp -= 1;
        document.getElementById(class_name).value = temp;
    }
}

//#endregion
//#endregion

//#region render list cart


function Checkauth(){
    if(auth.currentUser != null)
    {
        return true;
    }
    else{
        return false;
    }
}


function change_form_cart(checked)
{
    if(checked == true){
        if(Checkauth())
        {
            document.getElementsByClassName("list-cart-form-c")[0].style.display = "block";
            console.log("hello",push_data_user());
        }
        else{
            notification("Vui lòng đăng nhập",false);
        }
    }
    else
    document.getElementsByClassName("list-cart-form-c")[0].style.display = "none";
}

var username;

function add_product_incart(id_product,class_name_amount,price,shop_id)
{
    push_data_user();
    let amount = document.getElementById(class_name_amount).value;
    let temp_number = Number(amount) ;

    let floag_1 = true;
    if(Checkauth() == true)
    { 
        let floag = true;
        
        for(let product of list_product_incart)
        {
            
            if(product.id == id_product)
            {
                for(let item of list_product)
                {
                    if(item.id == id_product)
                    {
                        if((product.amount + temp_number) > item.amount) //3 + 1 > 3
                        {
                            notification("Vượt quá số lượng trong kho hàng !!!", false);
                            floag_1 = false;
                            floag = false;
                        }
                        else
                        {
                            product.amount += temp_number;
                            floag = false;
                        }
                    }
                }
            }
        }
        
        if(floag == true )
        {
            
            for(let product of list_product){
                if(product.id == id_product)
                {
                    if(temp_number <= product.amount)
                    {
                        list_product_incart.push({
                            id : id_product,
                            amount : temp_number,
                            price : price,
                            id_shop : shop_id
                        });
                        
                    }
                    else{
                        notification("Vượt quá số lượng trong kho hàng !!!", false);
                        floag_1 = false;
                    }
                }
            }

        }
        if(floag_1){
            // console.log(list_product_incart);
            db.collection("member").doc(username).update({
                list_product : list_product_incart
            }).then(()=>{
            
            notification("Thêm vào giỏ hàng thành công !!!", true);
            close_inf_product();
        })
        }
        
    }
    else{
        notification("Vui lòng đăng nhập !!!",false);
    }

}

function push_data_user(){
    db.collection("member").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            if(auth.currentUser != null)
            if(doc.data().email == auth.currentUser.email)
            {
                push_data_from_list_incart(doc.data().username);
                username = doc.data().username;
            }
        });
    });
}

var list_product_incart = [];

function push_data_from_list_incart(username)
{
    list_product_incart = [];
    let sum = 0;
    document.getElementsByClassName("list-product-incart")[0].innerHTML = "";
    db.collection("member").doc(username).get().then((doc)=>{
        doc.data().list_product.forEach((product)=>{
            
            render_product_incart(product);
            list_product_incart.push(product);
            sum += product.price * product.amount;
        });
        document.getElementById("number-sp").innerHTML = list_product_incart.length;

        document.getElementsByClassName("info-sum-product")[0].innerHTML = '';
        document.getElementsByClassName("info-sum-product")[0].innerHTML +=`
        <p class="sum-price-incart-title">Tổng tiền :</p>
        <p class="sum-price-incart">`+change_value_toString(sum)+`₫ </p>
        <input type="submit" value="Thanh Toán" class="submit-cart" onclick = "open_checkout_cart()">
        `;
        sum_incart = sum;
    });
}

function render_product_incart(product){
    db.collection("Product").get().then((doc)=>{
        doc.forEach((item)=>{
            if(item.data().id == product.id)
            {
                let price_discount = item.data().price - (item.data().price*item.data().discount_percent)/100;
                let sum_price = price_discount*product.amount;
                document.getElementsByClassName("list-product-incart")[0].innerHTML += `
                <div class="product-incart" >
                    <div class="info-product-incart" onclick = "render_inf_product('`+product.id+`',false)">
                        <div class="img-product-incart">
                            <img src="`+item.data().picture[0]+`" alt="" >
                        </div>
                        <div class="name-product-incart">
                            <p>`+item.data().name+`</p>
                        </div>
                    </div>
                    <div class="price-product-incart">
                        <div class="value-product-incart">
                            <div class="price-info-incart">`+change_value_toString(item.data().price)+`₫</div>
                            <div class="price-after-discount-incart">`+change_value_toString(price_discount)+`₫</div>
                        </div>
                        <div class="discount-percent-incart">GIẢM `+item.data().discount_percent+`% </div>
                    </div>
                    <div class="amount-product-incart-back">
                        <div class="amount-product-incart">
                            <div class="change-amount-product-incart" onclick = "change_amount_incart('amount-product-i',false,'`+product.id+`')">-</div>
                            <input type="text" class="amount-product-i" onchange = "onChange_amount('`+product.id+`')" value="`+product.amount+`" onkeypress='return event.charCode >= 48 && event.charCode <= 57' readonly></input>
                            <div class="change-amount-product-incart" onclick = "change_amount_incart('amount-product-i',true,'`+product.id+`')">+</div>
                        </div>
                    </div>
                    <div class="sum-price-product">`+change_value_toString(sum_price)+`₫ </div>
                    <div class="delete-product-incart">
                        <i class="fas fa-trash-alt" onclick = "check_confirm_delete_product_out_card('Bạn có thực sự muốn xóa sản phẩm khỏi giỏ hàng ??','`+product.id+`')"></i> 
                    </div>
                </div>`;
                return sum_price;
            }
        });
    }); 
}

var sum_incart =0;


function change_amount_incart(class_name,selection,id_product){
    let temp ;
    let temp_amount_product ;
    let index =0;
    let price = 0;
    for(let product of list_product)
    {
        if(product.id.localeCompare(id_product)==0)
        {
            temp_amount_product = product.amount;
            break;
        }
    }

    for(let product of list_product_incart)
    {
        if(product.id.localeCompare(id_product)==0)
        {
            temp = document.getElementsByClassName(class_name)[index].value;
            price = product.price;
            break;
        }
        index++;
    }

    if(selection)
    {
        if(temp < temp_amount_product){
            temp ++;
            document.getElementsByClassName(class_name)[index].value = temp;
            document.getElementsByClassName("sum-price-product")[index].innerHTML = "";
            document.getElementsByClassName("sum-price-product")[index].innerHTML += change_value_toString(price*temp)+'₫';
            change_amount_incart_firestore(id_product,temp);
            onChange_sum_price();
            return;
        }
    }
    else{
        if(temp > 1){
            temp --;
            document.getElementsByClassName(class_name)[index].value = temp;
            document.getElementsByClassName("sum-price-product")[index].innerHTML = "";
            document.getElementsByClassName("sum-price-product")[index].innerHTML += change_value_toString(price*temp)+'₫';
            change_amount_incart_firestore(id_product,temp);
            onChange_sum_price();
        }
    }
}

function change_amount_incart_firestore(id_product,amount){
    for(let product of list_product_incart){
        if(id_product.localeCompare(product.id) == 0)
        {
            product.amount = amount;
        }
    }
    db.collection("member").doc(username).update({
        list_product : list_product_incart
    }).then(()=>{
        console.log("Thêm thanh cong");
    })
}

function check_confirm_delete_product_out_card(message,id_product) //comfirm delete out cart
{
    render_From_confirm(message);
    
    document.getElementById("accept").addEventListener("click",()=>{
        delete_product_incart(id_product);
        document.getElementsByClassName("confirm-accepted")[0].style.display = "none";
        document.getElementsByClassName("confirm-accepted")[0].innerHTML = "";
    });
    document.getElementById("cancel").addEventListener("click",()=>{
        document.getElementsByClassName("confirm-accepted")[0].style.display = "none";
        document.getElementsByClassName("confirm-accepted")[0].innerHTML = "";
    });
}

function delete_product_incart(id_product){ //test
    document.getElementsByClassName("list-product-incart")[0].innerHTML = "";
    let dem = 0;
    for(let product of list_product_incart){
        if(id_product == product.id)
        {
            list_product_incart.splice(dem, 1);
            console.log(list_product_incart);
            db.collection("member").doc(username).update({
                list_product : list_product_incart
            }).then(()=>{
                console.log("Xoa thanh cong");
                push_data_from_list_incart(username);
            })
        }
        dem++;
    }
    
}

function onChange_amount(id){
    let dem = 0;
    for(let product of list_product_incart){
        if(product.id == id){
            break;
        }
        dem++;
    }
    let temp = document.getElementsByClassName("amount-product-i")[dem].value; 
    console.log(temp);
}
function onChange_sum_price(){
    let sum = 0;
    for(let product of list_product_incart){
        sum += product.price*product.amount;
    }
    document.getElementsByClassName("info-sum-product")[0].innerHTML = '';
        document.getElementsByClassName("info-sum-product")[0].innerHTML +=`
        <p class="sum-price-incart-title">Tổng tiền :</p>
        <p class="sum-price-incart">`+change_value_toString(sum)+`₫ </p>
        <input type="submit" value="Thanh Toán" class="submit-cart" onclick = "open_checkout_cart()">
        `;
}
// var dem_id = 0;
// db.collection("bill").get().then((doc)=>{
//     doc.forEach((element)=>{
//         console.log(element.data());
//         dem_id++;
//     })
    
// });

function update_bill_in_data()
{

}


//#endregion

//#region notifycation
function notification(message, check){
    var moveAndChangePositionUp = [
        {
            bottom: '5px',
        }
    ];
    var moveAndChangePositionDown = [
        {
            bottom: '-50px',
        }
    ];
    let temp = document.getElementById("pop-up");
    if(check==true) //check
    {
        temp.innerHTML = "";

        
        temp.className = " color-boxshadow-blue";

        temp.innerHTML += `
            <div class="notification color-font-tick">
                <i class="far fa-check-circle"></i>
                <p class="message ">`+message+`</p>
            </div>`;
        
            temp.animate(moveAndChangePositionUp,{
                duration : 1000,
                fill: 'forwards',
            })

            temp.animate(moveAndChangePositionDown,{
                duration : 1000,
                fill: 'forwards',
                delay : 5000
            })
    }else{ //error
        temp.innerHTML = "";

        temp.className = "color-boxshadow-red";
        temp.innerHTML += `
            <div class="notification color-font-error">
                <i class="far fa-check-circle"></i>
                <p class="message ">`+message+`</p>
            </div>`;

        
            temp.animate(moveAndChangePositionUp,{
                duration : 1000,
                fill: 'forwards',
            })

            temp.animate(moveAndChangePositionDown,{
                duration : 1000,
                fill: 'forwards',
                delay : 5000
            })
    }
}
//#endregion

//#region render order
function close_tab_order(){
    document.getElementsByClassName("order")[0].style.display = 'none';
}

function open_tab_order(){
    if(Checkauth())
    {
        change_tab_order('title-order-none','none_accept');
        document.getElementsByClassName("order")[0].style.display = 'flex';
    }
    else{
        notification("Vui lòng đăng nhập !!!",false);
    }
    
}

function render_order(array_list,dem){
    let sum = 0;
    for(let product of array_list){
        db.collection("Product").doc(product.id).get().then((doc)=>{
            document.getElementsByClassName("list-product-order")[dem].innerHTML += `
            <div class="order-product">
                    <img src="`+doc.data().picture[0]+`" alt="">
                    <div class="info-product-order-bg border-bottom">
                        <div class="info-product-order ">
                            <div class="name-pd-order">
                                <p>`+doc.data().name+`</p>
                            </div>
                            <div class="amount-pd-order"><p>Số lượng : `+product.amount+`</p></div>
                            <div class="price-pd-order">`+change_value_toString(product.price*product.amount)+` ₫</div>
                        </div>
                    </div>
            </div>`;
            
        });
        sum+= product.price*product.amount;
    }
    return sum;
}
var list_product_bill = [];
function render_from_data_bill(status)
{
    let temp_string ="";
        switch(status){
            case "accept": {
                temp_string =  "Xác nhận";
                break;
            }
            case "none_accept" : {
                temp_string = "Chưa xác nhận";
                break;
            }
            case "complete" : {
                temp_string = "Hoàn thành";
                break;
            }
            case "cancel" : {
                temp_string = "Hủy";
                break;
            }
        }
    list_product_bill = [];
    var list_id_bill = [];
    db.collection("bill").where("status", "==" ,temp_string).get().then((doc)=>{
        doc.forEach((item)=>{
            if(item.data().id_member == auth.currentUser.displayName)
            {
                list_product_bill.push(item.data());
                list_id_bill.push(item.id);
            }
        })
        //sap xep lai
        for (let i = 0; i < list_product_bill.length - 1; i++)
        {
            for (let j = 0; j < list_product_bill.length - i - 1; j++)
            {
                if (list_product_bill[j].date_submitted.seconds < list_product_bill[j+1].date_submitted.seconds) 
                {
                    // swap arr[j+1] và arr[i]
                    let temp = list_product_bill[j];
                    list_product_bill[j] = list_product_bill[j + 1];
                    list_product_bill[j + 1] = temp;

                    let temp_id = list_id_bill[j];
                    list_id_bill[j] = list_id_bill[j + 1];
                    list_id_bill[j + 1] = temp_id;
                }
            }
        }
        
        let dem = 0;
        
        for(let item of list_product_bill)
        {
            document.getElementsByClassName("show-order-bg")[0].innerHTML += `
            <div class="list-order-info">
            <div class="list-order-info-left">
                <div class="title-order-info">
                    <p>Mã đơn hàng : #`+list_id_bill[dem]+`</p>
                     <p>`+temp_string+`</p>
                </div>
                <div class="list-product-order">
                </div>
            </div>
            <div class="list-order-info-right">
                 <div class="list-order-info-right-bg">
                    <div class="order-cart">
                         <p class="title-or">Người nhận</p>
                         <p class="name-receiver">`+item.fullname+`</p>
                     </div>
                     <div class="order-cart">
                         <p class="title-or">Số điện thoại</p>
                         <p class="phonenumber-receiver">`+item.tel+`</p>
                     </div>
                     <div class="order-cart">
                         <p class="title-or">Địa chỉ</p>
                         <p class="address-receiver">`+item.address+`</p>
                     </div>
                     <div class="order-cart">
                         <p class="title-or">Tổng giá trị sản phẩm</p>
                         <p class="sum-price-order"></p>
                     </div>
                     <div class="order-cart">
                         <div class="shipper-type">
                             <p class="title-or">Phí vận chuyển</p>
                             <p class="type-ship-cash"></p>
                         </div>
                         <p class="ship-cash"> ₫</p>
                     </div>
                     <div class="order-cart">
                         <div class="payment">
                             <p class="title-or">Số tiền phải thanh toán</p>
                             <p>Thanh toán khi giao hàng (COD)</p>
                         </div>
                         <p class="ship-code"> ₫</p>
                     </div>
                     <p class="cancel-order"> 
                     
                     </p>
                 </div>
             </div>
        </div>`;
            let sum = render_order(item.list_product,dem);
            let sum_checkout = change_value_toString(sum+Number(item.ship_cod));
            document.getElementsByClassName("sum-price-order")[dem].innerHTML = change_value_toString(sum) + " ₫";
            document.getElementsByClassName("ship-code")[dem].innerHTML = sum_checkout + " ₫";
            switch(item.ship_cod)
            {
                case "20000" :{
                    document.getElementsByClassName("type-ship-cash")[dem].innerHTML ="Giao hàng tiết kiệm";
                    document.getElementsByClassName("ship-cash")[dem].innerHTML =change_value_toString("20000") + "₫";
                    break;
                }
                case "25000" :{
                    document.getElementsByClassName("type-ship-cash")[dem].innerHTML ="Giao hàng nhanh";
                    document.getElementsByClassName("ship-cash")[dem].innerHTML =change_value_toString("25000") + "₫";
                    break;
                }
                case "45000" :{
                    document.getElementsByClassName("type-ship-cash")[dem].innerHTML ="Giao hàng siêu tốc";
                    document.getElementsByClassName("ship-cash")[dem].innerHTML =change_value_toString("45000") + "₫";
                    break;
                }
            }
            if(status == "none_accept")
            {
                document.getElementsByClassName("cancel-order")[dem].innerHTML = `<input type="submit" value="Hủy đơn hàng" onclick = "check_confirm_cancel_order('Bạn có thực sự muốn hủy đơn hàng này ??','`+list_id_bill[dem]+`')">`;
            }else if(status == "accept")
            {
                document.getElementsByClassName("cancel-order")[dem].innerHTML = `<input type="submit" value="Đã nhận được hàng" onclick = "check_confirm_accept_order('Bạn đã nhận đơn hàng này ??','`+list_id_bill[dem]+`')">`;
            }
            dem ++;
        }
    });
}

function change_tab_order(className,status){
    
    document.getElementById("title-order-active").id = "";
    document.getElementsByClassName(className)[0].id = "title-order-active";
    
    render_from_data_bill(status);
    document.getElementsByClassName("show-order-bg")[0].innerHTML = "";
}

function cancel_order(id_order){
    db.collection("bill").doc(id_order).update({
            status : "Hủy"
        }).then(()=>{
            db.collection("bill").doc(id_order).get().then((doc)=>{
                doc.data().list_product.forEach((product)=>{
                    db.collection("Product").doc(product.id).get().then((item)=>{
                        db.collection("Product").doc(product.id).update({
                            amount : item.data().amount + product.amount
                        })
                    })
                })
            })
            notification("Hủy đơn hàng thành công ",true);
            change_tab_order('title-order-none','none_accept');
        });
}

function accept_order(id_order)
{
    db.collection("bill").doc(id_order).update({
        status : "Hoàn thành"
    }).then(()=>{
        change_tab_order('title-order-accept','accept');
        notification("Đơn hàng đã hoàn thành !!!", true);
    });
    
}
//#endregion

//#region render form confirm
function render_From_confirm(message)
{
    document.getElementsByClassName("confirm-accepted")[0].style.display = "flex";
    document.getElementsByClassName("confirm-accepted")[0].innerHTML = "";
    document.getElementsByClassName("confirm-accepted")[0].innerHTML += `<div class="pop-up-comfirm">
    <p>`+message+`</p>
    <div class="selection-bool">
        <input type="submit" value="Đồng ý" onclick = "" id="accept">
        <input type="submit" value="Trở về" id ="cancel">
    </div>
    </div>`;
}

function check_confirm_cancel_order(message,id_order)
{
    render_From_confirm(message);
    
    document.getElementById("accept").addEventListener("click",()=>{
        cancel_order(id_order);
        document.getElementsByClassName("confirm-accepted")[0].style.display = "none";
        document.getElementsByClassName("confirm-accepted")[0].innerHTML = "";
    });
    document.getElementById("cancel").addEventListener("click",()=>{
        document.getElementsByClassName("confirm-accepted")[0].style.display = "none";
        document.getElementsByClassName("confirm-accepted")[0].innerHTML = "";
    });
}


function check_confirm_accept_order(message,id_order)
{
    render_From_confirm(message);
    
    document.getElementById("accept").addEventListener("click",()=>{
        accept_order(id_order);
        document.getElementsByClassName("confirm-accepted")[0].style.display = "none";
        document.getElementsByClassName("confirm-accepted")[0].innerHTML = "";
    });
    document.getElementById("cancel").addEventListener("click",()=>{
        document.getElementsByClassName("confirm-accepted")[0].style.display = "none";
        document.getElementsByClassName("confirm-accepted")[0].innerHTML = "";
    });
}

//#endregion

//#region posts-product
function open_tab_posts()
{
    if(Checkauth())
    {
        document.getElementsByClassName("posts-product-form")[0].style.display = "flex";
        render_posts_product();
    }
    else{
        notification("Vui lòng đăng nhập !!!",false);
    }
}

function close_tab_posts()
{
    document.getElementsByClassName("posts-product-form")[0].style.display = "none";
}

function render_product_inposts(doc,dem,tel,fullname)
{
    document.getElementsByClassName("show-posts")[0].innerHTML += `
                <div class="posts-info">
                    <i class="fas fa-ellipsis-v icon-option">
                        <div class="drop-down-option">
                            <div onclick="open_tab_edit_posts(false,'`+doc.data().id+`')">Chỉnh sửa</div>
                            <div onclick = "check_confirm_delete_post('Bạn có thực sự muốn hủy bài viết ?','`+doc.data().id+`')">Hủy bài viết</div> 
                        </div>
                    </i>
                    <div class="posts-info-letf">
                        <div class="posts-info-img">
                            <img src="`+doc.data().image[0]+`" alt="">
                        </div>
                        <div class="posts-info-list-img">
                        </div>
                    </div>
                    <div class="posts-info-right">
                        <div class="posts-info-right-bg">
                            <div class="title-posts-product-right">
                                <p class="name-posts">`+doc.data().title+`</p>
                                <div class="price-posts">Giá tham khảo : <p>`+change_value_toString(doc.data().price)+` ₫</p></div>
                            </div>
    
                            <div class="info-product-posts">
                                <div class="info-id info-po">
                                    <p class="tile-info-product-posts">Mã bài viết : </p>
                                    <p class="id-posts">#`+doc.id+`</p>
                                </div>
                                <div class="info-submitted info-po">
                                    <p class="tile-info-product-posts">Ngày đăng : </p>
                                    <p class="submited-posts"></p>
                                </div>
                                <div class="info-type info-po">
                                    <p class="tile-info-product-posts">Loại hàng : </p>
                                    <p class="type-posts">`+doc.data().type+`</p>
                                </div>
                                
                            </div>
    
                            <div class="details-posts">
                                <p class="title-details-posts">Thông tin chi tiết sản phẩm</p>
    
                                <textarea class="info-details-posts" readonly >`+doc.data().content+`</textarea>
                            </div>
                        </div>
                    </div>
                </div>`;
                // render hinh anh 
                if(doc.data().image.length > 4)
                {
                    document.getElementsByClassName("posts-info-list-img")[dem].innerHTML += `
                    <div class="posts-info-img-previous change-img" onclick = "previous_img_slide('posts-list-show-img',`+dem+`)"><p><</p></div>`;
                    document.getElementsByClassName("posts-info-list-img")[dem].innerHTML += `
                    <div class="posts-list-show-img"></div>`;
                    for(let img of doc.data().image)
                    {
                        document.getElementsByClassName("posts-list-show-img")[dem].innerHTML +=`
                        <img src="`+img+`" alt="">`;
                    }
                    document.getElementsByClassName("posts-info-list-img")[dem].innerHTML += `
                    <div class="posts-info-img-next change-img" onclick="next_img_slide(`+(doc.data().image.length-4)+`,'posts-list-show-img',`+dem+`)" ><p>></p></div>`;
                }
                else{
                    document.getElementsByClassName("posts-info-list-img")[dem].innerHTML += `
                    <div class="posts-list-show-img"></div>`;
                    for(let img of doc.data().image)
                    {
                        document.getElementsByClassName("posts-list-show-img")[dem].innerHTML +=`
                        <img src="`+img+`" alt="">`;
                    }
                }
    
                // render ngay gio
    
                let date = new Date(doc.data().date_submitted.seconds * 1000);
                let month = date.getMonth() + 1;
                let string_date =("0"+ date.getDate()).substr(-2) + "/" + ("0" + month).substr(-2) +"/" + date.getFullYear();
                document.getElementsByClassName("submited-posts")[dem].innerHTML = string_date;
                
                // render thong tin lien he
                
                    document.getElementsByClassName("info-product-posts")[dem].innerHTML += `
                    <div class="info-fullname info-po">
                        <p class="tile-info-product-posts">Người bán : </p>
                        <p class="fullname-posts">`+fullname+`</p>
                    </div>
                    <div class="info-phonenumber info-po">
                        <p class="tile-info-product-posts">Số điện thoại liên hệ : </p>
                        <p class="phonenumber-posts">`+tel+`</p>
                    </div>`;
}

function render_posts_product(){
    let dem = 0;
    let fullname;
    let tel;
    let temp_list_posts = [];
    document.getElementsByClassName("show-posts")[0].innerHTML = "";
    db.collection("member").doc(auth.currentUser.displayName).get().then((item)=>{
        fullname = item.data().fullname;
        tel = item.data().tel;
        
        db.collection("posts").where('id_member','==',auth.currentUser.displayName).get().then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                temp_list_posts.push(doc);
            });
            document.getElementsByClassName("show-posts")[0].innerHTML = "";
            temp_list_posts.forEach((doc)=>{
                render_product_inposts(doc,dem,tel,fullname);
                dem++;
                console.log(dem,querySnapshot);
            })
            return;
        }).catch((e)=>{
            console.log(e.message);
        });
        
    });

    
}
//#endregion

//#region update or add posts
function close_tab_edit_posts()
{
    document.getElementsByClassName("edit-posts")[0].style.display = "none";
    render_posts_product();
}

function open_tab_edit_posts(flag,id) //flag : true - add , false - update 
{
    temp_img_data = [];
    temp_array_img_posts = [];
    document.getElementsByClassName("edit-posts")[0].style.display = "flex";
    document.getElementsByClassName("edit-posts")[0].innerHTML = "";
    document.getElementsByClassName("edit-posts")[0].innerHTML += `
    <div class="edit-posts-bg">
        <div class="close-button" onclick="close_tab_edit_posts()">
            <i class="far fa-times-circle" ></i>
        </div>
        <div class="title-edit-posts">
        </div>
        <div class="info-edit-posts">
            <div class="form-edit">
                <label for="name-poster">Tên sản phẩm : </label>
                <input type="text" id="name-poster" required>
            </div>
            <div class="form-edit">
                <label for="type-poster">Loại sản phẩm :</label>
                <input type="text" id="type-poster" required>
            </div>
            <div class="form-edit">
                <label for="price-poster">Giá sản phẩm :</label>
                <input type="text" id="price-poster" onkeypress="return event.charCode >= 48 && event.charCode <= 57" required>
            </div>
            <div class="form-edit">
                <label for="list-img-poster">Danh sách hình ảnh :</label>
                <input type="file" id="list-img-poster" multiple onchange="changeHandler(event,0)">
            </div>
            <div class="form-edit">
                <div></div>
                <div class="list-img-edit-poster">
                </div>
            </div>
            <div class="form-edit">
                <p for="content-poster">Thông tin sản phẩm : </p>
                <textarea id="content-poster" cols="30" rows="10" required></textarea>
            </div>
        </div>
    </div>`;
    if(flag)
    {
        document.getElementsByClassName("title-edit-posts")[0].innerHTML +='<p>Thêm bài viết</p>';
        document.getElementsByClassName("info-edit-posts")[0].innerHTML += `<div class = "button-update">
        <input type="submit" id="update-posts" value="Cập nhật" onclick ="add_posts()">
    </div>`;
    }
    else{
        document.getElementsByClassName("title-edit-posts")[0].innerHTML +='<p>Chỉnh sửa bài viết</p>';
        document.getElementsByClassName("info-edit-posts")[0].innerHTML += `<div class = "button-update">
        <input type="submit" id="update-posts" value="Cập nhật" onclick ="update_posts('`+id+`')">
    </div>`;
    render_posts_edit_update(id);
    }
}


function render_img_show_posts_all()
{
    document.getElementsByClassName("list-img-edit-poster")[0].innerHTML = "";
    render_img_data();
    render_img_show_posts(0);
}
//#region local_posts
var temp_array_img_posts = [];

function delete_file(vitri){
    console.log("truoc",temp_array_img_posts);
    temp_array_img_posts.splice(vitri,1);
    console.log("sau",temp_array_img_posts);
    render_img_show_posts_all();
}

function render_img_show_posts(dem)
{
    console.log("render",temp_array_img_posts);
    for(let i = 0 ; i< temp_array_img_posts.length ;i++)
    {
        let url = URL.createObjectURL(temp_array_img_posts[i]);

        document.getElementsByClassName("list-img-edit-poster")[dem].innerHTML += `
        <div class = "img-show-edit">
            <img src="`+url+`" alt="">
            <div class = "delete_img_edit" onclick = "delete_file(`+i+`)">
                Xóa
            </div>
        </div>`;
    }
}

function changeHandler(evt,dem) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.target.files;
    document.getElementsByClassName("list-img-edit-poster")[0].innerHTML = "";
    for(let i=0 ;i<files.length;i++)
    {
        temp_array_img_posts.push(files[i]);
    }
    console.log("add ",temp_array_img_posts);

    render_img_show_posts_all();
}
//#endregion

//#region data_img
var temp_img_data = [];

function add_img_delete_data(url)
{
    temp_img_delete_data.push(url);
}

function render_img_data(){
    let dem = 0;
    for(let img of temp_img_data){
        document.getElementsByClassName("list-img-edit-poster")[0].innerHTML += `
        <div class = "img-show-edit">
            <img src="`+img+`" alt="">
            <div class = "delete_img_edit" onclick ="delete_img_data(`+dem+`)">
                Xóa
            </div>
        </div>
        `;
        dem++;
    }
}

function delete_img_data(vitri)
{
    temp_img_data.splice(vitri,1);
    render_img_show_posts_all();
}
//#endregion

//#region update data
function update_posts(id){    
    let title = document.getElementById("name-poster").value;
    let type = document.getElementById("type-poster").value;
    let price = document.getElementById("price-poster").value;
    let content = document.getElementById("content-poster").value;
    let flag = true;
    
    if(title != "" && type != "" && price != "" && content != "")
    {
        let object = {
            title : title,
            type : type,
            price : price,
            content : content
        }
        console.log(object);
        db.collection("posts").doc(id).update(object).then(()=>{
            flag = true;
        }).catch((e)=>{
            notification(e,false);
            flag = false;
        });

        if(temp_img_data.length > 0)
        {
            db.collection("posts").doc(id).update({
                image : [],
            });
            for(let link of temp_img_data)
            {
                db.collection("posts").doc(id).update({
                    image : firebase.firestore.FieldValue.arrayUnion(link)
                });
            }
        }
            if(temp_array_img_posts.length > 0)
            {
                let dem = 0;
                for(let file of temp_array_img_posts)
                {    
                    var uploadTask = storage.ref('/posts/'+auth.currentUser.displayName+ "/"+id+"/" + file.name+'.png').put(file);
                    dem++;
                    uploadTask.on('state_changed',(snapshot) => {
                    }, 
                    (error) => {}, 
                    () => {
                        var listRef = storage.ref().child('/posts/'+auth.currentUser.displayName+ "/"+id);
                        listRef.listAll().then((res) => {
                            res.items.forEach((itemRef) => {
                                itemRef.getDownloadURL().then((url)=>{
                                     db.collection("posts").doc(id).update({
                                        image : firebase.firestore.FieldValue.arrayUnion(url),
                                    }).then(()=>{
                                        console.log("Thanh cong");
                                    }).catch((error)=>{
                                        console.log(error.message);
                                    });
                                })
                            });

                            
                        }).catch((error) => {
                            flag = false;
                            if(flag == false)
                            {
                                notification(error,false);
                            }
                        });
                    }
                    );
                }
            }
    }
    else
    {
        notification("Vui lòng nhập đầy đủ thông tin !!!",false);
        flag = false;
    }
    
    if(flag == true){
        notification("Cập nhật thành công",true);
        close_tab_edit_posts();
        setTimeout(function(){ render_posts_product(); }, 2000);
    }
    else{
        notification("Vui lòng nhập đầy đủ thông tin !!!",false);
    }
}

function render_posts_edit_update(id){
    db.collection("posts").doc(id).get().then((doc)=>{
        document.getElementById("name-poster").value = doc.data().title;
        document.getElementById("type-poster").value = doc.data().type;
        document.getElementById("price-poster").value = doc.data().price;
        document.getElementById("content-poster").value = doc.data().content; 

        for(let img of doc.data().image){
            temp_img_data.push(img);
        }
        render_img_show_posts_all();
    });
}
//#endregion

//#region add posts
function add_posts(){
    var title_temp = document.getElementById("name-poster").value;
    var type_temp = document.getElementById("type-poster").value;
    var price_temp = document.getElementById("price-poster").value;
    var content_temp = document.getElementById("content-poster").value;
    let flag = true;

    if(title_temp!=""&&type_temp!=""&&price_temp !=""&&content_temp!="" && temp_array_img_posts.length > 0){
        var object = {
            id : "",
            content : content_temp,
            date_submitted : new Date(),
            id_member : auth.currentUser.displayName,
            title : title_temp,
            type : type_temp,
            price : price_temp,
            status : false
        }
        db.collection("posts").add(object).then((e)=>{
            db.collection("posts").doc(e.id).update({
                id : e.id
            })
            for(let file of temp_array_img_posts)
            {    
                var uploadTask = storage.ref('/posts/'+auth.currentUser.displayName+ "/"+e.id+"/" + file.name+'.png').put(file);
                uploadTask.on('state_changed',(snapshot) => {
                }, 
                (error) => {}, 
                () => {
                            var listRef = storage.ref().child('/posts/'+auth.currentUser.displayName+ "/"+e.id);
                            listRef.listAll().then((res) => {
                                res.items.forEach((itemRef) => {
                                    itemRef.getDownloadURL().then((url)=>{
                                        db.collection("posts").doc(e.id).update({
                                            image : firebase.firestore.FieldValue.arrayUnion(url),
                                        }).then(()=>{
                                            console.log("Thanh cong");
                                            notification("Thêm bài đăng thành công !!!",true);
                                        }).catch((error)=>{
                                            notification("Thêm bài đăng thất bại !!!",false);
                                        });
                                    })
                                });
                            }).catch((error) => {
                                notification("Thêm bài đăng thất bại !!!",false);
                            });           
                }
                );
            }
        }).catch((e)=>{
            notification(e.message,true);
            notification("Thêm bài đăng thất bại !!!",false);
        });
        
    }else{
        notification("vui lòng nhập đầy đủ thông tin",false);
    }
    if(flag == true)
    {
        close_tab_edit_posts();
        setTimeout(function(){ render_posts_product(); }, 2000);
    }
    else{
        notification("vui lòng nhập đầy đủ thông tin",false);
    }
}
//#endregion
function check_confirm_delete_post(message,id_posts) //comfirm delete out cart
{
    render_From_confirm(message);
    
    document.getElementById("accept").addEventListener("click",()=>{
        delete_posts(id_posts);
        document.getElementsByClassName("confirm-accepted")[0].style.display = "none";
        document.getElementsByClassName("confirm-accepted")[0].innerHTML = "";
    });
    document.getElementById("cancel").addEventListener("click",()=>{
        document.getElementsByClassName("confirm-accepted")[0].style.display = "none";
        document.getElementsByClassName("confirm-accepted")[0].innerHTML = "";
    });
}

function delete_posts(id){ //test
    db.collection("posts").doc(id).delete().then(() => {
        var desertRef = storage.ref().child('/posts/'+auth.currentUser.displayName + "/" + id);
        desertRef.listAll().then((res) => {
            res.items.forEach((itemRef) => {
                itemRef.delete().then(() => {
                    notification("Hủy bài viết thành công !",true);
                    setTimeout(function(){ render_posts_product(); }, 2000);
                }).catch((error) => {
                    console.log(error,false);
                });
            })
        })
    }).catch((error) => {
        notification(error,false);
    });
}
//#endregion

//#region 
function render_product_with_search()
{

    let key = removeAccents(document.getElementById("key-product").value);
    var temp_list = []
    list_render_product = list_product;
    for(let product of list_product){
        let temp_string = removeAccents(product.type + " "+product.name);

        console.log(temp_string.includes(key),temp_string,key);
        
        if(temp_string.includes(key) == true){
            temp_list.push(product);
        }
        console.log(list_render_product);
        
    }
    if(list_render_product.length == 0)
        {
            notification("Không có sản phẩm này !!!");
            list_render_product = list_product;
        }
        else{
            list_render_product = temp_list;
        }
    render_list_product_f(list_render_product);
}

function removeAccents(str) {
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ", "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ"    
    ];
    for (var i=0; i<AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str.toLowerCase();
  }
//#endregion

//#region Checkout cart
function open_checkout_cart()
{
    if(list_product_incart.length != 0){
        render_info_customer_order();
        document.getElementsByClassName("form-checkout-bg")[0].style.display = "flex";
    }
    
    else
    notification("Không có hàng để thanh toán !!!",false);
}

function render_info_customer_order()
{
    document.getElementById("chose-option-number").id = "";
    document.getElementById("chose-option-title").id = "";
    document.getElementsByClassName("number-checkout")[0].id = "chose-option-number";
    document.getElementsByClassName("title-info-checkout")[0].id = "chose-option-title";

    document.getElementsByClassName("info-checkout-form-bg")[0].innerHTML ="";
    db.collection("member").doc(username).get().then((user)=>{
        let name_user = user.data().fullname;
        let phone_number = user.data().tel;
        let address = user.data().address;

        document.getElementsByClassName("info-checkout-form-bg")[0].innerHTML += `
        <div class="info-checkout-form">
        <i class="far fa-user">Thông tin người nhận</i>
        <div class="name-checkout">
            <p class="check-title">Tên người nhận :</p>
            <input type="text" class="name-receiver" value="`+name_user+`" placeholder="">
        </div>
        <div class="phonenumber-checkout">
            <p class="check-title">Số diện thoại :</p>
            <input type="text" class="phone-receiver" value="`+phone_number+`">
        </div>
        <i class="fas fa-map-marker-alt"> Địa chỉ nhận hàng</i>
        <div class="address-checkout">
            <p>Địa chỉ nhà :</p>
            <input type="text" class="address-receiver" placeholder="Địa chỉ nhà, Ngõ, Tên đường">
        </div>
        
        <div class="city-checkout">
            <p class="check-title">Tỉnh/Thành Phố :</p>
            <select name="city" id="city" onchange="render_district('00')">
                <option value="00" class="font-color"> "Nhấn Chọn Tỉnh/Thành Phố" </option>
            </select>
        </div>
        <div class="district-checkout">
            <p class="check-title" >Quận/Huyện :</p>
            <select name="district" id="district" onchange="render_ward('00')">
                <option value="00" class="font-color"> "Nhấn Chọn Quận/Huyện" </option>
            </select>
        </div>
        <div class="ward-checkout">
            <p class="check-title">Phường/Xã :</p>
            <select name="ward" id="ward">
                <option value="00" class="font-color"> "Nhấn Chọn Phường/Xã" </option>
            </select>
        </div>
    </div>`;
    document.getElementsByClassName("next-previou-checkout")[0].innerHTML = `
        <button class="button-checkout" style = "opacity : 0">Tiếp theo</button>
        <button class="button-checkout" onclick = "search_list_product_incart()">Tiếp theo</button>`;
    render_local();

    //render local
    let city,district,ward,local_ship="";
    let string_adress = address.split(", ");
    string_adress.forEach((address_temp)=>{
        if(address_temp.includes("Tỉnh")||address_temp.includes("Thành phố"))
        {
            city = address_temp;
        }else if(address_temp.includes("Quận")||address_temp.includes("Huyện"))
        {
            district = address_temp;
        }else if(address_temp.includes("Phường")||address_temp.includes("Xã"))
        {
            ward = address_temp;
        }else
        {
            local_ship += address_temp;
        }
    })
    console.log("địa chỉ",local_ship ,"Phường", ward ,"Quận", district,"Thành phố", city);
    document.getElementsByClassName("address-receiver")[0].value = local_ship;
    search_local(city,district,ward);
    });
}

function info_order_checkout(){
    let name_user = document.getElementsByClassName("name-receiver")[0].value;
    let phone_number = document.getElementsByClassName("phone-receiver")[0].value;
    let address_user = document.getElementsByClassName("address-receiver")[0].value;
    let ward = document.getElementById("ward");
    let district = document.getElementById("district");
    let city = document.getElementById("city");
    let address = "";
    let flag = true;

    //pull address
    if(ward.value != "00" && district.value != "00" && city != "00"&&address_user!="")
    {
        let city_string = city.options[city.selectedIndex].text;
        let district_string = district.options[district.selectedIndex].text;
        let ward_string = ward.options[ward.selectedIndex].text;

        address = address_user +", "+ward_string+", "+district_string+", "+city_string;
        console.log(address);
    }
    else{
        flag = false;
        notification("Vui lòng nhập đầy đủ thông tin !!!",false);
        return false;
    }
    
    //checking blank
    if(name_user != ""&&phone_number!=""&&flag == true)
    {
        db.collection("member").doc(username).update({
            fullname : name_user,
            tel : phone_number,
            address : address
        }).then(()=>{
            //render next
        }).catch((error)=>{
            notification(error.message,false);
            flag = false;
            return false;
        })
    }

    if(flag == true)
    {
        return true;
    }

}

function search_list_product_incart(){
    if(info_order_checkout())
    {
        
        let address_user = document.getElementsByClassName("address-receiver")[0].value;
        let ward = document.getElementById("ward");
        let district = document.getElementById("district");
        let city = document.getElementById("city");
        let city_string = city.options[city.selectedIndex].text;
        let district_string = district.options[district.selectedIndex].text;
        let ward_string = ward.options[ward.selectedIndex].text;

        let name_user = document.getElementsByClassName("name-receiver")[0].value;
        let phone_number = document.getElementsByClassName("phone-receiver")[0].value;
        let address = address_user +", "+ward_string+", "+district_string+", "+city_string;

        var temp_list_checkout = [];
        let sum = 0
        list_product_incart.forEach((product)=>{
            sum += product.price * product.amount;
        });
        let list_temp_array = [];
        while(list_product_incart.length != 0){
            temp = [];
            let shop_name = list_product_incart[0].id_shop; 
            temp.push(list_product_incart[0]);
            list_temp_array.push(list_product_incart[0]);
            console.log("[0] ", list_product_incart.splice(0,1));

            let list_product_incart_temp = [];
            for(let i = 0 ; i< list_product_incart.length;i++){
                if(shop_name == list_product_incart[i].id_shop)
                {        
                    temp.push(list_product_incart[i]);
                    list_temp_array.push(list_product_incart[i]);
                }
                else{
                    list_product_incart_temp.push(list_product_incart[i]);
                }
            }
            temp_list_checkout.push(temp);
            list_product_incart = list_product_incart_temp;
        }
        
        render_info_order_checkout(temp_list_checkout,sum,name_user,phone_number,address);
        list_product_incart = list_temp_array;
        console.log(list_product_incart);
    }
}

function render_product_checkout_info(list_array_product,dem){
    let sum = 0
    for(let product of list_array_product)
    {
        let sum_product = product.amount * product.price;
        db.collection("Product").doc(product.id).get().then((doc)=>{
            
            document.getElementsByClassName("list-product-checkout")[dem].innerHTML +=
            `<div class="order-product">
                <img src="`+doc.data().picture[0]+`" alt="">
                <div class="info-product-order-bg border-bottom">
                    <div class="info-product-order ">
                        <div class="name-pd-order">
                            <p>`+doc.data().name+`</p>
                        </div>
                        <div class="amount-pd-order"><p>Số lượng : `+product.amount+`</p></div>
                        <div class="price-pd-order">`+change_value_toString(sum_product)+` ₫</div>
                    </div>
                </div>
            </div>
            `;
            
        })
        sum += sum_product;
    };
    return sum;
}

function change_typeship(dem,sum){
    let value_cod = document.getElementsByClassName("shipper")[dem].value;
    document.getElementsByClassName("price-ship-checkout")[dem].innerHTML = change_value_toString(value_cod)+ "₫";
    document.getElementsByClassName("ship-code-checkout")[dem].innerHTML = change_value_toString(Number(value_cod) + Number(sum)) + "₫";
    let sum_ship = 0
    let temp_dom = document.getElementsByClassName("shipper");
    for(let dom of temp_dom)
    {
        sum_ship += Number(dom.value);
    }
    document.getElementsByClassName("cod-sum-checkoutcart")[1].innerHTML = change_value_toString(sum_ship) + "₫";
    let sum_price = 0
    for(let product of list_product_incart)
    {
        sum_price += product.price * product.amount;
    }
    document.getElementsByClassName("cod-sum-checkoutcart")[2].innerHTML = change_value_toString(sum_ship+sum_price) + "₫";
}

function render_product_checkout(list_array_product,dem){
    let sum = 0 ;
    db.collection("Shop").doc(list_array_product[0].id_shop).get().then((shop)=>{
        document.getElementsByClassName("add-in")[0].innerHTML +=
            `<div class="list-order-info list-order-checkout">
                <div class="list-order-checkout-left">
                    <div class="title-order-info">
                        <p>Tên Shop : `+shop.data().name+`</p>
                    </div>
                    <div class="list-product-checkout">
                        
                        
                    </div>
                </div>
                <div class="list-order-checkout-right">
                    <div class="list-order-info-right-bg">
                        <div class="order-cart">
                            <p class="title-or">Tổng giá trị sản phẩm</p>
                            <p class="sum-price-checkout"></p>
                        </div>
                        <div class="order-cart">
                            <div class="shipper-cod-checkout">
                                
                            </div>
                            <p class = "price-ship-checkout"></p>
                        </div>
                        <div class="order-cart">
                            <p class="title-or">Tổng số tiền</p>
                            <p class="ship-code-checkout"></p>
                        </div>
                    </div>
                </div>
            </div>`;
            
            // setTimeout(function(){ render_product_checkout_info(list_array_product,dem); }, 100);
            sum += render_product_checkout_info(list_array_product,dem);
            document.getElementsByClassName("sum-price-checkout")[dem].innerHTML += change_value_toString(sum) + "₫";
            document.getElementsByClassName("shipper-cod-checkout")[dem].innerHTML += `
            <p class="title-or">Phương thức vận chuyển</p>
            <select name="shipper" class="shipper" onchange ="change_typeship(`+Number(dem)+`,`+sum+`)">
                <option value="25000">Giao hàng nhanh</option>
                <option value="20000">Giao hàng tiết kiệm</option>
                <option value="45000">Giao hàng siêu tốc</option>
            </select>`;
            let price_cod = document.getElementsByClassName("shipper")[dem].value;
            document.getElementsByClassName("price-ship-checkout")[dem].innerHTML = change_value_toString(price_cod)+ "₫";
            document.getElementsByClassName("ship-code-checkout")[dem].innerHTML = change_value_toString(Number(price_cod) + sum)+ "₫";
            
    });
}

function render_info_order_checkout(list_product_checkout,sum_price_product,name_user,phone_number,address){
    document.getElementById("chose-option-number").id = "";
    document.getElementById("chose-option-title").id = "";
    document.getElementsByClassName("number-checkout")[1].id = "chose-option-number";
    document.getElementsByClassName("title-info-checkout")[1].id = "chose-option-title";

    document.getElementsByClassName("info-checkout-form-bg")[0].innerHTML ="";
    document.getElementsByClassName("info-checkout-form-bg")[0].innerHTML += `
    <div class="info-product-checkout">
        <div class="add-in"></div>
        <div class="sum-cartcheckout-bg">
    <div class="sum-cartcheckout">
        <div class="type-cash">
            <p class="title-sum-checkoutcart">Hình thức thanh toán</p>
            <select name="type-cart-check" id="type-cart-checkout">
                <option value="cod">Thanh toán khi nhận hàng</option>
                <option value="direct-payment">Thanh toán trực tuyến</option>
            </select>
        </div>
        <div class="sum-price-product-checkout">
            <p class="title-sum-checkoutcart">Tổng giá trị sản phẩm</p>
            <p class="cod-sum-checkoutcart">18.000.000 ₫</p>
        </div>
        <div class="sum-shipcod">
            <p class="title-sum-checkoutcart">Tổng tiền giao hàng</p>
            <p class="cod-sum-checkoutcart">100.000 ₫</p>
        </div>
        <div class="sum-checkout">
            <p class="title-sum-checkoutcart">Số tiền thanh toán</p>
            <p class="cod-sum-checkoutcart">1.000.000 đ</p>
        </div>
    </div>
</div>
    </div>`;
    document.getElementsByClassName("next-previou-checkout")[0].innerHTML = `
        <button class="button-checkout" onclick = "render_info_customer_order()">Quay lại</button>
        <button class="button-checkout" onclick = "change_Bill('`+name_user+`','`+phone_number+`','`+address+`')">Tiếp theo</button>`;
    let dem = 0;
    let dem_temp = 0;
    list_product_checkout.forEach((list_array_product)=>{
        render_product_checkout(list_array_product,dem);
        dem_temp += 25000;
        dem++;
    });
    document.getElementsByClassName("cod-sum-checkoutcart")[0].innerHTML = change_value_toString(sum_price_product) + "₫";
    document.getElementsByClassName("cod-sum-checkoutcart")[1].innerHTML = change_value_toString(dem_temp) + "₫";
    document.getElementsByClassName("cod-sum-checkoutcart")[2].innerHTML = change_value_toString(dem_temp+sum_price_product) + "₫";
}

function change_Bill(name_user,phone_number,address){
    document.getElementsByClassName("next-previou-checkout")[0].innerHTML = ``;
    let dem =0;
    while(list_product_incart.length != 0){
        temp = [];
        
        let shop_name = list_product_incart[0].id_shop; 
        temp.push(list_product_incart[0]);
        console.log("[0] ", list_product_incart.splice(0,1));

        let list_product_incart_temp = [];
        for(let i = 0 ; i< list_product_incart.length;i++){
            if(shop_name == list_product_incart[i].id_shop)
            {        
                temp.push(list_product_incart[i]);
            }
            else{
                list_product_incart_temp.push(list_product_incart[i]);
            }
        }
        
        list_product_incart = list_product_incart_temp;

        //update bill
        let date = new Date();
        let ship_cod = document.getElementsByClassName("shipper")[dem].value;
        dem++;
        let data = {
            date_submitted : date,
            tel : phone_number,
            fullname : name_user,
            address : address,
            id_shop : shop_name,
            id_member : username,
            list_product : temp,
            status : "Chưa xác nhận",
            ship_cod : ship_cod,
            type_cash : document.getElementById("type-cart-checkout").value
        }
        db.collection("bill").doc().set(data).then(()=>{
            console.log("temp", temp);
        });

        // update amount
        for(let product of temp){
            for(let item of list_product)
            {
                if(product.id == item.id)
                {
                    item.amount -=  product.amount;
                }
            }
            db.collection("Product").doc(product.id).get().then((doc)=>{
                console.log(product.id,doc.data().amount)
                db.collection("Product").doc(product.id).update({
                    amount : doc.data().amount - product.amount
                }).then(()=>{
                    notification("Thanh toán thành công !!!", true);
                });
            });   
        }    
    }

    db.collection("member").doc(username).update({
        list_product : list_product_incart
    })
    document.getElementById("chose-option-number").id = "";
    document.getElementById("chose-option-title").id = "";
    document.getElementsByClassName("number-checkout")[2].id = "chose-option-number";
    document.getElementsByClassName("title-info-checkout")[2].id = "chose-option-title";

    document.getElementsByClassName("info-checkout-form-bg")[0].innerHTML ="";
    document.getElementsByClassName("info-checkout-form-bg")[0].innerHTML += `
    <div class="finish-checkoutcart">
        <div>
            <i class="far fa-check-circle"></i>
            <p>Thanh Toán thành công</p>
        </div>
    </div>`;
    push_data_from_list_incart(username);
}
function close_checkout_cart()
{
    document.getElementsByClassName("form-checkout-bg")[0].style.display = "none";
}

function render_form_checkout()
{
    document.getElementsByClassName("form-checkout-bg")[0].innerHTML = `
        `;

}
//#endregion