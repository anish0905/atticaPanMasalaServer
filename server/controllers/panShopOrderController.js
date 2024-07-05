const asyncHandler = require("express-async-handler");
const panShopOrder = require('../models/panShopOrderModel');

const createPanShopOrder = asyncHandler(async (req, res) => {
  const { products, superStockistEmail, stockistEmail, panShopOwner_id, panShopOwnerstate, panShopOwneraddress, status ,deliveryTime,assignTo} = req.body;

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: "Products array is required and cannot be empty" });
  }

  const totalPrice = products.reduce((acc, product) => acc + product.quantity * product.price, 0);

  try {
    const order = await panShopOrder.create({
      products,
      totalPrice,
      superStockistEmail,
      stockistEmail,
      panShopOwner_id,
      panShopOwnerName: "John Doe", // Assuming this is static for now
      panShopOwnerstate,
      panShopOwneraddress,
      status,
      deliveryTime,
      assignTo
    });

    res.status(201).json(order); // Return the created order
  } catch (error) {
    console.error("Error creating pan shop order:", error);
    res.status(500).json({ error: "Failed to create pan shop order" });
  }
});


const getPanShopOrderById = asyncHandler(async (req, res) => {
  const order = await panShopOrder.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error(" order detail not found");
  }
  res.status(200).json(order);
})

const deletePanShopOrderById = asyncHandler(async (req, res) => {
  const order = await panShopOrder.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order detail not found");
  }
  
  await order.deleteOne();
  
  res.status(200).json({ message: "Order deleted successfully" });
});



const updateEmail = asyncHandler(async (req, res) => {
  const { id } = req.params;



  try {
    const existingOrder = await panShopOrder.findById(id);
    if (!existingOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    const { superStockistEmail, stockistEmail,assignTo,deliveryTime, ...updateData } = req.body;

    // Update specific fields if they exist in the request body
    if (superStockistEmail) existingOrder.superStockistEmail = superStockistEmail;
    if (stockistEmail) existingOrder.stockistEmail = stockistEmail;
    if (assignTo) existingOrder.assignTo = assignTo;
    if (deliveryTime) existingOrder.deliveryTime = deliveryTime;
    // console.log(superStockistEmail, stockistEmail,assignTo,deliveryTime);
    for (let key in updateData) {
      existingOrder[key] = updateData[key];
    }

    // Save the updated order
    const updatedOrder = await existingOrder.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating panShop order:", error);
    res.status(500).json({ error: "An error occurred while updating the panShop order" });
  }
});


const getPanShopOrder = asyncHandler(async (req, res) => {
  const getOrder = await panShopOrder.find();
  res.status(200).json(getOrder)

});

// const getTodays24HoursSell = asyncHandler(async (req, res) => {
//   try {
//     // Calculate start and end dates for the last 24 hours in UTC time
//     const startDate = new Date();
//     startDate.setUTCHours(0, 0, 0, 0); // Start of current day
//     const endDate = new Date();
//     endDate.setUTCHours(23, 59, 59, 999); // End of current day

//     // Aggregate pan shop orders within the last 24 hours
//     const get24HoursSell = await panShopOrder.aggregate([
//       {
//         $match: {
//           updatedAt: {
//             $gte: startDate,
//             $lt: endDate
//           }
//         }
//       },
//       {
//         $unwind: "$products"
//       },
//       {
//         $group: {
//           _id: null,
//           totalQty: {
//             $sum: "$products.quantity"
//           }
//         }
//       }
//     ]).collation({ locale: "en", strength: 2 }).hint({ createdAt: -1 });

//     // Return the total quantity sold in the last 24 hours
//     res.status(200).json(get24HoursSell);
//   } catch (error) {
//     // Handle error if aggregation fails
//     console.error("Error fetching 24 hours sell:", error);
//     res.status(500).json({ error: "Failed to fetch 24 hours sell" });
//   }
// });

module.exports = { createPanShopOrder, getPanShopOrderById, updateEmail, getPanShopOrder , deletePanShopOrderById};
