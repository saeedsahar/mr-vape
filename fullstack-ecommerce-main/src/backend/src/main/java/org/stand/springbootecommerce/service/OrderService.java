package org.stand.springbootecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.stand.springbootecommerce.dto.request.OrderRequest;
import org.stand.springbootecommerce.entity.OrderDetails;
import org.stand.springbootecommerce.entity.Orders;
import org.stand.springbootecommerce.repository.OrderDetailsRepository;
import org.stand.springbootecommerce.repository.OrderRepository;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Transactional
    public Boolean saveOrder(OrderRequest orderRequest) {
        Boolean flag=false;
        // Assuming there is only one item in the list for this example
        OrderRequest.Item item = orderRequest.getItems().get(0);

        Orders order = new Orders();
        order.setOrderReference(item.getOrderReference());
        order.setRecipientName(item.getRecipient().getAddress().getFullName());
        order.setRecipientAddress(item.getRecipient().getAddress().getAddressLine1());
        order.setRecipientCity(item.getRecipient().getAddress().getCity());
        order.setRecipientPostcode(item.getRecipient().getAddress().getPostcode());
        order.setRecipientCountryCode(item.getRecipient().getAddress().getCountryCode());
        order.setRecipientPhone(item.getRecipient().getPhoneNumber());
        order.setRecipientEmail(item.getRecipient().getEmailAddress());

        try {
            Date orderDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").parse(item.getOrderDate());
            order.setOrderDate(orderDate);
        } catch (ParseException e) {
            e.printStackTrace();  // Handle parsing error
        }

        order.setSubtotal(BigDecimal.valueOf(item.getSubtotal()));
        order.setShippingCostCharged(BigDecimal.valueOf(item.getShippingCostCharged()));
        order.setTotal(BigDecimal.valueOf(item.getTotal()));
        order.setCurrencyCode(item.getCurrencyCode());

        // Save the order entity
       Orders savedOrder= orderRepository.save(order);

        // Map OrderRequest packages and contents to OrderDetails entity
        List<OrderDetails> orderDetailsList = new ArrayList<>();
        for (OrderRequest.Item.Package pack : item.getPackages()) {
            for (OrderRequest.Item.Package.Content content : pack.getContents()) {
                OrderDetails orderDetails = new OrderDetails();
                orderDetails.setProductName(content.getName());
                orderDetails.setSku(content.getSku());
                orderDetails.setQuantity(content.getQuantity());
                orderDetails.setUnitValue(BigDecimal.valueOf(content.getUnitValue()));
                orderDetails.setUnitWeightInGrams(content.getUnitWeightInGrams());
                orderDetails.setWeightInGrams(pack.getWeightInGrams());
                orderDetails.setPackageFormatIdentifier(pack.getPackageFormatIdentifier());
                orderDetails.setOrderId(savedOrder);  // Set the saved order reference

                // Add to the list of order details
                orderDetailsRepository.save(orderDetails);
//                orderDetailsList.add(orderDetails);
            }
            flag=true;
        }

        // Save all order details

        return flag;
    }
}
