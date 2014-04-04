$(document).ready(function(){

  var campaign = getURLParameter('utm_campaign');
  if ( !campaign ) {
    campaign = getURLParameter('event_source');
  }

  if (campaign) {
    $.cookie('event_source', campaign, {
      expire: 60,
      path: '/'
    });
  }

  //Show report card focus portholes after page load on report card landing page
  if($(window).width() > 768){
    setTimeout(function(){ $('#card_reveal #full').css("opacity",".5")  }, 600);
    setTimeout(function(){ $('#card_reveal #rnd').fadeIn('slow')  }, 1000);
    setTimeout(function(){ $('#card_reveal #rec').fadeIn('slow') }, 2000);
  }
  //setTimeout(function(){ $('#first_cta').fadeIn('slow') }, 3000);
  
  //Handle selected state of report card menu options
  $("#nav li").on("click",function(){
    $("#nav li").removeClass("selected");
    $(this).addClass("selected");
  });
  $("#nav li#top").on("click",function(){
    $("#nav li").removeClass("selected");
    $("#nav ul li:first-child").addClass("selected");
  });



  //init the fixed nav
  var fixed_nav_height = 100;
  if($('#nav_trigger').length > 0){
    var show_fixed_nav_at = (parseInt($('#nav_trigger').offset().top) + parseInt($('#nav_trigger').height()));
  }
  else{
    var show_fixed_nav_at = (parseInt($('#feature_area').offset().top) + parseInt($('#feature_area').height()));
  }
  var showing = false;
  
  browser_platform.init();
  
  //pricing page tabs
  if($('#pricing_grid_header').length > 0){
    if(!pricing_tabs.started){ pricing_tabs.init(); }
  }
  
  //init the opacity on the pricing quote
  $('section#teacher_quote blockquote').css('opacity',0.3);
  $('section#teacher_quote p').css('opacity',0.1);
  
  function submitHandler() {
    var $that = $('form');

      // disable the button
      $("button.lrg_orn_button").attr('disabled','disabled');

      $('.error').removeClass('error');
      var error_message = '';
      var error_count = 0;
      
      // validate form data
      if ( $('#teacher_first_name').val() == "" ) {
        error_message += "Please enter your first name.\n";
        error_count++;
        $('#teacher_first_name').addClass('error');
        $("button.lrg_orn_button").removeAttr('disabled','disabled');
      }
      if ( $('#teacher_last_name').val() == "" ) {
        error_message += "Please enter your last name.\n";
        error_count++;
        $('#teacher_last_name').addClass('error');
        $("button.lrg_orn_button").removeAttr('disabled','disabled');
      }
      if($('#teacher_email').length > 0 ){
        if (!validEmail( $('#teacher_email').val() )) {
          error_message += "Please enter a valid school email.\n";
          error_count++;
          $('#teacher_email').addClass('error');
          $("button.lrg_orn_button").removeAttr('disabled','disabled');
        }
      }
      if($('#teacher_alt_email').length > 0 ){
        if ($('#teacher_alt_email').val() != "" && !validEmail( $('#teacher_alt_email').val() )) {
          error_message += "Please enter a valid alternative email.\n";
          error_count++;
          $('#teacher_alt_email').addClass('error');
          $("button.lrg_orn_button").removeAttr('disabled','disabled');
        }
      }
      if($('#zip').length > 0){
        if ( $('#zip').val().length > 0 && $('#zip').val().length != 5 ) {
          error_message += "Please enter a valid zip code.\n";
          error_count++;
          $('#zip').addClass('error');
          $("button.lrg_orn_button").removeAttr('disabled','disabled');
        }
      }
      if ( !$('#school_list select').val() || $('#school_list select').val() == "" ) {
        error_message += "Please select a valid school.\n";
        error_count++;
        $('#school_list select').addClass('error');
        $("button.lrg_orn_button").removeAttr('disabled','disabled');
      }
      
      if(error_count < 1){
        //Show loading image until success message
        $(".loader").show();
        $(".details, .subjects").addClass("opaque");
      }

      //check for errors
      if(error_count > 0){
        alert(error_message);
        return false;
        //Hide loader
        $(".loader").hide();
        $(".details, .subjects").addClass("opaque");
        // disable the button
        $("button.lrg_orn_button").removeAttr('disabled','disabled');
      }
      

      var post_data = $that.serialize();
      $.post($that.attr('action'),post_data,function(results) {
        $('.dialog_content').empty().append(results);
        //Hide loading image
        $(".loader").hide();
        $(".details, .subjects").addClass("opaque");
      })
      return false;
    }
    $(document).delegate('form:not("#moreinfo")','submit',submitHandler);


    $(document).scroll(function(){
      var top = $(document).scrollTop();

      if(viewportHeight == undefined){ var viewportHeight = document.documentElement.clientHeight; }
      if(padding == undefined){ var padding = 100; }

    //the fixed nav
    var viewportWidth = $(window).width();
    if (viewportWidth > 720 ){
      if( top > show_fixed_nav_at && !showing){ $('#fixed_nav').animate({top:'0'}, 125); showing=true;
      if($(".btn_center.first")){
        $("nav#nav").addClass("fixed");
        $("nav ul").addClass("fixed");
        $("nav #top").show();
      }
    }
      else if( top <= show_fixed_nav_at && showing){ $('#fixed_nav').animate({top:'-150px'}, 125); showing=false;
      if($(".btn_center.first")){
        $("nav#nav").removeClass("fixed");
        $("nav ul").removeClass("fixed");
        $("nav #top").hide();
      }
    }

    }
    else {
      showing=false;
    }
    //the bullet points animation
    if($('#bullet_points').length > 0){
      //start the animation when the bottom of the #focus_area is at the bottom of the viewport
      if(!bullets.started && (top + viewportHeight >= $('#focus_area').offset().top + $('#focus_area').outerHeight() - padding)){ bullets.init(); }
    }
    
    //the homepage apps animation
    if($('#goodies_area #app_icons').length > 0){
      if(!app_icons.started && (top + viewportHeight >= $('#goodies_area').offset().top + $('#goodies_area').outerHeight() - padding)){ app_icons.init(); }
    }
    
    //the homepage testimony area
    if($('#quote_img').length > 0){
      if(!quote_img.started && (top + viewportHeight >= $('#testimony_area').offset().top + $('#testimony_area').outerHeight() - padding)){ quote_img.init(); }
    }
    
    //pricing page teacher quote
    if($('#pricing #teacher_quote').length > 0){
      if(!pricing_quote.started && (top + viewportHeight >= $('#teacher_quote').offset().top + $('#teacher_quote').outerHeight() - padding)){ pricing_quote.init(); }
    }
  });

  //init the homepage posters
  $('#posters').cycle({ 
    fx:     'scrollLeft', 
    speed:  250, 
    timeout: 6500,
    pause: 1,
    pager: '#pager'
  });

//Scroll to for app links
//This is the only example I could find that could achieve what we wanted: http://vostrel.cz/so/9652944/page.html
(function($){

  var jump=function(e)
  {
    var fixed_nav_height = $("#fixed_nav").outerHeight();
    if (e){
     e.preventDefault();
     var target = $(this).attr("href");
   }else{
     var target = location.hash;
   }

    if(($(target)).offset()){ //trying to spare IE8 the embarrassment

     $('html,body').animate(
     {
       scrollTop: (($(target)).offset().top - fixed_nav_height)
     },800,function()
     {
       location.hash = target;
     });
     
   }

 }

 $('html, body').hide()

 $(document).ready(function()
 {
  $('a[href^=#]').bind("click", jump);

  if (location.hash){
    setTimeout(function(){
      $('html, body').scrollTop(0).show()
      jump()
    }, 0);
  }else{
    $('html, body').show()
  }
  
  });


})(jQuery)

// Expand newsroom lists
 $("span.view_all.expand").on("click",function(){
    var items_to_close = $(this).data("id");
    if (items_to_close == 'news'){
      $("li[data-id='news']").slideDown();
    }
    else {
      $("li[data-id='press']").slideDown();
    }
    $(this).hide();
    $(this).siblings($("span.view_all.collapse")).show();
    //console.log(items_to_close);

 }); 

 // Collapse newsroom lists
 $("span.view_all.collapse").on("click",function(){
    var items_to_close = $(this).data("id");
    console.log(items_to_close);
    if (items_to_close == 'news'){
      $("li[data-id='news']").slideUp();
    }
    else {
      $("li[data-id='press']").slideUp();
    }
    $(this).hide();
    $(this).siblings($("span.view_all.expand")).show();
    //console.log(items_to_close);
 });

  //init the click on pricing
  $("#pointer_down").click(function(){ $("html, body").delay(100).animate({scrollTop: $('#pricing_table').offset().top - 52 }, 300); return false;});
  
//Open the modal and insert the necessary content
$(".openModal").on("click", function(){
  var contentToLoad = $(this).attr("href");
  var hashstring = $(this).attr("data-trigger");
    //create the modal container (if it does not exist already)
    if($('.modalContainer').length <= 0){
      $('#sub_footer').after('<aside class="modalContainer"><div class="content normal"></div></aside>');
    }else{
      $(".modalContainer .content").empty();
    }

    $(".modalContainer .content").load(contentToLoad, function(){ if(hashstring && hashstring != undefined && hashstring.length>0){ window.location.hash=hashstring; } });
    $(".modalContainer").show();
    return false;
  });

  //setup the hash redirects
  hash.init();
  hash.redirect();

});

