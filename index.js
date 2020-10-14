let isMobile

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
  if (isMobile && ofFive != carouselScrollVal) {
    carouselScrollVal = ofFive
    $('#carousel-line-active-this-week').animate({
      'margin-left': (fullLineWidth / 5) * ofFive
    }, 200)
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


$(document).ready(() => {
  checkMobile()

  $('.home-search-nav-link').each(function() {
    $(this).on('click', onHomeNavClick)
  })

  $('#carousel-active-this-week').on('scroll', onCarouselScroll)

  window.addEventListener('resize', onWindowResize);
})