var subHeadHeight, origHeight, origLogoHeight, doneCount, scrollHeight

var setVars = function () {
  $('header#main-header, #logo').attr('style', null)
  subHeadHeight = parseInt($('header#sub-header').css('height'))
  origHeight = parseInt($('header#main-header').height())
  doneCount = false
}

$(window).resize(_.debounce(function () {
  $('.ink').removeClass('animate')
  setVars()
}, 500))

$(document).on('pjax:success', function () {
  $('#main-menu a').removeClass('active')
  $('#main-menu a[href="' + window.location.pathname + '"]').addClass('active')
})

$(document).on('pjax:success ready', function () {
  var dragspeed = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) ? 300 : 1100

  var swiper1 = new Swiper('.main-slider-container', {
    loop: true,
    slidesPerView: 1,
    autoplay: 9000,
    autoplayDisableOnInteraction: true,
    speed: dragspeed
  })

  var swiper2 = new Swiper('.secondary-slider', {
    pagination: '.sub-slider-pagination',
    paginationClickable: true,
    loop: true,
    slidesPerView: 1,
    speed: dragspeed
  })

  $('.enquiry-form').each(function () {
    $(this).prepend($(this).find('.enquiry-desc'))
  })

  setVars()
  doScroll()

  $('header').removeClass('drop-shadow')
  $('header#sub-header').addClass('drop-shadow')

  if ($('.hidden-fields').length > 0) {
    $('.hidden-fields').hide()
    $('.hidden-toggle').on('change', function () {
      $('.hidden-fields').fadeIn()
    })
  }
})

$(document).on('ready', function () {
  $('#main').on('click', "a[href='#video']", function (event) {
    event.preventDefault()
    var video = document.getElementById('sleep-video')
    video.innerHTML = video.innerHTML.replace('<!--', '').replace('-->', '')
    video.load()
    if (video.readyState === 4 && !isNaN(video.duration)) {
      video.currentTime = 0
    }
    video.play()
    $('body').removeClass('side-nav')
    $('body').addClass('overlay-visible video')
  })

  $('#overlay').on('click', 'a', function (event) {
    $('.ink').removeClass('animate')
    $('body').removeClass('overlay-visible video side-nav')
  })

  $('#main-toggler').click(function (event) {
    event.preventDefault()
    $('.ink').removeClass('animate')
    $('body').removeClass('video')
    $('body').addClass('side-nav')
    $('body').toggleClass('overlay-visible')
  })
})

var doScroll = function () {
  var scrollPos = $(window).scrollTop()

  var h = -75
  if (subHeadHeight === 75) {
    h = -75
  }

  if (scrollPos - subHeadHeight >= h) {
    $('header#main-header').addClass('drop-shadow')
    $('header#sub-header').removeClass('drop-shadow')
  } else {
    $('header#main-header').removeClass('drop-shadow')
    $('header#sub-header').addClass('drop-shadow')
  }

  if ($('#counts').length > 0) {
    if (scrollPos > ($('#counts').offset().top - $(window).height()) && !doneCount) {
      doneCount = true
      window.doCount()
    }
  }

  $('header#main-header').height(parseInt(Math.max(origHeight - scrollPos, 75)))

  $('body:not(.a-donate) header#sub-header > div').css('opacity', Math.max(0, 1 - (scrollPos - 10) / 30))
}

$(window).on('scroll', doScroll)
