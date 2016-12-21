
'use strict';

var CON = {};

/* 
 * Main
 * menu
 */
CON.menu = function(){
  let h='';
  let m=CONFIG.menu;
  for(let i in m){
    if(typeof m[i]==='string') h+=`<li id='Side-link-${i.replace(' ','')}'  link='${m[i]}'>${i}</li>`;
    else if(typeof m[i]==='object'){
      h+=`<li id='Side-button-products'>${i}</li>`;
      h+=`<div id='Side-section-products' class='Side-section'>`;
        h+=`<b class='Side-section-title on'>Product</b>`;
        for(let ii in m[i]){
          h+=`<div class='Side-section-category'>`;
            h+=`<b>${ii}</b>`;
            for(let iii in m[i][ii]) h+=`<li label='${m[i][ii][iii].split(',')[1]}'>${m[i][ii][iii].split(',')[0]}</li>`;
          h+=`</div>`;
      };
      h+=`</div>`;
    }
  };
  $('#Side').html(h);
  $('#Main-gallery').hide();
  Main.resize();
}

CON.menu_article = function(){
  let h='';
  let a=ROUTER.item.articles;
  h+=`<li id='Side-button-articles'>Articles</li>`;
  h+=`<div id='Side-section-articles' class='Side-section'>`;
    h+=`<b class='Side-section-title on'>Articles</b>`;
    h+=`<div class='Side-section-category'>`;
    for(let i in a) h+=`<li pid='${a[i].id}'>${a[i].title}</li>`;
  h+=`</div>`;
  $(h).insertAfter('#Side-section-products');
  Main.resize();
}



/* 
 * Main
 * article
 */
CON.article = function(obj,full){
  let h='';
  for(let i in obj){
    let author = obj[i].author.displayName || obj[i].author;
    let date = obj[i].updated || obj[i].date;
    date = date.indexOf('-') < 0 ? date : date.split('T')[0].replace(/-/g,'/');
    h+=`<div class='Main-articles-item'>`;
      h+=`<h2>${obj[i].title}</h2>`;
      h+=`<div class='Main-articles-item-info'><b>${author}</b> - ${date}</div>`;
      if(full === undefined){
        let c=obj[i].content.split('***');
        h+=`${c[0]}`;
        if(c.length>1) h+=`<div class='Main-articles-item-readmore' pid='${obj[i].id}'>Baca selengkapnya..</div>`;
      }else{
        h+=obj[i].content;
      }
    h+=`</div>`;
  };
  $('#Main-articles').hide().html(h).fadeIn();
  Main.scrollToTop();
}

CON.product = function(obj){
  let h='';
  let p=obj;
  h+=`<div class='Main-products-section'>`;
    h+=`<h2 class='Main-products-section-title'>Products</h2>`;
    for(let i in p){
      let c = p[i].content;
      h+=`<div class='Main-products-item'>`;
        h+=`<img class='Main-products-item-img' pid='${p[i].id}' src='${ROUTER.extract.img(c)[0]}'/>`;
        h+=`<h4 class='Main-products-item-title'>${p[i].title}</h4>`;
        h+=`<b class='Main-products-item-price'>Rp ${fn.toIDR(ROUTER.extract.price(c))}</b>`;
      h+=`</div>`;
    };
    if(p === undefined) h+= 'Sorry no item found.';
  h+=`</div>
      <div class='Main-nav'>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
      </div>
  `;
  $('#Main-products').hide().html(h).fadeIn();
  Main.scrollToTop();
}

CON.gallery = function(obj){
  let h='';
  h+='<h1>Instagram</h1><br/><br/>';
  let limit = 12;
  for(let i=0; i<limit; i++){
    h+=`<div class='Main-gallery-item'>`;
      h+=`<img class='Main-gallery-img'src='${obj[i].images.thumbnail.url}' pid='${i}'/>`;
    h+=`</div>`;
  }
  $('#Main-gallery').html(h);
}



/* 
 * Header
 * cart
 */
CON.cart = function(){
  let c=JSON.parse(localStorage.CART);
  let h='';
  let prices=0;
  let qtt=0;
  for(let i in c){
    prices += c[i].price*1*c[i].quantity;
    qtt+=c[i].quantity*1;
    h+=`<div class='Cartbox-item'>`;
      h+=`<img class='Cartbox-item-icon' src='${c[i].pic}'/>`;
      h+=`<input class='Cartbox-item-quantity' value='${c[i].quantity}'/>`;
      h+=`<div class='Cartbox-item-name'>${c[i].title}</div>`;
      h+=`<div class='Cartbox-item-price'>${fn.toIDR(c[i].price)} (${fn.toIDR(c[i].price*c[i].quantity)})</div>`;
      h+=`<div class='Cartbox-item-del' pid='${c[i].id}'>Hapus</div>`;
    h+=`</div>`;
  }
  h=h===''?'No item.':h;
  $('#Cartbox-container').html(h);
  $('#Cart-items').text(`${qtt} Item(s)`);
  $('#Cart-price').text(`Rp ${fn.toIDR(prices)}`);
}

CON.cart_add = function(pid,qtt){
  let p=ROUTER.item.products;
  let c=JSON.parse(localStorage.CART);
  for(let i in c) if(c[i].id === pid){
    fn.notif('red','Item sudah ada di daftar pesanan!');
    return
  }
  p=fn.getItemByVal(p,'id',pid);
  qtt= qtt === undefined ? 1 : qtt;
  c.push({
    id: p.id,
    title: p.title,
    code: ROUTER.extract.code(p.content),
    pic: ROUTER.extract.img(p.content)[0],
    quantity: qtt,
    price: ROUTER.extract.price(p.content)
  });
  localStorage.CART=JSON.stringify(c);
  fn.notif('green','Item ditambahkan ke daftar pesanan');
  CON.cart();
}

