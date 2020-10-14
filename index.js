const onEventClick = (e) => {
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
  
  if (ofFive != carouselScrollVal) {
    carouselScrollVal = ofFive
    $('#carousel-line-active-this-week').animate({
      'margin-left': ($('#carousel-line-this-week').width() / 5) * ofFive
    }, 200)
  }
}

$(document).ready(() => {
  $('.home-search-nav-link').each(function() {
    $(this).on('click', onEventClick)
  })

  $('#carousel-active-this-week').on('scroll', onCarouselScroll)
})