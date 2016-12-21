

var fn={};


_ = str => console.log(str);

fn.getItemByVal = (obj,key,val,prevNext) => {
  prevNext = prevNext === undefined ? 0 : prevNext === 'prev' ? -1 : 1;
  for(let i in obj) if(obj[i][key]===val) return obj[i*1+prevNext];
}


fn.notifTimeout;
fn.notif = (classs,str) => {
  clearTimeout(fn.notifTimeout);
  $('#Notif').text(str).attr('class',classs).show();
  fn.notifTimeout=setTimeout(function(){
    $('#Notif').fadeOut(300);
  },5000);
}

fn.loader = num => { 
  num === 1 && $('#Loader-cover').show();
  num === 0 && $('#Loader-cover').hide();
}

fn.toIDR = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.');

fn.panel = opacity => {
  $('#Panel').css({opacity:opacity}).show();
}


$(document)
  .ajaxStart(()=>{ fn.loader(1) })
  .ajaxStop(()=>{ fn.loader(0) });

