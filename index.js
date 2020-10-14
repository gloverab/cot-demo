let isMobile
let navDisplayed = false

const onHomeNavClick = (e) => {
  e.preventDefault()
  $('.home-search-nav-link.active').removeClass('active')
  e.target.classList.add('active')
  const widthDiff = (e.target.offsetWidth - 80) / 2
  const newMargin = e.target.offsetLeft - 20 + widthDiff
  $('#home-search-nav-active-line').animate({
    'margin-left': newMargin
  })
}

let carouselScrollVal = 0
const onCarouselScroll = (e) => {
  const ofFive = Math.floor(((e.target.scrollLeft + 130) * 5) / e.target.scrollWidth)
  const fullLineWidth = $('#carousel-line-this-week').width()
  if (isMobile) {
    if (ofFive != carouselScrollVal) {
      carouselScrollVal = ofFive
      $('#carousel-line-active-this-week').animate({
        'margin-left': (fullLineWidth / 5) * ofFive
      }, 200)
    }
  } else {
    const activeLineWidth = $('#carousel-line-active-this-week').width()
    const totalDistance = fullLineWidth - activeLineWidth

    const scrollTo = (totalDistance * e.target.scrollLeft) / (e.target.scrollWidth - window.innerWidth)
    $('#carousel-line-active-this-week').css('margin-left', scrollTo)
  }
}

const setScrollWidth = () => {
  const widthCalc = 112 - (100 * (($('#carousel-active-this-week')[0].scrollWidth) - $('#carousel-line-this-week').width())) / (window.innerWidth)
  const calc = ((40 * widthCalc) / 100) + 60

  $('#carousel-line-active-this-week').css('width', `${calc}%`)
}

const checkMobile = () => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    // true for mobile device
    isMobile = true
    $('.carousel').each(function() {
      $(this).addClass('snap')
    })
  } else {
    // false for not mobile device
    isMobile = false
    $('.carousel').each(function() {
      $(this).removeClass('snap')
    })
    setScrollWidth()
  }
}

const onWindowResize = () => {
  setScrollWidth()
}

const showOverlay = () => {
  const overlay = $('#overlay')
  overlay.css('display', 'block')
  overlay.animate({ 'opacity': '0.3' }, 350)
  overlay.on('click', handleToggleMenu)
}

const hideOverlay = () => {
  const overlay = $('#overlay')
  overlay.animate({ 'opacity': '0' })
  overlay.css('display', 'none')
  overlay.off()
}

const handleToggleMenu = () => {
  if (navDisplayed) {
    hideOverlay()
    $('#menu-icon').removeClass('x')
  } else {
    showOverlay()
    $('#menu-icon').addClass('x')
  }
  const navDrawer = $('#nav-drawer')
  navDrawer.animate({
    'right': navDisplayed ? `-${navDrawer.width()}px` : '0px'
  }, 350)
  navDisplayed = !navDisplayed
}


$(document).ready(() => {
  checkMobile()

  $('#menu-icon').on('click', handleToggleMenu)

  $('.home-search-nav-link').each(function() {
    $(this).on('click', onHomeNavClick)
  })

  $('#carousel-active-this-week').on('scroll', onCarouselScroll)

  window.addEventListener('resize', onWindowResize);
  window.addEventListener("orientationchange", checkMobile);
})