/* functions outside the scope of the init */
var hash = {
  flag:'',
  init : function(){ 
    this.flag = window.location.hash.toString();
  },
  redirect : function(){
    if (this.flag.length > 0){
      switch(this.flag.substr(1)){
        case 'nutshell':
        $("[data-trigger='#nutshell']").trigger('click');
        break;
        case 'nutshell2':
        $("[data-trigger='#nutshell2']").trigger('click');
        break;
        case 'valleymiddleschool':
        $("[data-trigger='#valleymiddleschool']").trigger('click');
        break;
        case 'plc':
        $("[data-trigger='#plc']").trigger('click');
        break;
        case 'reportcard':
        $("[data-trigger='#reportcard']").trigger('click');
        break;
      }
    }
  }
}

//helper for bullet animation
var bullets = {
  fade_speed:400,
  items:['img#arc-a','img#arc-b','img#arc-c','img#arc-d'],
  current_item:0,
  started:false,
  completed:false,

  init : function(){ 
    this.started=true;
    this.animate_next();
  },
  animate_next : function(){
    var that = this;
    if(that.current_item < that.items.length){
      $(that.items[that.current_item]).fadeIn(that.fade_speed,function(){ that.current_item++;that.animate_next(); })
    }else{
      that.completed=true;
    }
  }
}  

