
'use strict';
var ROUTER = {};

ROUTER.url = 'https://www.googleapis.com/blogger/v3/blogs';
ROUTER.id = '6351845511945066';
ROUTER.key = 'AIzaSyAX6Ovl5QizH6f3C1RrWZ7kW8VqQ4PGcIs';
ROUTER.param = 'posts?orderBy=updated&status=live&maxResults=19';
ROUTER.fields = 'fields=items(id,labels,title,content,updated,author/displayName)';
ROUTER.fieldsPage = 'fields=id,title,content,updated,author/displayName';
ROUTER.urls = {};
ROUTER.item = {};
ROUTER.get = {};
ROUTER.extract = {};
ROUTER.urls.products = `${ROUTER.url}/${ROUTER.id}/${ROUTER.param}&labels=Products&${ROUTER.fields}&key=${ROUTER.key}`;
ROUTER.urls.articles = `${ROUTER.url}/${ROUTER.id}/${ROUTER.param}&labels=Articles&${ROUTER.fields}&key=${ROUTER.key}`;
ROUTER.urls.pages = pageId => `${ROUTER.url}/${ROUTER.id}/pages/${pageId}?${ROUTER.fieldsPage}&key=${ROUTER.key}`;
ROUTER.urls.post = postId => `${ROUTER.url}/${ROUTER.id}/posts/${postId}?${ROUTER.fieldsPage}&key=${ROUTER.key}`;
ROUTER.urls.postLabels = labels => `${ROUTER.url}/${ROUTER.id}/posts?labels=${labels}&${ROUTER.fields}&key=${ROUTER.key}`;
ROUTER.urls.postSearch = q => `${ROUTER.url}/${ROUTER.id}/posts/search?q=${q}&${ROUTER.fields}&key=${ROUTER.key}`;


ROUTER.get.products = function(u,callback){
  $.get(u,function(d){
    ROUTER.item.products = d.items;
    callback(d.items);
  });
}

ROUTER.get.articles = function(u,callback){
  $.get(u,function(d){
    if(d.items === undefined){ let a = []; a.push(d); ROUTER.item.articles = a }
    else ROUTER.item.articles = d.items;
    callback(ROUTER.item.articles);
  });
}

ROUTER.get.instagram = function(callback){
  let u = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=4231473690.1677ed0.c10b1a69255149959d47a7df4f962e83';
  $.ajax({url:u,dataType:'jsonp',success:function(d){
    ROUTER.item.instagram=d.data;
    callback(ROUTER.item.instagram)
  }});
}

ROUTER.extract.price = obj => obj.split("int='")[1].split("'")[0];
ROUTER.extract.priceText = obj => obj.split("int='")[1].split(">")[1].split('<')[0];
ROUTER.extract.code = obj => obj.split("code'>")[1].split("<")[0];
ROUTER.extract.stock = obj => obj.split("stock'>")[1].split("<")[0];
ROUTER.extract.promo = obj => obj.split("promo'>")[1].split("<")[0];
ROUTER.extract.desc = obj => obj.split("<p>")[1].split("</p>")[0];
ROUTER.extract.img = obj => {
  let o = [];
  let s = obj.split("src='");
  for (let i in s) {
    (i > 0 && i < s.length) && o.push(s[i].split("'")[0])
  }
  return o
}

ROUTER.home = () => {
  CON.menu();
  CON.cart();
  ROUTER.get.products(ROUTER.urls.products,function(d){ CON.product(d) });
}

ROUTER.products = () => {
  CON.menu();
  CON.cart();
  ROUTER.get.products(ROUTER.urls.products,function(d){ CON.product(d) });
}

ROUTER.articles = () => {
  CON.menu();
  CON.cart();
  ROUTER.get.articles(ROUTER.urls.articles,function(d){ CON.article(d); CON.menu_article() });
}


ROUTER.home()








