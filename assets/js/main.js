/**
 * Main
 */

'use strict';

let menu, animate;

(function () {
  // Initialize menu
  //-----------------

  let layoutMenuEl = document.querySelectorAll('#layout-menu');
  layoutMenuEl.forEach(function (element) {
    menu = new Menu(element, {
      orientation: 'vertical',
      closeChildren: false
    });
    // Change parameter to true if you want scroll animation
    window.Helpers.scrollToActive((animate = false));
    window.Helpers.mainMenu = menu;
  });

  // Initialize menu togglers and bind click on each
  let menuToggler = document.querySelectorAll('.layout-menu-toggle');
  menuToggler.forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
      window.Helpers.toggleCollapsed();
    });
  });

  // Display menu toggle (layout-menu-toggle) on hover with delay
  let delay = function (elem, callback) {
    let timeout = null;
    elem.onmouseenter = function () {
      // Set timeout to be a timer which will invoke callback after 300ms (not for small screen)
      if (!Helpers.isSmallScreen()) {
        timeout = setTimeout(callback, 300);
      } else {
        timeout = setTimeout(callback, 0);
      }
    };

    elem.onmouseleave = function () {
      // Clear any timers set to timeout
      document.querySelector('.layout-menu-toggle').classList.remove('d-block');
      clearTimeout(timeout);
    };
  };
  if (document.getElementById('layout-menu')) {
    delay(document.getElementById('layout-menu'), function () {
      // not for small screen
      if (!Helpers.isSmallScreen()) {
        document.querySelector('.layout-menu-toggle').classList.add('d-block');
      }
    });
  }

  // Display in main menu when menu scrolls
  let menuInnerContainer = document.getElementsByClassName('menu-inner'),
    menuInnerShadow = document.getElementsByClassName('menu-inner-shadow')[0];
  if (menuInnerContainer.length > 0 && menuInnerShadow) {
    menuInnerContainer[0].addEventListener('ps-scroll-y', function () {
      if (this.querySelector('.ps__thumb-y').offsetTop) {
        menuInnerShadow.style.display = 'block';
      } else {
        menuInnerShadow.style.display = 'none';
      }
    });
  }

  // Init helpers & misc
  // --------------------

  // Init BS Tooltip
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Accordion active class
  const accordionActiveFunction = function (e) {
    if (e.type == 'show.bs.collapse' || e.type == 'show.bs.collapse') {
      e.target.closest('.accordion-item').classList.add('active');
    } else {
      e.target.closest('.accordion-item').classList.remove('active');
    }
  };

  const accordionTriggerList = [].slice.call(document.querySelectorAll('.accordion'));
  const accordionList = accordionTriggerList.map(function (accordionTriggerEl) {
    accordionTriggerEl.addEventListener('show.bs.collapse', accordionActiveFunction);
    accordionTriggerEl.addEventListener('hide.bs.collapse', accordionActiveFunction);
  });

  // Auto update layout based on screen size
  window.Helpers.setAutoUpdate(true);

  // Toggle Password Visibility
  window.Helpers.initPasswordToggle();

  // Speech To Text
  window.Helpers.initSpeechToText();

  // Manage menu expanded/collapsed with templateCustomizer & local storage
  //------------------------------------------------------------------

  // If current layout is horizontal OR current window screen is small (overlay menu) than return from here
  if (window.Helpers.isSmallScreen()) {
    return;
  }

  // If current layout is vertical and current window screen is > small

  // Auto update menu collapsed/expanded based on the themeConfig
  window.Helpers.setCollapsed(true, false);
})();


// modal
// let selectedRow = null;
// var target;
// const editButton = document.getElementsByClassName('edit-button')
// for(let i = 0; i < editButton.length; i++){
// editButton[i].addEventListener('click', (e) => {
// target = e.target;
// if(e.target.classList.contains('edit-button')) {
//   selectedRow = e.target.parentElement.parentElement;
//   console.log(document.querySelector('#idWithTitle').value = selectedRow.children[0]);
// document.querySelector('#storeCodeWithTitle').value = selectedRow.children[1].textContent;
// document.querySelector('#storeNameWithTitle').value = selectedRow.children[2].textContent;
// document.querySelector('#qtyWithTitle').value = selectedRow.children[3].textContent;
// }
// let rIndex;
// console.log(table.rowIndex);
// document.getElementById('idWithTitle').value = table.cells[0].innerHTML;
//   })
// }

// let selectedRow = null;
// document.querySelector('.item-list').addEventListener('click', (e) => {
//   // target = e.target;
//   console.log(document.querySelector('.item-list'))
//     if(e.target.classList.contains('edit-button')) {
//       selectedRow = e.target.innerHTML;
//       console.log(selectedRow);
//       // console.log(document.querySelector('#idWithTitle').value = selectedRow.children[0]);
//       // document.querySelector('#storeCodeWithTitle').value = selectedRow.children[1].textContent;
//       // document.querySelector('#storeNameWithTitle').value = selectedRow.children[2].textContent;
//       // document.querySelector('#qtyWithTitle').value = selectedRow.children[3].textContent;
//     }
// })

// console.log(document.querySelector('#item-list'));


// const editButton = document.getElementsByClassName('edit-button')
// for (let i = 0; i < editButton.length; i++) {
//   editButton[i].addEventListener('click', onEdit)
// }

// function onEdit(td) {
//   selectedRow = td.parentElement.parentElement;
//   console.log(td);
//   document.getElementById("idWithTitle").value = selectedRow.cells[0].innerHTML;
//   document.getElementById("storeCodeWithTitle").value = selectedRow.cells[1].innerHTML;
//   document.getElementById("storeNameWithTitle").value = selectedRow.cells[2].innerHTML;
//   document.getElementById("qtyWithTitle").value = selectedRow.cells[3].innerHTML;
// }

function showGenre(item) {
  document.getElementById("supplierNameWithTitle").innerHTML = item.innerHTML;
}