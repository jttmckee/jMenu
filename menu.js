// To be used with menu css
// This script only toggles classes
const JMENU_ACTIVE = 'jmenu-active'

const JMenu = (() => {
  const clearActiveMenu = () => {
    Array.from(document.getElementsByClassName(JMENU_ACTIVE)).forEach((menu)=>{
      menu.classList.remove(JMENU_ACTIVE)
    })
  }
  const setActiveMenu = (target) =>  {
    const menu = target.classList.contains('jmenu') ? target : target.parentElement
    menu.classList.add(JMENU_ACTIVE)
  }
  const hasParentWithClass =  (element, klass) => {
    return element.classList.contains(klass) ||
          (
            element.parentElement &&
            hasParentWithClass(element.parentElement, klass)
          )
  }

  const isActiveMenu = (event) => {
    return hasParentWithClass(event.target,JMENU_ACTIVE)
  }



  const clickMenu = (event) => {    const activeMenu = isActiveMenu(event)
    clearActiveMenu()
    if (!(activeMenu)) {
      setActiveMenu(event.target)
    }
  }
  const clickElse = () => {
    if (!(hasParentWithClass(event.target,JMENU_ACTIVE))) {
      clearActiveMenu()
    }
  }
  const hoverMenu = (event) => {
    console.log('hover-menu')
    if (!(isActiveMenu(event))) {
      clearActiveMenu()
    }
  }
  return {
    clickMenu,
    clickElse,
    hoverMenu
  }
})()
document.querySelector('html').addEventListener('click', JMenu.clickElse)
Array.from(document.getElementsByClassName('hover-menu')).forEach((element) => {
  element.addEventListener('click', JMenu.clickMenu)
  element.addEventListener('mouseover', JMenu.hoverMenu)

})
Array.from(document.getElementsByClassName('click-menu')).forEach((element) => {
  element.addEventListener('click', JMenu.clickMenu)
})