//helper for app icon animation
var app_icons = {
  speed:400,
  delay:150,
  items:[],
  started:false,
  
  init : function(){ 
    this.started=true;
    this.items=$('#app_icons img.app_icon');
    this.animate_all();
  },
  animate_all : function(){
    var that = this;
    for(var i=0;i<that.items.length;i++){
      $(that.items[i]).delay(that.delay*i).fadeIn(that.speed);
    }
  }
}

//helper for dufour animation
var quote_img = {
  speed:400,
  started:false,

  init : function(){ 
    this.started=true;
    this.animate_img();
  },
  animate_img : function(){
    var that = this;
    $('#quote_img_b').fadeOut(that.speed);
  }
}  

//helper for pricing tabs animation
var pricing_tabs = {
  speed:400,
  delay:150,
  started:false,

  init : function(){ 
    this.started=true;
    this.animate_all();
  },
  animate_all : function(){
    var that = this;
    for(var i=0;i<$('.pricing_tab').length;i++){
      $($('.pricing_tab')[i]).delay(that.delay*i).animate({top:-20},that.speed);
    }
  }
}

//helper for pricing quote animation
var pricing_quote = {
  speed:600,
  delay:300,
  items:['section#teacher_quote blockquote','section#teacher_quote p'],
  started:false,

  init : function(){ 
    this.started=true;
    this.animate_all();
  },
  animate_all : function(){
    var that = this;
    $(that.items[0]).animate({opacity:1.0},that.speed);
    $(that.items[1]).delay(that.delay).animate({opacity:1.0},that.speed);
  }
}

