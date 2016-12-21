

/* 
 * Side
 * Menu
 */

$('#Side').on('click','#Side-link-Home',function(){
    ROUTER.home()
});
$('#Side').on('click','#Side-link-Instagram',function(){
    ROUTER.get.instagram(function(d){CON.gallery(d)});
    $('#Main-products,#Main-articles,#Side-section-products,#Side-section-articles').hide();
    $('#Main-gallery').fadeIn();
});
$('#Side').on('click','#Side-button-products',function(){
    ROUTER.products();
    $('#Main-articles').hide();
});
$('#Side').on('click','#Side-button-articles',function(){
    ROUTER.articles();
    $('#Main-products,#Side-section-products').hide();
});

$('#Side').on('click',
  '#Side-link-DaftarHarga,\
   #Side-link-CaraPemesanan,\
   #Side-link-CaraPembayaran,\
   #Side-link-Pengiriman',
  function(){
    ROUTER.get.articles(ROUTER.urls.pages($(this).attr('link')),function(d){ 
      CON.article(d);
      $('#Main-products,#Side-section-products,#Side-section-articles').hide();
    });
});

$('#Side').on('click',
  '#Side-section-articles  li',function(){
    ROUTER.get.articles(ROUTER.urls.post($(this).attr('pid')),function(d){ 
      CON.article(d,1);
      $('#Main-products,#Side-section-products').hide();
    });
});

$('#Side').on('click',
  '#Side-section-products  li',function(){
    ROUTER.get.products(ROUTER.urls.postSearch($(this).text()),function(d){ 
      CON.product(d);
      $('#Main-articles').hide();
    });
});

$('#Search-input').on('input',function(){
  let v = $(this).val();
  if(v.length<3)return;
    ROUTER.get.products(ROUTER.urls.postSearch(v),function(d){ 
      CON.product(d);
      $('#Main-articles').hide();
    });
});

$('#Main-articles').on('click',
  '.Main-articles-item-readmore',function(){
    ROUTER.get.articles(ROUTER.urls.post($(this).attr('pid')),function(d){ 
      CON.article(d,1);
      $('#Main-products,#Side-section-products').hide();
    });
});












/* 
 * Header
 * Cart
 */
$('#Cart,#Cartbox')
  .on('mouseenter',function(){
    if($('#Cartbox').is(':visible'))return;
    setTimeout(function(){
      $('#Cart:hover,#Cartbox:hover').length === 0 || $('#Cartbox').show();
    },300);
  })
  .on('mouseleave',function(){
    $('#Cart:hover,#Cartbox:hover').length === 0 && $('#Cartbox').hide();
});

$('#Cartbox').on('change','.Cartbox-item-quantity',function(){
  CON.cart_update($(this).siblings('.Cartbox-item-del').attr('pid'),$(this).val());
});

$('#Cartbox').on('click','.Cartbox-item-del',function(){
  CON.cart_del($(this).attr('pid'));
});

$('#Cartbox-empty').on('click',function(){
  CON.cart_del(0,1);
});

$('#Cartbox-checkout').on('click',function(){
  fn.loader(1);
  $('#Cartbox').hide();
  setTimeout(()=>{
    CON.checkout();
    fn.loader(0);
  },1000);
});



/* 
 * Main
 * Product Preview
 */
$('#Panel').on('click',function(){
  $('#Panel,#Preview-products,#Preview-gallery').hide()
});

$('#Main-products').on('click','img',function(){
  CON.preview($(this).attr('pid'));
  $('#Preview-products').show();
  fn.panel('0.6');
});

$('#Preview-products').on('click','li',function(){
  CON.preview_img($(this).text())
});

$('#Preview-products').on('click','#Preview-products-add',function(){
  CON.cart_add(CON.preview_active.id);
});

$('#Preview-products').on('click','.Preview-prevNext',function(){
  $(this).attr('id')==='Preview-products-prev'?
    CON.preview(CON.preview_active.id,'prev'):
    CON.preview(CON.preview_active.id,'next');
});

$('#Preview-products').on('click',function(e){
  this===e.target && $('#Panel').click();
});


/* 
 * Main
 * Gallery Preview
 */
$('#Main-gallery').on('click','img',function(){
  CON.preview_gallery($(this).attr('pid'));
  fn.panel('0.8');
  $('#Preview-gallery').show()
});

$('#Preview-gallery').on('click','.Preview-prevNext',function(){
  $(this).attr('id')==='Preview-gallery-prev'?
    CON.preview_gallery(CON.preview_active*1-1):
    CON.preview_gallery(CON.preview_active*1+1);
});

$('#Preview-gallery').on('click',function(e){
  this===e.target && $('#Panel').click();
});



/* 
 * Footer
 * 
 */
$('#BackToTop').on('click',function(){
  Main.scrollToTop();
});


/* 
 * General
 * 
 */
// keyboard event
document.onkeydown=function(e){
  e.keyCode === 27 && $('#Panel').click();
  e.keyCode === 37 && $('#Preview-products').is(':visible') && $('#Preview-products-prev').click();
  e.keyCode === 39 && $('#Preview-products').is(':visible') && $('#Preview-products-next').click();
  e.keyCode === 37 && $('#Preview-gallery').is(':visible') && $('#Preview-gallery-prev').click();
  e.keyCode === 39 && $('#Preview-gallery').is(':visible') && $('#Preview-gallery-next').click();
};

let Main = {};
// resize #Main to #Side absolute height
Main.resize=()=> { $('main').css({'min-height':$('#Side').height()+100}) };
Main.scrollToTop=()=> { $('body').animate({scrollTop:0}) };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