CON.cart_del = function(pid,delAll){
  if(delAll===1) localStorage.CART=JSON.stringify([]);
  else{
    let c=JSON.parse(localStorage.CART);
    for(let i in c) if(c[i].id === pid) c.splice(i,1);
    localStorage.CART=JSON.stringify(c);
  }
  CON.cart();
}

CON.cart_update = function(pid,qtt){
  CON.cart_del(pid);
  CON.cart_add(pid,qtt);
}



/* 
 * Main
 * Checkout
 */
 CON.checkout = function(){
  let c=JSON.parse(localStorage.CART);
  let h='';
  let prices=0;
  let qtt=0;
  for(let i in c){
    prices += (parseInt(c[i].price)*parseInt(c[i].quantity));
    qtt+=c[i].quantity*1;
    h+=`<tr>`;
      h+=`<td>${i*1+1}.</td>`;
      h+=`<td>${c[i].title}</td>`;
      h+=`<td>${c[i].code}</td>`;
      h+=`<td>${fn.toIDR(c[i].price)}</td>`;
      h+=`<td>${c[i].quantity}</td>`;
      h+=`<td>${fn.toIDR(c[i].price*c[i].quantity)}</td>`;
    h+=`</tr>`;
  };
  CON.article([{
    title:'Checkout',
    date:`(${qtt} Items)`,
    author:'Detail Pesanan',
    link:'',
    content:`
<table id='Checkout-table'>
  <tr id='Checkout-table-title'>
    <th id='Checkout-table-no'>No</th>
    <th id='Checkout-table-item'>Item</th>
    <th id='Checkout-table-code'>Code</th>
    <th id='Checkout-table-price'>Price</th>
    <th id='Checkout-table-quantity'>Quantity</th>
    <th id='Checkout-table-totalPrice'>Total price</th>
  </tr>${h}
  <tr id='Checkout-table-tot'>
    <td></td><td></td><td></td><td></td><td></td><td>Rp ${fn.toIDR(prices)},00</td>
  </tr>
</table>
  ${caraPemesanan}
  `}]);
  $('#Main-products').hide();
};



/* 
 * Main
 * preview
 */
CON.preview_active;
CON.preview = function(pid,prevNext){
  let p=ROUTER.item.products;
  if(prevNext !== undefined){
    if(prevNext === 'prev') p=fn.getItemByVal(p,'id',pid,'prev'); 
    else p=fn.getItemByVal(p,'id',pid,'next');
  }
  else p=fn.getItemByVal(p,'id',pid);
  if(p === undefined)return false;
  let h='';
  let c=p.content;
  let img = ROUTER.extract.img(c);
  h+=`<div id='Preview-products-container' class='container'>`;
    h+=`<div id='Preview-products-prev' class='Preview-prevNext'></div>`;
    h+=`<div id='Preview-products-next' class='Preview-prevNext'></div>`;
    if(ROUTER.extract.promo(c)!=='')h+=`<div id='Preview-products-promo'>${ROUTER.extract.promo(c)}</div>`;
    h+=`<div id='Preview-products-nav'>`;
    for(let i in img){
      h+=`<li class='Preview-products-nav-li'>${i*1+1}</li>`;
    };
    h+=`</div>`;
    h+=`<img id='Preview-products-img' src='${img[0]}'/>`;
    h+=`<div id='Preview-products-details'>`;
      h+=`<div id='Preview-products-add' title='Add to cart'>+</div>`;
      h+=`<div id='Preview-products-name' t=''>${p.title}</div>`;
      h+=`<div id='Preview-products-code' t='Code'>${ROUTER.extract.code(c)}</div>`;
      h+=`<div id='Preview-products-price' t='Price'>Rp ${fn.toIDR(ROUTER.extract.price(c))} /item</div>`;
      h+=`<div id='Preview-products-stock' t='Stock'>${ROUTER.extract.stock(c)}</div>`;
      h+=`<div id='Preview-products-desc' t='Description'>${ROUTER.extract.desc(c)}</div>`;
    h+=`</div>`;
  h+=`</div>`;
  $('#Preview-products').html(h);
  CON.preview_active=p;
}

CON.preview_img = function(num){
  $('#Preview-products-img').attr('src',CON.preview_active.pics[num-1]);
}

CON.preview_gallery = function(pid){
  let p=ROUTER.item.instagram[pid];
  if(p === undefined)return;
  let h='';
  h+=`<div id='Preview-gallery-container' class='container'>`;
    h+=`<div id='Preview-gallery-prev' class='Preview-prevNext'></div>`;
    h+=`<div id='Preview-gallery-next' class='Preview-prevNext'></div>`;
    h+=`<img id='Preview-gallery-img' src='${p.images.standard_resolution.url}'/>`;
    h+=`<div id='Preview-gallery-details'>`;
      h+=`<h3></h3>`;
      h+=`<div id='Preview-gallery-info' t='Info'>${p.caption.text.replace(/\"/g, '')}</div>`;
    h+=`</div>`;
  h+=`</div>`;
  $('#Preview-gallery').html(h);
  CON.preview_active=pid;
}



CON.harga = function(obj){
  $('#Main-products').html(obj);
}

























