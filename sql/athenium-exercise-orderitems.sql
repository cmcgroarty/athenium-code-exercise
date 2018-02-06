SELECT iom.orderID AS 'Order ID', i.name AS 'Item Name', c.name AS 'Category Name' FROM `Item` AS i, `Category` AS c, `ItemOrderMembership` as iom
WHERE (i.categoryID=c.categoryID) AND  i.itemID IN
(SELECT iom.itemID FROM `ItemOrderMembership` WHERE iom.orderID=12345)