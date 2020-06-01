package com.bhaskar.inventory.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
public class OrderDetails {
    private String orderId;
    private Date created;
    private String customer;
    private BigDecimal total;
    private String status;
    private BigDecimal discountAmount;
    private BigDecimal shippingAmount;
    private BigDecimal taxAmount;
    private Discount discount;
    private List<OrderProduct> products;
    private String previousStatus;
}
