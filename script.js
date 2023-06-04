

function getMenu() {
  if (document.body.classList.contains('menu')) {
    const ele = document.getElementsByClassName("menu")[0];
    ele.remove();
  } else {
    fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
      .then(response => response.json())
      .then(data => {
        // Display the menu items on the webpage
        const imageContainer = document.getElementsByClassName("image-container")[0];
        imageContainer.innerHTML = ""; // Clear the existing contents

        data.forEach(item => {
          const menuItem = document.createElement('div');
          menuItem.classList.add('menu-item');

          const image = document.createElement('img');
          image.src = item.imgSrc;
          image.alt = item.name;
          image.addEventListener('error', () => {
            // Handle image loading error here
            console.log('Error loading image:', item.image);
          });
          menuItem.appendChild(image);

          const itemName = document.createElement('p');
          itemName.textContent = item.name;
          menuItem.appendChild(itemName);

          const itemPrice = document.createElement('p');
          itemPrice.textContent = '$' + item.price;
          menuItem.appendChild(itemPrice);

          imageContainer.appendChild(menuItem);
        });
      })
      .catch(error => {
        console.log('Error fetching menu:', error);
      });
  }
}

// Add event listener to the "Show Menu" button
document.getElementById("menuButton").addEventListener("click", getMenu);


  
  // Function to take the order
  function takeOrder() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const burgers = ['Cheeseburger', 'Chicken Burger', 'Veggie Burger', 'Beef Burger', 'Fish Burger'];
        const selectedBurgers = [];
        for (let i = 0; i < 3; i++) {
          const randomIndex = Math.floor(Math.random() * burgers.length);
          selectedBurgers.push(burgers[randomIndex]);
        }
        resolve({ burgers: selectedBurgers });
      }, 2500);
    });
  }
  
  // Function for order preparation
  function orderPrep() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ order_status: true, paid: false });
      }, 1500);
    });
  }
  
  // Function for payment
  function payOrder() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ order_status: true, paid: true });
      }, 1000);
    });
  }
  
  // Function to display the thank you message
  function thankYou() {
    alert('Thank you for eating with us today!');
  }
  
  // Event listeners for the buttons
  document.getElementById('menuButton').addEventListener('click', getMenu);
  document.getElementById('orderButton').addEventListener('click', () => {
    takeOrder()
      .then(order => {
        console.log('Order:', order);
        return orderPrep();
      })
      .then(orderStatus => {
        console.log('Order prepretion status:', orderStatus);
        return payOrder();
      })
      .then(orderStatus => {
        console.log('payment status:', orderStatus);
        if (orderStatus.paid) {
          thankYou();
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  });
  
  