//detect the speed of the scroll
var scrolling_speed = {
  rate:0, //measured in px/sec
  delay:100,
  si:false,
  started:false,
  t:[],
  
  init : function(){
    this.si = setInterval(this.trackTop,this.delay);
  },
  trackTop : function(){
    var that = scrolling_speed;
    that.t.push($(window).scrollTop());
    if(that.t.length >= 4){ clearInterval(that.si); console.log(that.t); that.calculate_speed();}
  },
  calculate_speed : function(){
    var step1 = (this.t[1]-this.t[0]);
    var step2 = (this.t[2]-this.t[1]);
    var step3 = (this.t[3]-this.t[2]);
    this.rate = ((step1+step2+step3) / 3) * (1000 / this.delay)
  }
}
//detect browser/platform for use in conditional content
var browser_platform = {
  browser:false,
  platform:false,
  isAndroid:false,
  isIos:false,
  isWindows:false,
  isWindows8:false,
  isMobile:false,
  isChrome:false,
  isSafari:false,
  isFirefox:false,
  isLinux:false,
  isMac:false,
  
  init : function(){
    this.browser=navigator.userAgent.toLowerCase();
    this.platform=navigator.platform.toLowerCase();
    this.setbrowser();
  },
  
  setbrowser : function(){
    this.isAndroid = this.browser.match(/android/i);
    this.isIos = this.browser.match(/iphone|ipad|ipod/i);
    this.isWindows = this.browser.match(/iemobile/i);
    this.isChrome = this.browser.match(/chrome\/[0-9\.]+/i);
    this.isSafari = this.browser.match(/version\/[0-9\.]+ safari\/[0-9\.]+/i);
    this.isFirefox = this.browser.match(/firefox\/[0-9\.]+/i);
  },
  
  setplatform : function(){
    this.isAndroid = this.platform.match(/android/i);
    this.isIos = this.platform.match(/iphone|ipad|ipod/i);
    this.isWindows = this.platform.match(/win/i);
    this.isMac = this.platform.match(/mac/i);
    this.isLinux = this.platform.match(/linux/i);
  }
  
}

function validEmail(email) {
  return (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email));
}

/* Functions that support the video modal */
function swapVideo(video){
  window.location.hash = video;
  init_video(video);
  swapSocialLinks(video)
}


function swapSocialLinks(video){
  //update the facebook open graph meta tags
  switch(video)
  {
   case 'nutshell':
   $("#fb-title").attr('content','MasteryConnect in a Nutshell.');
   $("#fb-image").attr('content','http://www.masteryconnect.com/learn-more/im/nutshell2SlideSmall.jpg');
   $("#fb-description").attr('content','Check out this awesome video!');
   $("#fb-url").attr('content','http://www.masteryconnect.com/#nutshell');

   break;
   case 'nutshell2':
   $("#fb-title").attr('content','MasteryConnect in a Nutshell - Resource Pins');
   $("#fb-image").attr('content','http://www.masteryconnect.com/learn-more/im/nutshellSlideSmall.jpg');
   $("#fb-description").attr('content','Check out this awesome video!');
   $("#fb-url").attr('content','http://www.masteryconnect.com/#nutshell2');

   break;
   case 'valleymiddleschool':
   $("#fb-title").attr('content','The Valley Middle School Story');
   $("#fb-image").attr('content','http://www.masteryconnect.com/learn-more/im/valleyMiddleSlideSmall.jpg');
   $("#fb-description").attr('content','Check out this awesome video!');
   $("#fb-url").attr('content','http://www.masteryconnect.com/#valleymiddleschool');

   break;
   case 'reportcard':
   $("#fb-title").attr('content','Master Report Card - The Willard School District Story');
   $("#fb-image").attr('content','http://www.masteryconnect.com/learn-more/im/reportCardSlideSmall.jpg');
   $("#fb-description").attr('content','Check out this awesome video!');
   $("#fb-url").attr('content','http://www.masteryconnect.com/#reportcard');

   break;
   case 'plc':
   $("#fb-title").attr('content','The PLC Technology Solution');
   $("#fb-image").attr('content','http://www.masteryconnect.com/learn-more/im/rickDufourSlideSmall.jpg');
   $("#fb-description").attr('content','Check out this awesome video!');
   $("#fb-url").attr('content','http://www.masteryconnect.com/#plc');  

   break;
   default:
   $("#fb-title").attr('content','MasteryConnect - Home');
   $("#fb-image").attr('content','http://www.masteryconnect.com/learn-more/cmsimages/mark.png');
   $("#fb-description").attr('content','MasteryConnect - Share common assessments aligned to standards, connect in a professional learning community, and track student performance.');
   $("#fb-url").attr('content','http://www.masteryconnect.com');
 }
}

