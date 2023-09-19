# TEST CHECKLIST

## Login

- [x] Login as a `regular` user with valid credentials
- [x] Try to log in as a `regular` user with incorrect password, close error message and log in with valid credentials
- [x] Try to log in as a `locked-out` user with valid credentials
- [x] Try to log in with empty username and password, close error message and log in with valid credentials
- [ ] Logout
- [ ] Try to enter cart page before logging in, close error message, log in and enter the page

## Products page (homepage)

- [x] Check page header and if all displayed products have: image, name, description, price, add to cart button
- [x] Add a product to the cart from the products list page
- [x] Remove a product from the cart from the products list page
- [x] Sorting: A-Z, is default option
- [x] Sorting: Z-A
- [x] Sorting: price ascending (low-high)
- [x] Sorting: price descending (high-low)

## Product details page

- [x] Enter product details page by clicking a product image, check if product page contains: image, name, description, price, add to cart button
- [x] Enter product details page by clicking a product name
- [x] Go back to the products list (homepage) after clicking back button
- [x] Add a product to cart from the product details page
- [x] Remove a product from the cart from the product details page

## Cart

- [ ] Check empty cart: page header, QTY, Description, NO items displayed, Continue shopping button, Checkout button
- [ ] Check cart with items: product QTY, name, description, price, remove btn
- [ ] Go back to the homepage after clicking Continue shopping button
- [ ] Go to checkout after clicking Checkout button

## Checkout

- [ ] Your information page: check page header, click Cancel
- [ ] Your information page: fill in user info, click Continue
- [ ] Your information page: click Continue without filling in the form, close error message, fill in the form and click Continue again
- [ ] Overview page: check page header, click Cancel
- [ ] Overview: check product display: qty, name, description (turuncated),price
- [ ] Overview: check item total, tax and total
- [ ] Overview: click Finish button
- [ ] Complete: check page header, texts, click Back Home button

## "Problematic" user

## "Performance-issues" user

## Navigation

- [ ] Click All items - check redirection
- [ ] Click About - check redirection
- [ ] Click Logout - covered in the logout section
- [ ] Add items to cart, click Reset app state and check if items were removed

## Footer

- [ ] Check socials redirections: corect page, new card