function init_video(video){
  switch(video)
  {
   case 'nutshell':
   video_title = 'MasteryConnect in a Nutshell';
   video_poster = '//files.masteryconnect.com/assets/posters/poster-832.jpg';
   video_url = '//files.masteryconnect.com/assets/videos/nutshell832x464.m4v';
   video_embed = '<iframe src="//player.vimeo.com/video/71911997?autoplay=1" width="832" height="468" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
   video_embed_small = '<iframe src="//player.vimeo.com/video/71911997?autoplay=1" width="265" height="190" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
   share_link_twitter = 'https://twitter.com/intent/tweet?url=http%3A%2F%2Fwww.masteryconnect.com%2F%23nutshell&text=Check%20out%20this%20awesome%20video!%20MasteryConnect%20in%20a%20Nutshell%20-%20MasteryConnect.';
   share_link_pinterest = 'http://pinterest.com/pin/create/button/?url=http%3A%2F%2Fwww.masteryconnect.com%2F%23nutshell&media=http%3A%2F%2Ffiles.masteryconnect.com%2Fassets%2Fposters%2FnutshellSlide.jpg&description=Check%20out%20this%20awesome%20video!%20MasteryConnect%20in%20a%20Nutshell...';
   share_link_facebook = 'http://www.facebook.com/share.php?u=http%3A%2F%2Fwww.masteryconnect.com%2F%23nutshell';
   break;
   case 'nutshell2':
   video_title = 'MasteryConnect in a Nutshell - Resource Pins';
   video_poster = '//files.masteryconnect.com/assets/posters/poster-832.jpg';
   video_url = '//files.masteryconnect.com/assets/videos/nutshell-part2832x464.m4v';
   video_embed = '<iframe src="//player.vimeo.com/video/71912566?autoplay=1" width="832" height="464" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
   video_embed_small = '<iframe src="//player.vimeo.com/video/71912566?autoplay=1" width="265" height="190" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
   share_link_twitter = 'https://twitter.com/intent/tweet?url=http%3A%2F%2Fwww.masteryconnect.com%2F%23nutshell2&text=Check%20out%20this%20awesome%20video!%20MasteryConnect%20in%20a%20Nutshell%20-%20Resource%20Pins.';
   share_link_pinterest = 'http://pinterest.com/pin/create/button/?url=http%3A%2F%2Fwww.masteryconnect.com%2F%23nutshell2&media=http%3A%2F%2Ffiles.masteryconnect.com%2Fassets%2Fposters%2Fnutshell2Slide.jpg&description=Check%20out%20this%20awesome%20video!%20MasteryConnect%20in%20a%20Nutshell%20-%20Resource%20Pins';
   share_link_facebook = 'http://www.facebook.com/share.php?u=http%3A%2F%2Fwww.masteryconnect.com%2F%23nutshell2';
   break;
   case 'valleymiddleschool':
   video_title = 'The Valley Middle School Story';
   video_poster = '//files.masteryconnect.com/assets/posters/poster-832.jpg';
   video_url = '//files.masteryconnect.com/assets/videos/ValleyMiddleSchool832x464.m4v';
   video_embed = '<iframe src="//player.vimeo.com/video/71769480?autoplay=1" width="832" height="468" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
   video_embed_small = '<iframe src="//player.vimeo.com/video/71769480?autoplay=1" width="265" height="190" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
   share_link_twitter = 'https://twitter.com/intent/tweet?url=http%3A%2F%2Fwww.masteryconnect.com%2F%23valleymiddleschool&text=Check%20out%20this%20awesome%20video!%20The%20Valley%20Middle%20School%20Story%20-%20MasteryConnect.';
   share_link_pinterest = 'http://pinterest.com/pin/create/button/?url=http%3A%2F%2Fwww.masteryconnect.com%2F%23valleymiddleschool&media=http%3A%2F%2Ffiles.masteryconnect.com%2Fassets%2Fposters%2FvalleyMiddleSlide.jpg&description=Check%20out%20this%20awesome%20video!%20The%20Valley%20Middle%20School%20Story';
   share_link_facebook = 'http://www.facebook.com/share.php?u=http%3A%2F%2Fwww.masteryconnect.com%2F%23valleymiddleschool';
   break;
   case 'reportcard':
   video_title = 'Mastery Report Card - The Willard School District Story';
   video_poster = '//files.masteryconnect.com/assets/posters/poster-832.jpg';
   video_url = '//files.masteryconnect.com/assets/videos/Willard-ReportCard.mp4';
   video_embed = '<iframe src="//player.vimeo.com/video/78120949?autoplay=1" width="832" height="468" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
   video_embed_small = '<iframe src="//player.vimeo.com/video/78120949?autoplay=1" width="265" height="190" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
   share_link_twitter = 'https://twitter.com/intent/tweet?url=http%3A%2F%2Fwww.masteryconnect.com%2F%23reportcard&text=Check%20out%20this%20awesome%20video!Mastery%20Report%20Card%20-%20The%20Willard%20School%20District%20Story%20-%20MasteryConnect.';
   share_link_pinterest = 'http://pinterest.com/pin/create/button/?url=http%3A%2F%2Fwww.masteryconnect.com%2F%23reportcard&media=http%3A%2F%2Ffiles.masteryconnect.com%2Fassets%2Fposters%2FreportCardSlide.jpg&description=Check%20out%20this%20awesome%20video!%20Mastery%20Report%20Card%20-%20The%20Willard%20School%20District%20Story';
   share_link_facebook = 'http://www.facebook.com/share.php?u=http%3A%2F%2Fwww.masteryconnect.com%2F%23reportcard';
   break;
   case 'plc':
   video_title = 'The PLC Technology Solution';
   video_url = '//files.masteryconnect.com/PLC.m4v';
   video_poster = '//files.masteryconnect.com/assets/posters/poster-832.jpg';
   video_url = '//files.masteryconnect.com/assets/videos/plc-video832x464.m4v';
   video_embed = '<iframe src="//player.vimeo.com/video/71911996?autoplay=1" width="832" height="468" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
   video_embed_small = '<iframe src="//player.vimeo.com/video/71911996?autoplay=1" width="265" height="190" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
   share_link_twitter = 'https://twitter.com/intent/tweet?url=http%3A%2F%2Fwww.masteryconnect.com%2F%23plc&text=Check%20out%20this%20awesome%20video!%20The%20PLC%20Technology%20Solution%20-%20MasteryConnect';
   share_link_pinterest = 'http://pinterest.com/pin/create/button/?url=http%3A%2F%2Fwww.masteryconnect.com%2F%23plc&media=http%3A%2F%2Ffiles.masteryconnect.com%2FrickDufourSlide.jpg&description=Check%20out%20this%20awesome%20video!%20The%20PLC%20technology%20solution%20-%20MasteryConnect.';
   share_link_facebook = 'https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.masteryconnect.com%2F%23plc';
   break;
   default:
   video_title = 'MasteryConnect in a Nutshell';
   video_poster = '//files.masteryconnect.com/assets/posters/poster-832.jpg';
   video_url = '//files.masteryconnect.com/assets/videos/nutshell832x464.m4v';
   video_embed = '<iframe src="//player.vimeo.com/video/71911997?autoplay=1" width="832" height="468" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
   video_embed_small = '<iframe src="//player.vimeo.com/video/71911997?autoplay=1" width="265" height="190" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
   share_link_twitter = 'https://twitter.com/intent/tweet?url=http%3A%2F%2Fwww.masteryconnect.com%2F%23plc&text=Check%20out%20this%20awesome%20video!%20The%20PLC%20Technology%20Solution%20-%20MasteryConnect.';
   share_link_pinterest = 'http://pinterest.com/pin/create/button/?url=http%3A%2F%2Fwww.masteryconnect.com%2F%23nutshell&media=http%3A%2F%2Ffiles.masteryconnect.com%2Fassets%2Fposters%2FnutshellSlide.jpg&description=Check%20out%20this%20awesome%20video!%20MasteryConnect%20in%20a%20nutshell...';
   share_link_facebook = 'http://www.facebook.com/share.php?u=http%3A%2F%2Fwww.masteryconnect.com%2F%23nutshell';
 }

  //change the modal h1
  $('#modal_header').text(video_title);
  //change the video source

  var jsbox = "";
  var windowsize = $(window).width();
  if (windowsize < 768) {
    jsbox = video_embed_small;
  }
  else {
    jsbox = video_embed;
  }

  $('#video-player').html(jsbox);

  //change the social links
  $('#social_links .pinterest').attr('href',share_link_pinterest);
  $('#social_links .facebook').attr('href',share_link_facebook);
  $('#social_links .twitter').attr('href',share_link_twitter);
  if($('video').length > 0){
    $('video').VideoJS();
    $('video').attr('controls','controls');
    $('.vjs-time-control').hide();
  }
  //add hit to GA
  //$('video').VideoJS(); //add analytics trigger in here
  if ($('video').get(0) && $('video').get(0).player) {
    try {
      $('video').get(0).player.play();
    } catch(e) {}
    pageTracker._trackEvent("Videos", "Play", video_title);
  }

}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}